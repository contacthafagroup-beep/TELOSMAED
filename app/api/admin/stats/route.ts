import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const payload = await verifyToken(token)
    
    if (payload.role.toUpperCase() !== 'ADMIN') {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
    }

    // Fetch all stats in parallel
    const [
      totalArticles,
      totalUsers,
      totalPoems,
      totalSubscribers,
      publishedArticles,
      activeUsers,
      recentArticles,
      usersByRole
    ] = await Promise.all([
      db.article.count(),
      db.user.count(),
      db.poem.count(),
      db.newsletterSubscription.count({ where: { active: true } }),
      db.article.count({ where: { published: true } }),
      db.user.count({ where: { active: true } }),
      db.article.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: { name: true, email: true }
          }
        }
      }),
      db.user.groupBy({
        by: ['role'],
        _count: { role: true }
      })
    ])

    return NextResponse.json({
      success: true,
      stats: {
        totalArticles,
        totalUsers,
        totalPoems,
        totalSubscribers,
        publishedArticles,
        activeUsers,
        recentArticles,
        usersByRole: usersByRole.reduce((acc, item) => {
          acc[item.role] = item._count.role
          return acc
        }, {} as Record<string, number>)
      }
    })

  } catch (error: any) {
    console.error('Admin stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}