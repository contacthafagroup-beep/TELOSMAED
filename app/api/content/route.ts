import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    // If filtering by POETRY, fetch only poems
    if (category === 'POETRY') {
      const poems = await db.poem.findMany({
        where: { published: true },
        include: {
          author: { select: { id: true, name: true, avatar: true } },
          _count: { select: { comments: true } },
        },
        orderBy: { publishedAt: 'desc' },
      })

      const mapped = poems.map(p => ({
        id: p.id,
        title: p.title,
        titleAm: (p as any).titleAm || null,
        slug: p.slug,
        excerpt: null,
        excerptAm: null,
        category: 'POETRY',
        featured: p.featured,
        published: p.published,
        publishedAt: p.publishedAt,
        createdAt: p.createdAt,
        coverImage: null,
        readTime: null,
        views: (p as any).views || 0,
        likes: (p as any).likes || 0,
        tags: '',
        author: p.author,
        _count: { comments: p._count.comments, articleLikes: 0, bookmarks: 0 },
        isPoem: true,
      }))

      return NextResponse.json(mapped)
    }

    // If filtering by a non-poetry category, fetch only articles
    if (category && category !== 'POETRY') {
      const articles = await db.article.findMany({
        where: { published: true, category },
        include: {
          author: { select: { id: true, name: true, avatar: true } },
          _count: { select: { comments: true, articleLikes: true, bookmarks: true } },
        },
        orderBy: { publishedAt: 'desc' },
      })
      return NextResponse.json(articles.map(a => ({ ...a, isPoem: false })))
    }

    // No filter — fetch both articles and poems, merge and sort by date
    const [articles, poems] = await Promise.all([
      db.article.findMany({
        where: { published: true },
        include: {
          author: { select: { id: true, name: true, avatar: true } },
          _count: { select: { comments: true, articleLikes: true, bookmarks: true } },
        },
        orderBy: { publishedAt: 'desc' },
      }),
      db.poem.findMany({
        where: { published: true },
        include: {
          author: { select: { id: true, name: true, avatar: true } },
          _count: { select: { comments: true } },
        },
        orderBy: { publishedAt: 'desc' },
      }),
    ])

    const mappedArticles = articles.map(a => ({ ...a, isPoem: false }))

    const mappedPoems = poems.map(p => ({
      id: p.id,
      title: p.title,
      titleAm: (p as any).titleAm || null,
      slug: p.slug,
      excerpt: null,
      excerptAm: null,
      category: 'POETRY',
      featured: p.featured,
      published: p.published,
      publishedAt: p.publishedAt,
      createdAt: p.createdAt,
      coverImage: null,
      readTime: null,
      views: (p as any).views || 0,
      likes: (p as any).likes || 0,
      tags: '',
      author: p.author,
      _count: { comments: p._count.comments, articleLikes: 0, bookmarks: 0 },
      isPoem: true,
    }))

    // Merge and sort by date descending
    const combined = [...mappedArticles, ...mappedPoems].sort((a, b) => {
      const dateA = new Date(a.publishedAt || a.createdAt).getTime()
      const dateB = new Date(b.publishedAt || b.createdAt).getTime()
      return dateB - dateA
    })

    return NextResponse.json(combined)
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 })
  }
}
