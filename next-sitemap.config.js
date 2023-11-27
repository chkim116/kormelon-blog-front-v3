/** @type {import('next-sitemap').IConfig} */

const URL =
  process.env.NODE_ENV === 'production'
    ? 'https://kormelon.com'
    : 'http://localhost:3000';

module.exports = {
  siteUrl: URL,
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    '/',
    '/auth',
    '/tags',
    '/blog',
    '/blog/write',
    '/blog/private',
    '/resume',
    '/settings/*',
    '/search',
    '/search/*',
    '/server-sitemap.xml',
  ],
  robotsTxtOptions: {
    additionalSitemaps: [URL + '/server-sitemap.xml'],
  },
};
