# DevOP Portfolio — Simone & Matteo

> **"Complex Tech Made Simple."**
> Portfolio freelance per il duo AI + Full-Stack.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-purple?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![Next-Intl](https://img.shields.io/badge/i18n-Next--Intl-blue?style=for-the-badge)](https://next-intl-docs.vercel.app/)

---

## Il Duo

**Simone Zannini** & **Matteo Cese** — co-fondatori di **4AI**.

- **Matteo** — Full-Stack Engineer & DevOps. Architetture scalabili, infrastruttura, backend.
- **Simone** — Deep Learning & Computer Vision. AI applicata, modelli, ricerca.

---

## Stack tecnico

| Layer | Tecnologia |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) — App Router, React 19, Turbopack |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Animazioni scroll | [GSAP](https://gsap.com/) + ScrollTrigger, helper in `src/lib/gsap-utils.js` |
| Animazioni UI | [Framer Motion 12](https://www.framer.com/motion/) |
| i18n | [next-intl](https://next-intl-docs.vercel.app/) — `en` / `it`, default `it` |
| Tema | [next-themes](https://github.com/pacocoursey/next-themes) — dark/light, default light |
| Componenti | [Radix UI](https://www.radix-ui.com/) + `class-variance-authority` |
| Icone | [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/) |
| 3D | [Three.js](https://threejs.org/) |
| Linguaggio | JSX (no TypeScript) |

---

## Struttura progetto

```
messages/
  en.json              # Traduzioni inglese
  it.json              # Traduzioni italiano
src/
  middleware.js        # Locale detection & redirect
  lib/
    gsap-utils.js      # Helper GSAP (fadeInUp, staggerFadeIn, imageReveal, ...)
    utils.js           # cn() — clsx + tailwind-merge
  app/
    layout.jsx         # Root: font DM Sans + Oswald, providers
    [locale]/
      layout.jsx       # NextIntlClientProvider
      (site)/
        layout.jsx     # Navbar
        page.jsx       # Landing page
        matteo/        # Profilo Matteo
        simone/        # Profilo Simone
        ailights/      # Progetto AI Lights
        capture/       # Progetto Capture
        mirror/        # Progetto Mirror
        puse/          # Progetto Puse
        pyquark/       # Progetto PyQuark
        screeba/       # Progetto Screeba
        targage/       # Progetto Targage
        traid/         # Progetto Traid
        twosequel/     # Progetto 2Sequel
        _blogs/
          page.jsx     # Lista blog
          [id]/page.jsx
        capture/privacy/
        [...rest]/     # Catch-all → 404
```

### Pattern pagine progetto

Ogni pagina progetto si divide in due file:
- `page.jsx` — Server Component: `generateMetadata` + JSON-LD schema
- `*PageClient.jsx` — Client Component: interattività, animazioni

Il server component passa le stringhe tradotte come props al client.

### Blog

Post hardcodati in `_blogs/page.jsx` e `_blogs/[id]/page.jsx`. Campi bilingue `en`/`it` per entry. Nessun CMS.

### Landing page

- Loading screen one-time gated da `sessionStorage.getItem("hasLoadedLanding")` — dura 2.2 s solo al primo accesso.
- `?scrollTo=<id>` triggera smooth scroll. Section IDs: `duo`, `services`, `projects`.

---

## Design System

### Colori custom (Tailwind)

| Nome | Hex | Uso |
|---|---|---|
| `bubblegum` | `#6366f1` | Accent, highlight |
| `forest` | `#1e1b4b` | Background sezione Services |
| `ink` | `#0f172a` | Testo scuro / background dark |
| `paper` | `#f8fafc` | Background light |
| `smoke` | `#cbd5e1` | Testo muted |

### Font

- `font-display` — Oswald (headings)
- `font-body` — DM Sans (body)

### Shadow utility

`shadow-soft`, `shadow-hard`, `shadow-hard-white`

### Dark mode

Componenti theme-aware usano `useTheme()` con mount guard:
```js
const [mounted, setMounted] = useState(false)
```

---

## Avvio

```bash
npm install
npm run dev      # Dev server con Turbopack → http://localhost:3000
npm run build    # Build produzione
npm run start    # Avvia produzione
npm run lint     # ESLint
```

Il middleware reindirizza automaticamente a `/it` o `/en` in base al browser.

---

## Contatti

- Sito: [devop.sbs](https://www.devop.sbs/en)
- Email: [magosimo99@gmail.com](mailto:magosimo99@gmail.com)
