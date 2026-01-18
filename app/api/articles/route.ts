import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')
    const skip = searchParams.get('skip')
    const search = searchParams.get('search')
    const includeUnpublished = searchParams.get('includeUnpublished') === 'true'

    // Build where clause
    const where: any = {}

    // Only filter by published if not including unpublished (for admin)
    if (!includeUnpublished) {
      where.published = true
    }

    if (category) {
      where.category = category
    }

    if (featured) {
      where.featured = featured === 'true'
    }

    // Get articles
    const articles = await prisma.article.findMany({
      where,
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
      orderBy: {
        createdAt: 'desc', // Changed to createdAt for admin to see newest drafts
      },
      take: limit ? parseInt(limit) : undefined,
      skip: skip ? parseInt(skip) : undefined,
    })

    return NextResponse.json(articles)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      titleAm,
      slug,
      excerpt,
      excerptAm,
      content,
      contentAm,
      category,
      tags,
      authorId,
      issueId,
      featured = false,
      published = false,
      coverImage,
      seoTitle,
      seoDescription,
    } = body

    // Validate required fields - must have either English OR Amharic content
    if (!category || !authorId) {
      return NextResponse.json(
        { error: 'Missing required fields: category and authorId are required' },
        { status: 400 }
      )
    }

    // Must have at least title and content in one language
    const hasEnglish = title && content
    const hasAmharic = titleAm && contentAm
    
    if (!hasEnglish && !hasAmharic) {
      return NextResponse.json(
        { error: 'Must provide title and content in at least one language (English or Amharic)' },
        { status: 400 }
      )
    }

    // Create article
    const article = await prisma.article.create({
      data: {
        title: title || titleAm || 'Untitled',
        titleAm: titleAm || null,
        slug,
        excerpt: excerpt || null,
        excerptAm: excerptAm || null,
        content: content || contentAm || '',
        contentAm: contentAm || null,
        category,
        tags: tags || '',
        authorId,
        issueId: issueId || null,
        featured,
        published,
        publishedAt: published ? new Date() : null,
        coverImage: coverImage || null,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    })

    return NextResponse.json(article, { status: 201 })
  } catch (error: any) {
    console.error('Error creating article:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create article' },
      { status: 500 }
    )
  }
}