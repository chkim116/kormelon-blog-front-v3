'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { googleTagService } from '@core/lib/GoogleTagService';

export function useWebVitals() {
  useReportWebVitals((metric) => {
    googleTagService.event({
      action: metric.name,
      category: 'Web Vitals',
      label: metric.label,
      value: Math.round(
        metric.name === 'CLS' ? metric.value * 1000 : metric.value,
      ),
    });
  });
}
