import { useTheme } from 'next-themes';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, Moon, Sun } from 'lucide-react';
import { useId, useState, useEffect } from 'react';

export interface MonthNavigatorProps {
  currentMonth: Date;
  onNext: () => void;
  onPrev: () => void;
  onJumpToMonth: (year: number, month: number) => void;
}

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function MonthNavigator({ currentMonth, onNext, onPrev, onJumpToMonth }: MonthNavigatorProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isJumpOpen, setIsJumpOpen] = useState(false);
  const [jumpYear, setJumpYear] = useState(currentMonth.getFullYear());
  const jumpPanelId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setJumpYear(currentMonth.getFullYear());
  }, [currentMonth]);

  return (
    <div className="relative flex items-center justify-end gap-2 pb-4 border-b border-neutral-200/70 dark:border-neutral-800/70">
      <h2 className="sr-only">{format(currentMonth, 'MMMM yyyy')}</h2>
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          className="w-11 h-11 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/70 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-800 dark:text-neutral-100"
          aria-label="Previous month"
          type="button"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onNext}
          className="w-11 h-11 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/70 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-800 dark:text-neutral-100"
          aria-label="Next month"
          type="button"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <button
          onClick={() => setIsJumpOpen(prev => !prev)}
          className="h-11 px-4 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/70 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-[11px] font-semibold uppercase tracking-[0.3em] text-neutral-600 dark:text-neutral-300"
          aria-expanded={isJumpOpen}
          aria-controls={jumpPanelId}
          type="button"
        >
          Jump
        </button>
        <div className="hidden sm:block w-px h-6 bg-neutral-200 dark:bg-neutral-700" />
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="w-11 h-11 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/70 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors dark:text-neutral-300 text-neutral-500 flex items-center justify-center"
          aria-label="Toggle theme"
          type="button"
        >
          {mounted && (theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
        </button>
      </div>
      {isJumpOpen && (
        <div
          id={jumpPanelId}
          className="absolute right-0 top-full mt-3 w-[260px] rounded-sm border border-neutral-200/70 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-[0_12px_30px_rgba(0,0,0,0.18)] p-3 z-40"
          role="dialog"
          aria-label="Jump to month"
        >
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setJumpYear(prev => prev - 1)}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="Previous year"
              type="button"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold tracking-[0.3em] text-neutral-600 dark:text-neutral-300">
              {jumpYear}
            </span>
            <button
              onClick={() => setJumpYear(prev => prev + 1)}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="Next year"
              type="button"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {MONTH_LABELS.map((label, index) => {
              const isActive = currentMonth.getFullYear() === jumpYear && currentMonth.getMonth() === index;
              return (
                <button
                  key={label}
                  onClick={() => {
                    onJumpToMonth(jumpYear, index);
                    setIsJumpOpen(false);
                  }}
                  className={`rounded-sm border px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] transition-colors ${
                    isActive
                      ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                  type="button"
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
