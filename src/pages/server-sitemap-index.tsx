import { GetStaticProps } from 'next';
import fs from 'fs';
import { ISitemapField, SitemapBuilder } from 'next-sitemap';
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

  const serverSitemap = new SitemapBuilder().buildSitemapXml(fields);

  fs.writeFileSync('./public/server-sitemap-index.xml', serverSitemap);
};

export const getStaticProps: GetStaticProps = async () => {
  await generateServerSitemap();

  return {
    props: {},
    revalidate: 60,
  };
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export default function Sitemap() {
  return <></>;
}
