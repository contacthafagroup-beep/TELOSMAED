# TELOS MAED - Premium Christian Magazine Platform

A modern, full-stack Christian magazine platform built with Next.js, focusing on faith, leadership, youth culture, and creative worship.

## 🌟 Features

- **Modern Design**: Clean, elegant interface with dark/light mode support
- **Content Management**: Articles, poetry, and monthly issues
- **Category System**: Four main categories with Amharic titles
  - የአዘጋጁ ማስታወሻ (Editorial reflections)
  - ሰውነት (Personal growth & character formation)
  - የመሪ በትር (Leadership & vision)
  - ግጥም (Spiritual poetry & worship writing)
- **Responsive Design**: Optimized for all devices
- **SEO Optimized**: Built-in SEO best practices
- **Performance**: Fast loading with modern web technologies

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: Prisma with SQLite (development)
- **Authentication**: NextAuth.js
- **Icons**: Heroicons
- **Fonts**: Inter, Crimson Text, Playfair Display

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd telos-maed
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
telos-maed/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   ├── articles/         # Articles pages
│   ├── poetry/           # Poetry pages
│   └── about/            # About pages
├── components/            # React components
│   ├── home/             # Home page components
│   ├── layout/           # Layout components
│   ├── ui/               # Reusable UI components
│   └── providers/        # Context providers
├── lib/                  # Utility functions
├── types/                # TypeScript type definitions
├── prisma/               # Database schema
└── public/               # Static assets
```

## 🎨 Brand Identity

- **Logo**: Official TELOS MAED logo (located at `/public/images/telos-maed-logo.png`)
- **Primary Color**: Royal Faith Blue (#1F3C88)
- **Secondary Color**: Heaven Deep Blue (#2F56B0)
- **Neutrals**: Light of Word White (#FFFFFF), Scripture Gray (#F2F4F8), Wisdom Gray (#6B7280), Truth Black (#111827)
- **Accent**: Glory Gold (#F4C430) - used sparingly for highlights
- **Typography**: 
  - Display: Playfair Display
  - Body: Inter
  - Serif: Crimson Text

## 📝 Content Categories

1. **የአዘጋጁ ማስታወሻ** - Editorial reflections and insights
2. **ሰውነት** - Personal growth & character formation
3. **የመሪ በትር** - Leadership & vision content
4. **ግጥም** - Spiritual poetry & worship writing

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

### Database Management

- `npx prisma studio` - Open Prisma Studio
- `npx prisma generate` - Generate Prisma client
- `npx prisma db push` - Push schema changes
- `npx prisma migrate dev` - Create and apply migrations

## 🌍 Deployment

The application is ready for deployment on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- Railway
- DigitalOcean App Platform

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

We welcome contributions! Please read our contributing guidelines and submit pull requests for any improvements.

## 📞 Contact

For questions or support, please contact the TELOS MAED editorial team.

---

*"This is serious. This is beautiful. This is for me."* - Our vision for every reader's experience.