import { Metadata } from 'next'
import { PoetryGrid } from '@/components/poetry/poetry-grid'
import { PageHeader } from '@/components/ui/page-header'

export const metadata: Metadata = {
  title: 'Poetry - TELOS MAED',
  description: 'Discover spiritual poetry and worship writing that inspires and uplifts the soul.',
}

export default function PoetryPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageHeader
        title="ግጥም"
        subtitle="Poetry"
        description="Discover spiritual poetry and worship writing that inspires and uplifts the soul."
      />
      
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <PoetryGrid />
      </div>
    </div>
  )
}