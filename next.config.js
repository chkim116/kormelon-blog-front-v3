/* eslint-disable @typescript-eslint/no-var-requires */
const withImages = require('next-images');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    disableStaticImages: true,
    remotePatterns: [
      { hostname: 'www.gravatar.com' },
      { hostname: 'assets-kormelon-v2.s3.ap-northeast-2.amazonaws.com' },
      { hostname: 'assets-kormelon-v3.s3.ap-northeast-2.amazonaws.com' },
      { hostname: 'images.unsplash.com' },
    ],
  },
  experimental: {},
  transpilePackages: ['lucide-react'],
};

module.exports = withImages({
  ...nextConfig,
});
