import { env } from '@core/env';

export const GA_TRACKING_ID = 'G-BF4XPBNQXM';

interface GoogleTagServiceEventProps {
  action?: string;
  category?: string;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
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
