import { NextRequest, NextResponse } from 'next/server'
import { db, dbHelpers } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const type = searchParams.get('type') as 'articles' | 'poems' | 'all' | null
    const category = searchParams.get('category')
    const limit = searchParams.get('limit')

    if (!query || query.trim().length < 2) {
      return NextResponse.json({
        query: query || '',
        results: { articles: [], poems: [] },
        total: 0,
      })
    }

    // Search articles
    const articles = await db.article.findMany({
      where: {
        AND: [
          { published: true },
          {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { titleAm: { contains: query, mode: 'insensitive' } },
              { excerpt: { contains: query, mode: 'insensitive' } },
              { content: { contains: query, mode: 'insensitive' } },
              { tags: { contains: query, mode: 'insensitive' } },
            ]
          },
          ...(category ? [{ category }] : [])
        ]
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: [
        { featured: 'desc' },
        { publishedAt: 'desc' },
      ],
      take: type === 'poems' ? 0 : (limit ? parseInt(limit) : 10),
    })

    // Search poems
    const poems = await db.poem.findMany({
      where: {
        AND: [
          { published: true },
          {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { titleAm: { contains: query, mode: 'insensitive' } },
              { content: { contains: query, mode: 'insensitive' } },
              { contentAm: { contains: query, mode: 'insensitive' } },
            ]
          }
        ]
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: [
        { featured: 'desc' },
        { publishedAt: 'desc' },
      ],
      take: type === 'articles' ? 0 : (limit ? parseInt(limit) : 10),
    })

    // Format results for frontend
    const formattedArticles = articles.map(article => ({
      id: article.id,
      title: article.title || article.titleAm || 'Untitled',
      titleAm: article.titleAm,
      type: 'Article',
      category: article.category,
      excerpt: article.excerpt || article.content?.substring(0, 150) + '...' || '',
      href: `/articles/${article.slug}`,
      author: article.author.name,
      publishedAt: article.publishedAt || article.createdAt,
      featured: article.featured,
      views: article.views,
      likes: article.likes,
      commentsCount: article._count.comments,
    }))

    const formattedPoems = poems.map(poem => ({
      id: poem.id,
      title: poem.title || poem.titleAm || 'Untitled',
      titleAm: poem.titleAm,
      type: 'Poetry',
      category: 'Poetry',
      excerpt: poem.content?.substring(0, 150) + '...' || poem.contentAm?.substring(0, 150) + '...' || '',
      href: `/poetry/${poem.slug}`,
      author: poem.author.name,
      publishedAt: poem.publishedAt || poem.createdAt,
      featured: poem.featured,
      views: poem.views,
      likes: poem.likes,
      commentsCount: poem._count.comments,
    }))

    const results = {
      articles: formattedArticles,
      poems: formattedPoems,
    }

    return NextResponse.json({
      query: query.trim(),
      results,
      total: results.articles.length + results.poems.length,
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    )
  }
}