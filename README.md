# 🚀 Simone & Matteo | 4AI Portfolio

![Project Banner](https://via.placeholder.com/1200x600/1e1b4b/E56399?text=Complex+Tech+Made+Simple)

> **"Complex Tech Made Simple."**
> A Soft-Brutalist, Bubblegum-Tech portfolio for an AI + Full-Stack freelance duo.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Motion-Framer-purple?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![Next-Intl](https://img.shields.io/badge/i18n-Next--Intl-blue?style=for-the-badge)](https://next-intl-docs.vercel.app/)

## 🧠 The Duo

We are **Simone Zannini** & **Matteo Cese**, co-founders of **4AI**. We bridge the gap between academic research and production-ready software.

* **Matteo (The Builder):** Full-Stack Engineer & DevOps. He translates chaos into scalable architecture.
* **Simone (The Architect):** Deep Learning & Computer Vision Specialist. He gives sight and intelligence to machines.

---

## ✨ Key Features

This project is built with a focus on performance, aesthetics, and scalability.

* **🌍 Internationalization (i18n):** Fully localized in **English** and **Italian** using `next-intl` with middleware routing.
* **🎨 Soft-Brutalist Design:** A unique UI blending "Forest" greens, "Bubblegum" pinks, and stark borders.
* **🌗 Dark/Light Mode:** Seamless theme switching with system preference detection via `next-themes`.
* **⚡ Smooth Animations:** Orchestrated entry animations and micro-interactions using `framer-motion`.
* **📱 Responsive:** Mobile-first approach with custom animated navigation.

---

## 🛠️ Tech Stack

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animation:** [Framer Motion](https://www.framer.com/motion/)
* **Internationalization:** [next-intl](https://next-intl-docs.vercel.app/)
* **Icons:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
* **Theming:** [next-themes](https://github.com/pacocoursey/next-themes)

---

## 📂 Project Structure

The project follows the latest Next.js App Router conventions with dynamic locale routing.

```bash
├── messages/              # JSON Translation files
│   ├── en.json            # English translations
│   └── it.json            # Italian translations
├── public/                # Static assets (images, fonts)
├── src/
│   ├── app/
│   │   └── [locale]/      # ⚡ Dynamic Locale Route
│   │       ├── matteo/    # Matteo's Profile Page
│   │       ├── simone/    # Simone's Profile Page
│   │       ├── layout.jsx # Root layout with i18n provider
│   │       └── page.jsx   # Homepage
│   ├── components/        # Reusable UI components
│   ├── middleware.js      # Middleware for locale detection/redirect
│   └── i18n.js            # i18n request configuration
├── next.config.mjs        # Next.js config with i18n plugin
└── tailwind.config.js     # Custom theme colors (Bubblegum, Forest, Ink)
```

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/portfolio-4ai.git](https://github.com/your-username/portfolio-4ai.git)
    cd portfolio-4ai
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open your browser:**
    Navigate to `http://localhost:3000`. The middleware will automatically redirect you to `/it` or `/en` based on your browser settings.

---

## 🎨 Color Palette

| Color Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Bubblegum** | `#E56399` | Accents, Highlights, Hover states |
| **Forest** | `#2D4739` | Primary Background (Footer), Accents |
| **Ink** | `#1e1b4b` | Text (Light Mode), Background (Dark Mode) |
| **Paper** | `#f8fafc` | Background (Light Mode) |

---

## 📬 Contact

**Ready to build?**
Whether it's a complex AI pipeline or a fresh MVP, we are ready to turn your chaos into code.

* 🌐 **Website:** [4aitech.it](https://www.4aitech.it)
* 📧 **Email:** [hello@simoneandmatteo.com](mailto:hello@simoneandmatteo.com)

---

Made with ❤️ and a lot of ☕ in Rome.
