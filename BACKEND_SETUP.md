# TELOS MAED Backend Setup Guide

This guide will help you set up the backend for the TELOS MAED Christian magazine website.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file and configure it:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-super-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Set Up Database

Generate Prisma client:
```bash
npm run db:generate
```

Push the schema to your database:
```bash
npm run db:push
```

Seed the database with sample data:
```bash
npm run db:seed
```

### 4. Start Development Server

```bash
npm run dev
```

Your backend API will be available at `http://localhost:3000/api`

## 📊 Database Schema

The database includes the following main models:

### Core Content Models
- **User** - Authors, editors, contributors, and readers
- **Article** - Blog posts and magazine articles (bilingual support)
- **Poem** - Poetry and creative writing (bilingual support)
- **Issue** - Magazine issues/editions
- **Comment** - User comments on articles and poems

### Engagement Models
- **Like** - User likes on content
- **Bookmark** - User bookmarks for later reading
- **Submission** - User-submitted content for review

### Communication Models
- **NewsletterSubscription** - Email newsletter subscribers
- **ContactMessage** - Contact form submissions

### System Models
- **Analytics** - Page view tracking
- **Settings** - Site configuration

## 🔌 API Endpoints

### Articles
- `GET /api/articles` - List published articles
- `GET /api/articles/[slug]` - Get specific article
- `POST /api/articles` - Create new article (admin)
- `PUT /api/articles/[slug]` - Update article (admin)
- `DELETE /api/articles/[slug]` - Delete article (admin)

### Poems
- `GET /api/poems` - List published poems
- `GET /api/poems/[slug]` - Get specific poem
- `POST /api/poems` - Create new poem (admin)
- `PUT /api/poems/[slug]` - Update poem (admin)
- `DELETE /api/poems/[slug]` - Delete poem (admin)

### Issues
- `GET /api/issues` - List published magazine issues
- `GET /api/issues/[slug]` - Get specific issue with content
- `POST /api/issues` - Create new issue (admin)
- `PUT /api/issues/[slug]` - Update issue (admin)
- `DELETE /api/issues/[slug]` - Delete issue (admin)

### Search
- `GET /api/search?q=query` - Search articles and poems
- Query parameters:
  - `q` - Search query (required)
  - `type` - Content type (articles, poems, all)
  - `limit` - Number of results (default: 20)

### Newsletter
- `POST /api/newsletter` - Subscribe to newsletter
- `DELETE /api/newsletter?email=email` - Unsubscribe from newsletter

### Contact
- `POST /api/contact` - Send contact message
- `GET /api/contact` - List contact messages (admin)

### Submissions
- `POST /api/submissions` - Submit content for review
- `GET /api/submissions` - List submissions (admin)
- `GET /api/submissions/[id]` - Get specific submission
- `PUT /api/submissions/[id]` - Update submission status (admin)

## 🛠 Database Management

### Available Scripts

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes to database
npm run db:push

# Create and run migrations
npm run db:migrate

# Seed database with sample data
npm run db:seed

# Open Prisma Studio (database GUI)
npm run db:studio

# Reset database (WARNING: Deletes all data)
npm run db:reset
```

### Database Helpers

The `lib/db.ts` file provides helpful functions:

```typescript
import { dbHelpers } from '@/lib/db'

// Get published articles with filters
const articles = await dbHelpers.getPublishedArticles({
  category: 'EDITORIAL',
  featured: true,
  limit: 10
})

// Search content
const results = await dbHelpers.searchContent('leadership', {
  type: 'articles',
  limit: 5
})

// Track page views
await dbHelpers.trackPageView('/articles/some-article')
```

## 🌐 Bilingual Support

The system supports both English and Amharic content:

### Article/Poem Fields
- `title` / `titleAm` - English and Amharic titles
- `content` / `contentAm` - English and Amharic content
- `excerpt` / `excerptAm` - English and Amharic excerpts

### API Usage
```javascript
// Create bilingual article
const article = await fetch('/api/articles', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Digital Discipleship',
    titleAm: 'ዲጂታል ደቀመዝሙርነት',
    content: 'English content...',
    contentAm: 'የአማርኛ ይዘት...',
    category: 'EDITORIAL',
    authorId: 'user-id'
  })
})
```

## 📈 Analytics

The system includes basic analytics:

- Page view tracking
- Popular content identification
- User engagement metrics

Analytics data is stored in the `Analytics` model and can be queried for insights.

## 🔒 Security Considerations

### For Production Deployment:

1. **Environment Variables**
   - Use strong, unique secrets
   - Never commit `.env` files
   - Use environment-specific configurations

2. **Database Security**
   - Use PostgreSQL or MySQL for production
   - Enable SSL connections
   - Regular backups

3. **API Security**
   - Implement authentication for admin endpoints
   - Add rate limiting
   - Validate all inputs
   - Use HTTPS only

4. **Content Security**
   - Sanitize user inputs
   - Implement content moderation
   - Add spam protection

## 🚀 Deployment

### Database Migration for Production

1. Set up production database (PostgreSQL recommended)
2. Update `DATABASE_URL` in production environment
3. Run migrations: `npx prisma migrate deploy`
4. Seed initial data if needed

### Environment Setup

Ensure these environment variables are set in production:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- Email configuration (if using contact forms)

## 🤝 Contributing

When adding new features:

1. Update the Prisma schema if needed
2. Create/update API routes
3. Add appropriate error handling
4. Update this documentation
5. Test thoroughly

## 📞 Support

For questions or issues:
- Email: telosmaed@gmail.com
- Phone: +251924749060

## 📝 License

This project is proprietary to TELOS MAED Ministry.