/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentProps } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { Layout } from '@common/components/layouts';

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
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
