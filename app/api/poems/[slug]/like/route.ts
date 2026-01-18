import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Find the poem
    const poem = await db.poem.findUnique({
      where: { slug: params.slug },
    })

    if (!poem) {
      return NextResponse.json(
        { error: 'Poem not found' },
        { status: 404 }
      )
    }

    // Increment likes
    const updatedPoem = await db.poem.update({
      where: { slug: params.slug },
      data: {
        likes: {
          increment: 1,
        },
      },
    })

    return NextResponse.json({
      success: true,
      likes: updatedPoem.likes,
    })
  } catch (error) {
    console.error('Error liking poem:', error)
    return NextResponse.json(
      { error: 'Failed to like poem' },
      { status: 500 }
    )
  }
}
