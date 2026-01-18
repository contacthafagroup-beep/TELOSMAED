# Backend Integration Guide for Hero Management

## Current Status

The admin hero management is currently saving changes **locally in the browser state only**. This means:
- ✅ Changes appear in the admin panel
- ❌ Changes do NOT appear on the main website
- ❌ Changes are lost when you refresh the page

## Why Changes Don't Show on Main Website

The main website (`components/home/hero-simple.tsx`) has **hardcoded data**:
```typescript
const categories = [
  { name: 'የአዘጋጁ ማስታወሻ', desc: 'Editorial', ... },
  // ... hardcoded data
]
```

The admin panel has **separate state**:
```typescript
const [categories, setCategories] = useState([...])
```

These two are **not connected** - they're completely separate pieces of data.

## Solution: Connect to Backend Database

To make changes visible on the main website, you need to:

### 1. Create Backend API Endpoints

Create API routes in `app/api/hero/` folder:

#### `app/api/hero/categories/route.ts`
```typescript
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all categories
export async function GET() {
  try {
    const categories = await prisma.heroCategory.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

// POST new category
export async function POST(request: Request) {
  try {
    const data = await request.json()
    const category = await prisma.heroCategory.create({ data })
    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}
```

#### `app/api/hero/categories/[id]/route.ts`
```typescript
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PUT update category
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const category = await prisma.heroCategory.update({
      where: { id: parseInt(params.id) },
      data
    })
    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 })
  }
}

// DELETE category
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.heroCategory.delete({
      where: { id: parseInt(params.id) }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
  }
}
```

#### `app/api/hero/video/route.ts`
```typescript
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET video
export async function GET() {
  try {
    const video = await prisma.heroVideo.findFirst()
    return NextResponse.json(video)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch video' }, { status: 500 })
  }
}

// PUT update video
export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const video = await prisma.heroVideo.update({
      where: { id: 1 }, // Assuming single video
      data
    })
    return NextResponse.json(video)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update video' }, { status: 500 })
  }
}
```

#### `app/api/hero/magazine/route.ts`
```typescript
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET magazine
export async function GET() {
  try {
    const magazine = await prisma.heroMagazine.findFirst()
    return NextResponse.json(magazine)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch magazine' }, { status: 500 })
  }
}

// PUT update magazine
export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const magazine = await prisma.heroMagazine.update({
      where: { id: 1 }, // Assuming single magazine
      data
    })
    return NextResponse.json(magazine)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update magazine' }, { status: 500 })
  }
}
```

### 2. Update Prisma Schema

Add to `prisma/schema.prisma`:

```prisma
model HeroCategory {
  id                   Int      @id @default(autoincrement())
  nameEn               String
  nameAm               String
  descEn               String
  descAm               String
  icon                 String
  color                String
  href                 String
  amharicTitle         String
  amharicDescription   String   @db.Text
  features             String[] // Array of strings
  isActive             Boolean  @default(true)
  order                Int
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt
}

model HeroVideo {
  id             Int      @id @default(autoincrement())
  title          String
  titleAm        String
  description    String
  descriptionAm  String
  videoUrl       String?
  isActive       Boolean  @default(true)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model HeroMagazine {
  id          Int      @id @default(autoincrement())
  title       String
  titleAm     String
  subtitle    String
  subtitleAm  String
  coverImage  String?
  issue       String
  publishDate String
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

Run migration:
```bash
npx prisma migrate dev --name add_hero_tables
```

### 3. Create API Hook for Admin

Create `lib/hooks/use-hero-api.ts`:

```typescript
import { useState, useEffect } from 'react'

export function useHeroCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/hero/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data)
        setLoading(false)
      })
  }, [])

  const updateCategory = async (id: number, data: any) => {
    const res = await fetch(`/api/hero/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  }

  const createCategory = async (data: any) => {
    const res = await fetch('/api/hero/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  }

  const deleteCategory = async (id: number) => {
    await fetch(`/api/hero/categories/${id}`, { method: 'DELETE' })
  }

  return { categories, loading, updateCategory, createCategory, deleteCategory }
}

export function useHeroVideo() {
  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/hero/video')
      .then(res => res.json())
      .then(data => {
        setVideo(data)
        setLoading(false)
      })
  }, [])

  const updateVideo = async (data: any) => {
    const res = await fetch('/api/hero/video', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  }

  return { video, loading, updateVideo }
}

export function useHeroMagazine() {
  const [magazine, setMagazine] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/hero/magazine')
      .then(res => res.json())
      .then(data => {
        setMagazine(data)
        setLoading(false)
      })
  }, [])

  const updateMagazine = async (data: any) => {
    const res = await fetch('/api/hero/magazine', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  }

  return { magazine, loading, updateMagazine }
}
```

### 4. Update Admin Component

In `components/admin/hero-management.tsx`, replace mock data with API calls:

```typescript
import { useHeroCategories, useHeroVideo, useHeroMagazine } from '@/lib/hooks/use-hero-api'

export default function HeroManagement() {
  // Replace useState with API hooks
  const { categories, loading: categoriesLoading, updateCategory, createCategory, deleteCategory } = useHeroCategories()
  const { video: heroVideo, loading: videoLoading, updateVideo } = useHeroVideo()
  const { magazine: magazineCover, loading: magazineLoading, updateMagazine } = useHeroMagazine()

  // Update handlers to call API
  const handleSaveVideo = async (formData: FormData) => {
    const updatedVideo = {
      title: formData.get('title') as string,
      titleAm: formData.get('titleAm') as string,
      description: formData.get('description') as string,
      descriptionAm: formData.get('descriptionAm') as string,
      videoUrl: formData.get('videoUrl') as string,
      isActive: formData.get('isActive') === 'on'
    }
    await updateVideo(updatedVideo)
    closeModal()
  }

  // Similar updates for other handlers...
}
```

### 5. Update Main Website Component

In `components/home/hero-simple.tsx`, fetch data from API:

```typescript
import { useState, useEffect } from 'react'

export function Hero() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch categories from API
    fetch('/api/hero/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data.filter(c => c.isActive)) // Only show active
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    // ... rest of component using fetched categories
  )
}
```

## Summary

**Current Flow (Not Working):**
```
Admin Panel → Local State → (nowhere)
Main Website → Hardcoded Data
```

**Correct Flow (After Backend Integration):**
```
Admin Panel → API → Database → API → Main Website
```

## Quick Start Steps

1. ✅ Create database tables (Prisma schema)
2. ✅ Run migration
3. ✅ Create API routes
4. ✅ Create API hooks
5. ✅ Update admin component to use API
6. ✅ Update main website to fetch from API
7. ✅ Test: Make change in admin → See it on main website

## Notes

- Currently, the admin saves to **browser memory** (lost on refresh)
- The main website reads from **hardcoded data** (never changes)
- You need a **database** to connect them
- The database acts as the **single source of truth**
- Both admin and main website read/write to the same database
