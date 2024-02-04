import { date } from '@core/lib/date';

export function formattingDate(day: string, format: string = 'LL') {
  return date(day).format(format);
}
