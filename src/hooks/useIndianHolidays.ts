import { useMemo } from 'react';
import Holidays from 'date-holidays';

const HOLIDAY_CACHE = new Map<number, Record<string, string>>();

type HolidayRecord = {
  date: string;
  name: string;
  type?: string;
};

function getPublicHolidayMap(year: number): Record<string, string> {
  if (HOLIDAY_CACHE.has(year)) {
    return HOLIDAY_CACHE.get(year) ?? {};
  }

  const hd = new Holidays('IN');
  const map: Record<string, string> = {};
  const years = [year - 1, year, year + 1];

  years.forEach((targetYear) => {
    const holidays = (hd.getHolidays(targetYear) as HolidayRecord[]).filter(
      (holiday) => holiday.type === 'public'
    );

    holidays.forEach((holiday) => {
      const dateKey = holiday.date.split(' ')[0];
      if (dateKey) {
        map[dateKey] = holiday.name;
      }
    });
  });

  HOLIDAY_CACHE.set(year, map);
  return map;
}

export function useIndianHolidays(currentMonth: Date) {
  const year = currentMonth.getFullYear();

  const holidaysMap = useMemo(() => {
    try {
      return getPublicHolidayMap(year);
    } catch {
      return {};
    }
  }, [year]);

  return holidaysMap;
}
