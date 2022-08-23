import '../styles/index.css';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from '@components/Layout/Layout';
import Notifications from '@components/Notifications/Notifications';

import { useDarkMode } from '@hooks/useDarkMode';

function PhiiluBlog({ Component, pageProps, router }) {
  useDarkMode();

  function handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  return (
    <>
      <Layout route={router.route}>
        <AnimatePresence exitBeforeEnter onExitComplete={handleScrollToTop}>
          <motion.div
            key={router.route}
            initial="exit"
            animate="enter"
            exit="exit"
            transition={{ ease: [0.175, 0.85, 0.42, 0.96], duration: 0.2, staggerChildren: 0.1 }}>
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Layout>
      <Notifications />
    </>
  );
}

export default PhiiluBlog;
