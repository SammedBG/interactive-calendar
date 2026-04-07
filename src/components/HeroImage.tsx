import { format } from 'date-fns';

interface HeroImageProps {
  currentMonth: Date;
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

export function HeroImage({ currentMonth }: HeroImageProps) {
  const monthIndex = currentMonth.getMonth();
  const imageUrl = MONTH_IMAGES[monthIndex];

  return (
    <div className="relative w-full h-[200px] md:h-full md:w-[40%] flex-shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 to-transparent flex items-end md:items-start md:justify-end flex-col p-6 z-10 text-white">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight drop-shadow-lg">
          {format(currentMonth, 'MMMM')}
        </h1>
        <p className="text-xl md:text-2xl font-light text-white/80 drop-shadow-md">
          {format(currentMonth, 'yyyy')}
        </p>
      </div>
    </div>
  );
}
