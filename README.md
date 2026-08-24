# Bishal Adhikari — IAM Portfolio Site

A free, static portfolio website built from your résumé, plus two working
interactive demo tools (RBAC/ABAC access simulator and a JWT decoder).

No backend, no database, no build step, no monthly hosting cost.

---

## 1. What's in this folder

```
site2/
├── index.html               → the portfolio page (your real experience, skills, certs)
├── style.css                 → all styling (design tokens at the top)
├── script.js                  → log stream animation, stat counters, expandable experience
├── resume.pdf                 → your uploaded résumé (linked from the "Download résumé" button)
├── projects/
│   ├── rbac-simulator.html    → standalone interactive access-control demo
│   └── jwt-decoder.html       → standalone JWT decode/verify tool
└── README.md                  → this file
```

Every `.html` file is self-contained — double-click `index.html` right now
and it works with zero setup.

---

## 2. Two things you need to fill in before publishing

I couldn't pull these from the PDF, so they're placeholders right now:

1. **Your LinkedIn URL.** Open `index.html`, search for `linkedin.com/in/your-profile`
   and the two `href="#"` links near it (one in the hero contact line, one in
   the Contact section directory card). Replace `#` with your real profile URL,
   e.g. `https://www.linkedin.com/in/bishaladhikari`.
2. **Optional: a profile photo.** The current design intentionally doesn't
   use one (the hero uses a live "identity events" panel instead), but if
   you'd like one added to the About section, just say so and I'll wire it in.

Everything else — name, phone, email, all three roles, every bullet point,
every certification — was pulled directly from your uploaded résumé.

---

## 3. How it works (plain English)

- **`index.html`** is the content: your summary, skills, experience, certs.
- **`style.css`** is the paint job. All colors are CSS variables at the top
  of the file (`--allow`, `--deny`, `--link`, etc.) so you can reskin the
  whole site by changing a handful of values.
- **`script.js`** powers three things:
  - the scrolling "identity events" log in the hero (cosmetic, references
    the real platforms in your stack — SailPoint, CyberArk, Workday, etc.)
  - the "Show details" buttons on each job, so the page isn't a wall of text
  - the animated stat counters (8+ years, 25,000+ identities, etc.) that
    count up once when you scroll to the About section
- **`rbac-simulator.html`** and **`jwt-decoder.html`** are fully independent
  pages with their own HTML/CSS/JS. You can link someone straight to just
  the simulator and it works without the rest of the site.

Nothing calls out to a server or API, so there's nothing to keep running or
pay for.

---

## 4. Run it locally first (optional)

```bash
cd site2
python3 -m http.server 8000
# then open http://localhost:8000
```

Double-clicking `index.html` also works fine for this site.

---

## 5. Deploy for free — pick ONE option

### Option A: GitHub Pages (recommended — doubles as your GitHub profile site)

1. Create a free GitHub account if needed: https://github.com/join
2. Create a new repository named exactly `YOUR-USERNAME.github.io`
   (this gives you a clean root URL).
3. Upload everything in `site2/` (all files and the `projects/` folder):
   - Easiest: on the repo page, **Add file → Upload files**, drag everything
     in, **Commit changes**.
   - Or via git:
     ```bash
     cd site2
     git init
     git add .
     git commit -m "Initial portfolio site"
     git branch -M main
     git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
     git push -u origin main
     ```
4. Repo → **Settings → Pages** → Source: **Deploy from a branch**, branch
   `main`, folder `/ (root)` → Save.
5. Live in about a minute at `https://YOUR-USERNAME.github.io/`.

Every future push to `main` updates the live site automatically.

### Option B: Netlify (fastest, no git required)

1. Go to https://app.netlify.com/drop
2. Drag the whole `site2` folder onto the page.
3. Live instantly at a random `.netlify.app` URL — rename it free under
   **Site settings → Change site name**.

### Option C: Vercel

1. https://vercel.com → sign up free (GitHub login easiest)
2. **Add New → Project** → import the repo from Option A (or run
   `npx vercel` from inside `site2`)
3. No build command needed (it's static HTML) → Deploy.

### Option D: Cloudflare Pages

1. https://pages.cloudflare.com → sign up free
2. **Create a project → Connect to Git** (same repo) or direct upload
3. Framework preset **None**, build command blank, output directory `/`
4. Deploy → free `.pages.dev` URL with a global CDN included.

All four are free indefinitely for a static site like this, and all support
a custom domain later if you buy one.

---

## 6. Extending this later

- Add more project cards to `#projects` in `index.html` as you build more.
- Swap the `mailto:` contact link for a free form service (Formspree,
  Netlify Forms) if you want submissions emailed to you directly.
- Add free, privacy-friendly analytics (e.g. Cloudflare Web Analytics) if
  you want visitor counts without a cookie banner.
