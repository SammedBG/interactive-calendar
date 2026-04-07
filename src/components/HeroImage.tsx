import Image from 'next/image';
import { format } from 'date-fns';
import { ThemeClasses } from './CalendarLayout';

export interface HeroImageProps {
  currentMonth: Date;
  themeClasses: ThemeClasses;
}

const HERO_IMAGE_URL = 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1400&auto=format&fit=crop';

export function HeroImage({ currentMonth, themeClasses }: HeroImageProps) {
  const monthLabel = format(currentMonth, 'MMMM');
  const yearLabel = format(currentMonth, 'yyyy');

  return (
    <div className="relative w-full h-[350px] sm:h-[400px] flex-shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-t-sm z-10">
      <Image
        src={HERO_IMAGE_URL}
        alt={`${monthLabel} hero image`}
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
        <div className="absolute bottom-12 right-6 sm:right-12 z-20 text-white text-right">
          <div className="text-xs sm:text-sm font-semibold tracking-[0.35em]">
            {yearLabel}
          </div>
          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-[0.25em]">
            {monthLabel}
          </div>
        </div>
      </div>
    </div>
  );
}
