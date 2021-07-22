const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});
const withTM = require('next-transpile-modules')([]);

module.exports = withTM({
  ...withBundleAnalyzer({
    webpack: (config) => {
      config.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader'
      });
      return config;
    },
    images: {
      domains: ['images.ctfassets.net', 'ctfassets.net']
    },
    async redirects() {
      return [
        {
          source: '/uses',
          destination: '/my-gear',
          permanent: true
        },
        {
          source: '/articles',
          destination: '/blog',
          permanent: true
        }
      ];
    },
    async rewrites() {
      return [
        {
          source: '/bee.js',
          destination: 'https://cdn.splitbee.io/sb.js'
        },
        {
          source: '/_hive/:slug',
          destination: 'https://hive.splitbee.io/:slug'
        }
      ];
    }
  }),
  webpack5: true
});
