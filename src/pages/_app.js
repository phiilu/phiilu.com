import '../styles/index.css';
import GoogleFonts from 'next-google-fonts';

function PhiiluBlog({ Component, pageProps }) {
  return (
    <>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&family=Source+Sans+Pro:wght@300;400;600;700&display=swap" />
      <Component {...pageProps} />
    </>
  );
}

export default PhiiluBlog;
