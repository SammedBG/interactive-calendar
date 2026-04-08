# Premium Interactive Wall Calendar 🗓️ ✨

Welcome to the **Premium Interactive Wall Calendar**, a highly polished, interactive web component built with **Next.js**, **React**, **Tailwind CSS**, and **Framer Motion**. 

This project was built from the ground up to match a strict physical calendar aesthetic while introducing modern web interactions, dynamic localization, and stunning 3D animations designed to showcase high-end product sense and frontend technical execution.

## 🚀 Live Demo & Features

### 🎨 1. Photorealistic Physical Aesthetic
- **Pixel-Perfect Reference Match:** The layout perfectly mimics a real-world wall/desk calendar. The hero photograph sits on top, anchored by metal binder rings, and smoothly transitions into the functional calendar body via an accent-colored geometric chevron.
- **Dynamic Theming:** Built a unique theme engine (`MONTH_THEMES`) that dynamically switches the calendar's accent colors (rings, tooltips, highlights, and geometric SVG overlays) to match the prominent colors of each month's specific hero image. 
- **Textured UI:** Implemented custom CSS gradients (`globals.css`) to generate a realistic "lined notebook paper" texture for the Notes panel.

### 🎭 2. 3D "Flip" Animations (Framer Motion)
- **True-to-Life Page Flips:** Replaced standard dull transitions with a rigid `rotateX` 3D page flip. Navigating between months physically "flips" the entire page unit (Hero Image + Calendar Grid + Notes) along the top binder rings, casting realistic drop shadows as the page rotates through 3D space (`preserve-3d`, `origin-top`).

### 📅 3. Advanced Date & Range Selection
- **Complex Range Logic:** Click dates to create dynamic start and end selection ranges. The UI connects the selected days with beautifully styled, edge-rounded background strips depending on the start/end/weekend bounds.
- **Hover Previews:** Hovering over a date *before* completing a range selection dynamically paints a preview strip so the user knows exactly what they are about to select.

### 📝 4. Context-Aware Notes System
- **Integrated Notes:** The side notes panel is not static. It watches your active date selection. Selecting `Jan 1` vs `Jan 1 - Jan 5` creates distinct note saves.
- **Persistent Storage:** Powered by a clean custom hook (`useNotes.ts`), all notes are bound to their specific date/range arrays and instantly saved to `localStorage`, maintaining state across refreshes.
- **Visual Note Markers:** Days with saved notes display a discreet dot indicator. 

### 🇮🇳 5. Dynamic Indian Holidays Integration
- **Live API Routing:** Instead of hard-coding dates, constructed a custom Next.js API Route (`app/api/holidays/route.ts`) utilizing the `date-holidays` package to automatically fetch official public Indian holidays dynamically based on the current active year.
- **Frosted Tooltips:** Hovering over a holiday (or a day with a note) triggers a gorgeous `backdrop-blur` floating tooltip revealing the specific holiday name or a preview of your written note.

### ♿ 6. Accessibility & UX Enhancements
- **Keyboard Navigation:** The grid is fully navigable via Keyboard Arrow keys, Space, and Enter, utilizing roving `tabIndex` states. 
- **Quick Jump Panel:** Included a rapid month/year jump selector panel in the navigation header so users don't have to click "next" 12 times to reach next year. Included a new "Today" button for instant resets.
- **Responsive Dark/Light Mode:** Full integration with `next-themes`. The physical calendar intelligently adapts its shadows, paper textures, and typography from a clean bright desk to a deep, elegant dark mode instantly.

---

## 🛠️ Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Date Math:** `date-fns` & `date-holidays`
- **Icons:** Lucide React

---

## ⚙️ Setup & Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **View the Project:**
   Open [http://localhost:3000](http://localhost:3000) (or the port specified in terminal) in your browser.

---
*Crafted to demonstrate high-quality component design, state management, and creative frontend engineering.*
