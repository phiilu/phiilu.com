import '../styles/index.css';
import GoogleFonts from 'next-google-fonts';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from '@components/Layout/Layout';

function PhiiluBlog({ Component, pageProps, router }) {
  function handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  return (
    <>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&family=Source+Sans+Pro:wght@300;400;600;700&display=swap" />
      <Layout key={router.route}>
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
    </>
  );
}

export default PhiiluBlog;
