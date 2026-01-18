import { Metadata } from 'next'
import { Suspense } from 'react'
import { ArticlesGrid } from '@/components/articles/articles-grid'
import { ArticlesFilters } from '@/components/articles/articles-filters'
import { PageHeader } from '@/components/ui/page-header'

export const metadata: Metadata = {
  title: 'Articles - TELOS MAED',
  description: 'Explore our collection of faith-based articles covering leadership, personal growth, and spiritual insights.',
}

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageHeader
        title="Articles"
        description="Explore our collection of faith-based articles covering leadership, personal growth, and spiritual insights."
      />
      
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Suspense fallback={<div>Loading filters...</div>}>
              <ArticlesFilters />
            </Suspense>
          </div>
          
          {/* Articles Grid */}
          <div className="mt-8 lg:mt-0 lg:col-span-3">
            <Suspense fallback={<div>Loading articles...</div>}>
              <ArticlesGrid />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}