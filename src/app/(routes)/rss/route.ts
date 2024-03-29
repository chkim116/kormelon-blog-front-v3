import { marked } from 'marked';
import { unstable_noStore } from 'next/cache';
import { env } from '@core/env';
import { PostRssEntity } from '@core/entities';
import { postRepository } from '@core/repositories/post.repo';

const URL = env.domain;
const TITLE = 'Kormelon Dev Blog';
const SITE_DESCRIPTION = 'The most recent home feed on Kormelon Blog';

const utf8ForXml = (content: string) =>
  content.replace(
    // eslint-disable-next-line no-irregular-whitespace
    /[\u00A0\u1680​\u180e\u2000-\u2009\u200a​\u200b​\u202f\u205f​\u3000]/g,
    '',
  );

const postRssXml = (posts: PostRssEntity[]) => {
  let latestPostDate = '';
  let rssItemsXml = '';

  posts.forEach((post) => {
    const postDate = new Date(post.createdAt).getTime();
    if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
      latestPostDate = post.createdAt.toDateString();
    }

    rssItemsXml += `
      <item>
        <title>${post.title}</title>
        <link>${URL}/blog/${post.id}</link>
        <pubDate>${new Date(post.createdAt)}</pubDate>
        <description>
	<![CDATA[${marked.parse(utf8ForXml(post.content))}]]>
        </description>
    </item>`;
  });
  return {
    rssItemsXml,
    latestPostDate,
  };
};

const createRss = (posts: PostRssEntity[]) => {
  const { rssItemsXml, latestPostDate } = postRssXml(posts);

  return `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>${TITLE}</title>
        <description>${SITE_DESCRIPTION}</description>
        <link>${URL}</link>
        <language>ko</language>
	<atom:link rel="self" type="application/rss+xml" href="${`${URL}/rss`}"></atom:link>
        <lastBuildDate>${new Date(latestPostDate)}</lastBuildDate>
        ${rssItemsXml}
    </channel>
  </rss>`;
};

const generateRss = async () => {
  const { payload: posts } = await postRepository.fetchPostRss();

  return createRss(posts);
};

export async function GET(): Promise<Response> {
  unstable_noStore();

  const rss = await generateRss();

  return new Response(rss, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
