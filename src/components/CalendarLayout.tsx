"use client";

import { useCalendar } from '../hooks/useCalendar';
import { useNotes } from '../hooks/useNotes';
import { useIndianHolidays } from '../hooks/useIndianHolidays';
import { HeroImage } from './HeroImage';
import { MonthNavigator } from './MonthNavigator';
import { CalendarGrid } from './CalendarGrid';
import { NotesPanel } from './NotesPanel';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export type ThemeClasses = { bg: string; text: string; ring: string; shadow: string; border: string; bgOpacity: string; };

export const MONTH_THEMES: Record<number, ThemeClasses> = {
  0: { bg: 'bg-[#1b9cfc]', text: 'text-[#1b9cfc]', ring: 'focus-visible:ring-[#1b9cfc]', shadow: 'shadow-[0_6px_14px_rgba(27,156,252,0.35)]', border: 'border-[#1b9cfc]', bgOpacity: 'bg-[#1b9cfc]/12' },
  1: { bg: 'bg-pink-500', text: 'text-pink-500', ring: 'focus-visible:ring-pink-500', shadow: 'shadow-[0_4px_12px_rgba(236,72,153,0.4)]', border: 'border-pink-500', bgOpacity: 'bg-pink-500/20' },
  2: { bg: 'bg-green-500', text: 'text-green-500', ring: 'focus-visible:ring-green-500', shadow: 'shadow-[0_4px_12px_rgba(34,197,94,0.4)]', border: 'border-green-500', bgOpacity: 'bg-green-500/20' },
  3: { bg: 'bg-yellow-500', text: 'text-yellow-500', ring: 'focus-visible:ring-yellow-500', shadow: 'shadow-[0_4px_12px_rgba(234,179,8,0.4)]', border: 'border-yellow-500', bgOpacity: 'bg-yellow-500/20' },
  4: { bg: 'bg-rose-500', text: 'text-rose-500', ring: 'focus-visible:ring-rose-500', shadow: 'shadow-[0_4px_12px_rgba(244,63,94,0.4)]', border: 'border-rose-500', bgOpacity: 'bg-rose-500/20' },
  5: { bg: 'bg-orange-500', text: 'text-orange-500', ring: 'focus-visible:ring-orange-500', shadow: 'shadow-[0_4px_12px_rgba(249,115,22,0.4)]', border: 'border-orange-500', bgOpacity: 'bg-orange-500/20' },
  6: { bg: 'bg-teal-500', text: 'text-teal-500', ring: 'focus-visible:ring-teal-500', shadow: 'shadow-[0_4px_12px_rgba(20,184,166,0.4)]', border: 'border-teal-500', bgOpacity: 'bg-teal-500/20' },
  7: { bg: 'bg-amber-500', text: 'text-amber-500', ring: 'focus-visible:ring-amber-500', shadow: 'shadow-[0_4px_12px_rgba(245,158,11,0.4)]', border: 'border-amber-500', bgOpacity: 'bg-amber-500/20' },
  8: { bg: 'bg-indigo-500', text: 'text-indigo-500', ring: 'focus-visible:ring-indigo-500', shadow: 'shadow-[0_4px_12px_rgba(99,102,241,0.4)]', border: 'border-indigo-500', bgOpacity: 'bg-indigo-500/20' },
  9: { bg: 'bg-orange-600', text: 'text-orange-600', ring: 'focus-visible:ring-orange-600', shadow: 'shadow-[0_4px_12px_rgba(234,88,12,0.4)]', border: 'border-orange-600', bgOpacity: 'bg-orange-600/20' },
  10: { bg: 'bg-amber-800', text: 'text-amber-800', ring: 'focus-visible:ring-amber-800', shadow: 'shadow-[0_4px_12px_rgba(146,64,14,0.4)]', border: 'border-amber-800', bgOpacity: 'bg-amber-800/20' },
  11: { bg: 'bg-red-500', text: 'text-red-500', ring: 'focus-visible:ring-red-500', shadow: 'shadow-[0_4px_12px_rgba(239,68,68,0.4)]', border: 'border-red-500', bgOpacity: 'bg-red-500/20' },
};

