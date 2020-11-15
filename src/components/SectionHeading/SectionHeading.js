import { motion } from 'framer-motion';

const variants = {
  enter: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0 }
};

function SectionHeading({ heading, subheading, children }) {
  return (
    <motion.div initial="initial" variants={variants} className="mx-4 md:mx-0 lg:text-center">
      <p className="text-base font-semibold leading-6 tracking-wide text-indigo-600 uppercase">
        {heading}
      </p>
      <h1 className="mt-2 text-2xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
        {subheading}
      </h1>
      <p className="max-w-2xl mt-4 text-xl leading-9 text-gray-500 lg:mx-auto">{children}</p>
    </motion.div>
  );
}

export default SectionHeading;
