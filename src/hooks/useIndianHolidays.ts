import { useEffect, useState } from 'react';

export function useIndianHolidays(currentMonth: Date) {
  const [holidaysMap, setHolidaysMap] = useState<Record<string, string>>({});
  const year = currentMonth.getFullYear();

  useEffect(() => {
    const years = [year - 1, year, year + 1];
    let isActive = true;
    const controller = new AbortController();

    const fetchYear = async (targetYear: number): Promise<Record<string, string>> => {
      const response = await fetch(`/api/holidays?year=${targetYear}`, {
        signal: controller.signal,
      });
      if (!response.ok) {
        return {};
      }
      const data = (await response.json()) as Record<string, string>;
      return data;
    };

    Promise.all(years.map(fetchYear))
      .then((maps) => {
        if (!isActive) {
          return;
        }
        const combined = Object.assign({}, ...maps);
        setHolidaysMap(combined);
      })
      .catch(() => {});

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [year]);

  return holidaysMap;
}
