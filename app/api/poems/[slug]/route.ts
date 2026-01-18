import { NextRequest, NextResponse } from 'next/server'
import { db, dbHelpers } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const poem = await dbHelpers.getPoemBySlug(params.slug)

    if (!poem) {
      return NextResponse.json(
        { error: 'Poem not found' },
        { status: 404 }
      )
    }

    // Increment view count
    await db.poem.update({
      where: { id: poem.id },
      data: { views: { increment: 1 } },
    })

    // Track page view for analytics
    const userAgent = request.headers.get('user-agent') || undefined
    await dbHelpers.trackPageView(
      `/poems/${params.slug}`,
      userAgent
    )

    return NextResponse.json(poem)
  } catch (error) {
    console.error('Error fetching poem:', error)
    return NextResponse.json(
      { error: 'Failed to fetch poem' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json()
    const {
      title,
      titleAm,
      content,
      contentAm,
      type,
      featured,
      published,
    } = body

    // Check if poem exists
    const existingPoem = await db.poem.findUnique({
      where: { slug: params.slug },
    })

    if (!existingPoem) {
      return NextResponse.json(
        { error: 'Poem not found' },
        { status: 404 }
      )
    }

    // Update poem
    const poem = await db.poem.update({
      where: { slug: params.slug },
      data: {
        ...(title && { title }),
        ...(titleAm && { titleAm }),
        ...(content && { content }),
        ...(contentAm && { contentAm }),
        ...(type && { type }),
        ...(featured !== undefined && { featured }),
        ...(published !== undefined && { 
          published,
          publishedAt: published && !existingPoem.publishedAt ? new Date() : existingPoem.publishedAt
        }),
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

    return NextResponse.json(poem)
  } catch (error) {
    console.error('Error updating poem:', error)
    return NextResponse.json(
      { error: 'Failed to update poem' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Check if poem exists
    const existingPoem = await db.poem.findUnique({
      where: { slug: params.slug },
    })

    if (!existingPoem) {
      return NextResponse.json(
        { error: 'Poem not found' },
        { status: 404 }
      )
    }

    // Delete poem
    await db.poem.delete({
      where: { slug: params.slug },
    })

    return NextResponse.json({ message: 'Poem deleted successfully' })
  } catch (error) {
    console.error('Error deleting poem:', error)
    return NextResponse.json(
      { error: 'Failed to delete poem' },
      { status: 500 }
    )
  }
}