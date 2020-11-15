import React from 'react';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';

const Layout = ({ children }) => {
  return (
    <div
      className="grid min-h-screen antialised font-open-sans"
      style={{ gridTemplateRows: 'auto 1fr auto' }}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
