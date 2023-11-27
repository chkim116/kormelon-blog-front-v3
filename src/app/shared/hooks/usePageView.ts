'use client';

import { useEffect } from 'react';
import router from 'next/router';
import { googleTagService } from '@core/services/GoogleTagService';

export function usePageView() {
  useEffect(() => {
    const gtagRouteChange = (url: string) => {
      googleTagService.pageView(url);
    };

    router.events.on('routeChangeComplete', (url) => {
      gtagRouteChange(url);
    });

    return () => {
      router.events.off('routeChangeComplete', gtagRouteChange);
    };
  }, []);
}
