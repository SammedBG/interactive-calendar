import { useMemo } from 'react';
import Holidays from 'date-holidays';

export function useIndianHolidays(currentMonth: Date) {
  const year = currentMonth.getFullYear();

  const holidaysMap = useMemo(() => {
    const hd = new Holidays('IN');
    const map: Record<string, string> = {};
    const years = [year - 1, year, year + 1];

    years.forEach((y) => {
      const holidays = (hd.getHolidays(y) as { date: string; name: string; type?: string }[]).filter(
        (holiday) => holiday.type === 'public'
      );

      holidays.forEach((holiday) => {
        const dateKey = holiday.date.split(' ')[0];
        if (dateKey) {
          map[dateKey] = holiday.name;
        }
      });
    });

    return map;
  }, [year]);

  return holidaysMap;
}
