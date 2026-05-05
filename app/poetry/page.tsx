import { Metadata } from 'next'
import { PoetryGrid } from '@/components/poetry/poetry-grid'
import { PageHeader } from '@/components/ui/page-header'

export const metadata: Metadata = {
  title: 'Poetry - TELOS MAED',
  description: 'Discover spiritual poetry and worship writing that inspires and uplifts the soul.',
}

export default function PoetryPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="ግጥም"
        subtitle="Poetry"
        description="Discover spiritual poetry and worship writing that inspires and uplifts the soul."
      />
      
      <div className="container-responsive padding-responsive-lg">
        <PoetryGrid />
      </div>
    </div>
  )
}