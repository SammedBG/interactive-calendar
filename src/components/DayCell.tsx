import { format, isSameDay, isSameMonth, isBefore, isAfter } from 'date-fns';
import { SelectionState } from '../hooks/useCalendar';

// 5-6 hardcoded public holiday markers for demo purposes
export const HOLIDAYS: Record<string, string> = {
  '01-01': "New Year's Day",
  '07-04': 'Independence Day',
  '10-31': 'Halloween',
  '12-25': 'Christmas Day',
  '2025-11-27': 'Thanksgiving', // specific date for demo
};

interface DayCellProps {
  day: Date;
  currentMonth: Date;
  selection: SelectionState;
  hoveredDate: Date | null;
  accentColor: string;
  hasNote: boolean;
  onSetHoveredDate: (d: Date | null) => void;
  onClick: (d: Date) => void;
}

export function DayCell({
  day,
  currentMonth,
  selection,
  hoveredDate,
  accentColor,
  hasNote,
  onSetHoveredDate,
  onClick,
}: DayCellProps) {
  const isToday = isSameDay(day, new Date());
  const isSelectedStart = selection.start ? isSameDay(day, selection.start) : false;
  const isSelectedEnd = selection.end ? isSameDay(day, selection.end) : false;
  
  // Calculate if the day is strictly within the selected range
  const isWithinSelection = selection.start && selection.end 
    ? (isAfter(day, selection.start) && isBefore(day, selection.end))
    : false;
    
  // Calculate hover preview: if we have a start but no end, and we're hovering a date after start
  const isHoverPreview = selection.start && !selection.end && hoveredDate 
    ? (isAfter(day, selection.start) && isBefore(day, hoveredDate)) || (isAfter(hoveredDate, selection.start) && isSameDay(day, hoveredDate))
    : false;

  const isCurrentMonth = isSameMonth(day, currentMonth);

  // Check for holiday string matching MM-dd or yyyy-MM-dd
  const holiday = HOLIDAYS[format(day, 'MM-dd')] || HOLIDAYS[format(day, 'yyyy-MM-dd')];

  // Visual classes computation
  let bgClass = '';
  let textClass = isCurrentMonth ? 'text-neutral-800 dark:text-neutral-100' : 'text-neutral-300 dark:text-neutral-600';
  let zIndex = 'z-0';
  let clipClass = '';

  if (isSelectedStart || isSelectedEnd) {
    textClass = 'text-white font-bold';
    zIndex = 'z-20';
  } else if (isWithinSelection || isHoverPreview) {
    textClass = isCurrentMonth ? 'text-neutral-800 dark:text-neutral-100' : 'text-neutral-500 dark:text-neutral-500';
    zIndex = 'z-10';
  } else if (isToday) {
    textClass = 'text-rose-600 dark:text-rose-400 font-bold';
  }

  // Calculate rounded corners for the continuous strip
  if (isWithinSelection || isHoverPreview) {
    bgClass = 'bg-opacity-20';
    if (day.getDay() === 0) clipClass = 'rounded-l-lg'; // Sunday
    if (day.getDay() === 6) clipClass = 'rounded-r-lg'; // Saturday
  }

  // When hover preview starts and we hover the actual start date, the start circle should show strip correctly
  const showRightStrip = (isSelectedStart && (selection.end || (hoveredDate && selection.start && isAfter(hoveredDate, selection.start)))) && day.getDay() !== 6;
  const showLeftStrip = (isSelectedEnd || (isSelectedStart && !selection.end && hoveredDate && isSameDay(hoveredDate, day))) && day.getDay() !== 0 && selection.start && isBefore(selection.start, day);

  return (
    <div 
      className={`relative h-16 sm:h-24 flex flex-col items-center justify-start py-1 sm:py-2 cursor-pointer transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 ${clipClass}`}
      onMouseEnter={() => onSetHoveredDate(day)}
      onMouseLeave={() => onSetHoveredDate(null)}
      onClick={() => onClick(day)}
    >
      {/* Selection Strip Background */}
      {(isWithinSelection || isHoverPreview || showRightStrip || showLeftStrip) && (
        <div 
          className={`absolute inset-y-1 sm:inset-y-2 opacity-10 dark:opacity-20 transition-all`}
          style={{ 
            backgroundColor: accentColor,
            left: showLeftStrip || isWithinSelection || isHoverPreview ? '0' : '50%',
            right: showRightStrip || isWithinSelection || isHoverPreview ? '0' : '50%',
            borderRadius: isHoverPreview && isSameDay(day, hoveredDate!) ? '0 9999px 9999px 0' : '0'
          }}
        />
      )}

      {/* Day Circle / Highlight */}
      <div 
        className={`relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all ${textClass} ${zIndex}`}
        style={{
          backgroundColor: (isSelectedStart || isSelectedEnd) ? accentColor : undefined,
          boxShadow: (isSelectedStart || isSelectedEnd) ? `0 4px 12px ${accentColor}40` : undefined,
        }}
      >
        {isToday && !isSelectedStart && !isSelectedEnd && (
          <div className="absolute inset-0 border-2 border-rose-500 rounded-full" />
        )}
        {format(day, 'd')}
      </div>

      {hasNote && (
        <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
      )}

      {holiday && isCurrentMonth && (
        <div className="absolute bottom-1 px-1 left-0 right-0 text-center text-[10px] sm:text-xs text-neutral-400 dark:text-neutral-500 truncate leading-tight">
          {holiday}
        </div>
      )}
    </div>
  );
}
