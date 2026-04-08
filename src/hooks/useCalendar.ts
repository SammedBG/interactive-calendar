import { useState, useCallback } from 'react';
import { addMonths, subMonths } from 'date-fns';

export type SelectionState = {
  start: Date | null;
  end: Date | null;
};

export function useCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selection, setSelection] = useState<SelectionState>({ start: null, end: null });
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const nextMonth = useCallback(() => setCurrentMonth(prev => addMonths(prev, 1)), []);
  const prevMonth = useCallback(() => setCurrentMonth(prev => subMonths(prev, 1)), []);
  const setMonthYear = useCallback((year: number, month: number) => {
    setCurrentMonth(new Date(year, month, 1));
  }, []);

  const handleDateClick = useCallback((date: Date) => {
    setSelection(prev => {
      // Third click -> reset
      if (prev.start && prev.end) {
        return { start: date, end: null };
      }
      // First click
      if (!prev.start) {
        return { start: date, end: null };
      }
      // Second click
      // Ensure start is before end
      if (date < prev.start) {
        return { start: date, end: prev.start };
      }
      return { start: prev.start, end: date };
    });
  }, []);

  return {
    currentMonth,
    nextMonth,
    prevMonth,
    setMonthYear,
    selection,
    handleDateClick,
    hoveredDate,
    setHoveredDate
  };
}
