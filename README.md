# Interactive Wall Calendar

A production-grade interactive calendar built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

This project focuses on frontend engineering quality:
- robust date-range selection behavior
- theme-aware UI with smooth transitions
- responsive layout for mobile, tablet, and desktop
- keyboard accessibility and focus handling
- resilient client-side notes persistence
- graceful image loading with preload and fallback

## Features

### 1. Premium visual design
- Hero image with dynamic monthly branding
- Physical calendar aesthetic (binder rings, paper textures)
- Theme-aware color system per month

### 2. Advanced month navigation
- Previous and next controls
- Jump-to-month panel with year switching
- Mouse wheel and touch swipe month navigation
- Keyboard support (`PageUp` and `PageDown`) on calendar container

### 3. Selection and notes workflow
- Single-day and date-range selection
- Hover preview during incomplete range selection
- Context-aware notes for single dates and date ranges
- Automatic note persistence in `localStorage`
- Cross-tab synchronization via storage events

### 4. Holidays integration
- Indian public holiday lookup using `date-holidays`
- Client-side memoized caching to reduce recomputation
- Holiday and note tooltips on calendar cells

### 5. Accessibility and UX hardening
- Roving focus for grid navigation
- Keyboard activation support on day cells
- Focus-visible rings for interactive elements
- Tooltip visibility on focus, not only hover
- Reduced-motion behavior respected for page transitions

### 6. Reliable image pipeline
- Eager loading for active hero image
- Browser-side preload for monthly hero images
- DNS prefetch and preconnect for image host
- Local fallback image when remote image fails

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- date-fns
- date-holidays
- next-themes
- Lucide React

## Technical Choices & Optimizations

- **Next.js & React 18:** Chosen for server-side capabilities, structured routing, and modern hooks API boundary management (`useClient`).
- **Framer Motion & Adaptive Performance:** Features a dynamic `useLightweightMotion` hook that disables GPU-heavy 3D `rotateX` flips in favor of simple opacity/x-axis slides on low-end devices (detecting `pointer: coarse`, battery-saving modes, or low `navigator.hardwareConcurrency`).
- **Tailwind CSS:** Used for highly maintainable, utility-first styling, including custom `.skeleton-shimmer` utilities for loading states.
- **Image Pipeline & Resiliency:** Monthly background images use `next/image` with eager loading for the current month and preloading *only* for adjacent months to reduce network saturation. We implemented strict HTTP validation to swap out dead Unsplash URLs and ensure 100% asset uptime.
- **Responsive & Accessible Design:** Touch-target expansion, swipe thresholds tailored for mobile, and skeleton structural simplifications ensure the calendar remains buttery smooth across all viewports from 320px up.

## Project Structure

- `src/components`: UI components and interactive layout
- `src/hooks`: state, notes, and holiday hooks
- `src/app`: app shell and global styles
- `public/images`: static assets (fallback hero image)

## Development

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Open:

- http://localhost:3000

## Quality Checks

Run linter:

```bash
npm run lint
```

Run production build:

```bash
npm run build
```

## Deployment Notes

- The app is frontend-first and deployment-friendly.
- Hero images are configured for remote host loading.
- A local fallback image is used if remote assets fail.
- If you deploy to static-like environments, image loading still works with the current setup.
