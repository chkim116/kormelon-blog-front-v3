import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/ko';

dayjs.extend(localizedFormat);
dayjs.locale('ko');

export const date = dayjs;
