"use client";

import { useCalendar } from '../hooks/useCalendar';
import { useNotes } from '../hooks/useNotes';
import { HeroImage } from './HeroImage';
import { MonthNavigator } from './MonthNavigator';
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
    <div className="flex justify-center items-center min-h-screen bg-neutral-100 dark:bg-neutral-950 p-4 sm:p-8 font-sans">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white dark:bg-neutral-900 shadow-2xl rounded-2xl overflow-hidden min-h-[600px] border border-neutral-200 dark:border-neutral-800 transition-colors duration-500">
        
        {/* Left side: Hero Image */}
        <HeroImage currentMonth={currentMonth} />

        {/* Right side: Calendar & Interactivity */}
        <div className="flex flex-col w-full md:w-[60%] bg-white dark:bg-neutral-900 transition-colors duration-500">
          
          <MonthNavigator 
            currentMonth={currentMonth} 
            onNext={handleNext} 
            onPrev={handlePrev} 
            accentColor={accentColor} 
          />

          <div className="relative flex-1 overflow-hidden" style={{ minHeight: '380px' }}>
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

          <NotesPanel 
            selection={selection} 
            accentColor={accentColor} 
            getNote={getNote}
            saveNote={saveNote}
          />
        </div>
      </div>
    </div>
  );
}
