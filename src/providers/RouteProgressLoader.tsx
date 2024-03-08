'use client';

import { useEffect } from 'react';
import * as NProgress from 'nprogress';
import NextTopLoader from 'nextjs-toploader';
import { usePathname } from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RouteProgressLoaderProps {}

export default function RouteProgressLoader(_: RouteProgressLoaderProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (NProgress) {
      NProgress.done();
    }
  }, [pathname]);

  return <NextTopLoader />;
}
