import { useReducer, useCallback } from 'react';
import { addMonths, subMonths } from 'date-fns';

export type SelectionState = {
  start: Date | null;
  end: Date | null;
};

export interface CalendarState {
  currentMonth: Date;
  selection: SelectionState;
  hoveredDate: Date | null;
}

type CalendarAction =
  | { type: 'NEXT_MONTH' }
  | { type: 'PREV_MONTH' }
  | { type: 'SET_MONTH_YEAR'; year: number; month: number }
  | { type: 'DATE_CLICK'; date: Date }
  | { type: 'SET_HOVERED_DATE'; date: Date | null };

function calendarReducer(state: CalendarState, action: CalendarAction): CalendarState {
  switch (action.type) {
    case 'NEXT_MONTH':
      return { ...state, currentMonth: addMonths(state.currentMonth, 1) };
    case 'PREV_MONTH':
      return { ...state, currentMonth: subMonths(state.currentMonth, 1) };
    case 'SET_MONTH_YEAR':
      return { ...state, currentMonth: new Date(action.year, action.month, 1) };
    case 'DATE_CLICK': {
      const { date } = action;
      // Third click -> reset to start
      if (state.selection.start && state.selection.end) {
        return { ...state, selection: { start: date, end: null } };
      }
      // First click
      if (!state.selection.start) {
        return { ...state, selection: { start: date, end: null } };
      }
      // Second click (ensure start is before end)
      if (date < state.selection.start) {
        return { ...state, selection: { start: date, end: state.selection.start } };
      }
      return { ...state, selection: { start: state.selection.start, end: date } };
    }
    case 'SET_HOVERED_DATE':
      return { ...state, hoveredDate: action.date };
    default:
      return state;
  }
}

export function useCalendar() {
  const [state, dispatch] = useReducer(calendarReducer, {
    currentMonth: new Date(),
    selection: { start: null, end: null },
    hoveredDate: null,
  });

  const nextMonth = useCallback(() => dispatch({ type: 'NEXT_MONTH' }), []);
  const prevMonth = useCallback(() => dispatch({ type: 'PREV_MONTH' }), []);
  const setMonthYear = useCallback((year: number, month: number) => {
    dispatch({ type: 'SET_MONTH_YEAR', year, month });
  }, []);

  const handleDateClick = useCallback((date: Date) => {
    dispatch({ type: 'DATE_CLICK', date });
  }, []);

  const setHoveredDate = useCallback((date: Date | null) => {
    dispatch({ type: 'SET_HOVERED_DATE', date });
  }, []);

  return {
    currentMonth: state.currentMonth,
    selection: state.selection,
    hoveredDate: state.hoveredDate,
    nextMonth,
    prevMonth,
    setMonthYear,
    handleDateClick,
    setHoveredDate,
  };
}
