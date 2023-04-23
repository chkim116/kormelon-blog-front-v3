import { DefaultSeo, NextSeo } from 'next-seo';
import { GA_TRACKING_ID } from '@shared/services';

export const favicon = () => (
  <>
    <link
      rel="apple-touch-icon"
      sizes="57x57"
      href="/favicons/apple-icon-57x57.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="60x60"
      href="/favicons/apple-icon-60x60.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="72x72"
      href="/favicons/apple-icon-72x72.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="76x76"
      href="/favicons/apple-icon-76x76.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="114x114"
      href="/favicons/apple-icon-114x114.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="120x120"
      href="/favicons/apple-icon-120x120.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="144x144"
      href="/favicons/apple-icon-144x144.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="152x152"
      href="/favicons/apple-icon-152x152.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/favicons/apple-icon-180x180.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="192x192"
      href="/favicons/android-icon-192x192.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/favicons/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="96x96"
      href="/favicons/favicon-96x96.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/favicons/favicon-16x16.png"
    />
    <link rel="manifest" href="/favicons/manifest.json" />
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta
      name="msapplication-TileImage"
      content="/favicons/ms-icon-144x144.png"
    />
    <meta name="theme-color" content="#ffffff" />
  </>
);

export const googleAds = () => (
  <script
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3241811705564924"
    crossOrigin="anonymous"
  />
);

export const googleTag = () => (
  <>
    <meta
      name="google-site-verification"
      content="3yQnN4a3laP_8uJlbw0p-c0XNOQlISHhCfBdGfGTq4w"
    />
    {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
    />
    <script
      dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
      }}
    />
  </>
);

export const DefaultHead = () => (
  <>
    <DefaultSeo
      title="Kormelon Dev blog"
      description="프론트엔드 개발자 김창회의 개발 블로그"
      canonical="프론트엔드 개발자 김창회의 개발 블로그"
      openGraph={{
        article: {
          authors: ['김창회'],
        },
        title: 'Kormelon Dev blog',
        description: '프론트엔드 개발자 김창회의 개발 블로그',
        type: 'blog',
        locale: 'ko_KR',
        url: 'https://www.kormelon.com/',
        site_name: 'Kormelon Dev blog',
        images: [
          {
            url: 'https://images.unsplash.com/photo-1616812757130-aca5451b0243?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
            alt: 'Kormelon Dev blog',
          },
        ],
      }}
      twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
      }}
    />
  </>
);

interface SeoProps {
  title?: string;
  desc?: string;
  url?: string;
  image?: string;
}

export function PageSeo({
  title = 'Kormelon Dev blog',
  desc = '프론트엔드 개발자 김창회의 개발 블로그',
  url = 'https://www.kormelon.com',
  image = 'https://images.unsplash.com/photo-1616812757130-aca5451b0243?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
}: SeoProps) {
  const DEFAULT_TITLE = 'Kormelon Dev blog | ';
  return (
    <NextSeo
      title={DEFAULT_TITLE + title}
      description={desc}
      canonical={url}
      openGraph={{
        article: {
          authors: ['김창회'],
        },
        title: title,
        description: desc,
        type: 'article',
        locale: 'ko_KR',
        url,
        site_name: 'Kormelon Dev blog',
        images: [
          {
            url: image,
            alt: title,
          },
        ],
      }}
      twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
      }}
    />
  );
}
