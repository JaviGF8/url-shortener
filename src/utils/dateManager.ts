import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';

export const DATE_TO_SHOW = 'dd/MM/yyyy';

export const formatDate = (date: Date): string => format(date, DATE_TO_SHOW);

export const sameDates = (firstDate: Date, secondDate: Date): boolean =>
  isSameDay(firstDate, secondDate);
