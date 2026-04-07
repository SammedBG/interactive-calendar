import Image from 'next/image';
import { format } from 'date-fns';
import { ThemeClasses } from './CalendarLayout';

export interface HeroImageProps {
  currentMonth: Date;
  themeClasses: ThemeClasses;
}

const MONTH_IMAGES = [
  'https://images.unsplash.com/photo-1422207134147-65fb81f59e38?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1549488344-c6e7a25a4c51?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1490750967868-88cb44cb2722?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1444044205806-38f32ac628f5?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544261453-24151fb4ad0c?q=80&w=1200&auto=format&fit=crop',
];

export function HeroImage({ currentMonth, themeClasses }: HeroImageProps) {
  const monthIndex = currentMonth.getMonth();
  const imageUrl = MONTH_IMAGES[monthIndex];

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

      {/* Flat angular chevron overlay at the bottom */}
      <div className="absolute bottom-0 inset-x-0 z-10 transform translate-y-[1px]">
        {/* Exact Geometric V-shape matches the original physical layout */}
        <svg viewBox="0 0 1440 320" className="w-full h-40 text-white dark:text-neutral-900 transition-colors duration-500" preserveAspectRatio="none">
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
