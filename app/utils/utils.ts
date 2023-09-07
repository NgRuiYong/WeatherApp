import { toDate, utcToZonedTime, format } from "date-fns-tz";

export const convertUTCToTimeZone = (
  timestamp: number,
  formatString: string
): string => {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const utcDateTime = toDate(timestamp);
  const convertedTime = utcToZonedTime(utcDateTime, userTimezone);
  return format(convertedTime, formatString);
};
