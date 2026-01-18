'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  SparklesIcon,
  EyeIcon,
  CheckCircleIcon,
  XMarkIcon,
  GlobeAltIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'

interface PoemEditorProps {
  poemId?: string
}

export function PoemEditor({ poemId }: PoemEditorProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isPreview, setIsPreview] = useState(false)
  const [languageMode, setLanguageMode] = useState<'english' | 'amharic' | 'bilingual'>('bilingual')

  const [formData, setFormData] = useState({
    title: '',
    titleAm: '',
    slug: '',
    content: '',
    contentAm: '',
    featured: false,
    published: true,
    authorId: '',
    authorName: '',
  })

  // Fetch poem data if editing
  useEffect(() => {
    if (poemId) {
      fetchPoem()
    }
  }, [poemId])

  const fetchPoem = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/poems/id/${poemId}`)
      if (!response.ok) throw new Error('Failed to fetch poem')
      const poem = await response.json()
      
      setFormData({
        title: poem.title || '',
        titleAm: poem.titleAm || '',
        slug: poem.slug || '',
        content: poem.content || '',
        contentAm: poem.contentAm || '',
        featured: poem.featured || false,
        published: poem.published || false,
        authorId: poem.author?.id || '',
        authorName: poem.author?.name || '',
      })

      // Detect language mode
      if (poem.titleAm || poem.contentAm) {
        if (poem.title || poem.content) {
          setLanguageMode('bilingual')
        } else {
          setLanguageMode('amharic')
        }
      } else {
        setLanguageMode('english')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load poem')
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: !poemId ? generateSlug(title) : prev.slug
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Handle author - always create or find by name
      let authorId = formData.authorId
      
      if (formData.authorName && !authorId) {
        // Try to find existing author by name first
        const existingAuthorsResponse = await fetch('/api/users')
        if (existingAuthorsResponse.ok) {
          const existingAuthors = await existingAuthorsResponse.json()
          const foundAuthor = existingAuthors.find((a: any) => 
            a.name.toLowerCase() === formData.authorName.toLowerCase()
          )
          if (foundAuthor) {
            authorId = foundAuthor.id
          }
        }
        
        // If not found, create new author
        if (!authorId) {
          const authorResponse = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: formData.authorName,
              email: `${formData.authorName.toLowerCase().replace(/\s+/g, '.')}@telosmaed.com`,
              role: 'CONTRIBUTOR'
            })
          })
          
          if (authorResponse.ok) {
            const newAuthor = await authorResponse.json()
            authorId = newAuthor.id
          }
        }
      }

      if (!authorId) {
        throw new Error('Please enter an author name')
      }

      // Prepare data based on language mode
      const submitData: any = {
        slug: formData.slug || generateSlug(formData.title || formData.titleAm || ''),
        featured: formData.featured,
        published: formData.published,
        authorId,
      }

      // Add content based on language mode
      if (languageMode === 'english') {
        submitData.title = formData.title
        submitData.content = formData.content
        submitData.titleAm = null
        submitData.contentAm = null
      } else if (languageMode === 'amharic') {
        submitData.title = null
        submitData.content = null
        submitData.titleAm = formData.titleAm
        submitData.contentAm = formData.contentAm
      } else {
        // bilingual
        submitData.title = formData.title
        submitData.content = formData.content
        submitData.titleAm = formData.titleAm
        submitData.contentAm = formData.contentAm
      }

      const url = poemId ? `/api/poems/id/${poemId}` : '/api/poems'
      const method = poemId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save poem')
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/admin?tab=poetry')
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save poem')
    } finally {
      setLoading(false)
    }
  }

  if (loading && poemId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/admin?tab=poetry')}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Poetry Management
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {poemId ? 'Edit Poem' : 'Create New Poem'}
          </h1>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center">
            <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
            <span className="text-green-700 dark:text-green-300">
              Poem saved successfully! Redirecting...
            </span>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center">
            <XMarkIcon className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
            <span className="text-red-700 dark:text-red-300">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Language Mode Selector */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
              <GlobeAltIcon className="w-5 h-5 inline mr-2" />
              Language Mode
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="english"
                  checked={languageMode === 'english'}
                  onChange={(e) => setLanguageMode(e.target.value as any)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">English Only</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="amharic"
                  checked={languageMode === 'amharic'}
                  onChange={(e) => setLanguageMode(e.target.value as any)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Amharic Only</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="bilingual"
                  checked={languageMode === 'bilingual'}
                  onChange={(e) => setLanguageMode(e.target.value as any)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Bilingual</span>
              </label>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Basic Information
            </h2>

            {/* English Title */}
            {(languageMode === 'english' || languageMode === 'bilingual') && (
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Title (English) *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required={languageMode === 'english' || languageMode === 'bilingual'}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Enter poem title"
                />
              </div>
            )}

            {/* Amharic Title */}
            {(languageMode === 'amharic' || languageMode === 'bilingual') && (
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Title (Amharic) {languageMode === 'amharic' && '*'}
                </label>
                <input
                  type="text"
                  value={formData.titleAm}
                  onChange={(e) => setFormData(prev => ({ ...prev, titleAm: e.target.value }))}
                  required={languageMode === 'amharic'}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="የግጥሙ ርዕስ"
                />
              </div>
            )}

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                URL Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="poem-url-slug"
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                Author Name *
              </label>
              <input
                type="text"
                value={formData.authorName}
                onChange={(e) => setFormData(prev => ({ ...prev, authorName: e.target.value }))}
                required
                placeholder="Enter author name"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Poem Content
            </h2>

            {/* English Content */}
            {(languageMode === 'english' || languageMode === 'bilingual') && (
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Content (English) *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  required={languageMode === 'english' || languageMode === 'bilingual'}
                  rows={15}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-serif"
                  placeholder="Enter your poem here..."
                />
              </div>
            )}

            {/* Amharic Content */}
            {(languageMode === 'amharic' || languageMode === 'bilingual') && (
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Content (Amharic) {languageMode === 'amharic' && '*'}
                </label>
                <textarea
                  value={formData.contentAm}
                  onChange={(e) => setFormData(prev => ({ ...prev, contentAm: e.target.value }))}
                  required={languageMode === 'amharic'}
                  rows={15}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-serif"
                  placeholder="ግጥምዎን እዚህ ያስገቡ..."
                />
              </div>
            )}
          </div>

          {/* Publishing Options */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Publishing Options
            </h2>

            <div className="flex items-center space-x-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Featured</span>
              </label>

              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Published</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/admin?tab=poetry')}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircleIcon className="w-5 h-5 mr-2" />
                  {poemId ? 'Update Poem' : 'Create Poem'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
