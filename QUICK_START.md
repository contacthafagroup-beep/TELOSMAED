# 🚀 TELOS MAED - Quick Start Guide

## Getting Started in 30 Seconds

### 1. Start the Application

```bash
npm run dev
```

Wait for: `✓ Ready on http://localhost:3001`

### 2. Access the Application

**Admin Panel:**
```
http://localhost:3001/admin
```

**Main Website:**
```
http://localhost:3001
```

**Database GUI:**
```
http://localhost:5555
```

---

## Quick Actions

### Edit Hero Section Content

1. Go to `http://localhost:3001/admin`
2. Click "Hero Management"
3. Click "Edit" on any category
4. Make your changes
5. Click "Update"
6. ✅ Done! Changes are saved to database

### View Your Changes

1. Go to `http://localhost:3001`
2. Refresh the page (F5)
3. ✅ Your changes appear!

### Manage Articles

1. Go to `http://localhost:3001/admin`
2. Click "Articles Management"
3. Create, edit, or delete articles
4. All changes save automatically

---

## Common Tasks

### Add a New Category

1. Admin Panel → Hero Management
2. Click "Add Category"
3. Fill in all fields:
   - English Name & Amharic Name
   - Descriptions
   - Icon (emoji)
   - Link (href)
   - Order number
   - Color classes
4. Click "Create"
5. ✅ New category appears!

### Edit Video Details

1. Admin Panel → Hero Management
2. Click "Story Video" tab
3. Click "Edit"
4. Update title, description, or video URL
5. Click "Update"
6. ✅ Video updated!

### Toggle Active/Inactive

1. Admin Panel → Hero Management
2. Click the play/pause button on any item
3. ✅ Status changes immediately!

### Delete a Category

1. Admin Panel → Hero Management
2. Click the trash icon
3. Confirm deletion
4. ✅ Category removed from database!

---

## Project Structure

```
TELOS MAED/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── admin/            # Admin components
│   └── home/             # Homepage components
├── lib/                   # Utilities
│   ├── hooks/            # React hooks
│   └── prisma.ts         # Database client
├── prisma/               # Database
│   ├── schema.prisma     # Database schema
│   └── dev.db            # SQLite database
└── public/               # Static files
```

---

## Key Features

### ✅ Fully Integrated
- Database (Prisma + SQLite)
- API Routes (RESTful)
- Admin Panel (Full CRUD)
- Main Website (Dynamic content)

### ✅ Bilingual Support
- English and Amharic throughout
- Right-to-left text support
- Language-aware content

### ✅ Real-time Updates
- Changes save to database
- Persist across server restarts
- Appear immediately on website

### ✅ User-Friendly
- Loading states
- Success notifications
- Error handling
- Preview functionality

---

## Useful Commands

### Development
```bash
# Start dev server
npm run dev

# Open database GUI
npx prisma studio

# View database schema
npx prisma format
```

### Database
```bash
# Regenerate Prisma client
npx prisma generate

# Push schema changes
npx prisma db push

# Seed database
npx tsx prisma/seed-hero.ts
```

### Testing
```bash
# Test API endpoints
curl http://localhost:3001/api/hero/categories
curl http://localhost:3001/api/hero/video
curl http://localhost:3001/api/articles
```

---

## Troubleshooting

### Server won't start?
```bash
# Kill any process on port 3001
npx kill-port 3001

# Restart
npm run dev
```

### Database errors?
```bash
# Regenerate Prisma client
npx prisma generate

# Push schema
npx prisma db push
```

### Changes not appearing?
1. Refresh the page (F5)
2. Check if item is "Active"
3. Check browser console (F12)

---

## Support

**Email**: telosmaed@gmail.com  
**Phone**: +251924749060

**Documentation**:
- `INTEGRATION_FINAL_STATUS.md` - Complete status
- `FINAL_STEPS.md` - Integration details
- `TEST_INTEGRATION.md` - Testing guide
- `SUCCESS.md` - Success checklist

---

## Quick Links

- [Admin Panel](http://localhost:3001/admin)
- [Main Website](http://localhost:3001)
- [Database GUI](http://localhost:5555)
- [About Page](http://localhost:3001/about)
- [Contact Page](http://localhost:3001/contact)

---

**Status**: ✅ Production Ready  
**Version**: 1.0.0  
**Last Updated**: January 15, 2026

**"Live Purposefully and Lead Effectively!"** 🌟
