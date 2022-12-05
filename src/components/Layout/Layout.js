import React from 'react';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';

const Layout = ({ children, route }) => {
  return (
    <div
      className="grid min-h-screen antialised font-open-sans dark:bg-gray-900 dark:text-gray-100"
      style={{ gridTemplateRows: 'auto 1fr auto' }}>
      <Header route={route} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
