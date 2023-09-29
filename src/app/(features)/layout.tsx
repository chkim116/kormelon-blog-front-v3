import { ReactNode } from 'react';
import { Metadata } from 'next';
import Script from 'next/script';
import { Provider } from '@shared/stores';
import { createMetaData } from '@domain/manipulates';
import { GA_TRACKING_ID } from '@core/services';
import { NextUIProviders } from '@shared/styles/NextUIProviders';
import { RootLayoutContainer } from '@shared/containers/RootLayoutContainer';

import '@shared/styles/tailwind.global.css';

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = createMetaData();

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
        <Provider>
          <NextUIProviders>
            <RootLayoutContainer>{children}</RootLayoutContainer>
            <div id="feedback" />
          </NextUIProviders>
        </Provider>

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
