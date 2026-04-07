"use client";

import { useCalendar } from '../hooks/useCalendar';
import { useNotes } from '../hooks/useNotes';
import { HeroImage } from './HeroImage';
import { CalendarGrid } from './CalendarGrid';
import { NotesPanel } from './NotesPanel';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const MONTH_COLORS = [
  '#3b82f6', // Jan (blue)
  '#ec4899', // Feb (pink)
  '#22c55e', // Mar (green)
  '#eab308', // Apr (yellow)
  '#f43f5e', // May (rose)
  '#f97316', // Jun (orange)
  '#14b8a6', // Jul (teal)
  '#f59e0b', // Aug (amber)
  '#6366f1', // Sep (indigo)
  '#f97316', // Oct (orange)
  '#a16207', // Nov (brown)
  '#ef4444', // Dec (red)
];

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
  const accentColor = MONTH_COLORS[monthIndex];

  // Animation variants
  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 300 : -300,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 300 : -300,
        opacity: 0
      };
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-200 dark:bg-neutral-950 p-4 sm:p-12 font-sans overflow-y-auto">
      <div className="relative flex flex-col w-full max-w-4xl bg-white dark:bg-neutral-900 shadow-2xl rounded-sm overflow-visible transition-colors duration-500 mt-8">
        
        {/* Spiral Binding */}
        <div className="absolute -top-4 left-0 right-0 h-8 flex justify-center space-x-2 sm:space-x-4 z-40">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="w-2 sm:w-3 flex flex-col items-center">
              <div className="w-full h-3 bg-neutral-800 rounded-full shadow-sm" />
              <div className="w-1.5 h-6 bg-neutral-600 rounded-full -mt-2 shadow-md z-10" />
            </div>
          ))}
        </div>

        {/* Top half: Hero Image including wavy shape, title, and navigation */}
        <HeroImage 
          currentMonth={currentMonth} 
          accentColor={accentColor} 
          onNext={handleNext} 
          onPrev={handlePrev} 
        />

        {/* Bottom half: Notes (Left) & Calendar Grid (Right) */}
        <div className="flex flex-col md:flex-row w-full bg-white dark:bg-neutral-900 transition-colors duration-500 rounded-b-sm z-30 relative pt-4 pb-8 px-4 sm:px-8">
          
          {/* Notes Panel on the left (about 35% width) */}
          <div className="w-full md:w-[35%] border-r-0 md:border-r border-solid border-neutral-200 dark:border-neutral-800 pr-0 md:pr-6 mb-8 md:mb-0">
            <NotesPanel 
              selection={selection} 
              accentColor={accentColor} 
              getNote={getNote}
              saveNote={saveNote}
            />
          </div>

          {/* Calendar Grid on the right (about 2/3 width) */}
          <div className="w-full md:w-[65%] pl-0 md:pl-8 relative min-h-[380px]">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentMonth.toISOString()}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0 flex flex-col h-full"
              >
                <CalendarGrid 
                  currentMonth={currentMonth}
                  selection={selection}
                  hoveredDate={hoveredDate}
                  accentColor={accentColor}
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
