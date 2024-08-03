import { format, fromUnixTime } from 'date-fns';

export const convertDate = (unixTimestamp: number): string => {
  return format(fromUnixTime(unixTimestamp), 'hh:mma').toLowerCase();
};
