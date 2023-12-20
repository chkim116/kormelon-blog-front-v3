import { Metadata } from 'next';
import { SharedMetaDataUiState } from '@shared/domains/meta/sharedMeta.uiState';

// eslint-disable-next-line quotes
const DEFAULT_TITLE = "Hi 👋🏻, I'm kimchanghoe !!";
const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1616812757130-aca5451b0243?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';
const DEFAULT_DESCRIPTION = '프론트엔드 개발자 김창회의 기술 블로그';
const DEFAULT_URL = 'https://www.kormelon.com';

export function createMetaData({
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  title = DEFAULT_TITLE,
  url = DEFAULT_URL,
}: SharedMetaDataUiState = {}): Metadata {
  return {
    metadataBase: new URL(url),
    title: {
      default: title,
      template: '%s',
    },
    authors: [{ name: 'kimchanghoe' }],
    description,
    creator: 'kimchanghoe',
    openGraph: {
      type: 'website',
      title: { default: title, template: '%s' },
      description,
      locale: 'ko_KR',
      url: '/',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: { default: title, template: '%s' },
      description,
      images: [image],
    },
    icons: {
      icon: [
        {
          url: '/favicons/favicon-16x16',
          sizes: '16x16',
          type: 'image/png',
        },
        {
          url: '/favicons/favicon-32x32',
          sizes: '32x32',
          type: 'image/png',
        },
        {
          url: '/favicons/favicon-96x96',
          sizes: '96x96',
          type: 'image/png',
        },
        {
          url: '/favicons/android-icon-192x192',
          sizes: '192x192',
          type: 'image/png',
        },
      ],
      apple: [
        {
          url: '/favicons/apple-icon-57x57.png',
          sizes: '57x57',
          type: 'image/png',
        },
        {
          url: '/favicons/apple-icon-60x60.png',
          sizes: '60x60',
          type: 'image/png',
        },
        {
          url: '/favicons/apple-icon-72x72.png',
          sizes: '72x72',
          type: 'image/png',
        },
        {
          url: '/favicons/apple-icon-76x76.png',
          sizes: '76x76',
          type: 'image/png',
        },
        {
          url: '/favicons/apple-icon-114x114.png',
          sizes: '114x114',
          type: 'image/png',
        },
        {
          url: '/favicons/apple-icon-120x120.png',
          sizes: '120x120',
          type: 'image/png',
        },
        {
          url: '/favicons/apple-icon-144x144.png',
          sizes: '144x144',
          type: 'image/png',
        },
        {
          url: '/favicons/apple-icon-152x152.png',
          sizes: '152x152',
          type: 'image/png',
        },
        {
          url: '/favicons/apple-icon-180x180.png',
          sizes: '180x180',
          type: 'image/png',
        },
      ],
    },
    manifest: '/favicons/manifest.json',
    verification: {
      google: '4UCsVYTeUB7uEuUimIPiptpwMhR7khoKT2Ud57mvtVE',
    },
    alternates: {
      canonical: '/',
      types: {
        'application/rss+xml': [{ url: 'rss', title: 'rss' }],
      },
    },
  };
}
