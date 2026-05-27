# Muhammad Abdullah Ahmad — Personal Portfolio

A clean, modern, dark engineering portfolio website. Built with plain HTML, CSS, and JavaScript — no frameworks, no build tools, ready to deploy anywhere static files are supported.

---

## Project Structure

```
portfolio/
├── index.html      ← All page content and structure
├── style.css       ← All styles, variables, responsive layout
├── script.js       ← Navbar, scroll effects, mobile menu, form
└── README.md       ← This file
```

Everything lives in three files. Easy to understand, easy to edit.

---

## Sections

| # | Section | Description |
|---|---------|-------------|
| 1 | Navbar | Fixed, scrolls, highlights active section, mobile hamburger |
| 2 | Hero | Name, title, intro, buttons, social links, JSON terminal card |
| 3 | About | Bio text + quick-stat cards |
| 4 | Skills | Grouped skill tags — Languages, Technologies, Tools, Spoken |
| 5 | Projects | Cards with tech tags, links, featured project |
| 6 | Experience | Vertical timeline with role details |
| 7 | Education | University + school cards |
| 8 | Leadership | Volunteering card — Glasgow Central Mosque |
| 9 | Contact | Info links + contact form (opens mail client) |

---

## Customisation Guide

### Colours
All colours are CSS variables at the top of `style.css`. Change them in one place:

```css
:root {
  --accent: #5b8dee;       /* main blue — change this to change the whole accent colour */
  --bg:     #0f1117;       /* page background */
  --text:   #e8eaf0;       /* body text */
}
```

### Content
All content is in `index.html`. Each section is clearly labelled with comments like:
```html
<!-- ===================== HERO ===================== -->
```

### Adding a project
Copy an existing `<article class="project-card">` block inside the `.projects-grid` div and edit the text, links, and tech tags.

### CV download
Find this line in `index.html` and update the `href` to your CV file path:
```html
<a href="#" class="btn btn-ghost" download>Download CV</a>
```
Add your CV file (e.g. `cv.pdf`) to the project folder and update to `href="cv.pdf"`.

### Madni Masjid live link
Search for `href="#"` in the featured project card and replace `#` with the actual URL once the site is live.

---

## Deployment

### Option A — GitHub Pages (free, recommended)

1. Create a GitHub repository (e.g. `my-portfolio`)
2. Push all three files:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git remote add origin https://github.com/YOUR_USERNAME/my-portfolio.git
   git push -u origin main
   ```
3. Go to Settings → Pages → Source: `main` branch, root folder
4. Your site will be live at `https://YOUR_USERNAME.github.io/my-portfolio`

### Option B — Vercel (free, instant)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project" → Import your repository
3. Leave all settings as default (it detects static sites automatically)
4. Click Deploy — live in seconds with a free `.vercel.app` URL

### Option C — Netlify (free)

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder onto the Netlify dashboard
3. Done — you'll get a live URL instantly

### Option D — Any web host

Upload `index.html`, `style.css`, and `script.js` to any hosting provider (even shared hosting). No server-side setup required.

---

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). The `backdrop-filter` navbar blur may not appear in some older browsers but degrades gracefully — the navbar still works fine.

---

## Notes

- The contact form uses `mailto:` — it opens the user's mail client with pre-filled fields. No backend or API key needed.
- Fonts are loaded from Google Fonts (Sora + JetBrains Mono). Requires an internet connection.
- All animations use CSS transitions and the Intersection Observer API — no external animation libraries.
