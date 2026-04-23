# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Dev server with Turbopack
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

No test suite configured.

## Architecture

Next.js 15 App Router portfolio for two-person freelance duo (Simone & Matteo / 4AI). JSX throughout — no TypeScript.

### Routing layout

```
src/app/
  layout.jsx                  # Root: fonts (DM Sans + Oswald) + ThemeProvider
  [locale]/
    layout.jsx                # NextIntlClientProvider (passes messages)
    (site)/
      layout.jsx              # Adds <Navbar>
      page.jsx                # Landing page
      matteo/page.jsx         # Profile pages
      simone/page.jsx
      ailights/page.jsx       # Project detail pages
      mirror/, capture/, screeba/, pyquark/, puse/, targage/
      _blogs/
        page.jsx              # Blog list
        [id]/page.jsx         # Blog post
      capture/privacy/page.jsx
      [...rest]/page.jsx      # Catch-all → notFound()
```

Path alias `@/` → `src/`.

### Project page pattern

Project detail pages split into two files: `page.jsx` (async Server Component — handles `generateMetadata` and JSON-LD schema) and `*PageClient.jsx` (Client Component — all interactivity). Server component passes translated strings as props to client. Follow this pattern for any new project page.

### Blog

Blog posts are mock data hardcoded inline in `_blogs/page.jsx` and `_blogs/[id]/page.jsx` (bilingual fields `en`/`it` per entry). No CMS or external API. The `_blogs` directory prefix opts it out of Next.js App Router automatic routing — pages are linked to manually.

### i18n

`next-intl` with locales `en` and `it`, default `it`. Middleware at `src/middleware.js` handles locale routing. UI copy lives in `messages/en.json` and `messages/it.json` — both must update together on text changes.

### Design system

Custom Tailwind colors (defined in `tailwind.config.js`):
- `forest` `#1e1b4b` — dark indigo, Services section background
- `bubblegum` `#6366f1` — accent/highlight
- `ink` `#0f172a` — dark text / dark background
- `paper` `#f8fafc` — light background
- `smoke` `#cbd5e1` — muted text

Custom shadows: `shadow-soft`, `shadow-hard`, `shadow-hard-white`.

Font utilities: `font-display` (Oswald, headings) / `font-body` (DM Sans, body text).

Dark mode via `next-themes` with `attribute="class"`, default `"light"`. Theme-aware components read `useTheme()` after mount guard (`const [mounted, setMounted] = useState(false)`).

### Animations

Two animation systems:
- **Framer Motion** — page transitions, presence animations, floating decorative elements
- **GSAP + ScrollTrigger** — scroll-driven section reveals. Reusable helpers in `src/lib/gsap-utils.js` (`fadeInUp`, `staggerFadeIn`, `imageReveal`, `useGsapReveal`, etc.). Always wrap GSAP context with `gsap.context()`, call `.revert()` on cleanup.

### Landing page behavior

- One-time loading screen gated by `sessionStorage.getItem("hasLoadedLanding")` — shows 2.2 s on first visit only.
- `?scrollTo=<section-id>` query param triggers smooth scroll after load. Section IDs: `duo`, `services`, `projects`.

### UI components

Shared primitives in `src/app/[locale]/(site)/sections/ui/` (Button, Card, Modal) built on Radix UI + `class-variance-authority`. `src/lib/utils.js` exports `cn()` (clsx + tailwind-merge).

Icons: `lucide-react` (preferred, tree-shakeable) and `react-icons` both available. `three` (Three.js) is installed but usage is project-specific.