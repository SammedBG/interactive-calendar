"use client";

import { useCalendar } from '../hooks/useCalendar';
import { useNotes } from '../hooks/useNotes';
import { useIndianHolidays } from '../hooks/useIndianHolidays';
import { HeroImage } from './HeroImage';
import { MonthNavigator } from './MonthNavigator';
import { CalendarGrid } from './CalendarGrid';
import { NotesPanel } from './NotesPanel';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';

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

  const isScrollingRef = useRef(false);

  const handleWheel = (e: React.WheelEvent) => {
    if (isScrollingRef.current) return;

    if (e.deltaY > 30) {
      isScrollingRef.current = true;
      handleNext();
      setTimeout(() => { isScrollingRef.current = false; }, 600);
    } else if (e.deltaY < -30) {
      isScrollingRef.current = true;
      handlePrev();
      setTimeout(() => { isScrollingRef.current = false; }, 600);
    }
  };

  const monthIndex = currentMonth.getMonth();
  const themeClasses = MONTH_THEMES[monthIndex];

// Page flip animation variants for the FULL PAGE setup
  const variants = {
    enter: (direction: number) => ({
      rotateX: direction > 0 ? -120 : 120, // Start tilted like turning a page over rings
      z: direction > 0 ? 50 : -50,
      opacity: 0,
      filter: "brightness(0.3) drop-shadow(0px 20px 20px rgba(0,0,0,0.5))",     
    }),
    center: {
      zIndex: 1,
      rotateX: 0,
      z: 0,
      opacity: 1,
      filter: "brightness(1) drop-shadow(0px 0px 0px rgba(0,0,0,0))",
    },
    exit: (direction: number) => ({
      zIndex: 0,
      rotateX: direction < 0 ? -120 : 120,
      z: direction < 0 ? 50 : -50,
      opacity: 0,
      filter: "brightness(0.3) drop-shadow(0px 20px 20px rgba(0,0,0,0.5))",     
    })
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-neutral-100 dark:bg-neutral-950 p-2 sm:p-8 lg:p-12 font-sans overflow-x-hidden overflow-y-auto transition-colors duration-500">

      {/* The shadow base to make the calendar pop off the desk */}
      <div 
        className="calendar-paper relative flex flex-col w-full max-w-[580px] bg-transparent border-transparent rounded-[4px] perspective-[3000px] overflow-visible transition-colors duration-500 mt-6 sm:mt-8 mb-6 sm:mb-8 z-10"
        onWheel={handleWheel}
      >

        {/* Binder / Top Handle - Static Anchor */}
        <div className="absolute -top-4 inset-x-0 h-8 flex justify-center items-start space-x-1.5 sm:space-x-4 z-50 pointer-events-none">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="relative w-2 sm:w-2.5 flex flex-col items-center">
              <div className="w-full h-2.5 bg-neutral-800 dark:bg-black rounded-full shadow-inner" />
              <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-neutral-400 to-neutral-600 dark:from-neutral-600 dark:to-neutral-800 shadow-[0_1px_2px_rgba(0,0,0,0.3)] border border-black/10 -mt-2.5" />
            </div>
          ))}
        </div>

        {/* Sub-bg to maintain book shape while pages are mid-air flipping */}
        <div className="absolute inset-0 bg-white/50 dark:bg-neutral-900/50 rounded-[4px] z-0 shadow-[0_40px_60px_-15px_rgba(0,0,0,0.2)] overflow-hidden" />

        {/* The 3D Grid overlapping container for absolute page layering */}
        <div className="relative grid w-full perspective-[2500px] z-20">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentMonth.toISOString()}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                rotateX: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                z: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.4 },
                filter: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
              }}
              className="col-start-1 row-start-1 w-full bg-white dark:bg-neutral-900 rounded-[4px] origin-top transform-gpu preserve-3d backface-hidden flex flex-col shadow-sm border border-neutral-200/70 dark:border-neutral-800"
            >
              {/* Top half: Hero Image including angular cut */}
              <HeroImage currentMonth={currentMonth} themeClasses={themeClasses} />

              {/* Bottom half: Notes & Calendar Grid */}
              <div className="flex flex-col w-full z-30 relative pt-2 sm:pt-3 pb-6 sm:pb-10 px-3 sm:px-8 lg:px-10 min-h-[460px] sm:min-h-[600px] bg-white dark:bg-neutral-900 transition-colors duration-500">
                <MonthNavigator
                  currentMonth={currentMonth}
                  onNext={handleNext}
                  onPrev={handlePrev}
                  onJumpToMonth={handleJumpToMonth}
                />

                <div className="flex flex-col lg:flex-row w-full pt-3 sm:pt-4">
                  {/* Notes Panel on the left */}
                  <div className="w-full lg:w-[35%] lg:border-r border-solid border-neutral-200 dark:border-neutral-800 pr-0 lg:pr-6 order-2 lg:order-1 mt-5 lg:mt-0">
                    <NotesPanel
                      selection={selection}
                      themeClasses={themeClasses}
                      getNote={getNote}
                      saveNote={saveNote}
                    />
                  </div>

                  {/* Calendar Grid on the right */}
                  <div className="w-full lg:w-[65%] pl-0 lg:pl-6 relative order-1 lg:order-2">
                    <div className="relative min-h-[330px] sm:min-h-[420px]">
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
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
