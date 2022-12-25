/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentProps } from 'react';
import type { NextPage } from 'next';
import { CacheProvider } from '@emotion/react';
import { EmotionCache } from '@emotion/cache';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import '@shared/styles/global.css';

import { Layout } from '@shared/containers/Layout';
import store from '@common/store';
import { createEmotionCache } from '@shared/createEmotionCache';
import { DefaultHead } from '@common/head';

dayjs.extend(localizedFormat);

export type NextPageWithLayout<P = Record<string, any>, IP = P> = NextPage<
  P,
  IP
> & {
  Layout?: ComponentProps<any>;
};

const clientSideEmotionCache = createEmotionCache();

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  emotionCache: EmotionCache;
};

export default function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppPropsWithLayout) {
  return (
    <CacheProvider value={emotionCache}>
      <DefaultHead />
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </CacheProvider>
  );
}
