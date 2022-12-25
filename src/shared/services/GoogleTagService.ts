import { env } from '@common/env';

export const GA_TRACKING_ID = 'G-H1V3329QVH';

interface GoogleTagServiceEventProps {
  action?: string;
  category?: string;
  label?: string;
  value?: string;
}

class GoogleTagService {
  pageView(url: string) {
    if (this.isEnabled()) {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
      });
    }
  }

  event({ action, category, label, value }: GoogleTagServiceEventProps) {
    if (this.isEnabled()) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  }

  private isEnabled() {
    return env.isSSR === false && 'gtag' in window;
  }
}

export const googleTagService = new GoogleTagService();
