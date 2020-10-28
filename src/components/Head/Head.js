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

      {url && <link rel="canonical" href={url} />}

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#667eea" />
      <meta name="msapplication-TileColor" content="#667eea" />
      <meta name="theme-color" content="#667eea" />

      <title>{title} | Phiilu</title>

      {children}
    </NextHead>
  );
};

export default Head;
