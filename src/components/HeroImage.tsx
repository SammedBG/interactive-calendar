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
  'https://images.unsplash.com/photo-1422207134147-65fb81f59e38?q=80&w=800&auto=format&fit=crop', // Jan (Winter snow)
  'https://images.unsplash.com/photo-1549488344-c6e7a25a4c51?q=80&w=800&auto=format&fit=crop', // Feb (Pink/Valentines feel)
  'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?q=80&w=800&auto=format&fit=crop', // Mar (Spring blossom)
  'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?q=80&w=800&auto=format&fit=crop', // Apr (Rain/Dew)
  'https://images.unsplash.com/photo-1490750967868-88cb44cb2722?q=80&w=800&auto=format&fit=crop', // May (Flowers)
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop', // Jun (Beach)
  'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=800&auto=format&fit=crop', // Jul (Sunflowers/Summer)
  'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?q=80&w=800&auto=format&fit=crop', // Aug (Warm sunset)
  'https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=800&auto=format&fit=crop', // Sep (Early autumn)
  'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=800&auto=format&fit=crop', // Oct (Fall foliage/Pumpkins)
  'https://images.unsplash.com/photo-1444044205806-38f32ac628f5?q=80&w=800&auto=format&fit=crop', // Nov (Late autumn/Mist)
  'https://images.unsplash.com/photo-1544261453-24151fb4ad0c?q=80&w=800&auto=format&fit=crop', // Dec (Winter evening)
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
    <div className="relative w-full h-[350px] sm:h-[400px] flex-shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-t-sm z-10">
      <Image
        src={imageUrl}
        alt={`${format(currentMonth, 'MMMM')} hero image`}
        fill
        sizes="(min-width: 768px) 800px, 100vw"
        className="object-cover transition-all duration-1000 ease-in-out"
        priority
      />
      
      {/* Dark gradient overlay for top navbar */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/50 to-transparent z-10" />

      {/* Top Navbar */}
      <div className="absolute top-6 right-6 z-20 flex space-x-2">
        <button
          onClick={onPrev}
          className="p-2 w-11 h-11 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onNext}
          className="p-2 w-11 h-11 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <div className="w-2" />
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md transition-colors w-11 h-11 flex items-center justify-center"
          aria-label="Toggle theme"
        >
          {mounted && (theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
        </button>
      </div>

      {/* Wavy overlay at the bottom */}
      <div className="absolute bottom-0 inset-x-0 z-10 transform translate-y-[2px]">
        {/* SVG Wave/Chevron matching the style of the image */}
        <svg viewBox="0 0 1440 320" className="w-full text-white dark:text-neutral-900 transition-colors duration-500" preserveAspectRatio="none" style={{ height: '140px' }}>
          {/* Accent colored angled band behind the wave using current class */}
          <path 
            fill="currentColor"
            className={`${themeClasses.text} transition-colors duration-500 ease-in-out`}
            d="M0,192L480,288L960,64L1440,256L1440,320L960,320L480,320L0,320Z"
          ></path>
          {/* Main White/Dark Background cut-out representing the bottom page */}
          <path 
            fill="currentColor" 
            d="M0,256L480,320L960,192L1440,288L1440,320L960,320L480,320L0,320Z"
          ></path>
        </svg>

        {/* Text inside the shape */}
        <div className="absolute bottom-6 right-8 sm:right-12 z-20 text-white text-right drop-shadow-md">
          <div className="text-xl sm:text-2xl font-light tracking-widest">{format(currentMonth, 'yyyy')}</div>
          <div className="text-3xl sm:text-5xl font-bold uppercase tracking-wider">{format(currentMonth, 'MMMM')}</div>
        </div>
      </div>
    </div>
  );
}
