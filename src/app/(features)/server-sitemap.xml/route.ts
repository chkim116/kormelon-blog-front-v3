import { ISitemapField, getServerSideSitemap } from 'next-sitemap';
import { PostRssEntity } from '@server/entities';
import { postRepository } from '@server/repositories/post.repo';
import { env } from '@core/env';

const generateServerSitemap = async () => {
  const { payload: posts } = await postRepository.fetchPostRss();

  const fields: ISitemapField[] = posts.map((post: PostRssEntity) => ({
    loc: `${env.domain}/blog/${post.id}`,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.7,
  }));

  return fields;
};

export async function GET() {
  const siteMap = await generateServerSitemap();

  return getServerSideSitemap(siteMap);
}
