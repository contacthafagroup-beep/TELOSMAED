# Backend Integration - Implementation Steps

## ✅ Completed Steps

### 1. Database Schema Added
- ✅ Updated `prisma/schema.prisma` with three new models:
  - `HeroCategory` - For category cards
  - `HeroVideo` - For hero story video
  - `HeroMagazine` - For magazine cover

### 2. API Routes Created
- ✅ `app/api/hero/categories/route.ts` - GET all, POST new
- ✅ `app/api/hero/categories/[id]/route.ts` - PUT update, DELETE
- ✅ `app/api/hero/video/route.ts` - GET, PUT
- ✅ `app/api/hero/magazine/route.ts` - GET, PUT

### 3. API Hooks Created
- ✅ `lib/hooks/use-hero-api.ts` with three hooks:
  - `useHeroCategories()` - Fetch and manage categories
  - `useHeroVideo()` - Fetch and manage video
  - `useHeroMagazine()` - Fetch and manage magazine

## 🔄 Next Steps (Manual)

### Step 1: Run Database Migration

```bash
npx prisma migrate dev --name add_hero_tables
```

This will:
- Create the three new tables in your database
- Generate Prisma client with the new models

### Step 2: Seed Initial Data

Create `prisma/seed-hero.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed categories
  await prisma.heroCategory.createMany({
    data: [
      {
        nameEn: 'Editorial',
        nameAm: 'የአዘጋጁ ማስታወሻ',
        descEn: 'Editorial',
        descAm: 'የአዘጋጁ ማስታወሻ',
        icon: '✍️',
        color: 'from-blue-500/10 to-blue-600/10 border-blue-200',
        href: '/articles?category=editorial',
        amharicTitle: 'የአዘጋጁ ማስታወሻ',
        amharicDescription: 'የአዘጋጁ ማስታወሻ ክፍል የቴሎስ ማዕድ መጽሔት ዋና አዘጋጆች እና የአዘጋጅ ቡድን አባላት የሚጽፉበት ክፍል ነው።',
        features: JSON.stringify(['የወቅቱ ጉዳዮች ትንተና', 'የእምነት መመሪያዎች', 'የመጽሔቱ ራዕይ እና ተልእኮ', 'የአዘጋጅ ቡድን አስተያየቶች']),
        isActive: true,
        order: 1
      },
      {
        nameEn: 'Personal Growth',
        nameAm: 'ሰውነት',
        descEn: 'Growth',
        descAm: 'ሰውነት',
        icon: '🌱',
        color: 'from-green-500/10 to-green-600/10 border-green-200',
        href: '/articles?category=personal',
        amharicTitle: 'ሰውነት - የግል እድገት',
        amharicDescription: 'ሰውነት ክፍል የግል እድገት እና የመንፈሳዊ ብስለት ላይ የሚያተኩር ክፍል ነው።',
        features: JSON.stringify(['የግል ጸሎት እና ጥናት', 'የባህሪ ለውጥ መመሪያዎች', 'የመንፈሳዊ ዲሲፕሊን', 'የግል ምስክርነቶች']),
        isActive: true,
        order: 2
      },
      {
        nameEn: 'Leadership',
        nameAm: 'የመሪ በትር',
        descEn: 'Leadership',
        descAm: 'የመሪ በትር',
        icon: '👑',
        color: 'from-purple-500/10 to-purple-600/10 border-purple-200',
        href: '/articles?category=leadership',
        amharicTitle: 'የመሪ በትር - አመራር',
        amharicDescription: 'የመሪ በትር ክፍል የክርስቲያን አመራር ላይ የሚያተኩር ክፍል ነው።',
        features: JSON.stringify(['የክርስቲያን አመራር መርሆዎች', 'የቤተክርስቲያን አመራር', 'የንግድ እና ሙያ አመራር', 'የማህበረሰብ ተጽዕኖ']),
        isActive: true,
        order: 3
      },
      {
        nameEn: 'Poetry',
        nameAm: 'ግጥም',
        descEn: 'Poetry',
        descAm: 'ግጥም',
        icon: '🎭',
        color: 'from-rose-500/10 to-rose-600/10 border-rose-200',
        href: '/poetry',
        amharicTitle: 'ግጥም - የመንፈሳዊ ግጥም',
        amharicDescription: 'ግጥም ክፍል የመንፈሳዊ ግጥሞች እና የፈጠራ ጽሑፎች የሚገኙበት ክፍል ነው።',
        features: JSON.stringify(['የመንፈሳዊ ግጥሞች', 'የአምልኮ እና ምስጋና ግጥሞች', 'የወጣት ገጣሚዎች ስራዎች', 'የፈጠራ አምልኮ መግለጫዎች']),
        isActive: true,
        order: 4
      }
    ]
  })

  // Seed video
  await prisma.heroVideo.create({
    data: {
      title: 'Watch Our Story',
      titleAm: 'የእኛን ታሪክ ይመልከቱ',
      description: 'Discover Our Mission',
      descriptionAm: 'ተልእኳችንን ያውቁ',
      videoUrl: '',
      isActive: true
    }
  })

  // Seed magazine
  await prisma.heroMagazine.create({
    data: {
      title: 'TELOS MAED',
      titleAm: 'ቴሎስ ማዕድ',
      subtitle: 'Where Faith Meets Intellect',
      subtitleAm: 'እምነት እና ምሁራዊነት የሚገናኙበት',
      coverImage: '',
      issue: 'Latest Issue',
      publishDate: new Date().toISOString().split('T')[0],
      isActive: true
    }
  })

  console.log('Hero data seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

Run the seed:
```bash
npx tsx prisma/seed-hero.ts
```

### Step 3: Fix Admin Component

The admin component file got corrupted. You need to:

1. **Remove the duplicate mock data** (lines 95-155 in current file)
2. **Update the handler functions** to use API calls instead of setState

Replace these functions:

```typescript
// OLD (remove these)
const [categories, setCategories] = useState<CategoryCard[]>([...])
const [heroVideo, setHeroVideo] = useState<HeroVideo>({...})
const [magazineCover, setMagazineCover] = useState<MagazineCover>({...})

