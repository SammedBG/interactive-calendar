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

// Static image used for all months to match design strictly
const CURRENT_IMAGE_URL = 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop'; // A similar beautiful snow mountain aesthetic

export function HeroImage({ currentMonth, themeClasses, onNext, onPrev }: HeroImageProps) {
  const imageUrl = CURRENT_IMAGE_URL;

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full h-[350px] sm:h-[400px] flex-shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-t-sm z-10">
      <Image
        src={imageUrl}
        alt={`${format(currentMonth, 'MMMM')} hero image`}
        fill
        sizes="(min-width: 768px) 800px, 100vw"
        className="object-cover transition-all duration-1000 ease-in-out"
        priority
      />
      
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/50 to-transparent z-10" />

      {/* Top Navbar */}
      <div className="absolute top-4 right-4 z-20 flex space-x-2">
        <button
          onClick={onPrev}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onNext}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <div className="w-2" />
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          aria-label="Toggle theme"
        >
          {mounted && (theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
        </button>
      </div>

      {/* Flat angular chevron overlay at the bottom */}
      <div className="absolute bottom-0 inset-x-0 z-10 transform translate-y-[1px]">
        {/* Exact Geometric V-shape matches the original physical layout */}
        <svg viewBox="0 0 1440 320" className="w-full text-white dark:text-neutral-900 transition-colors duration-500" preserveAspectRatio="none" style={{ height: '160px' }}>
          {/* Accent colored angled V-band */}
          <path 
            fill="currentColor"
            className={`${themeClasses.text} transition-colors duration-500 ease-in-out`}
            d="M0,96L480,256L1440,64L1440,320L480,320L0,320Z"
          ></path>
          {/* Main White/Dark Background cut-out representing the physical paper page meeting the blue chevron */}
          <path 
            fill="currentColor" 
            d="M0,192L480,320L1440,160L1440,320L0,320Z"
          ></path>
        </svg>

        {/* Text inside the right side of the blue chevron */}
        <div className="absolute bottom-16 right-8 sm:right-16 z-20 text-white text-right">
          <div className="text-xl sm:text-2xl font-light tracking-widest">{format(currentMonth, 'yyyy')}</div>
          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wider">
            {format(currentMonth, 'MMMM')}
          </div>
        </div>
      </div>
    </div>
  );
}
