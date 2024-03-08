'use client';

import { useBlogViewCount } from '@shared/hooks/useBlogViewCount';
import { useWebVitals } from '@shared/hooks/useWebVitals';
import { usePageView } from '@shared/hooks/usePageView';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PageViewContainerClientProps {}

export default function PageViewContainer(_: PageViewContainerClientProps) {
  useBlogViewCount();
  useWebVitals();
  usePageView();

  return <></>;
}
