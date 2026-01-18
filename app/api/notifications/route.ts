import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const unreadOnly = searchParams.get('unread') === 'true'

    // For now, we'll generate notifications based on recent content
    // In a real app, you'd have a notifications table
    
    const notifications = []

    // Get recent articles (last 7 days)
    const recentArticles = await db.article.findMany({
      where: {
        published: true,
        publishedAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
        }
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        publishedAt: 'desc'
      },
      take: 5,
    })

    // Get recent poems (last 7 days)
    const recentPoems = await db.poem.findMany({
      where: {
        published: true,
        publishedAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
        }
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        publishedAt: 'desc'
      },
      take: 3,
    })

    // Create notifications for new articles
    recentArticles.forEach((article, index) => {
      notifications.push({
        id: `article-${article.id}`,
        type: 'new_article',
        title: 'New Article Published',
        message: `"${article.title || article.titleAm}" by ${article.author.name}`,
        timestamp: article.publishedAt || article.createdAt,
        read: index > 1, // Mark first 2 as unread
        actionUrl: `/articles/${article.slug}`,
        icon: 'BookOpenIcon',
        priority: article.featured ? 'high' : 'normal',
      })
    })

    // Create notifications for new poems
    recentPoems.forEach((poem, index) => {
      notifications.push({
        id: `poem-${poem.id}`,
        type: 'new_poetry',
        title: 'New Poetry Published',
        message: `"${poem.title || poem.titleAm}" by ${poem.author.name}`,
        timestamp: poem.publishedAt || poem.createdAt,
        read: index > 0, // Mark first 1 as unread
        actionUrl: `/poetry/${poem.slug}`,
        icon: 'SparklesIcon',
        priority: poem.featured ? 'high' : 'normal',
      })
    })

    // Add some system notifications
    notifications.push({
      id: 'welcome',
      type: 'system',
      title: 'Welcome to TELOS MAED',
      message: 'Explore our collection of faith-based articles and poetry',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: true,
      actionUrl: '/about',
      icon: 'SparklesIcon',
      priority: 'normal',
    })

    // Sort by timestamp (newest first)
    notifications.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    // Filter unread if requested
    const filteredNotifications = unreadOnly 
      ? notifications.filter(n => !n.read)
      : notifications

    // Apply limit
    const limitedNotifications = limit 
      ? filteredNotifications.slice(0, parseInt(limit))
      : filteredNotifications

    const unreadCount = notifications.filter(n => !n.read).length

    return NextResponse.json({
      notifications: limitedNotifications,
      unreadCount,
      total: notifications.length,
    })
  } catch (error) {
    console.error('Notifications error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { notificationId, action } = await request.json()

    // In a real app, you'd update the notification in the database
    // For now, we'll just return success
    
    if (action === 'mark_read') {
      // Mark notification as read
      return NextResponse.json({ success: true, message: 'Notification marked as read' })
    }

    if (action === 'mark_all_read') {
      // Mark all notifications as read
      return NextResponse.json({ success: true, message: 'All notifications marked as read' })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Notification update error:', error)
    return NextResponse.json(
      { error: 'Failed to update notification' },
      { status: 500 }
    )
  }
}