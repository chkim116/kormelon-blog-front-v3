import { GetServerSideProps } from 'next';
import { marked } from 'marked';
import { env } from '@common/env';
import { repo } from '@core/repo';
import { BlogPostRssEntity } from '@core/entities';

const URL = env.apiUrl;
const TITLE = 'Kormelon Dev Blog';
const SITE_DESCRIPTION = 'The most recent home feed on Kormelon Blog';

const utf8ForXml = (content: string) =>
  content.replace(
    // eslint-disable-next-line no-irregular-whitespace
    /[\u00A0\u1680​\u180e\u2000-\u2009\u200a​\u200b​\u202f\u205f​\u3000]/g,
    '',
  );

const postRssXml = (posts: BlogPostRssEntity[]) => {
  let latestPostDate = '';
  let rssItemsXml = '';

  posts.forEach((post) => {
    const postDate = Date.parse(post.createdAt);
    if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
      latestPostDate = post.createdAt;
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

const getRssXml = (posts: BlogPostRssEntity[]) => {
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = ctx.res;

  if (!res) {
    return {
      props: {},
    };
  }

  const {
    data: { payload: posts },
  } = await repo.post.fetchPostRss();

  res.setHeader('Content-Type', 'text/xml');
  res.write(getRssXml(posts));
  res.end();

  return {
    props: {},
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => null;
