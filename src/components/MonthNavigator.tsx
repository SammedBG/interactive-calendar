import { useTheme } from 'next-themes';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

export interface MonthNavigatorProps {
  currentMonth: Date;
  onNext: () => void;
  onPrev: () => void;
}

export function MonthNavigator({ currentMonth, onNext, onPrev }: MonthNavigatorProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex items-center justify-between gap-4 pb-4 border-b border-neutral-200/70 dark:border-neutral-800/70">
      <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-neutral-600 dark:text-neutral-400">
        {format(currentMonth, 'MMMM yyyy')}
      </h2>
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          className="w-11 h-11 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/70 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-800 dark:text-neutral-100"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onNext}
          className="w-11 h-11 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/70 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-800 dark:text-neutral-100"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <div className="hidden sm:block w-px h-6 bg-neutral-200 dark:bg-neutral-700" />
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="w-11 h-11 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/70 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors dark:text-neutral-300 text-neutral-500 flex items-center justify-center"
          aria-label="Toggle theme"
        >
          {mounted && (theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
        </button>
      </div>
    </div>
  );
}
