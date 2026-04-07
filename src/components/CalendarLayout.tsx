"use client";

import { useCalendar } from '../hooks/useCalendar';
import { useNotes } from '../hooks/useNotes';
import { HeroImage } from './HeroImage';
import { CalendarGrid } from './CalendarGrid';
import { NotesPanel } from './NotesPanel';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export type ThemeClasses = { bg: string; text: string; ring: string; shadow: string; border: string; bgOpacity: string; };

export const MONTH_THEMES: Record<number, ThemeClasses> = {
  0: { bg: 'bg-blue-500', text: 'text-blue-500', ring: 'focus:ring-blue-500', shadow: 'shadow-[0_4px_12px_rgba(59,130,246,0.4)]', border: 'border-blue-500', bgOpacity: 'bg-blue-500/20' },
  1: { bg: 'bg-pink-500', text: 'text-pink-500', ring: 'focus:ring-pink-500', shadow: 'shadow-[0_4px_12px_rgba(236,72,153,0.4)]', border: 'border-pink-500', bgOpacity: 'bg-pink-500/20' },
  2: { bg: 'bg-green-500', text: 'text-green-500', ring: 'focus:ring-green-500', shadow: 'shadow-[0_4px_12px_rgba(34,197,94,0.4)]', border: 'border-green-500', bgOpacity: 'bg-green-500/20' },
  3: { bg: 'bg-yellow-500', text: 'text-yellow-500', ring: 'focus:ring-yellow-500', shadow: 'shadow-[0_4px_12px_rgba(234,179,8,0.4)]', border: 'border-yellow-500', bgOpacity: 'bg-yellow-500/20' },
  4: { bg: 'bg-rose-500', text: 'text-rose-500', ring: 'focus:ring-rose-500', shadow: 'shadow-[0_4px_12px_rgba(244,63,94,0.4)]', border: 'border-rose-500', bgOpacity: 'bg-rose-500/20' },
  5: { bg: 'bg-orange-500', text: 'text-orange-500', ring: 'focus:ring-orange-500', shadow: 'shadow-[0_4px_12px_rgba(249,115,22,0.4)]', border: 'border-orange-500', bgOpacity: 'bg-orange-500/20' },
  6: { bg: 'bg-teal-500', text: 'text-teal-500', ring: 'focus:ring-teal-500', shadow: 'shadow-[0_4px_12px_rgba(20,184,166,0.4)]', border: 'border-teal-500', bgOpacity: 'bg-teal-500/20' },
  7: { bg: 'bg-amber-500', text: 'text-amber-500', ring: 'focus:ring-amber-500', shadow: 'shadow-[0_4px_12px_rgba(245,158,11,0.4)]', border: 'border-amber-500', bgOpacity: 'bg-amber-500/20' },
  8: { bg: 'bg-indigo-500', text: 'text-indigo-500', ring: 'focus:ring-indigo-500', shadow: 'shadow-[0_4px_12px_rgba(99,102,241,0.4)]', border: 'border-indigo-500', bgOpacity: 'bg-indigo-500/20' },
  9: { bg: 'bg-orange-600', text: 'text-orange-600', ring: 'focus:ring-orange-600', shadow: 'shadow-[0_4px_12px_rgba(234,88,12,0.4)]', border: 'border-orange-600', bgOpacity: 'bg-orange-600/20' },
  10: { bg: 'bg-amber-800', text: 'text-amber-800', ring: 'focus:ring-amber-800', shadow: 'shadow-[0_4px_12px_rgba(146,64,14,0.4)]', border: 'border-amber-800', bgOpacity: 'bg-amber-800/20' },
  11: { bg: 'bg-red-500', text: 'text-red-500', ring: 'focus:ring-red-500', shadow: 'shadow-[0_4px_12px_rgba(239,68,68,0.4)]', border: 'border-red-500', bgOpacity: 'bg-red-500/20' },
};

export function CalendarLayout() {
  const { currentMonth, nextMonth, prevMonth, selection, handleDateClick, hoveredDate, setHoveredDate } = useCalendar();
  const { notesRecord, saveNote, getNote } = useNotes();
  const [direction, setDirection] = useState(0); // 1 = right, -1 = left

  const handleNext = () => {
    setDirection(1);
    nextMonth();
  };

  const handlePrev = () => {
    setDirection(-1);
    prevMonth();
  };

  const monthIndex = currentMonth.getMonth();
  const themeClasses = MONTH_THEMES[monthIndex];

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <div className="flex justify-center items-start min-h-screen relative p-4 sm:p-12 overflow-y-auto">
      
      {/* Dynamic ambient background glow */}
      <div 
        className={`fixed inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none transition-colors duration-1000 ease-in-out ${themeClasses.bg}`}
      />
      <div 
        className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 opacity-20 blur-[120px] pointer-events-none transition-colors duration-1000 ease-in-out ${themeClasses.bg}`}
      />

      <div className="relative flex flex-col w-full max-w-4xl bg-white/90 dark:bg-[#111111]/90 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-white/20 dark:border-neutral-800/50 rounded-2xl overflow-hidden transition-colors duration-500 mt-8 mb-8">
        
        {/* Binder / Top Handle */}
        <div className="absolute top-0 inset-x-0 h-10 flex justify-center items-start space-x-3 sm:space-x-5 z-40 ptr-events-none backdrop-blur-sm bg-gradient-to-b from-black/10 to-transparent pt-1">
          {[...Array(14)].map((_, i) => (
            <div key={i} className="relative w-3 sm:w-4 flex flex-col items-center group perspective-1000">
              {/* Metallic Ring */}
              <div className="w-full h-8 rounded-full bg-gradient-to-b from-neutral-300 via-neutral-100 to-neutral-400 dark:from-neutral-700 dark:via-neutral-500 dark:to-neutral-800 shadow-sm border border-black/5 dark:border-white/5 relative transform-style-3d shadow-inner overflow-hidden">
                 <div className="absolute top-1/2 left-0 right-0 h-px bg-white/50 dark:bg-black/50" />
              </div>
            </div>
          ))}
        </div>

        {/* Top half: Hero Image including wavy shape, title, and navigation */}
        <div className="pt-2">
          <HeroImage 
            currentMonth={currentMonth} 
            themeClasses={themeClasses} 
            onNext={handleNext} 
            onPrev={handlePrev} 
          />
        </div>

        {/* Bottom half: Notes (Left) & Calendar Grid (Right) */}
        <div className="flex flex-col md:flex-row w-full bg-transparent z-30 relative pt-4 pb-8 px-4 sm:px-8">
          
          {/* Notes Panel on the left */}
          <div className="w-full md:w-[35%] md:border-r border-dashed border-neutral-200/60 dark:border-neutral-800/60 pr-0 md:pr-8 mb-8 md:mb-0">
            <NotesPanel 
              selection={selection} 
              getNote={getNote}
              saveNote={saveNote}
            />
          </div>

          {/* Calendar Grid on the right */}
          <div className="w-full md:w-[65%] pl-0 md:pl-8 relative min-h-[420px]">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentMonth.toISOString()}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 200, damping: 25 },
                  opacity: { duration: 0.3 }
                }}
                className="absolute inset-0 flex flex-col h-full"
              >
                <CalendarGrid 
                  currentMonth={currentMonth}
                  selection={selection}
                  hoveredDate={hoveredDate}
                  themeClasses={themeClasses}
                  notesRecord={notesRecord}
                  onSetHoveredDate={setHoveredDate}
                  onDateClick={handleDateClick}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
