import { GetServerSideProps } from 'next';
import { ISitemapField, getServerSideSitemap } from 'next-sitemap';
import { BlogPostRssEntity } from '@core/entities';
import { repo } from '@core/repo';

const URL =
  process.env.NODE_ENV === 'production'
    ? 'https://kormelon.com'
    : 'http://localhost:3000';

export const generateServerSitemap = async () => {
  const {
    data: { payload: posts },
  } = await repo.post.fetchPostRss();

  const fields: ISitemapField[] = posts.map((post: BlogPostRssEntity) => ({
    loc: `${URL}/blog/${post.id}`,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.7,
  }));

  return fields;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const siteMap = await generateServerSitemap();

  return getServerSideSitemap(ctx, siteMap);
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export default function Sitemap() {
  return null;
}
