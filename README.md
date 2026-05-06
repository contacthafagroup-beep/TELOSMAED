# TELOS MAED - Christian Magazine Platform

An Amharic-first Evangelical Christian digital magazine built with Next.js 14, focused on faith, leadership, personal growth, and spiritual poetry.

**Live site:** [telosmaed.com](https://telosmaed.com)

---

## Features

- **Amharic-first content** — all articles and poetry displayed in Ethiopic script with proper LTR rendering
- **Article & Poetry system** — unified content feed with category filtering; poems and articles share the same browsing page
- **Admin panel** — full CRUD for articles, poetry, users, and site settings; accessible from the main navigation for admin-role users
- **Role-based navigation** — Admin link appears in the header only for users with the ADMIN role
- **Book promotion section** — dedicated section between hero and latest articles to promote upcoming/available books with a direct call button
- **Responsive design** — mobile-first, tested at 375px, 640px, 768px, 1024px, 1920px
- **Light mode default** — theme defaults to light regardless of OS dark mode preference; user can toggle
- **Hero section** — full-screen background image with Amharic bible verse (ኤፌሶን 3፥18-19) and CTA buttons
- **SEO optimized** — Open Graph, Twitter cards, structured metadata

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + Framer Motion |
| Database | PostgreSQL via Prisma ORM |
| Auth | Custom JWT (cookies) |
| Deployment | Vercel |
| Fonts | Inter, Crimson Text, Playfair Display |

---

## Content Categories

| Key | Amharic | Description |
|---|---|---|
| EDITORIAL | የአዘጋጁ ማስታወሻ | Editorial reflections |
| PERSONAL | ሰውነት | Personal growth & character |
| LEADERSHIP | የመሪ በትር | Leadership & vision |
| POETRY | ግጥም | Spiritual poetry (from `poem` table) |

> Poetry lives in a separate `poem` database table but is displayed alongside articles in the unified `/articles` page with the ግጥም filter.

---

## Brand Colors

| Name | Hex |
|---|---|
| Royal Faith Blue (primary) | `#203685` |
| Heaven Deep Blue (secondary) | `#2F56B0` |
| Glory Gold (accent) | `#F4C430` |
| White | `#FFFFFF` |
| Border Gray | `#E3E4E6` |

---

## Project Structure

```
telos-maed/
├── app/
│   ├── admin/              # Admin panel pages (dashboard, articles, poetry, users, settings)
│   ├── api/                # API routes (articles, poems, auth, admin, content)
│   ├── articles/           # Public articles listing + individual article pages
│   ├── poetry/             # Individual poem reading pages
│   ├── layout.tsx          # Root layout with hero image preload
│   └── page.tsx            # Home page
├── components/
│   ├── admin/              # Admin UI components
│   ├── articles/           # ArticlesGridClient (fetches /api/articles + /api/poems)
│   ├── home/               # Hero, LatestArticles, Mission, BookPromo, Newsletter
│   ├── layout/             # Header (role-based nav), Footer
│   ├── poetry/             # PoetryGridClient (server-side DB fetch)
│   ├── providers/          # ThemeProvider (defaults to light)
│   └── ui/                 # Shared UI components
├── lib/
│   ├── auth.ts             # JWT verify/sign
│   ├── db.ts               # Prisma client + dbHelpers
│   └── api-client.ts       # Client-side API fetch helpers
├── prisma/
│   └── schema.prisma       # PostgreSQL schema
├── public/
│   └── images/             # hero-cover.png, book-promo.png, telos-maed-logo.png
└── types/
    └── index.ts            # CATEGORIES constant, shared types
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (Supabase recommended)

### Installation

```bash
git clone https://github.com/contacthafagroup-beep/TELOSMAED.git
cd TELOSMAED
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in:

```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret"
NEXTAUTH_SECRET="your-secret"
NEXT_PUBLIC_SITE_URL="https://telosmaed.com"
```

### Database Setup

```bash
npx prisma generate
npx prisma db push
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deployment (Vercel)

1. Connect the GitHub repo to Vercel
2. Set all environment variables in the Vercel dashboard
3. Deploy — Vercel auto-deploys on every push to `main`

> **Important:** The articles and poetry pages use `export const dynamic = 'force-dynamic'` since they query the database at request time.

---

## Admin Access

1. Sign in with an account that has `role = 'ADMIN'` in the database
2. The **Admin** link appears in the navigation automatically
3. Navigate to `/admin` for the dashboard

---

## Key Architecture Decisions

- **Articles page** fetches data client-side via `/api/articles` and `/api/poems` (same as home page) — avoids server-side DB failures on Vercel
- **Poetry page** (`/poetry/[slug]`) fetches directly from DB server-side
- **Theme** defaults to `light` — changed from `system` to prevent OS dark mode affecting the site
- **Amharic text** uses no `dir="rtl"` — Ethiopic script is left-to-right like English
- **Hero image** uses CSS `background-image` with a `<link rel="preload">` in the layout for fast loading

---

## Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint
npx prisma studio    # Database GUI
npx prisma generate  # Regenerate Prisma client
```

---

## Contact

**TELOS MAED Ministry**
- Website: [telosmaed.com](https://telosmaed.com)
- Email: telosmaed@gmail.com
- Phone: +251 924 749 060
- Telegram: [t.me/telosmaed](https://t.me/telosmaed)
