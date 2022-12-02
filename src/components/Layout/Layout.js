import React from 'react';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import Banner from '@components/Banner/Banner';
import useLocalStorage from '@hooks/useLocalStorage';
import PokezardsIcon from '@components/Icons/PokezardsLogo';

const Layout = ({ children, route }) => {
  const [showBanner, setShowBanner] = useLocalStorage('show_banner', true);

  return (
    <div
      className="grid min-h-screen antialised font-open-sans dark:bg-gray-900 dark:text-gray-100"
      style={{ gridTemplateRows: 'auto 1fr auto' }}>
      {showBanner ? (
        <Banner
          icon={<PokezardsIcon className="w-8 h-8" />}
          ctaText={'Check it out'}
          ctaHref="//pokezards.com?ref=phiilu.com"
          text="Hey! If you like Pokémon TCG you might like my new project I am working on »Pokézards«"
          onClose={() => setShowBanner(!showBanner)}
        />
      ) : null}

      <Header route={route} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
