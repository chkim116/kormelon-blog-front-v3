/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentProps } from 'react';
import type { NextPage } from 'next';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';

import { Layout } from '@shared/components/Layout';
import store from '@common/store';

export type NextPageWithLayout<P = Record<string, any>, IP = P> = NextPage<
  P,
  IP
> & {
  Layout?: ComponentProps<any>;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
