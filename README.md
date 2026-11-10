# Janani Pradhaban — Biography Portfolio Website

A front-end only, dignified biography portfolio web application for **Janani Pradhaban**, Bharatanatyam dancer, teacher, liver transplant recipient, and organ-donation awareness advocate.

Built with **React 18**, **Vite**, **Framer Motion**, **React Router** (HashRouter for static hosting), and **Lucide React**.

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Start local development server
```bash
npm run dev
```
Open your browser at the local URL shown (typically `http://localhost:5173/`).

### 3. Build for production
```bash
npm run build
```
The compiled, optimized static assets are placed in the `dist/` directory.

### 4. Preview the production build locally
```bash
npm run preview
```

---

## 📝 How to Edit Content

All copy on this site is driven by a **single source of truth**:
- **Website Copy & Data**: `src/content/content.json`
- **Long-form Autobiography**: `src/content/full-story.md`
- **Awareness Speech**: `src/content/awareness-speech.md`
- **Volunteer Statement**: `src/content/volunteer-statement.md`

### To update text:
Edit the corresponding fields in `src/content/content.json`. Changes will instantly reflect via Vite's Hot Module Replacement (HMR).

### To add contact details:
In `src/content/content.json`, replace `null` with actual links or text in the `collaborate.contact` block:
```json
"contact": {
  "email": "janani@example.com",
  "phone": "+91 98765 43210",
  "instagram": "janani_dance",
  "youtube": "https://youtube.com/@janani",
  "facebook": null,
  "location": "Chennai, Tamil Nadu, India"
}
```

### To add or update photos:
1. Place image files in `public/images/`.
2. Reference the filenames in `src/content/content.json` (under `heroImage`, `image`, or in the `gallery.items` array).

---

## 🌐 Deployment Instructions

Since this is a 100% static front-end website with Hash routing (`#/story`, `#/speech`, `#/volunteer`), it can be hosted on any static host.

### Netlify
1. Connect your repository to Netlify or drag-and-drop the `dist/` folder into Netlify Drop.
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel
1. Import the project into Vercel.
2. Framework Preset: **Vite**
3. Build command: `npm run build`
4. Output directory: `dist`

### GitHub Pages
1. In `vite.config.js`, the base path is already set to `base: './'`.
2. Build the project:
   ```bash
   npm run build
   ```
3. Push the contents of the `dist/` directory to your `gh-pages` branch, or configure GitHub Actions to deploy the `dist` folder.

---

## 🎨 Design System & Accessibility

- **Theme Palette**:
  - Ink (`#17110F`) & Deep Plum (`#52364A`) for contemplative, sacred dark sections.
  - Ivory (`#F6EFE0`) & Sand (`#E3D5B5`) for high-contrast light sections.
  - Antique Gold (`#C9A25E`) & Kumkum Red (`#9B2D26`) for sacred accents.
- **Typography**: Cormorant Garamond / Playfair Display (classical Indian temple aesthetic) + Inter (clean readability).
- **Accessibility**: Semantic HTML5 landmarks, WCAG AA contrast ratio, full keyboard navigation for the modal lightbox (Escape to close, Left/Right arrows to browse), skip link for screen readers, and `prefers-reduced-motion` compliance.
