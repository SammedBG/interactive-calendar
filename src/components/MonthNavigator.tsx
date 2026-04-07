import { useTheme } from 'next-themes';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, Moon, Sun } from 'lucide-react';

interface MonthNavigatorProps {
  currentMonth: Date;
  onNext: () => void;
  onPrev: () => void;
  accentColor: string;
}

export function MonthNavigator({ currentMonth, onNext, onPrev, accentColor }: MonthNavigatorProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center justify-between p-4 sm:p-6 border-b dark:border-neutral-800">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold dark:text-white" style={{ color: theme === 'dark' ? 'white' : accentColor, transition: 'color 0.3s ease' }}>
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex items-center gap-1">
          <button
            onClick={onPrev}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors dark:text-white"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onNext}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors dark:text-white"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors dark:text-neutral-400"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
