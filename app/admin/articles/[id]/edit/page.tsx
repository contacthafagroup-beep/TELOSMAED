'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { ArticleEditor } from '@/components/admin/article-editor'

export default function EditArticlePage() {
  const params = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/articles/id/${params.id}`)
        if (!response.ok) throw new Error('Failed to fetch article')
        const data = await response.json()
        setArticle(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchArticle()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <p>Error: {error}</p>
        </div>
        <a href="/admin/articles" className="btn-primary">
          Back to Articles
        </a>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Edit Article</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Update your article content and settings
        </p>
      </div>
      <ArticleEditor article={article} />
    </div>
  )
}
