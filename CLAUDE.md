# CLAUDE.md

Guidance for Claude Code (claude.ai/code) working in this repo.

## Commands

```bash
npm run dev      # Dev server with Turbopack
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

No test suite configured.

## Plugins & MCP Tools

### Caveman
This environment is equipped with the Caveman plugin/MCP server.
- **Context:** You have access to Caveman tools to assist with this project.
- **Usage:** Autonomously utilize Caveman's capabilities whenever they are relevant for analyzing, modifying, or querying the workspace. Rely on these tools before asking the user to perform manual actions.

## Architecture

Next.js 15 App Router portfolio for two-person freelance duo (Simone & Matteo / 4AI). JSX throughout — no TypeScript.

### Routing layout

```
src/app/
  layout.jsx                  # Root: fonts (DM Sans + Oswald) + ThemeProviderPlugins
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

Project detail pages split: `page.jsx` (async Server Component — `generateMetadata` + JSON-LD schema) and `*PageClient.jsx` (Client Component — interactivity). Server component passes translated strings as props to client. Follow for new project pages.

### Blog

Posts = mock data hardcoded in `_blogs/page.jsx` and `_blogs/[id]/page.jsx` (bilingual fields `en`/`it` per entry). No CMS. `_blogs` prefix opts out of automatic routing — pages linked manually.

### i18n

`next-intl`, locales `en`/`it`, default `it`. Middleware at `src/middleware.js` handles locale routing. UI copy in `messages/en.json` and `messages/it.json` — both update together on text changes.

### Design system

Custom Tailwind colors (defined in `tailwind.config.js`):
- `forest` `#1e1b4b` — dark indigo, Services section background
- `bubblegum` `#6366f1` — accent/highlight
- `ink` `#0f172a` — dark text / dark background
- `paper` `#f8fafc` — light background
- `smoke` `#cbd5e1` — muted text

Custom shadows: `shadow-soft`, `shadow-hard`, `shadow-hard-white`.

Font utilities: `font-display` (Oswald, headings) / `font-body` (DM Sans, body text).

Dark mode via `next-themes`, `attribute="class"`, default `"light"`. Theme-aware components read `useTheme()` after mount guard (`const [mounted, setMounted] = useState(false)`).

### Animations

Two systems:
- **Framer Motion** — page transitions, presence animations, floating decorative elements
- **GSAP + ScrollTrigger** — scroll-driven section reveals. Reusable helpers in `src/lib/gsap-utils.js` (`fadeInUp`, `staggerFadeIn`, `imageReveal`, `useGsapReveal`, etc.). Wrap GSAP context with `gsap.context()`, call `.revert()` on cleanup.

### Landing page behavior

- One-time loading screen gated by `sessionStorage.getItem("hasLoadedLanding")` — shows 2.2 s first visit only.
- `?scrollTo=<section-id>` triggers smooth scroll after load. Section IDs: `duo`, `services`, `projects`.

### UI components

Shared primitives in `src/app/[locale]/(site)/sections/ui/` (Button, Card, Modal) built on Radix UI + `class-variance-authority`. `src/lib/utils.js` exports `cn()` (clsx + tailwind-merge).

Icons: `lucide-react` (preferred, tree-shakeable) and `react-icons` both available. `three` (Three.js) installed, usage project-specific.