import { Metadata } from 'next'
import { PoemEditor } from '@/components/admin/poem-editor'

export const metadata: Metadata = {
  title: 'Edit Poem - Admin',
  description: 'Edit poem',
}

export default function EditPoemPage({ params }: { params: { id: string } }) {
  return <PoemEditor poemId={params.id} />
}
