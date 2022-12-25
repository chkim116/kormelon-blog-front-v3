import { GetServerSideProps } from 'next';
import { ISitemapField, getServerSideSitemap } from 'next-sitemap';
import { repo } from '@core/repo';
import { BlogPostRssEntity } from '@core/entities';

const URL =
  process.env.NODE_ENV === 'production'
    ? 'https://kormelon.com'
    : 'http://localhost:3000';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    data: { payload: posts },
  } = await repo.post.fetchPostRss();

  const fields: ISitemapField[] = posts.map((post: BlogPostRssEntity) => ({
    loc: `${URL}/blog/${post.id}/${post.title}`,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.7,
  }));

  return getServerSideSitemap(ctx, fields);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => null;
