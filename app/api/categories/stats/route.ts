import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { CATEGORIES } from '@/types'

export async function GET(request: NextRequest) {
  try {
    // Get article counts by category
    const articleCounts = await db.article.groupBy({
      by: ['category'],
      where: {
        published: true,
      },
      _count: {
        id: true,
      },
    })

    // Get total poem count
    const poemCount = await db.poem.count({
      where: {
        published: true,
      },
    })

    // Map to our category structure with real counts
    const categoryStats = CATEGORIES.map(category => {
      const articleCount = articleCounts.find(ac => ac.category === category.key)?._count.id || 0
      return {
        key: category.key,
        name: category.english,
        nameAm: category.amharic,
        href: `/articles?category=${category.key}`,
        count: articleCount
      }
    })

    // Add poetry as a separate category
    categoryStats.push({
      key: 'POETRY',
      name: 'Poetry',
      nameAm: 'ግጥም',
      href: '/poetry',
      count: poemCount
    })

    // Sort by count (highest first) and take top 6
    const popularCategories = categoryStats
      .filter(cat => cat.count > 0) // Only show categories with content
      .sort((a, b) => b.count - a.count)
      .slice(0, 6)

    return NextResponse.json({
      categories: popularCategories,
      total: categoryStats.reduce((sum, cat) => sum + cat.count, 0)
    })
  } catch (error) {
    console.error('Category stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch category statistics' },
      { status: 500 }
    )
  }
}