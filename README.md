# Passanai Tampawisit — Portfolio (Next.js)

Bilingual Thai/English portfolio, migrated from a single-file HTML build into a
Next.js 14 (App Router) React application. Designed for Vercel.

## Stack

- Next.js 14 (App Router, JSX — no TypeScript required)
- React 18
- Pure CSS (single `app/globals.css`, no Tailwind / CSS-in-JS)
- Client components for the scroll-synced cinema animation and the CMS editor

## Local development

```bash
cd nextjs
npm install
npm run dev
# open http://localhost:3000
```

The CMS editor lives at `?edit=1` or by pressing `Ctrl+Shift+E` on any page.

## Project layout

```
nextjs/
├── app/
│   ├── layout.jsx         Root HTML shell, loads Google Fonts
│   ├── page.jsx           Renders <Portfolio />
│   └── globals.css        All styles (~700 lines, extracted from source)
├── components/
│   ├── Portfolio.jsx      Faithful JSX port of the full page body
│   ├── Cinema.jsx         Scroll-synced cinema video sequence
│   └── CMSEditor.jsx      Admin editor (toolbar, inspector, <tp> wrappers)
└── public/
    ├── profile.jpg
    ├── writting2.webm / .MP4
    ├── shoes2.webm / Shoes2.MP4
    ├── kick2.webm / kick 2.MP4
    ├── ninja2.webm / ninja run2.MP4
    └── coding2.webm / Coding 2.MP4
```

## Deploy to Vercel

### Option 1 — One-click via the Vercel dashboard

1. Push this `nextjs/` folder to a GitHub / GitLab / Bitbucket repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Set the **Root Directory** to `nextjs` (if you committed the folder as a
   subdirectory). Framework preset auto-detects as "Next.js".
4. Click **Deploy**. First build takes ~2 minutes.

### Option 2 — From the terminal via the Vercel CLI

```bash
npm i -g vercel
cd nextjs
vercel           # first run links the project
vercel --prod    # production deploy
```

## CMS access control (important)

The CMS editor is hidden from everyone by default. It only mounts when the
browser has a valid `cms-ok` cookie, which is set by `middleware.js` after
the visitor passes HTTP Basic Auth.

### Set your credentials on Vercel (one-time)

1. Open the project on Vercel → **Settings** → **Environment Variables**.
2. Add two variables (enable for **Production**, **Preview**, **Development**):
   - `CMS_USER` — any username you like, e.g. `admin`
   - `CMS_PASS` — a long random password (generate one via
     [1password.com/password-generator](https://1password.com/password-generator))
3. Click **Save**, then **Redeploy** the latest deployment so the new env
   vars take effect.

### Enter the CMS

Visit `https://<your-site>.vercel.app/?edit=1`. Your browser will show a
native username/password prompt — enter the `CMS_USER` / `CMS_PASS` you
set above. Auth is remembered for 8 hours via a cookie.

Random visitors who type `?edit=1` without the password see a 401 page and
never get the CMS UI.

### Local development

Create a `.env.local` file (already in `.gitignore`):

```
CMS_USER=admin
CMS_PASS=letmein
```

Restart `npm run dev`. Visit `http://localhost:3000/?edit=1` — same Basic
Auth popup, local creds.

## Notes on behaviour

- All CMS edits persist to `localStorage` under the key `cms-portfolio-v1`.
  Each visitor's browser stores its own edits — nothing is written back to the
  server. Use the **Export** button in the toolbar to download an edited
  snapshot as static HTML.
- The cinema video sequence is suppressed while the user is on the hero
  (page 1). Scene 0 (`writting2`) begins entering as the scroll transitions
  into the About section, so the animation never overlays the profile photo.
- Typography, per-word styling via `<tp>` wrappers, nav-link URL/section
  picker, and add-section / add-nav buttons all work the same way as in the
  original HTML build.

## Updating the Thai / English content

Open `components/Portfolio.jsx` and edit the bilingual pairs directly:

```jsx
<span className="en">Your new English copy</span>
<span className="th">ข้อความภาษาไทยใหม่</span>
```

Alternatively, run the site, toggle **Edit: ON** in the CMS toolbar, edit
inline, and click **Export** to download a snapshot.
