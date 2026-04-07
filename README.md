# Interactive Wall Calendar

A polished, fully interactive physical-style wall calendar component built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Side-by-side Layout:** A classic structure featuring a beautiful Hero Image on the left (40%) and Calendar logic on the right (60%). On mobile, it smartly stacks vertically.
- **Dynamic Theming:** Smooth transitions across months with unique seasonal colors tied strictly to Tailwind classes (e.g. Blue in Jan, Pink in Feb, etc).
- **Date Range Selection:** 
  - Click once to set Start date.
  - Click again to set End date.
  - Highlighted continuous ranges across the calendar grid.
  - Reset dynamically with a third click.
  - Hover states intelligently preview the range selection.
- **Contextual Notepad:** Notes component uniquely hooks into your selected range, keeping independent states based on your selection (localStorage persisting).
- **Smooth Animations:** Integrated `framer-motion` sliding animations to jump seamlessly between months.
- **Dark & Light Mode:** Flawless Next-themes integration wrapped elegantly into a Tailwind configuration.

## Technologies Used

- **Next.js 14:** Core App Router framework.
- **TypeScript:** Fully strict type-safety across components and hooks.
- **Tailwind CSS:** Comprehensive styling and responsive UI without single inline styles or external stylesheets.
- **Date-fns:** Heavy-lifting date mathematics.
- **Framer Motion:** High-performance hardware-accelerated gestures and animations.
- **Lucide React:** Beautiful UI iconography.

## Tech Choices

- **Next.js 14 (App Router):** Modern routing, fast dev server, and production-ready build pipeline.
- **TypeScript:** Strong typing across components and hooks for reliability and refactor safety.
- **Tailwind CSS:** Utility-first styling for rapid iteration and consistent, responsive UI.
- **Date-fns:** Lightweight, immutable date utilities for calendar math.
- **Framer Motion:** Smooth, high-performance month transition animations.
- **Next-themes:** Simple, robust dark/light mode support.
- **Lucide React:** Clean, consistent icon set for navigation controls.

## Getting Started

1. Clone or clone the repository to your local machine.
2. Ensure you have Node.js loaded. Run `npm install` to download dependencies:
```bash
npm install
```
3. Boot up the local Next.js development server:
```bash
npm run dev
```
4. Navigate your browser to `http://localhost:3000`.

## Live Demo
*[Link coming soon - add a Vercel or modern PaaS deployment URL here]*
