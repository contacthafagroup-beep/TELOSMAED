import { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { PoetryGridClient } from '@/components/poetry/poetry-grid-client'
import { db } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Poetry - TELOS MAED',
  description: 'Discover spiritual poetry and worship writing that inspires and uplifts the soul.',
}

async function getPoems() {
  try {
    const poems = await db.poem.findMany({
      where: { published: true },
      include: {
        author: {
          select: { id: true, name: true, avatar: true, bio: true },
        },
        _count: {
          select: { comments: true, poemLikes: true, bookmarks: true },
        },
      },
      orderBy: { publishedAt: 'desc' },
    })
    return poems
  } catch (error) {
    console.error('Failed to fetch poems:', error)
    return []
  }
}

export default async function PoetryPage() {
  const poems = await getPoems()

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="ግጥም"
        subtitle="Poetry"
        description="Discover spiritual poetry and worship writing that inspires and uplifts the soul."
      />
      <div className="container-responsive padding-responsive-lg">
        <PoetryGridClient poems={poems} />
      </div>
    </div>
  )
}
