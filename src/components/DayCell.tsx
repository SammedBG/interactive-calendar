import { isSameMonth, isSameDay, isWithinInterval, isAfter, isBefore } from 'date-fns';
import { SelectionState } from '../hooks/useCalendar';
import { ThemeClasses } from './CalendarLayout';

interface DayCellProps {
  day: Date;
  currentMonth: Date;
  selection: SelectionState;
  hoveredDate: Date | null;
  themeClasses: ThemeClasses;
  hasNote: boolean;
  onSetHoveredDate: (d: Date | null) => void;
  onClick: (d: Date) => void;
}

// 5 hardcoded public holidays
const HOLIDAYS: Record<string, string> = {
  '01-01': "New Year's",
  '07-04': "Independence",
  '10-31': "Halloween",
  '11-25': "Thanksgiving",
  '12-25': "Christmas",
};

export function DayCell({
  day,
  currentMonth,
  selection,
  hoveredDate,
  themeClasses,
  hasNote,
  onSetHoveredDate,
  onClick,
}: DayCellProps) {
  const isSelectedStart = selection.start ? isSameDay(day, selection.start) : false;
  const isSelectedEnd = selection.end ? isSameDay(day, selection.end) : false;
  
  const isWithinSelection = selection.start && selection.end
    ? isWithinInterval(day, { start: selection.start, end: selection.end })
    : false;

  const isHoverPreview = (!selection.end && selection.start && hoveredDate)
    ? (isAfter(hoveredDate, selection.start) && isWithinInterval(day, { start: selection.start, end: hoveredDate }))
      || (isBefore(hoveredDate, selection.start) && isWithinInterval(day, { start: hoveredDate, end: selection.start }))
    : false;

  const isCurrentMonth = isSameMonth(day, currentMonth);
  const isToday = isSameDay(day, new Date());
  const isDisabled = !isCurrentMonth;
  
  // Format MM-dd to check for holidays
  const mm_dd = `${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
  const holidayName = HOLIDAYS[mm_dd];

  const isWeekend = day.getDay() === 0 || day.getDay() === 6;

  // Visual classes computation
  let textClass = isWeekend ? themeClasses.text : 'text-neutral-700 dark:text-neutral-300';
  let bgClass = 'bg-transparent';
  let clipClass = '';
  let circleClass = 'bg-transparent';

  if (!isCurrentMonth) {
    textClass = 'text-neutral-300 dark:text-neutral-700'; // greyed out
  } else if (isSelectedStart || isSelectedEnd) {
    textClass = 'text-white font-bold';
    circleClass = themeClasses.bg;
  } else if (isToday) {
    textClass = `${themeClasses.text} font-bold`;
    circleClass = 'border-2 dark:border-current border-current';
  }

  // Rounded corners strip logic (1 for Monday, 0 for Sunday)
  if (isWithinSelection || isHoverPreview) {
    bgClass = themeClasses.bgOpacity;
    if (day.getDay() === 1) clipClass = 'rounded-l-lg'; // Monday
    if (day.getDay() === 0) clipClass = 'rounded-r-lg'; // Sunday
  }

  const showRightStrip = (isSelectedStart && (selection.end || (hoveredDate && selection.start && isAfter(hoveredDate, selection.start)))) && day.getDay() !== 0; // Don't show right strip if it's Sunday
  const showLeftStrip = (isSelectedEnd || (isSelectedStart && !selection.end && hoveredDate && isSameDay(hoveredDate, day))) && day.getDay() !== 1 && selection.start && isBefore(selection.start, day); // Don't show left strip if it's Monday

  const handleMouseEnter = () => {
    if (!isDisabled) {
      onSetHoveredDate(day);
    }
  };

  const handleMouseLeave = () => {
    if (!isDisabled) {
      onSetHoveredDate(null);
    }
  };

  const handleClick = () => {
    if (!isDisabled) {
      onClick(day);
    }
  };

  const containerClass = `relative h-16 sm:h-24 flex flex-col items-center justify-start py-1 sm:py-2 border border-transparent transition-colors ${
    isDisabled
      ? 'cursor-not-allowed opacity-70'
      : 'cursor-pointer hover:border-neutral-200 dark:hover:border-neutral-700'
  } ${clipClass}`;

  return (
    <div
      className={containerClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      aria-disabled={isDisabled}
    >
      {/* Background strip for range selection */}
      {(isWithinSelection || isHoverPreview) && (
        <div className={`absolute inset-0 ${bgClass} z-0 pointer-events-none rounded-sm ${clipClass}`} />
      )}
      
      {/* Connecting strips spanning specifically from start/end circles */}
      {showRightStrip && (
        <div className={`absolute top-0 right-0 bottom-0 left-1/2 ${themeClasses.bgOpacity} z-0 pointer-events-none`} />
      )}
      {showLeftStrip && (
        <div className={`absolute top-0 left-0 bottom-0 right-1/2 ${themeClasses.bgOpacity} z-0 pointer-events-none`} />
      )}

      {/* Date Circle */}
      <div className={`relative z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full transition-all ${circleClass}`}>
        <span className={textClass}>
          {day.getDate()}
        </span>
        {/* Note Indicator Dot */}
        {hasNote && !isSelectedStart && !isSelectedEnd && (
          <div className={`absolute -bottom-1 w-1.5 h-1.5 rounded-full ${themeClasses.bg}`} />
        )}
      </div>

      {/* Holiday Label */}
      {holidayName && (
        <span className="relative z-10 mt-1 sm:mt-2 text-[10px] sm:text-xs text-neutral-500 font-medium truncate max-w-[90%] pointer-events-none text-center">
          {holidayName}
        </span>
      )}
    </div>
  );
}
