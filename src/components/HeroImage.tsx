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
      
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/60 to-transparent z-10 mix-blend-multiply" />

      {/* Top Navbar */}
      <div className="absolute top-6 right-6 z-20 flex space-x-3">
        <button
          onClick={onPrev}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:scale-105 active:scale-95"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onNext}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:scale-105 active:scale-95"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <div className="w-2" />
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:scale-105 active:scale-95"
          aria-label="Toggle theme"
        >
          {mounted && (theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
        </button>
      </div>

      {/* Modern angled overlay at the bottom */}
      <div className="absolute bottom-0 inset-x-0 z-10">
        <svg viewBox="0 0 1440 320" className="w-full text-white/90 dark:text-[#111111]/90 transition-colors duration-500 backdrop-blur-lg" preserveAspectRatio="none" style={{ height: '180px' }}>
          {/* Accent colored angled band behind the wave using current class */}
          <path 
            fill="currentColor"
            className={`${themeClasses.text} transition-colors duration-500 ease-in-out opacity-20 dark:opacity-30`}
            d="M0,160L480,256L960,64L1440,224L1440,320L960,320L480,320L0,320Z"
          ></path>
          {/* Main White/Dark Background cut-out representing the bottom page */}
          <path 
            fill="currentColor" 
            d="M0,224L480,288L960,160L1440,256L1440,320L960,320L480,320L0,320Z"
          ></path>
        </svg>

        {/* Text inside the shape */}
        <div className="absolute bottom-6 right-8 sm:right-12 z-20 text-right drop-shadow-sm">
          <div className="text-xl sm:text-2xl font-light tracking-[0.3em] font-sans text-neutral-800 dark:text-neutral-200 uppercase">{format(currentMonth, 'yyyy')}</div>
          <div className="text-3xl sm:text-6xl font-bold uppercase tracking-wider font-sans text-neutral-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400">
            {format(currentMonth, 'MMMM')}
          </div>
        </div>
      </div>
    </div>
  );
}
