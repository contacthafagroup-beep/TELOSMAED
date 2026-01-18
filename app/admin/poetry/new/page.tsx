import { Metadata } from 'next'
import { PoemEditor } from '@/components/admin/poem-editor'

export const metadata: Metadata = {
  title: 'New Poem - Admin',
  description: 'Create a new poem',
}

export default function NewPoemPage() {
  return <PoemEditor />
}
