import Image from 'next/image';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { ThemeClasses } from './CalendarLayout';

export interface HeroImageProps {
  currentMonth: Date;
  themeClasses: ThemeClasses;
  onNext: () => void;
  onPrev: () => void;
}

const MONTH_IMAGES = [
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop', // Jan
  'https://images.unsplash.com/photo-1422207134147-65fb81f59e38?q=80&w=800&auto=format&fit=crop', // Feb
  'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?q=80&w=800&auto=format&fit=crop', // Mar
  'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?q=80&w=800&auto=format&fit=crop', // Apr
  'https://images.unsplash.com/photo-1490750967868-88cb44cb2722?q=80&w=800&auto=format&fit=crop', // May
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop', // Jun
  'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=800&auto=format&fit=crop', // Jul
  'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?q=80&w=800&auto=format&fit=crop', // Aug
  'https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=800&auto=format&fit=crop', // Sep
  'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=800&auto=format&fit=crop', // Oct
  'https://images.unsplash.com/photo-1444044205806-38f32ac628f5?q=80&w=800&auto=format&fit=crop', // Nov
  'https://images.unsplash.com/photo-1544261453-24151fb4ad0c?q=80&w=800&auto=format&fit=crop', // Dec
];

export function HeroImage({ currentMonth, themeClasses, onNext, onPrev }: HeroImageProps) {
  const monthIndex = currentMonth.getMonth();
  const imageUrl = MONTH_IMAGES[monthIndex];

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full h-[350px] sm:h-[400px] flex-shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-t-sm z-10 transition-colors duration-500">
      <Image
        src={imageUrl}
        alt={`${format(currentMonth, 'MMMM')} hero image`}
        fill
        sizes="(min-width: 768px) 800px, 100vw"
        className="object-cover transition-all duration-1000 ease-in-out"
        priority
      />

      {/* Top Right Theme Toggle (like the physical pill block in image) */}
      <div className="absolute top-4 right-4 z-20 flex bg-white/90 backdrop-blur rounded-full p-1 border border-neutral-200">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-neutral-200 text-neutral-800 transition-colors"
          aria-label="Toggle theme"
        >
          {mounted && (theme === 'dark' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />)}
        </button>
        <div className="w-6 h-6 flex items-center justify-center">
          <div className="w-3.5 h-3.5 rounded-full bg-[#3ec0ff]" />
        </div>
        <div className="w-6 h-6 flex items-center justify-center">
          <div className="w-3.5 h-3.5 rounded-full bg-[#1b2a47]" />
        </div>
      </div>

      {/* Flat angular chevron overlay precisely matching reference mountain cutout */}
      <div className="absolute bottom-0 inset-x-0 z-10 transform translate-y-[1px]">
        <svg viewBox="0 0 1440 320" className="w-full text-white dark:text-neutral-900 transition-colors duration-500" preserveAspectRatio="none" style={{ height: '140px' }}>
          {/* Main Blue Mountain/Chevron shape */}
          <path 
            fill="currentColor"
            className={`${themeClasses.text} transition-colors duration-500 ease-in-out`}
            d="M0,220 L400,300 L650,200 L950,280 L1440,100 L1440,320 L0,320 Z"
          ></path>
          {/* Main White/Dark Background bottom line (meets the physical paper perfectly below the blue shape) */}
          <path 
            fill="currentColor" 
            d="M0,290 L400,320 L650,270 L950,320 L1440,240 L1440,320 L0,320 Z"
          ></path>
        </svg>

        {/* Text inside the right side of the blue chevron */}
        <div className="absolute bottom-[70px] right-8 sm:right-16 z-20 text-white text-right flex flex-col items-end">
          <div className="text-xl sm:text-2xl tracking-widest font-bold opacity-90">{format(currentMonth, 'yyyy')}</div>
          <div className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-wide leading-none mt-1">
            {format(currentMonth, 'MMMM')}
          </div>
          
          {/* Calendar Navigation Buttons matching Image precisely */}
          <div className="flex space-x-1.5 mt-3">
            <button
              onClick={onPrev}
              className="w-6 h-6 flex items-center justify-center border border-white/80 rounded-[2px] hover:bg-white/20 transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-white" />
            </button>
            <button
              onClick={onNext}
              className="w-6 h-6 flex items-center justify-center border border-white/80 rounded-[2px] hover:bg-white/20 transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
