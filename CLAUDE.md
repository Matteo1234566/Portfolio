# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Dev server with Turbopack
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint (npm run lint -- 'path/to/file.jsx' for a single file; quote paths with [locale] or (site))
```

No test suite, typecheck, or formatter is configured. Use `npm run build` to validate substantial route/i18n/metadata changes.

Package manager is npm — `package-lock.json` is the source of truth (ignore the stray `packageManager: yarn` field in `package.json`).

## Architecture

Next.js 15 App Router portfolio for two-person freelance duo (Simone & Matteo / 4AI). JSX throughout — no TypeScript (`components.json` has `tsx: false`, no app `tsconfig`).

### Routing layout

```
src/app/
  layout.jsx                  # Root: fonts (DM Sans + Oswald) + Providers, site metadata for devop.sbs
  providers.jsx                # next-themes ThemeProvider config
  [locale]/
    layout.jsx                # NextIntlClientProvider (passes messages)
    (site)/
      layout.jsx              # Adds <Navbar>
      page.jsx + LandingPageClient.jsx   # Landing page
      matteo/, simone/         # Profile pages
      ailights/, capture/, mirror/, screeba/, pyquark/, puse/,
      targage/, twosequel/, _traid/, homelab-creation/   # Project detail pages
      trending-repo/
        page.jsx               # Index of curated GitHub repos
        repoData.js             # Repo metadata (see "Trending repo content" below)
        [slug]/page.jsx         # Repo detail page
      _blogs/
        page.jsx               # Blog list (actual implementation)
        blogData.js             # Mock post data
        [id]/page.jsx           # Blog post
      blogs/
        page.jsx               # Public route — imports/re-exports _blogs/page.jsx
        [id]/page.jsx
      capture/privacy/page.jsx
      [...rest]/page.jsx        # Catch-all → notFound()
```

Path alias `@/` → `src/` (via `jsconfig.json`).

Root `/` permanently redirects to `/it` (`next.config.mjs`); `src/middleware.js` uses `localePrefix: 'always'` and excludes `api`/`_next`/`_vercel`/static assets.

In Next 15 route files, `params` is a promise in server components (`await params`); client route files unwrap it with `use(params)`.

### Project page pattern

Project detail pages split into two files: `page.jsx` (async Server Component — `generateMetadata` + JSON-LD schema) and `*PageClient.jsx` (Client Component — all interactivity). Server component passes translated strings as props to client. Follow this pattern for any new project page.

### Blog

Blog posts are mock data hardcoded in `_blogs/blogData.js` (bilingual `en`/`it` fields per entry). No CMS. The `_blogs` prefix opts that directory out of Next.js's automatic routing; the public `/blogs` route re-exports from it, so blog content changes belong in `_blogs/`.

### Trending repo pages

`trending-repo/repoData.js` holds curated repo metadata (slug, owner, tags, stack, highlights) rendered by `trending-repo/page.jsx` (index) and `trending-repo/[slug]/page.jsx` (detail). This is separate tooling at the repo root — `scripts/fetch_repos.py` reads `repos.txt` and fetches/validates GitHub READMEs into `readmes/` — used to source data for `repoData.js`; it is not part of the Next.js app build.

### i18n

`next-intl`, locales `en`/`it`, default `it`. `src/i18n.js` validates the locale and loads `messages/${locale}.json`. UI copy lives in `messages/en.json` and `messages/it.json` — both must update together on text changes.

### Design system

Custom Tailwind colors (defined in `tailwind.config.js`):
- `forest` `#1e1b4b` — dark indigo, Services section background
- `bubblegum` `#6366f1` — accent/highlight
- `ink` `#0f172a` — dark text / dark background
- `paper` `#f8fafc` — light background
- `smoke` `#cbd5e1` — muted text

Custom shadows: `shadow-soft`, `shadow-hard`, `shadow-hard-white`.

Font utilities: `font-display` (Oswald, headings) / `font-body` (DM Sans, body text).

Dark mode via `next-themes` (`src/app/providers.jsx`), `attribute="class"`, default `"light"`. Theme-aware components read `useTheme()` after a mount guard (`const [mounted, setMounted] = useState(false)`).

### Animations

Two animation systems:
- **Framer Motion** — page transitions, presence animations, floating decorative elements. Preserve existing `useReducedMotion` handling where a file already uses it.
- **GSAP + ScrollTrigger** — scroll-driven section reveals. Reusable helpers in `src/lib/gsap-utils.js` (`fadeInUp`, `staggerFadeIn`, `imageReveal`, `useGsapReveal`, etc.). Always wrap GSAP context with `gsap.context()`, call `.revert()` on cleanup.

### Landing page behavior

- One-time loading screen gated by `sessionStorage.getItem("hasLoadedLanding")` — shows 2.2 s on first visit only.
- `?scrollTo=<section-id>` query param triggers smooth scroll after load.

### UI components

Shared primitives in `src/app/[locale]/(site)/sections/ui/` (Button, Card, Modal, SocialPopover) built on Radix UI + `class-variance-authority`. `src/lib/utils.js` exports `cn()` (clsx + tailwind-merge).

Icons: `lucide-react` (preferred, tree-shakeable) and `react-icons` both available. `three` (Three.js) is installed, usage is project-specific.

## Plugins & MCP Tools

### Caveman
This environment is equipped with the Caveman plugin/MCP server.
- **Context:** You have access to Caveman tools to assist with this project.
- **Usage:** Autonomously utilize Caveman's capabilities whenever they are relevant for analyzing, modifying, or querying the workspace. Rely on these tools before asking the user to perform manual actions.
