import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    // Find article by slug and increment likes
    const article = await prisma.article.update({
      where: { slug },
      data: {
        likes: {
          increment: 1,
        },
      },
      select: {
        id: true,
        likes: true,
      },
    })

    return NextResponse.json({ likes: article.likes })
  } catch (error) {
    console.error('Error liking article:', error)
    return NextResponse.json(
      { error: 'Failed to like article' },
      { status: 500 }
    )
  }
}
