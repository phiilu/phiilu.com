import '../styles/index.css';
import GoogleFonts from 'next-google-fonts';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as FathomClient from 'fathom-client';

function Fathom() {
  const router = useRouter();

  useEffect(() => {
    FathomClient.load(process.env.FATHOM_SITE_ID, {
      url: 'https://mandrill.phiilu.com/script.js',
      honorDNT: true,
      includedDomains: ['phiilu.com']
    });

    function onRouteChangeComplete() {
      FathomClient.trackPageview();
    }
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, []);

  return null;
}

function PhiiluBlog({ Component, pageProps }) {
  return (
    <>
      <Fathom />
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&family=Source+Sans+Pro:wght@300;400;600;700&display=swap" />
      <Component {...pageProps} />
    </>
  );
}

export default PhiiluBlog;