// ALREADY ADDED (keep these)
const { categories, loading, updateCategory, createCategory, deleteCategory } = useHeroCategories()
const { video: heroVideo, loading, updateVideo } = useHeroVideo()
const { magazine: magazineCover, loading, updateMagazine } = useHeroMagazine()
```

Update handlers to async and use API:

```typescript
const handleSaveVideo = async (formData: FormData) => {
  try {
    await updateVideo({
      title: formData.get('title') as string,
      titleAm: formData.get('titleAm') as string,
      description: formData.get('description') as string,
      descriptionAm: formData.get('descriptionAm') as string,
      videoUrl: formData.get('videoUrl') as string,
      isActive: formData.get('isActive') === 'on'
    })
    closeModal()
  } catch (error) {
    console.error('Failed to save:', error)
  }
}

// Similar for handleSaveMagazine and handleSaveCategory
```

### Step 4: Update Main Website Hero

In `components/home/hero-simple.tsx`, replace hardcoded categories with API fetch:

```typescript
'use client'

import { useState, useEffect } from 'react'
// ... other imports

export function Hero() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/hero/categories')
      .then(res => res.json())
      .then(data => {
        // Only show active categories
        setCategories(data.filter((c: any) => c.isActive))
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load categories:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg">Loading...</div>
    </div>
  }

  return (
    // ... rest of component using fetched categories
  )
}
```

## Testing

After completing all steps:

1. **Test Admin Panel:**
   - Go to `/admin`
   - Click "Hero Management"
   - Edit a category → Save → Should see success message
   - Refresh page → Changes should persist

2. **Test Main Website:**
   - Go to homepage `/`
   - Should see the categories you edited
   - Changes from admin should be visible

3. **Test Database:**
   ```bash
   npx prisma studio
   ```
   - Open Prisma Studio
   - Check `hero_categories`, `hero_videos`, `hero_magazines` tables
   - Should see your data

## Troubleshooting

### If categories don't show:
- Check browser console for errors
- Check API route: `http://localhost:3000/api/hero/categories`
- Should return JSON array

### If changes don't save:
- Check Network tab in browser DevTools
- Look for failed API calls
- Check server console for errors

### If database errors:
- Make sure migration ran: `npx prisma migrate dev`
- Check DATABASE_URL in `.env`
- Try: `npx prisma generate`

## Summary

**What's Done:**
✅ Database schema
✅ API routes
✅ API hooks
✅ Admin component partially updated

**What You Need to Do:**
1. Run migration
2. Seed initial data
3. Fix admin component (remove duplicate mock data)
4. Update main website hero to fetch from API
5. Test everything

Once complete, changes in admin will immediately appear on the main website!
