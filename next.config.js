/* eslint-disable @typescript-eslint/no-var-requires */
const withImages = require('next-images');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    disableStaticImages: true,
    domains: [
      'www.gravatar.com',
      'assets-kormelon-v2.s3.ap-northeast-2.amazonaws.com',
      'images.unsplash.com',
    ],
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/blog',
        permanent: true,
      },
    ];
  },
};

module.exports = withImages({
  ...nextConfig,
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
});
