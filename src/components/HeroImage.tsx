"use client";

import Image from 'next/image';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { ThemeClasses } from './CalendarLayout';

export interface HeroImageProps {
  currentMonth: Date;
  themeClasses: ThemeClasses;
}

const MONTH_IMAGES = [
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1549488344-c6e7a25a4c51?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1490750967868-88cb44cb2722?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1444044205806-38f32ac628f5?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544261453-24151fb4ad0c?q=80&w=1400&auto=format&fit=crop',
];

const FALLBACK_IMAGE = '/images/calendar-fallback.svg';

export function HeroImage({ currentMonth, themeClasses }: HeroImageProps) {
  const monthIndex = currentMonth.getMonth();
  const monthLabel = format(currentMonth, 'MMMM');
  const yearLabel = format(currentMonth, 'yyyy');
  const imageUrl = MONTH_IMAGES[monthIndex];
  const [activeImage, setActiveImage] = useState(imageUrl);

  useEffect(() => {
    setActiveImage(imageUrl);
  }, [imageUrl]);

  useEffect(() => {
    // Preload all hero images once to avoid blank frames during page flips.
    MONTH_IMAGES.forEach((src) => {
      const preloader = new window.Image();
      preloader.decoding = 'async';
      preloader.src = src;
    });
  }, []);

  return (
    <div className="relative w-full aspect-[5/4] sm:aspect-[4/3] flex-shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-t-[4px] z-10">
      <Image
        src={activeImage}
        alt={`${monthLabel} hero image`}
        fill
        sizes="(min-width: 768px) 800px, 100vw"
        unoptimized
        loading="eager"
        fetchPriority="high"
        className="object-cover transition-all duration-1000 ease-in-out"
        priority
        onError={() => {
          if (activeImage !== FALLBACK_IMAGE) {
            setActiveImage(FALLBACK_IMAGE);
          }
        }}
      />
      
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/50 to-transparent z-10" />

      {/* Flat angular chevron overlay at the bottom */}
      <div className="absolute bottom-0 inset-x-0 z-10 translate-y-[1px] h-[32%] sm:h-[35%]">
        {/* Exact Geometric V-shape matches the original physical layout */}
        <svg viewBox="0 0 1440 320" className="w-full h-full text-white dark:text-neutral-900 transition-colors duration-500" preserveAspectRatio="none">
          {/* Accent colored angled V-band */}
          <path
            fill="currentColor"
            className={`${themeClasses.text} transition-colors duration-500 ease-in-out`}
            d="M0,64L480,224L1440,32L1440,320L480,320L0,320Z"
          ></path>
          {/* Main White/Dark Background cut-out representing the physical paper page meeting the blue chevron */}
          <path
            fill="currentColor"
            d="M0,192L480,320L1440,160L1440,320L0,320Z"
          ></path>
        </svg>

        {/* Text inside the right side of the blue chevron */}
        <div className="absolute bottom-5 sm:bottom-16 lg:bottom-20 right-4 sm:right-12 z-20 text-white text-right drop-shadow-md">
          <div className="text-[9px] sm:text-xs lg:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.35em]">
            {yearLabel}
          </div>
          <div className="text-base sm:text-3xl lg:text-4xl font-bold uppercase tracking-[0.16em] sm:tracking-[0.3em]">
            {monthLabel}
          </div>
        </div>
      </div>
    </div>
  );
}
