import Holidays from 'date-holidays';
import { NextRequest } from 'next/server';

type HolidayRecord = {
  date: string;
  name: string;
  type?: string;
};

const hd = new Holidays('IN');

export function GET(request: NextRequest) {
  const yearParam = request.nextUrl.searchParams.get('year');
  const year = yearParam ? Number(yearParam) : Number.NaN;

  if (!Number.isInteger(year)) {
    return Response.json({ error: 'Invalid year' }, { status: 400 });
  }

  const holidays = (hd.getHolidays(year) as HolidayRecord[]).filter(
    (holiday) => holiday.type === 'public'
  );
  const map: Record<string, string> = {};

  for (const holiday of holidays) {
    const dateKey = holiday.date.split(' ')[0];
    if (dateKey) {
      map[dateKey] = holiday.name;
    }
  }

  return Response.json(map);
}
