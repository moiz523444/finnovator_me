# Finnovator Website

React + Vite build of the Finnovator homepage Figma design.

## Run

```bash
npm install
npm run dev      # local development  -> http://localhost:5173
npm run build    # production build   -> dist/
npm run preview  # preview the build
```

## Structure

- `src/components/`: one component per section (Hero, Services, Audience, WhyWeExist, Partners, Roadmap, CaseStudies, Insights, Faq, ContactFooter)
- `src/styles/global.css`: all styles. Desktop sizes come straight from Figma: 1rem = 10 design px on the 1920px frame, scaled to the screen width by a script in `index.html`.
- `src/assets/`: images and icons exported from Figma

## Fonts

- **General Sans** (headings): loaded from Fontshare
- **Montserrat** (buttons and nav): loaded from Google Fonts
- **Degular Display** (body text) is a commercial font. Until you buy it, a tuned free font (Inter Tight) stands in for it. After you buy it:
  1. Put `DegularDisplay-Regular.woff2` and `DegularDisplay-Bold.woff2` in `public/fonts/`.
  2. In `src/styles/global.css`, set `--ls-body: 0` and change `font-weight: 350` back to `400` (in `body` and `.text`).

## To do

- The contact form and newsletter don't send anything yet. Connect them in `onSubmit` in `ContactFooter.jsx`.
- FAQ answers 2–6 are placeholder text, because Figma only has the first answer.
- Social and review links are `#` for now.
