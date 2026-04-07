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
    <div className="flex items-center justify-between p-4 sm:p-6 border-b border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 dark:text-white transition-colors duration-300">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex items-center gap-1">
          <button
            onClick={onPrev}
            className="p-2 flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-800 dark:text-white"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onNext}
            className="p-2 flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-800 dark:text-white"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors dark:text-neutral-400 text-neutral-500 w-9 h-9 flex items-center justify-center"
          aria-label="Toggle theme"
        >
          {mounted && (theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
        </button>
      </div>
    </div>
  );
}
