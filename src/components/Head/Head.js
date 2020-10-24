// components/head.js
import * as React from 'react';
import NextHead from 'next/head';

const Head = ({ children, title }) => {
  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />

      <title>{title}</title>

      {children}
    </NextHead>
  );
};

export default Head;
