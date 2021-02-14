import toastAction, { useToaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';

function SuccessIcon() {
  return (
    <svg
      className="w-6 h-6 text-green-400"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg
      className="w-6 h-6 text-red-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  );
}

function LoadingIcon() {
  return (
    <svg
      className="w-8 h-8 text-indigo-400"
      viewBox="0 0 45 45"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor">
      <g fill="none" fillRule="evenodd" transform="translate(1 1)" strokeWidth="2">
        <circle cx="22" cy="22" r="6" strokeOpacity="0">
          <animate
            attributeName="r"
            begin="1.5s"
            dur="3s"
            values="6;22"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            begin="1.5s"
            dur="3s"
            values="1;0"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-width"
            begin="1.5s"
            dur="3s"
            values="2;0"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="22" cy="22" r="6" strokeOpacity="0">
          <animate
            attributeName="r"
            begin="3s"
            dur="3s"
            values="6;22"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            begin="3s"
            dur="3s"
            values="1;0"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-width"
            begin="3s"
            dur="3s"
            values="2;0"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="22" cy="22" r="8">
          <animate
            attributeName="r"
            begin="0s"
            dur="1.5s"
            values="6;1;2;3;4;5;6"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
}

const Notifications = () => {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause } = handlers;
  return (
    <div
      className="fixed inset-0 z-30 flex flex-col items-end px-4 py-6 pointer-events-none sm:p-6"
      onMouseEnter={startPause}
      onMouseLeave={endPause}>
      <AnimatePresence>
        {toasts.map((toast, i) => {
          return (
            <motion.div
              initial={{ opacity: 0, y: '-100%' }}
              animate={{ opacity: 1, y: 8 * i }}
              exit={{ opacity: 0, y: 8 * i, x: '100%' }}
              transition={{ duration: 0.5 }}
              key={toast.id}
              role={toast.role}
              aria-live={toast.ariaLive}
              className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {toast.type === 'success' && <SuccessIcon />}
                    {toast.type === 'error' && <ErrorIcon />}
                    {toast.type === 'loading' && <LoadingIcon />}
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">{toast.message.title}</p>
                    <p className="mt-1 text-sm text-gray-500">{toast.message.text}</p>
                  </div>
                  {toast.message.dismiss && (
                    <div className="flex flex-shrink-0 ml-4">
                      <button
                        onClick={() => toastAction.dismiss(toast.id)}
                        className="inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Close</span>
                        <svg
                          className="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true">
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Notifications;
