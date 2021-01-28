import { motion } from 'framer-motion';
import Heading from '@components/Heading/Heading';

const variants = {
  enter: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0 }
};

function SectionHeading({ heading, subheading, children }) {
  return (
    <motion.div initial="initial" variants={variants} className="mx-4 md:mx-0 lg:text-center">
      <p className="font-semibold leading-6 tracking-wide text-indigo-600 uppercase text-md xl:text-xl xl:leading-6 dark:text-indigo-500">
        {heading}
      </p>
      <Heading noMargin>{subheading}</Heading>
      <p className="max-w-2xl mt-4 text-xl leading-9 text-gray-500 xl:text-xl dark:text-gray-100 lg:mx-auto xl:leading-9">
        {children}
      </p>
    </motion.div>
  );
}

export default SectionHeading;
