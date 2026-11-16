# 🌐 Suvradip Dey – The Interactive Digital Identity
## An Award-Worthy Personal Portfolio, Engineering Showcase & Creative Services Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2%20App%20Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19 & 18](https://img.shields.io/badge/React-Components-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-Custom%20Tokens-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict%20Type%20Safety-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Flagship Project](https://img.shields.io/badge/Flagship-ShopEase-brightgreen?style=for-the-badge)](https://theshopease-five.vercel.app/)

> **"ONE FACE. MANY DIMENSIONS. INFINITE POSSIBILITIES."**  
> A bespoke digital identity platform engineered by **Suvradip Dey** — Computer Science & AI Engineering undergraduate at Budge Budge Institute of Technology (BBIT), Kolkata.

---

## 🌟 Core Metaphor: The Signature Identity Engine

The platform centers around a physical, interactive visual metaphor:  
A high-contrast black-and-white portrait of Suvradip progressively reveals its authentic color as visitors interact with it, transitioning across **5 professional identities**:

1. **State 01: The Developer (Electric Blue)** – Engineering seamless full-stack React systems & performance.
2. **State 02: The Designer (Violet)** – Human-centered interfaces, tokens, and micro-interactions.
3. **State 03: The Builder (Emerald Green)** – Python automation, backend architectures & SQL persistence.
4. **State 04: The Explorer (Orange)** – AI/ML foundations, data patterns & vector logic.
5. **State 05: The Creator (Cyan)** – Creative coding, physical shaders & dynamic digital identity.

**Interaction Mechanics:**
- Physical drag handle (`DRAG TO EXPLORE MY DIMENSIONS`) following pointer position with smooth `clip-path` masks.
- Clickable dimension selector tabs (01 to 05).
- Keyboard accessibility: Press `ArrowLeft` / `ArrowRight` to shift dimensions.
- Hold-to-reveal button for quick color inspection.
- Full support for `prefers-reduced-motion`.

---

## 🏗️ Architectural Foundations

- **Framework:** Next.js 14 App Router (`src/app/page.tsx`, `src/app/projects/shopease/page.tsx`, `src/app/admin/page.tsx`, `src/app/api/contact/route.ts`).
- **Styling:** Tailwind CSS with custom editorial minimalism tokens, dark glassmorphism, and responsive breakpoints.
- **Icons:** Lucide Icons.
- **Command Palette:** Keyboard-activated (`⌘K` / `Ctrl+K`) global navigation modal.
- **Backend API:** Production Route Handler for contact validation, in-memory rate limiting, and spam honeypot filters.

---

## 🛍️ Flagship Project: ShopEase Case Study

ShopEase is showcased in an in-depth, dedicated case study route at `/projects/shopease`:

- **Official Live Application:** [theshopease-five.vercel.app](https://theshopease-five.vercel.app/)
- **GitHub Repository:** [github.com/HENRY3757v/THESHOPEASE](https://github.com/HENRY3757v/THESHOPEASE)
- **Verified Implementation Highlights:**
  - **VS Spec Comparison Mode:** Side-by-side technical specification matrix supporting up to 3 products in a floating dock.
  - **Dosti Deal (Social Commerce):** 12% group purchase discount simulation with WhatsApp 1-click invite generator.
  - **2,400+ Catalog Discovery:** 8 authentic Indian market categories (Mobiles, Laptops, Home & Kitchen, Electronics, Footwear, Watches, Gaming, Fashion).
  - **Authentication & Security:** bcryptjs salted password hashing with PostgreSQL table isolation.
  - **Relational Backend:** Hybrid Vercel Serverless + Express 5 with Supabase cloud PostgreSQL pooler.
  - **Cinematic Delivery Animation:** Engaging post-login delivery dispatch sequence.

---

## 📂 Project Structure

```plaintext
suvradip-portfolio/
├── public/
│   ├── images/
│   │   ├── suvradip-portrait.jpg
│   │   └── projects/shopease/hero.png
│   └── resume.pdf                     # Downloadable CV
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout, metadata, command palette
│   │   ├── globals.css                # Global styles, fonts, tokens
│   │   ├── page.tsx                   # Main digital identity page
│   │   ├── admin/page.tsx             # Private content management dashboard
│   │   ├── api/contact/route.ts       # Secure contact form API route
│   │   └── projects/shopease/page.tsx # Flagship engineering case study
│   ├── components/
│   │   ├── layout/                    # Navbar, Footer
│   │   ├── hero/                      # SignatureHero & Identity Engine
│   │   ├── about/                     # AboutSection
│   │   ├── expertise/                 # ExpertiseDashboard
│   │   ├── projects/                  # ProjectsShowroom
│   │   ├── services/                  # ServicesSection
│   │   ├── timeline/                  # JourneyTimeline
│   │   ├── contact/                   # ContactSection
│   │   └── ui/                        # CommandPalette
│   ├── data/                          # Structured profile, identities, projects, skills, services
│   ├── lib/                           # Utility functions (cn)
│   └── types/                         # TypeScript interfaces
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 💻 Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/HENRY3757v/suvradip-portfolio.git
   cd suvradip-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build production bundle:**
   ```bash
   npm run build
   npm start
   ```

---

## 🚀 One-Click Deployment to Vercel

1. Push this repository to your GitHub account (`HENRY3757v`).
2. Go to [vercel.com/new](https://vercel.com/new) and import the `suvradip-portfolio` repository.
3. Framework Preset: **Next.js** (automatically detected).
4. Click **Deploy**. Your portfolio will be live worldwide on Vercel's global edge network!

---

## 🔒 Private Content Dashboard

Access the private admin panel at:
```text
/admin
```
- **Default Master Passcode:** `suvradip2026`
- Allows inspecting and editing live profile variables, identity state copy, skill categories, and exporting the complete structured JSON schema.

---

## 👨‍💻 Author & Credits

- **Engineer:** Suvradip Dey
- **Email:** [leodas8777@gmail.com](mailto:leodas8777@gmail.com)
- **GitHub:** [@HENRY3757v](https://github.com/HENRY3757v)
- **Institution:** Budge Budge Institute of Technology, Kolkata
