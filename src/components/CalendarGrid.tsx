import { addDays, eachDayOfInterval, format, startOfMonth, startOfWeek } from 'date-fns';
import { DayCell } from './DayCell';
import { SelectionState } from '../hooks/useCalendar';
import { ThemeClasses } from './CalendarLayout';

const NOTE_KEY_SINGLE = /^note_(\d{4}-\d{2}-\d{2})$/;
const NOTE_KEY_RANGE = /^note_(\d{4}-\d{2}-\d{2})_(\d{4}-\d{2}-\d{2})$/;

interface CalendarGridProps {
  currentMonth: Date;
  selection: SelectionState;
  hoveredDate: Date | null;
  themeClasses: ThemeClasses;
  notesRecord: Record<string, string>;
  onSetHoveredDate: (d: Date | null) => void;
  onDateClick: (d: Date) => void;
}

export function CalendarGrid({
  currentMonth,
  selection,
  hoveredDate,
  themeClasses,
  notesRecord,
  onSetHoveredDate,
  onDateClick,
}: CalendarGridProps) {
  const monthStart = startOfMonth(currentMonth);
  // Revert back to Sunday start as per spec
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = addDays(startDate, 41);

  const dateFormat = "E";
  const days = [];
  let day = startDate;

  // Add Day Headers (Mon-Sun)
  for (let i = 0; i < 7; i++) {
    const isWeekend = i === 5 || i === 6;
    days.push(
      <div key={i} className={`text-center font-bold text-[10px] sm:text-xs py-3 uppercase tracking-[0.2em] font-outfit ${isWeekend ? themeClasses.text : 'text-neutral-500 dark:text-neutral-400'}`}>
        {format(day, dateFormat).substring(0, 3)}
      </div>
    );
    day = new Date(day.setDate(day.getDate() + 1));
  }

  // Generate days in a fixed 6-week grid
  const daysInGrid = eachDayOfInterval({ start: startDate, end: endDate });
  const noteRanges = Object.entries(notesRecord).reduce((acc, [key, value]) => {
    if (!value || value.trim() === '') {
      return acc;
    }

    const rangeMatch = NOTE_KEY_RANGE.exec(key);
    if (rangeMatch) {
      const start = rangeMatch[1];
      const end = rangeMatch[2];
      acc.push(start <= end ? { start, end } : { start: end, end: start });
      return acc;
    }

    const singleMatch = NOTE_KEY_SINGLE.exec(key);
    if (singleMatch) {
      const dayKey = singleMatch[1];
      acc.push({ start: dayKey, end: dayKey });
    }

    return acc;
  }, [] as Array<{ start: string; end: string }>);

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-6 pb-0">
      <div className="grid grid-cols-7 mb-2">
        {days}
      </div>
      <div className="grid grid-cols-7 gap-y-1 sm:gap-y-2 flex-1">
        {daysInGrid.map(d => {
          const formattedDay = format(d, 'yyyy-MM-dd');
          const hasNote = noteRanges.some(range => formattedDay >= range.start && formattedDay <= range.end);
          
          return (
            <DayCell
              key={d.toString()}
              day={d}
              currentMonth={currentMonth}
              selection={selection}
              hoveredDate={hoveredDate}
              themeClasses={themeClasses}
              hasNote={hasNote}
              onSetHoveredDate={onSetHoveredDate}
              onClick={onDateClick}
            />
          );
        })}
      </div>
    </div>
  );
}
