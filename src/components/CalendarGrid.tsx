import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format } from 'date-fns';
import { DayCell } from './DayCell';
import { SelectionState } from '../hooks/useCalendar';

interface CalendarGridProps {
  currentMonth: Date;
  selection: SelectionState;
  hoveredDate: Date | null;
  accentColor: string;
  notesRecord: Record<string, string>;
  onSetHoveredDate: (d: Date | null) => void;
  onDateClick: (d: Date) => void;
}

export function CalendarGrid({
  currentMonth,
  selection,
  hoveredDate,
  accentColor,
  notesRecord,
  onSetHoveredDate,
  onDateClick,
}: CalendarGridProps) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const dateFormat = "E";
  const days = [];
  let day = startDate;

  // Add Day Headers (Sun-Sat)
  for (let i = 0; i < 7; i++) {
    days.push(
      <div key={i} className="text-center font-medium text-sm text-neutral-400 dark:text-neutral-500 py-3 uppercase tracking-wider">
        {format(day, dateFormat).substring(0, 3)}
      </div>
    );
    day = new Date(day.setDate(day.getDate() + 1));
  }

  // Generate days in the grid
  const daysInGrid = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-6 pb-0">
      <div className="grid grid-cols-7 mb-2">
        {days}
      </div>
      <div className="grid grid-cols-7 gap-y-1 sm:gap-y-2 flex-1">
        {daysInGrid.map(d => {
          // Check if this day has a note specifically for it or a range spanning it
          const formattedDay = format(d, 'yyyy-MM-dd');
          // Complex note checking could be done, but for simplicity, we check if there's any note key containing this date
          const hasNote = Object.keys(notesRecord).some(key => key.includes(formattedDay));
          
          return (
            <DayCell
              key={d.toString()}
              day={d}
              currentMonth={currentMonth}
              selection={selection}
              hoveredDate={hoveredDate}
              accentColor={accentColor}
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
