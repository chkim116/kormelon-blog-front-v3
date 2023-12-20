import { ReactNode } from 'react';
import { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { NextUIProviders } from '@shared/styles/NextUIProviders';
import { createMetaData } from '@shared/domains/meta/sharedMeta.create';
import { GA_TRACKING_ID } from '@core/services/GoogleTagService';

import '@shared/styles/tailwind.global.css';
import { RouteProgress } from '@shared/components/common/RouteProgress';

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = createMetaData();
export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      {/* TODO: 외부 모듈 추출 */}
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/variable/pretendardvariable.css"
        />
      </head>
      <body>
        <NextUIProviders>
          <RouteProgress />
          {children}
          <div id="feedback" />
        </NextUIProviders>

        {/* TODO: 외부 모듈로 추출 */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3241811705564924"
          crossOrigin="anonymous"
        />
        <Script
          id="gtag"
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
      </body>
    </html>
  );
}
