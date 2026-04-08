# Interactive Wall Calendar

A premium, interactive wall calendar UI built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. It recreates a physical calendar feel with a hero photo, binder rings, and a full-page 3D flip when you change months.

## Features
- Full-page 3D flip animation between months, including wheel scroll navigation
- Month-based theme palettes for rings, overlays, and accents
- Range selection with hover previews and connecting strips
- Notes per day or range, stored in localStorage, with dot indicators
- Holiday labels and hover tooltips (public holidays in India via date-holidays)
- Keyboard navigation with arrow keys and Enter/Space to select dates
- Dark/light mode toggle using next-themes
- Responsive layout tuned for mobile and desktop

## Tech stack
- Next.js 14 (App Router)
- React 18, TypeScript
- Tailwind CSS
- Framer Motion
- date-fns, date-holidays
- Lucide React

## Architecture
- State modeled with useReducer in the calendar hook
- Core components: HeroImage, MonthNavigator, CalendarGrid, DayCell, NotesPanel
- Notes persisted in localStorage via a dedicated hook
- Holiday map computed client-side with date-holidays
- Notes paper texture defined in globals.css

## Getting started
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open the app:
   ```
   http://localhost:3000
   ```

## Scripts
- npm run dev
- npm run build
- npm run start
- npm run lint

## Deployment notes
- next.config.mjs sets images.unoptimized = true so remote Unsplash images load on static hosts.
- If you deploy to a full Next.js runtime and want image optimization, set unoptimized to false and ensure /_next/image is supported.
- Hero images are pulled from Unsplash, so network access is required at runtime.

## Customization
- Update MONTH_THEMES in CalendarLayout to change monthly color palettes.
- Swap hero image URLs in HeroImage.
- Adjust notebook line spacing in globals.css.

## Accessibility
- Grid cells expose aria-labels and support keyboard navigation.
- Focus states are visible and theme-aware.
