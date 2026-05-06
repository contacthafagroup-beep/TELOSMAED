import { Metadata } from 'next'
import { Suspense } from 'react'
import { ArticlesFilters } from '@/components/articles/articles-filters'
import { ArticlesGridClient } from '@/components/articles/articles-grid-client'
import { PageHeader } from '@/components/ui/page-header'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Articles - TELOS MAED',
  description: 'Explore our collection of faith-based articles covering leadership, personal growth, and spiritual insights.',
}

async function getAllContent() {
  try {
    const [articles, poems] = await Promise.all([
      db.article.findMany({
        where: { published: true },
        include: {
          author: { select: { id: true, name: true, avatar: true } },
          _count: { select: { comments: true, articleLikes: true, bookmarks: true } },
        },
        orderBy: { publishedAt: 'desc' },
      }),
      db.poem.findMany({
        where: { published: true },
        include: {
          author: { select: { id: true, name: true, avatar: true } },
          _count: { select: { comments: true } },
        },
        orderBy: { publishedAt: 'desc' },
      }),
    ])

    const mappedArticles = articles.map(a => ({
      id: a.id,
      title: a.title,
      titleAm: (a as any).titleAm || null,
      slug: a.slug,
      excerpt: a.excerpt || null,
      excerptAm: (a as any).excerptAm || null,
      category: a.category,
      featured: a.featured,
      publishedAt: a.publishedAt?.toISOString() || null,
      createdAt: a.createdAt.toISOString(),
      coverImage: (a as any).coverImage || null,
      author: a.author,
      _count: a._count,
      isPoem: false,
    }))

    const mappedPoems = poems.map(p => ({
      id: p.id,
      title: p.title,
      titleAm: (p as any).titleAm || null,
      slug: p.slug,
      excerpt: null,
      excerptAm: null,
      category: 'POETRY',
      featured: p.featured,
      publishedAt: p.publishedAt?.toISOString() || null,
      createdAt: p.createdAt.toISOString(),
      coverImage: null,
      author: p.author,
      _count: { comments: p._count.comments, articleLikes: 0, bookmarks: 0 },
      isPoem: true,
    }))

    return [...mappedArticles, ...mappedPoems].sort((a, b) => {
      const dateA = new Date(a.publishedAt || a.createdAt).getTime()
      const dateB = new Date(b.publishedAt || b.createdAt).getTime()
      return dateB - dateA
    })
  } catch (error) {
    console.error('Failed to fetch content:', error)
    return []
  }
}

export default async function ArticlesPage() {
  const content = await getAllContent()

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Articles"
        description="Explore our collection of faith-based articles covering leadership, personal growth, and spiritual insights."
      />

      <div className="container-responsive padding-responsive-lg">
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Suspense fallback={<div className="text-sm text-gray-400">Loading filters...</div>}>
              <ArticlesFilters />
            </Suspense>
          </div>

          {/* Articles Grid */}
          <div className="lg:col-span-3">
            <ArticlesGridClient content={content as any} />
          </div>
        </div>
      </div>
    </div>
  )
}
