import { date } from '@core/lib/date';

export function formattingDate(day: string | Date, format: string = 'LL') {
  return date(day).format(format);
}
