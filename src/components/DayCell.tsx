import { isSameMonth, isSameDay, isWithinInterval, isAfter, isBefore } from 'date-fns';
import { SelectionState } from '../hooks/useCalendar';
import { ThemeClasses } from './CalendarLayout';

export interface DayCellProps {
  day: Date;
  currentMonth: Date;
  selection: SelectionState;
  hoveredDate: Date | null;
  themeClasses: ThemeClasses;
  hasNote: boolean;
  notePreview?: string;
  onSetHoveredDate: (date: Date | null) => void;
  onClick: (date: Date) => void;
}

// 6 hardcoded Indian public holidays (fixed dates)
const HOLIDAYS: Record<string, string> = {
  '01-01': "New Year's Day",
  '01-26': "Republic Day",
  '05-01': "Labour Day",
  '08-15': "Independence Day",
  '10-02': "Gandhi Jayanti",
  '12-25': "Christmas",
};

export function DayCell({
  day,
  currentMonth,
  selection,
  hoveredDate,
  themeClasses,
  hasNote,
  notePreview,
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
  let circleClass = 'bg-transparent shadow-none';

  if (!isCurrentMonth) {
    textClass = 'text-neutral-300 dark:text-neutral-700 font-light'; // greyed out
  } else if (isSelectedStart || isSelectedEnd) {
    textClass = `text-white font-bold drop-shadow-md`;
    circleClass = `${themeClasses.bg} shadow-lg ${themeClasses.shadow} scale-105`;
  } else if (isToday) {
    textClass = `${themeClasses.text} font-bold`;
    circleClass = `bg-white dark:bg-neutral-800 border-[2px] border-current shadow-sm ${themeClasses.text}`;
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

  const containerClass = `group relative w-full min-h-[44px] sm:min-h-[52px] flex flex-col items-center justify-start py-1 border border-transparent transition-all duration-300 ${
    isDisabled
      ? 'cursor-not-allowed opacity-40'
      : 'cursor-pointer hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30'
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
        <div className={`absolute inset-0 ${bgClass} ${clipClass} transition-all duration-500`} />
      )}
      
      {/* Connecting strips spanning specifically from start/end circles */}
      {showRightStrip && (
        <div className={`absolute top-0 right-0 bottom-0 left-1/2 ${themeClasses.bgOpacity} z-0 pointer-events-none`} />
      )}
      {showLeftStrip && (
        <div className={`absolute top-0 left-0 bottom-0 right-1/2 ${themeClasses.bgOpacity} z-0 pointer-events-none`} />
      )}
      {/* Date Circle */}
      <div className={`relative z-10 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full transition-all duration-300 ease-out ${circleClass} ${!isDisabled && !isSelectedStart && !isSelectedEnd ? 'group-hover:scale-105' : ''}`}>
        <span className={`${textClass} tracking-tight text-[11px] sm:text-[12px]`}>
          {day.getDate()}
        </span>
        {/* Note Indicator Dot */}
        {hasNote && (
          <div className={`absolute -top-1 -right-1 w-2 h-2 ${themeClasses.bg} rounded-full border-2 border-white dark:border-neutral-900 shadow-sm`} />
        )}
      </div>

      {/* Tooltip for note hover */}
      {hasNote && notePreview && !isDisabled && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100">
          <div className="bg-neutral-900/90 dark:bg-white/90 backdrop-blur text-white dark:text-neutral-900 text-xs px-3 py-2 rounded-lg shadow-xl max-w-[150px] sm:max-w-[200px] truncate">
            {notePreview}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-900/90 dark:border-t-white/90" />
          </div>
        </div>
      )}

      {/* Holiday Text */}
      {holidayName && (
        <span className="relative z-10 mt-1 sm:mt-2 text-[10px] sm:text-xs text-neutral-500 font-medium truncate max-w-[90%] pointer-events-none text-center">
          {holidayName}
        </span>
      )}
    </div>
  );
}
