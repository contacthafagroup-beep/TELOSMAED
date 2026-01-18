import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const poem = await db.poem.findUnique({
      where: { id: params.id },
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
    })

    if (!poem) {
      return NextResponse.json(
        { error: 'Poem not found' },
        { status: 404 }
      )
    }

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
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const {
      title,
      titleAm,
      slug,
      content,
      contentAm,
      type,
      featured,
      published,
      authorId,
    } = body

    // Check if poem exists
    const existingPoem = await db.poem.findUnique({
      where: { id: params.id },
    })

    if (!existingPoem) {
      return NextResponse.json(
        { error: 'Poem not found' },
        { status: 404 }
      )
    }

    // Update poem
    const poem = await db.poem.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(titleAm !== undefined && { titleAm }),
        ...(slug && { slug }),
        ...(content && { content }),
        ...(contentAm !== undefined && { contentAm }),
        ...(type && { type }),
        ...(featured !== undefined && { featured }),
        ...(authorId && { authorId }),
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
        _count: {
          select: {
            comments: true,
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
  { params }: { params: { id: string } }
) {
  try {
    // Check if poem exists
    const existingPoem = await db.poem.findUnique({
      where: { id: params.id },
    })

    if (!existingPoem) {
      return NextResponse.json(
        { error: 'Poem not found' },
        { status: 404 }
      )
    }

    // Delete poem
    await db.poem.delete({
      where: { id: params.id },
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
