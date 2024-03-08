import { useEffect } from 'react';
import { useFormActionState } from '@common/hooks/useFormActionState';
import { date } from '@core/lib/date';
import { tokenProvider } from '@core/lib/storage/tokenProvider';
import { actSharedViewAdd } from '@shared/actions/sharedView.action';

export function useBlogViewCount() {
  const { formAction: addView } = useFormActionState(actSharedViewAdd);

  useEffect(() => {
    const currentViewDate =
      tokenProvider.get<string>('kormelon_view') || date().subtract(1, 'day');

    const nextDate = date(currentViewDate)
      .set('hour', 23)
      .set('minute', 59)
      .set('second', 59);

    if (date().isBefore(nextDate)) {
      return;
    }

    addView().then(() => {
      tokenProvider.set('kormelon_view', date().format('YYYY-MM-DD'));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
