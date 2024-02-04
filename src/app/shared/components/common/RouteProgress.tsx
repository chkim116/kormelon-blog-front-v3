'use client';

import { useEffect } from 'react';
import * as NProgress from 'nprogress';
import NextTopLoader from 'nextjs-toploader';
import { usePathname } from 'next/navigation';
import { useWebVitals } from '@shared/hooks/useWebVitals';
import { usePageView } from '@shared/hooks/usePageView';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RouteProgressProps {}

export function RouteProgress(_: RouteProgressProps) {
  const pathname = usePathname();

  // TODO: ga 트래킹용 훅스 호출 위치 변경 - 23.11.25
  useWebVitals();
  usePageView();

  useEffect(() => {
    if (NProgress) {
      NProgress.done();
    }
  }, [pathname]);

  return <NextTopLoader />;
}
