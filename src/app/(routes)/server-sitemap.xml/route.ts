import { ISitemapField, getServerSideSitemap } from 'next-sitemap';
import { unstable_noStore } from 'next/cache';
import { PostRssEntity } from '@core/entities';
import { env } from '@core/env';
import { postRepository } from '@core/repositories/post.repo';

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
  unstable_noStore();
  const siteMap = await generateServerSitemap();

  return getServerSideSitemap(siteMap);
}
