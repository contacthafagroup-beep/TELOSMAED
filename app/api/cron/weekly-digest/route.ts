import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { sendWeeklyDigest } from '@/lib/email'

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret to prevent unauthorized access
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get articles from the last 7 days
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const articles = await db.article.findMany({
      where: {
        published: true,
        publishedAt: {
          gte: sevenDaysAgo
        }
      },
      include: {
        author: {
          select: { name: true }
        }
      },
      orderBy: {
        publishedAt: 'desc'
      },
      take: 5 // Top 5 articles
    })

    if (articles.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No articles published this week',
        sent: 0
      })
    }

    // Get all active newsletter subscribers
    const subscribers = await db.newsletterSubscription.findMany({
      where: { active: true },
      select: { email: true, name: true }
    })

    // Format articles for email
    const formattedArticles = articles.map(article => ({
      title: article.title,
      excerpt: article.excerpt || '',
      slug: article.slug,
      author: article.author.name || 'TELOS MAED'
    }))

    // Send digest to all subscribers
    const results = await Promise.allSettled(
      subscribers.map(subscriber =>
        sendWeeklyDigest(
          subscriber.email,
          subscriber.name || 'Reader',
          formattedArticles
        )
      )
    )

    const successful = results.filter(r => r.status === 'fulfilled').length
    const failed = results.filter(r => r.status === 'rejected').length

    return NextResponse.json({
      success: true,
      message: 'Weekly digest sent',
      sent: successful,
      failed,
      total: subscribers.length,
      articles: articles.length
    })

  } catch (error: any) {
    console.error('Error sending weekly digest:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send weekly digest' },
      { status: 500 }
    )
  }
}
