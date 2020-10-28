// components/head.js
import * as React from 'react';
import NextHead from 'next/head';

const Head = ({ children, title, description, url, date, image }) => {
  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />

      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {date && <meta name="article:published_time`" content={new Date(date).toISOString()} />}

      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:type" content="website" />
      {url && <meta name="og:url" content={url} />}

      {image && <meta name="og:image" content={image} />}
      {image && <meta name="image" content={image} />}
      {image && <meta name="og:image:width" content="1200" />}
      {image && <meta name="og:image:height" content="630" />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@phiilu" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      <title>{title}</title>

      {children}
    </NextHead>
  );
};

export default Head;
