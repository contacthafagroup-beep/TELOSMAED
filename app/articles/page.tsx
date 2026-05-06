import { Metadata } from 'next'
import { Suspense } from 'react'
import { ArticlesFilters } from '@/components/articles/articles-filters'
import { ArticlesGridClient } from '@/components/articles/articles-grid-client'
import { PageHeader } from '@/components/ui/page-header'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Articles - TELOS MAED',
  description: 'Explore our collection of faith-based articles covering leadership, personal growth, and spiritual insights.',
}

export default function ArticlesPage() {
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

          {/* Articles Grid — fetches its own data client-side like the home page */}
          <div className="lg:col-span-3">
            <Suspense fallback={<div className="text-sm text-gray-400">Loading articles...</div>}>
              <ArticlesGridClient />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
