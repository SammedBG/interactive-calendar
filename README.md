# Interactive Wall Calendar Component 🗓️ ✨

Welcome to the **Premium Interactive Wall Calendar**, a highly polished, interactive web component built specifically for advanced frontend engineering evaluation. It was developed using **Next.js**, **React**, **Tailwind CSS**, and **Framer Motion**.

This project was explicitly engineered to meet strict technical constraints (100% Client-Side, Zero Backend/APIs) while delivering a photorealistic physical aesthetic, complex state management, and buttery-smooth 3D animations to showcase high-end product sense and frontend execution.

## 🚀 Live Demo & Features

### 🎭 1. 3D "Flip" Animations (Framer Motion)
- **True-to-Life Page Flips:** Navigating between months physically "flips" the entire page unit (Hero Image + Calendar Grid + Notes) along the top binder rings, casting realistic drop shadows as the page rotates through 3D space.
- **Optimized Scroll-Wheel Flipping:** Implemented a highly performant onWheel event listener. To prevent React from lagging during rapid scrolling, the scroll-debounce logic runs purely through useRef, completely decoupling the gesture from the render cycle.
- **Cinematic Easing:** Replaced standard spring animations with a bespoke cubic-bezier easing curve ([0.22, 1, 0.36, 1]) to match the physical weight of flipping a thick calendar page.

### 🏗️ 2. Architectural Constraints & State Management
- **Strictly Frontend:** Contains zero backend dependencies or Next.js API routes. All logic, including complex date math and holiday calculations, runs locally on the client.
- **useReducer State Machine:** Refactored the core calendar engine (useCalendar) to use the useReducer pattern. This ensures robust, predictable state transitions when handling overlapping logic like range selections, hover previews, and month jumping.

### 🎨 3. UI/UX & Photorealistic Aesthetic
- **Pixel-Perfect Alignment:** The Notes panel uses custom CSS repeating linear gradients to simulate an exact physical note-pad. The React <textarea> typography (leading-[24px] pt-[2px] text-[13px]) was meticulously calculated to sit directly and seamlessly onto the CSS gradient baselines.
- **Dynamic Theming:** Built a unique theme engine that dynamically switches the calendar's accent colors (rings, tooltips, highlights, and geometric SVG overlays) to match the prominent colors of each month's specific Unsplash hero image. 
- **Responsive Dark/Light Mode:** Full integration with 
ext-themes utilizing a strict class strategy to prevent flashes of unstyled content. The physical calendar intelligently adapts its shadows, paper textures, and typography from a clean bright desk to a deep, elegant dark mode instantly.

### 🇮🇳 4. Dynamic Client-Side Localization (Holidays)
- **In-Browser Compute:** Utilized the date-holidays library alongside React's useMemo to instantly calculate official public Indian holidays directly in the browser based on the active year, entirely bypassing the need for a backend server.
- **Frosted Tooltips:** Hovering over a holiday (or a day with a custom note) triggers a gorgeous ackdrop-blur floating tooltip revealing the specific holiday metadata.

### 📝 5. Context-Aware Notes System
- **Integrated Notes:** The side notes panel watches your active date selection. Selecting Jan 1 vs Jan 1 - Jan 5 creates distinct note saves.
- **Persistent Storage:** Powered by a clean custom hook (useNotes.ts), all notes are instantly saved to localStorage, natively maintaining state across refreshes.

### ♿ 6. Advanced Interactivity
- **Complex Range Logic:** Click dates to create dynamic start and end selection ranges. The UI connects the selected days with beautifully styled, edge-rounded background strips.
- **Hover Previews:** Hovering over a date *before* completing a range selection dynamically paints a preview strip so the user knows exactly what they are about to select.

---

## 🛠️ Tech Stack
- **Framework:** Next.js 14 (App Router - Client Side Only)
- **Language:** TypeScript 
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Date Math:** date-fns & date-holidays
- **Icons:** Lucide React

---

## ⚙️ Setup & Running Locally

1. **Install dependencies:**
   ```
   npm install
   ```

2. **Start the development server:**
   ```
   npm run dev
   ```

3. **View the Project:**
   Open [http://localhost:3000](http://localhost:3000) (or the port specified in terminal) in your browser.

---
*Engineered explicitly to demonstrate high-quality component design, advanced state management (\useReducer\), architectural strictness, and highly refined frontend execution.*
