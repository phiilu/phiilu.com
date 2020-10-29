import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as FathomClient from 'fathom-client';

const siteId = process.env.NEXT_PUBLIC_FATHOM_SITE_ID;

function Fathom() {
  const router = useRouter();

  useEffect(() => {
    FathomClient.load(siteId, {
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

export default Fathom;
