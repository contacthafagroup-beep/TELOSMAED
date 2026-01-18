import { NextRequest, NextResponse } from 'next/server'
import { db, dbHelpers } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')
    const skip = searchParams.get('skip')
    const search = searchParams.get('search')
    const includeUnpublished = searchParams.get('includeUnpublished') === 'true'

    // If search query is provided, use search function
    if (search) {
      const results = await dbHelpers.searchContent(search, {
        type: 'poems',
        limit: limit ? parseInt(limit) : 10,
      })
      return NextResponse.json(results.poems)
    }

    // Get poems with filters - for admin, include unpublished
    if (includeUnpublished) {
      const poems = await db.poem.findMany({
        where: {
          ...(featured && { featured: featured === 'true' }),
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
        orderBy: {
          createdAt: 'desc',
        },
        take: limit ? parseInt(limit) : undefined,
        skip: skip ? parseInt(skip) : undefined,
      })
      return NextResponse.json(poems)
    }

    // Get published poems only
    const poems = await dbHelpers.getPublishedPoems({
      featured: featured ? featured === 'true' : undefined,
      limit: limit ? parseInt(limit) : undefined,
      skip: skip ? parseInt(skip) : undefined,
    })

    return NextResponse.json(poems)
  } catch (error) {
    console.error('Error fetching poems:', error)
    return NextResponse.json(
      { error: 'Failed to fetch poems' },
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
      content,
      contentAm,
      type = 'SPIRITUAL',
      authorId,
      issueId,
      featured = false,
      published = false,
    } = body

    // Validate required fields
    if (!title || !content || !authorId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create poem
    const poem = await db.poem.create({
      data: {
        title,
        titleAm,
        slug,
        content,
        contentAm,
        type,
        authorId,
        issueId,
        featured,
        published,
        publishedAt: published ? new Date() : null,
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

    return NextResponse.json(poem, { status: 201 })
  } catch (error) {
    console.error('Error creating poem:', error)
    return NextResponse.json(
      { error: 'Failed to create poem' },
      { status: 500 }
    )
  }
}