export function CalendarLayout() {
  const { currentMonth, nextMonth, prevMonth, setMonthYear, selection, handleDateClick, hoveredDate, setHoveredDate } = useCalendar();
  const { notesRecord, saveNote, getNote } = useNotes();
  const holidaysMap = useIndianHolidays(currentMonth);
  const [direction, setDirection] = useState(0); // 1 = right, -1 = left

  const handleNext = () => {
    setDirection(1);
    nextMonth();
  };

  const handlePrev = () => {
    setDirection(-1);
    prevMonth();
  };

  const handleJumpToMonth = (year: number, month: number) => {
    const target = new Date(year, month, 1);
    setDirection(target > currentMonth ? 1 : -1);
    setMonthYear(year, month);
  };

  const monthIndex = currentMonth.getMonth();
  const themeClasses = MONTH_THEMES[monthIndex];

  // Page flip animation variants
  const variants = {
    enter: (direction: number) => ({
      rotateX: direction > 0 ? -90 : 90,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      rotateX: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      rotateX: direction < 0 ? -90 : 90,
      opacity: 0
    })
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-neutral-100 dark:bg-neutral-950 p-4 sm:p-12 font-sans overflow-y-auto">
      
      <div className="calendar-paper relative flex flex-col w-full max-w-[580px] bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 shadow-[0_40px_60px_-15px_rgba(0,0,0,0.2)] rounded-[4px] overflow-visible transition-colors duration-500 mt-8 mb-8">
        
        {/* Binder / Top Handle */}
        <div className="absolute -top-4 inset-x-0 h-8 flex justify-center items-start space-x-3 sm:space-x-4 z-40">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="relative w-2 sm:w-2.5 flex flex-col items-center">
              {/* Desk hole */}
              <div className="w-full h-2.5 bg-neutral-800 dark:bg-black rounded-full" />
              {/* Metallic Ring */}
              <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-neutral-400 to-neutral-600 dark:from-neutral-600 dark:to-neutral-800 shadow-sm border border-black/10 -mt-2.5" />
            </div>
          ))}
        </div>

        {/* Top half: Hero Image including angular cut */}
        <HeroImage currentMonth={currentMonth} themeClasses={themeClasses} />

        {/* Bottom half: Notes (Left) & Calendar Grid (Right) */}
        <div className="flex flex-col w-full bg-white dark:bg-neutral-900 z-30 relative pt-3 pb-10 px-5 sm:px-10 min-h-[500px] sm:min-h-[600px]">
          <MonthNavigator
            currentMonth={currentMonth}
            onNext={handleNext}
            onPrev={handlePrev}
            onJumpToMonth={handleJumpToMonth}
          />

          <div className="flex flex-col md:flex-row w-full pt-4">
            {/* Notes Panel on the left */}
            <div className="w-full md:w-[35%] md:border-r border-solid border-neutral-200 dark:border-neutral-800 pr-0 md:pr-6 order-2 md:order-1 mt-6 md:mt-0">
              <NotesPanel
                selection={selection}
                themeClasses={themeClasses}
                getNote={getNote}
                saveNote={saveNote}
              />
            </div>

            {/* Calendar Grid on the right */}
            <div className="w-full md:w-[65%] pl-0 md:pl-6 relative order-1 md:order-2">
              <div className="relative min-h-[360px] sm:min-h-[420px] perspective-[1200px]">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={currentMonth.toISOString()}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      rotateX: { type: "spring", stiffness: 140, damping: 20 },
                      opacity: { duration: 0.25 }
                    }}
                    className="absolute inset-0 flex flex-col origin-top transform-gpu"
                  >
                    <CalendarGrid
                      currentMonth={currentMonth}
                      selection={selection}
                      hoveredDate={hoveredDate}
                      themeClasses={themeClasses}
                      notesRecord={notesRecord}
                      holidaysMap={holidaysMap}
                      onSetHoveredDate={setHoveredDate}
                      onDateClick={handleDateClick}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
