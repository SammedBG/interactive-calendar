import { useTheme } from 'next-themes';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, Moon, Sun } from 'lucide-react';
import { useId, useState, useEffect, useRef } from 'react';

export interface MonthNavigatorProps {
  currentMonth: Date;
  onNext: () => void;
  onPrev: () => void;
  onJumpToMonth: (year: number, month: number) => void;
}

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function MonthNavigator({ currentMonth, onNext, onPrev, onJumpToMonth }: MonthNavigatorProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isJumpOpen, setIsJumpOpen] = useState(false);
  const [jumpYear, setJumpYear] = useState(currentMonth.getFullYear());
  const jumpPanelId = useId();
  const transitionTimeoutRef = useRef<number | null>(null);
  const isDarkTheme = mounted && resolvedTheme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setJumpYear(currentMonth.getFullYear());
  }, [currentMonth]);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  const handleThemeToggle = () => {
    if (!mounted) return;

    if (transitionTimeoutRef.current !== null) {
      window.clearTimeout(transitionTimeoutRef.current);
    }

    document.documentElement.classList.add('theme-transitioning');
    transitionTimeoutRef.current = window.setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 420);

    setTheme(isDarkTheme ? 'light' : 'dark');
  };

  return (
    <div className="relative flex flex-col gap-3 pb-4 border-b border-neutral-200/70 dark:border-neutral-800/70">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-neutral-600 dark:text-neutral-300 truncate">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button
          onClick={onPrev}
          className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/70 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-800 dark:text-neutral-100"
          aria-label="Previous month"
          type="button"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onNext}
          className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/70 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-800 dark:text-neutral-100"
          aria-label="Next month"
          type="button"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center justify-end gap-2 flex-wrap">
        <button
          onClick={() => {
            const today = new Date();
            onJumpToMonth(today.getFullYear(), today.getMonth());
          }}
          className="h-10 sm:h-11 px-3 sm:px-4 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/70 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-neutral-600 dark:text-neutral-300"
          type="button"
        >
          Today
        </button>
        <button
          onClick={() => setIsJumpOpen(prev => !prev)}
          className="h-10 sm:h-11 px-3 sm:px-4 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/70 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-neutral-600 dark:text-neutral-300"
          aria-expanded={isJumpOpen}
          aria-controls={jumpPanelId}
          type="button"
        >
          Jump
        </button>
        <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-700" />
        <button
          onClick={handleThemeToggle}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/70 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors dark:text-neutral-300 text-neutral-500 flex items-center justify-center"
          aria-label="Toggle theme"
          type="button"
        >
          {!mounted ? (
            <span className="w-5 h-5" />
          ) : (
            <span className="relative w-5 h-5">
              <Sun className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${isDarkTheme ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'}`} />
              <Moon className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${isDarkTheme ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'}`} />
            </span>
          )}
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
