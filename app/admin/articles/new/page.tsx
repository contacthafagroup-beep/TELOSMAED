import { ArticleEditor } from '@/components/admin/article-editor'

export default function NewArticlePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Create New Article</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Write and publish a new article for TELOS MAED
        </p>
      </div>
      <ArticleEditor />
    </div>
  )
}
