import classNames from 'classnames';
import * as React from 'react';

function Alert({ variant = 'success', title, message, action }) {
  const [show, setShow] = React.useState(true);
  const success = variant === 'success';
  const error = variant === 'error';

  function handleClose() {
    setShow((prev) => !prev);
  }

  if (!show) return null;

  return (
    <div
      className={classNames('p-4 rounded-md', {
        'bg-green-50': success,
        'bg-red-50': error
      })}>
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className={classNames('w-5 h-5 ', {
              'text-green-400': success,
              'text-red-400': error
            })}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          {title && (
            <h3
              className={classNames('text-sm font-bold leading-5 ', {
                'text-green-800': success,
                'text-red-800': error
              })}>
              {title}
            </h3>
          )}
          <div
            className={classNames('mt-2 text-sm leading-5', {
              'text-green-700': success,
              'text-red-700': error
            })}>
            <p>{message}</p>
          </div>
          {action && (
            <div className="mt-4">
              <div className="-mx-2 -my-1.5 flex">
                <button
                  onClick={action.onClick}
                  className={classNames(
                    'px-2 py-1.5 rounded-md text-sm leading-5 font-medium focus:outline-none transition ease-in-out duration-150',
                    {
                      'text-green-800 hover:bg-green-100 focus:bg-green-100': success,
                      'text-red-800 hover:bg-red-100 focus:bg-red-100': error
                    }
                  )}>
                  {action.name}
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="pl-3 ml-auto">
          <div className="-mx-1.5 -my-1.5">
            <button
              onClick={handleClose}
              className={classNames(
                'inline-flex rounded-md p-1.5 focus:outline-none  transition ease-in-out duration-150',
                {
                  'text-green-500 hover:bg-green-100 focus:bg-green-100': success,
                  'text-red-500 hover:bg-red-100 focus:bg-red-100': error
                }
              )}
              aria-label="Dismiss">
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alert;
