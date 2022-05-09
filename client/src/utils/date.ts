import { format, parseISO } from 'date-fns';
import { nb } from 'date-fns/locale';

export const formatDate = (date: any, formatStr: string) =>
  format(date, formatStr, { locale: nb });

export const handleDateValue = (
  tidspunkt: Date | string | undefined
): Date | undefined => {
  if (tidspunkt instanceof Date) {
    return tidspunkt as Date;
  } else if (typeof tidspunkt === 'string') {
    // tidspunkt har blitt til en string og må konverteres tilbake
    return parseISO(tidspunkt as string);
  }

  return undefined;
};

export const handleTimeValue = (tidspunkt: Date | string | undefined): string | undefined => {
  const datevalue = handleDateValue(tidspunkt);
  if (!datevalue) {
    return undefined;
  }

  return formatDate(datevalue, 'HH:mm');
}

export const isKlokkeslett = (value: string): boolean => {
  const regexp = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

  return value.match(regexp) ? true : false;
};
