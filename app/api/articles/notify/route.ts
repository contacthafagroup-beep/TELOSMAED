import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { notifySubscribersOfNewArticle } from '@/lib/email'
import { verifyToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('auth_token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const payload = await verifyToken(token)

    if (payload.role !== 'ADMIN' && payload.role !== 'EDITOR') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    const { articleId } = await request.json()

    if (!articleId) {
      return NextResponse.json(
        { error: 'Article ID is required' },
        { status: 400 }
      )
    }

    // Get article details
    const article = await db.article.findUnique({
      where: { id: articleId },
      include: {
        author: {
          select: { name: true }
        }
      }
    })

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

    if (!article.published) {
      return NextResponse.json(
        { error: 'Article is not published' },
        { status: 400 }
      )
    }

    // Send notifications to all subscribers
    const result = await notifySubscribersOfNewArticle(
      article.title,
      article.excerpt || '',
      article.slug,
      article.author.name || 'TELOS MAED'
    )

    return NextResponse.json({
      message: 'Notifications sent successfully',
      ...result
    })

  } catch (error: any) {
    console.error('Error sending notifications:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send notifications' },
      { status: 500 }
    )
  }
}
