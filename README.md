# InternConnect — Responsive Internship Listing Board

A beginner-friendly internship discovery interface built with **semantic HTML, responsive CSS, and vanilla JavaScript**. No framework or UI library is used.

## Features

- Responsive layout for mobile, tablet, and desktop
- Reusable internship card rendering from JSON data
- Live keyword search across title, company, domain, and location
- Domain dropdown filter and clear filters action
- Empty-results state and data-loading error state
- Semantic landmarks, skip link, form labels, live result announcements, and visible keyboard focus
- Reduced-motion preference support

## Project structure

```text
internconnect/
├── index.html
├── style.css
├── script.js
├── internships.json
├── README.md
└── screenshots/
    └── preview.png
```

## Run locally

Because the app loads `internships.json` with `fetch()`, run it through a local development server rather than opening `index.html` directly.

### Option 1: VS Code Live Server
1. Open this folder in Visual Studio Code.
2. Install the **Live Server** extension if needed.
3. Right-click `index.html`.
4. Choose **Open with Live Server**.

### Option 2: Python
From this folder, run:

```bash
python -m http.server 5500
```

Then visit `http://localhost:5500`.

## How to use

1. Type a role, company, domain, or location into the search field.
2. Choose a domain from the dropdown.
3. Use **Clear filters** to reset both controls.
4. Try a keyword with no matches to see the empty state.

## Accessibility notes

- The page uses `header`, `nav`, `main`, `section`, and `footer` landmarks.
- A skip link lets keyboard users jump to the listings.
- Every form control has a visible label.
- Search results are announced using `aria-live`.
- Interactive controls have visible `:focus-visible` styling.
- The layout respects `prefers-reduced-motion`.

## Data

`internships.json` contains fictional sample internship records for demonstration. Replace these records with verified opportunities before publishing a real job board.

## Deploy

You can publish this static project using GitHub Pages:
1. Push the project to a **public GitHub repository**.
2. Open repository **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Choose `main` and `/ (root)`, then save.
5. Wait for GitHub Pages to publish the site. Copy the live URL shown in the Pages section.

## Submission checklist

- [ ] Public GitHub repository link works while signed out
- [ ] Deployed preview URL opens on mobile and desktop
- [ ] Search and domain filter work
- [ ] Empty state appears for unmatched searches
- [ ] Error state can be tested by temporarily renaming `internships.json`
- [ ] README includes a screenshot
