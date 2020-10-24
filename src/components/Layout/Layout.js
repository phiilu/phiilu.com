import React from 'react';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';

const Layout = ({ as, children }) => {
  const Element = { as };
  return (
    <Element.as
      className="grid min-h-screen antialised font-open-sans"
      style={{ gridTemplateRows: 'auto 1fr auto' }}>
      <Header />
      {children}
      <Footer />
    </Element.as>
  );
};
Layout.defaultProps = {
  as: 'div'
};

export default Layout;
