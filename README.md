# Premium Interactive Wall Calendar

This project is a high-end implementation of an interactive calendar designed to function exactly like a physical wall calendar but enhanced with modern web technologies.

## Creative Choices & Features
- **Strict Visual Fidelity:** We adhere strictly to the reference image. The layout cleanly intersects a solid angular blue graphic block (which dynamically shifts colors based on a pre-defined theme array simulating extraction) to seamlessly connect the hero image to the flat physical calendar body.
- **Micro-Animations (`framer-motion`):** We built a beautiful `rotateX`-based 3D page-flip animation. When the user skips months, the physical paper grid transitions realistically.
- **Note State Management:** LocalStorage is utilized cleanly. Notes are context-aware (tied precisely to either a single date key or an entire range), preserving user state transparently with error boundaries for cross-browser safety.
- **Rich Tooltips:** As an extra "Wow Factor", dates that have a note associated with them display a discreet yellow marker. Hovering over the date pops up a gorgeous tooltip showcasing the note preview.
- **Dark/Light Mode:** Full integration with `next-themes` seamlessly adapts the entire UI into an elegant dark interface, reversing border contrasts, deep backgrounds, and text shades without losing the physical calendar identity.
- **Holiday Indicators:** Built-in hardcoded array of major holidays elegantly populate the calendar grid spaces automatically overlapping the dates.

## Setup & Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) (or `3001` if `3000` is currently blocked) to view the interactive calendar.
