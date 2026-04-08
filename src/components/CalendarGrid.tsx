import { addDays, eachDayOfInterval, format, isSameDay, isSameMonth, isWithinInterval, startOfMonth, startOfWeek } from 'date-fns';
import { type KeyboardEvent, useEffect, useRef, useState } from 'react';
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
  holidaysMap: Record<string, string>;
  onSetHoveredDate: (d: Date | null) => void;
  onDateClick: (d: Date) => void;
}

export function CalendarGrid({
  currentMonth,
  selection,
  hoveredDate,
  themeClasses,
  notesRecord,
  holidaysMap,
  onSetHoveredDate,
  onDateClick,
}: CalendarGridProps) {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const monthStart = startOfMonth(currentMonth);
  // Start weeks on Monday to match the reference layout
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = addDays(startDate, 41);
  const [focusedDate, setFocusedDate] = useState<Date>(startDate);

  const dateFormat = "E";
  const days = [];
  let day = new Date(startDate);

  const isDateInGrid = (date: Date, start: Date, end: Date) => isWithinInterval(date, { start, end });

  useEffect(() => {
    const today = new Date();
    const nextFocus = selection.start && isDateInGrid(selection.start, startDate, endDate)
      ? selection.start
      : isDateInGrid(today, startDate, endDate)
        ? today
        : startDate;
    setFocusedDate(nextFocus);
  }, [selection.start, startDate, endDate]);

  const focusDate = (date: Date) => {
    const key = format(date, 'yyyy-MM-dd');
    const element = gridRef.current?.querySelector(`[data-date="${key}"]`) as HTMLElement | null;
    if (element) {
      element.focus();
    }
  };

  const handleDayKeyDown = (dayValue: Date) => (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      const next = addDays(dayValue, 1);
      if (isDateInGrid(next, startDate, endDate)) {
        setFocusedDate(next);
        requestAnimationFrame(() => focusDate(next));
      }
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      const next = addDays(dayValue, -1);
      if (isDateInGrid(next, startDate, endDate)) {
        setFocusedDate(next);
        requestAnimationFrame(() => focusDate(next));
      }
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const next = addDays(dayValue, -7);
      if (isDateInGrid(next, startDate, endDate)) {
        setFocusedDate(next);
        requestAnimationFrame(() => focusDate(next));
      }
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const next = addDays(dayValue, 7);
      if (isDateInGrid(next, startDate, endDate)) {
        setFocusedDate(next);
        requestAnimationFrame(() => focusDate(next));
      }
    }
  };

  // Add Day Headers (Mon-Sun)
  for (let i = 0; i < 7; i++) {
    const isWeekend = day.getDay() === 0 || day.getDay() === 6;
    days.push(
      <div key={i} className={`text-center font-extrabold text-[8px] sm:text-[10px] py-2 uppercase tracking-[0.2em] sm:tracking-[0.3em] ${isWeekend ? themeClasses.text : 'text-neutral-700 dark:text-neutral-400'}`}>
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
      acc.push(start <= end ? { start, end, content: value } : { start: end, end: start, content: value });
      return acc;
    }

    const singleMatch = NOTE_KEY_SINGLE.exec(key);
    if (singleMatch) {
      const dayKey = singleMatch[1];
      acc.push({ start: dayKey, end: dayKey, content: value });
    }

    return acc;
  }, [] as Array<{ start: string; end: string; content: string }>);

  return (
    <div className="flex-1 flex flex-col p-2.5 sm:p-5 lg:p-6 pb-0">
      <div className="grid grid-cols-7 mb-2 sm:mb-4">
        {days}
      </div>
      <div
        ref={gridRef}
        role="grid"
        aria-label="Calendar days"
        className="grid grid-cols-7 gap-y-0.5 sm:gap-y-2 flex-1"
      >
        {daysInGrid.map(d => {
          const formattedDay = format(d, 'yyyy-MM-dd');
          const matchingNote = noteRanges.find(range => formattedDay >= range.start && formattedDay <= range.end);
          const holidayName = holidaysMap[formattedDay];
          const isCurrentMonth = isSameMonth(d, monthStart);
          const isFocused = isSameDay(d, focusedDate);
          const isWeekend = d.getDay() === 0 || d.getDay() === 6;
          const labelParts = [format(d, 'EEEE, MMMM d, yyyy')];

          if (holidayName) labelParts.push(holidayName);
          if (matchingNote) labelParts.push('Has note');
          if (isWeekend) labelParts.push('Weekend');
          if (!isCurrentMonth) labelParts.push('Not in current month');
          if (selection.start && isSameDay(d, selection.start)) labelParts.push('Start date');
          if (selection.end && isSameDay(d, selection.end)) labelParts.push('End date');
          if (selection.start && selection.end && isWithinInterval(d, { start: selection.start, end: selection.end })) {
            labelParts.push('In range');
          }
          
          return (
            <DayCell
              key={d.toISOString()}
              day={d}
              currentMonth={currentMonth}
              selection={selection}
              hoveredDate={hoveredDate}
              themeClasses={themeClasses}
              hasNote={!!matchingNote}
              notePreview={matchingNote ? matchingNote.content : undefined}
              holidayName={holidayName}
              tabIndex={isFocused ? 0 : -1}
              dataDate={formattedDay}
              ariaLabel={labelParts.join(', ')}
              onFocus={() => setFocusedDate(d)}
              onKeyDown={handleDayKeyDown(d)}
              onSetHoveredDate={onSetHoveredDate}
              onClick={onDateClick}
            />
          );
        })}
      </div>
    </div>
  );
}
