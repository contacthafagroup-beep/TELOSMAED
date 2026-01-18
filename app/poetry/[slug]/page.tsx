import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PoemDetail } from '@/components/poetry/poem-detail'

interface PoemPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PoemPageProps): Promise<Metadata> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/poems/${params.slug}`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      return {
        title: 'Poem Not Found - TELOS MAED',
      }
    }

    const poem = await response.json()

    return {
      title: `${poem.title || poem.titleAm} - TELOS MAED`,
      description: poem.content?.substring(0, 160) || poem.contentAm?.substring(0, 160) || 'Read this beautiful poem',
    }
  } catch (error) {
    return {
      title: 'Poem - TELOS MAED',
    }
  }
}

export default function PoemPage({ params }: PoemPageProps) {
  return <PoemDetail slug={params.slug} />
}
