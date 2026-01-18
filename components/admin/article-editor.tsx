'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  DocumentTextIcon,
  PhotoIcon,
  EyeIcon,
  CheckCircleIcon,
  XMarkIcon,
  TagIcon,
  SparklesIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

interface ArticleEditorProps {
  article?: any
}

export function ArticleEditor({ article }: ArticleEditorProps) {
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
    excerpt: '',
    excerptAm: '',
    content: '',
    contentAm: '',
    category: 'EDITORIAL',
    tags: '',
    coverImage: '',
    mediaUrl: '',
    videoUrl: '',
    audioUrl: '',
    documentUrl: '',
    featured: false,
    published: true,
    seoTitle: '',
    seoDescription: '',
    authorName: '',
  })

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title || '',
        titleAm: article.titleAm || '',
        slug: article.slug || '',
        excerpt: article.excerpt || '',
        excerptAm: article.excerptAm || '',
        content: article.content || '',
        contentAm: article.contentAm || '',
        category: article.category || 'EDITORIAL',
        tags: article.tags || '',
        coverImage: article.coverImage || '',
        mediaUrl: article.mediaUrl || '',
        videoUrl: article.videoUrl || '',
        audioUrl: article.audioUrl || '',
        documentUrl: article.documentUrl || '',
        featured: article.featured || false,
        published: article.published || false,
        seoTitle: article.seoTitle || '',
        seoDescription: article.seoDescription || '',
        authorName: article.author?.name || '',
      })
      // Check if article has Amharic content
      if (article.titleAm || article.excerptAm || article.contentAm) {
        if (article.title || article.excerpt || article.content) {
          setLanguageMode('bilingual')
        } else {
          setLanguageMode('amharic')
        }
      } else {
        setLanguageMode('english')
      }
    }
  }, [article])

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
      slug: !article ? generateSlug(title) : prev.slug
    }))
  }

  const handleTitleAmChange = (titleAm: string) => {
    setFormData(prev => ({
      ...prev,
      titleAm,
      // Generate slug from Amharic title if in Amharic-only mode and no slug exists
      slug: !article && languageMode === 'amharic' && !prev.slug 
        ? `article-${Date.now()}` 
        : prev.slug
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validate author name
      if (!formData.authorName || formData.authorName.trim() === '') {
        throw new Error('Author name is required. Please enter the author name.')
      }

      // Get or create author
      let authorId = ''
      
      try {
        // Try to find existing user with this name
        const usersResponse = await fetch('/api/users')
        
        if (!usersResponse.ok) {
          console.error('Failed to fetch users:', usersResponse.status)
          throw new Error('Failed to fetch users from the system.')
        }

        const responseText = await usersResponse.text()
        const users = responseText ? JSON.parse(responseText) : []
        
        const existingUser = users.find((u: any) => 
          u.name.toLowerCase().trim() === formData.authorName.toLowerCase().trim()
        )
        
        if (existingUser) {
          authorId = existingUser.id
          console.log('Using existing author:', existingUser.name)
        } else {
          // Create new user with this name
          console.log('Creating new author:', formData.authorName)
          const createUserResponse = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: formData.authorName.trim(),
              email: `${formData.authorName.toLowerCase().trim().replace(/\s+/g, '.')}@telosmaed.com`,
              role: 'AUTHOR'
            })
          })
          
          if (!createUserResponse.ok) {
            const errorText = await createUserResponse.text()
            console.error('Failed to create author:', errorText)
            throw new Error(`Failed to create author: ${errorText || 'Unknown error'}`)
          }

          const createResponseText = await createUserResponse.text()
          const newUser = createResponseText ? JSON.parse(createResponseText) : null
          
          if (newUser && newUser.id) {
            authorId = newUser.id
            console.log('Created new author with ID:', authorId)
          } else {
            throw new Error('Failed to create author: Invalid response from server')
          }
        }
      } catch (err: any) {
        console.error('Error handling author:', err)
        throw new Error(`Author error: ${err.message}`)
      }

      if (!authorId) {
        throw new Error('Unable to create or find author. Please try again.')
      }

      // Prepare data based on language mode
      const dataToSend: any = {
        slug: formData.slug,
        category: formData.category,
        tags: formData.tags,
        coverImage: formData.coverImage,
        mediaUrl: formData.mediaUrl || undefined,
        videoUrl: formData.videoUrl || undefined,
        audioUrl: formData.audioUrl || undefined,
        documentUrl: formData.documentUrl || undefined,
        featured: formData.featured,
        published: formData.published,
        seoTitle: formData.seoTitle,
        seoDescription: formData.seoDescription,
        authorId,
      }

      // Add language-specific fields based on mode
      if (languageMode === 'english') {
        // English-only mode
        dataToSend.title = formData.title
        dataToSend.excerpt = formData.excerpt || undefined
        dataToSend.content = formData.content
        // For English-only, we still need to provide title/content but can omit Amharic
        dataToSend.titleAm = undefined
        dataToSend.excerptAm = undefined
        dataToSend.contentAm = undefined
      } else if (languageMode === 'amharic') {
        // Amharic-only mode - use Amharic for both fields since title/content are required
        dataToSend.title = formData.titleAm // Use Amharic title as fallback for required title field
        dataToSend.titleAm = formData.titleAm
        dataToSend.excerpt = formData.excerptAm || undefined
        dataToSend.excerptAm = formData.excerptAm || undefined
        dataToSend.content = formData.contentAm // Use Amharic content as fallback for required content field
        dataToSend.contentAm = formData.contentAm
      } else {
        // Bilingual mode - include both
        dataToSend.title = formData.title || undefined
        dataToSend.titleAm = formData.titleAm || undefined
        dataToSend.excerpt = formData.excerpt || undefined
        dataToSend.excerptAm = formData.excerptAm || undefined
        dataToSend.content = formData.content || undefined
        dataToSend.contentAm = formData.contentAm || undefined
      }

      const url = article 
        ? `/api/articles/id/${article.id}`
        : '/api/articles'
      
      const method = article ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save article')
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/admin/articles')
      }, 1500)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Success Message */}
      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
          <CheckCircleIcon className="w-5 h-5 mr-2" />
          Article saved successfully! Redirecting...
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
          <XMarkIcon className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {article ? 'Edit Article' : 'New Article'}
          </h2>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setLanguageMode('english')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  languageMode === 'english'
                    ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguageMode('amharic')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  languageMode === 'amharic'
                    ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                አማርኛ
              </button>
              <button
                type="button"
                onClick={() => setLanguageMode('bilingual')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  languageMode === 'bilingual'
                    ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <GlobeAltIcon className="w-4 h-4 inline mr-1" />
                Both
              </button>
            </div>
            <button
              type="button"
              onClick={() => setIsPreview(!isPreview)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <EyeIcon className="w-4 h-4 mr-2" />
              {isPreview ? 'Edit' : 'Preview'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin/articles')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <XMarkIcon className="w-4 h-4 mr-2" />
              Cancel
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {!isPreview ? (
                <>
                  {/* Title - English */}
                  {(languageMode === 'english' || languageMode === 'bilingual') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Title * {languageMode === 'bilingual' && <span className="text-xs text-gray-500">(English)</span>}
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        placeholder="Enter article title..."
                        required={languageMode !== 'amharic'}
                      />
                    </div>
                  )}

                  {/* Title - Amharic */}
                  {(languageMode === 'amharic' || languageMode === 'bilingual') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        ርዕስ * {languageMode === 'bilingual' && <span className="text-xs text-gray-500">(Amharic)</span>}
                      </label>
                      <input
                        type="text"
                        value={formData.titleAm}
                        onChange={(e) => handleTitleAmChange(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        placeholder="የጽሑፍ ርዕስ..."
                        required={languageMode === 'amharic'}
                      />
                    </div>
                  )}

                  {/* Slug */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono text-sm"
                      placeholder="article-url-slug"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      URL: /articles/{formData.slug || 'article-url-slug'}
                    </p>
                  </div>

                  {/* Excerpt - English */}
                  {(languageMode === 'english' || languageMode === 'bilingual') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Excerpt {languageMode === 'bilingual' && <span className="text-xs text-gray-500">(English - Optional)</span>}
                      </label>
                      <textarea
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        placeholder="Brief summary of the article..."
                      />
                    </div>
                  )}

                  {/* Excerpt - Amharic */}
                  {(languageMode === 'amharic' || languageMode === 'bilingual') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        አጭር ማጠቃለያ {languageMode === 'bilingual' && <span className="text-xs text-gray-500">(Amharic - Optional)</span>}
                      </label>
                      <textarea
                        value={formData.excerptAm}
                        onChange={(e) => setFormData({ ...formData, excerptAm: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        placeholder="የጽሑፉ አጭር ማጠቃለያ..."
                      />
                    </div>
                  )}

                  {/* Content - English */}
                  {(languageMode === 'english' || languageMode === 'bilingual') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Content * {languageMode === 'bilingual' && <span className="text-xs text-gray-500">(English)</span>}
                      </label>
                      <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        rows={20}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono text-sm"
                        placeholder="Write your article content here... (Markdown supported)"
                        required={languageMode !== 'amharic'}
                      />
                    </div>
                  )}

                  {/* Content - Amharic */}
                  {(languageMode === 'amharic' || languageMode === 'bilingual') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        ይዘት * {languageMode === 'bilingual' && <span className="text-xs text-gray-500">(Amharic)</span>}
                      </label>
                      <textarea
                        value={formData.contentAm}
                        onChange={(e) => setFormData({ ...formData, contentAm: e.target.value })}
                        rows={20}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        placeholder="የጽሑፉን ይዘት እዚህ ይጻፉ..."
                        required={languageMode === 'amharic'}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="prose dark:prose-invert max-w-none">
                  {(languageMode === 'english' || languageMode === 'bilingual') && formData.title && (
                    <h1>{formData.title}</h1>
                  )}
                  {(languageMode === 'amharic' || languageMode === 'bilingual') && formData.titleAm && (
                    <h2 dir="rtl" className={languageMode === 'bilingual' ? 'text-gray-600' : ''}>{formData.titleAm}</h2>
                  )}
                  {(languageMode === 'english' || languageMode === 'bilingual') && formData.excerpt && (
                    <p className="lead">{formData.excerpt}</p>
                  )}
                  {(languageMode === 'amharic' || languageMode === 'bilingual') && formData.excerptAm && (
                    <p className="lead" dir="rtl">{formData.excerptAm}</p>
                  )}
                  {(languageMode === 'english' || languageMode === 'bilingual') && formData.content && (
                    <div className="whitespace-pre-wrap">{formData.content}</div>
                  )}
                  {(languageMode === 'amharic' || languageMode === 'bilingual') && formData.contentAm && (
                    <div className={languageMode === 'bilingual' ? 'mt-8 pt-8 border-t' : ''}>
                      <div className="whitespace-pre-wrap" dir="rtl">{formData.contentAm}</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publish Actions */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Publish</h3>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50"
                >
                  {loading ? 'Saving...' : article ? 'Update Article' : 'Publish Article'}
                </button>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  required
                >
                  <option value="EDITORIAL">Editorial</option>
                  <option value="PERSONAL">Personal Growth</option>
                  <option value="LEADERSHIP">Leadership</option>
                  <option value="POETRY">Poetry</option>
                </select>
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Author Name *
                </label>
                <input
                  type="text"
                  value={formData.authorName}
                  onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Enter author name..."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  The name of the person who wrote this article
                </p>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                  <TagIcon className="w-4 h-4 mr-2" />
                  Tags
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="faith, leadership, growth"
                />
                <p className="text-xs text-gray-500 mt-1">Comma-separated tags</p>
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                  <PhotoIcon className="w-4 h-4 mr-2" />
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="https://..."
                />
              </div>

              {/* Additional Media */}
              <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Additional Media</h4>
                
                {/* General Media URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Media URL
                  </label>
                  <input
                    type="url"
                    value={formData.mediaUrl}
                    onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                    placeholder="https://..."
                  />
                  <p className="text-xs text-gray-500 mt-1">General media or image URL</p>
                </div>

                {/* Video URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Video URL
                  </label>
                  <input
                    type="url"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                    placeholder="https://youtube.com/..."
                  />
                  <p className="text-xs text-gray-500 mt-1">YouTube, Vimeo, or direct video URL</p>
                </div>

                {/* Audio URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Audio URL
                  </label>
                  <input
                    type="url"
                    value={formData.audioUrl}
                    onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                    placeholder="https://..."
                  />
                  <p className="text-xs text-gray-500 mt-1">Podcast or audio file URL</p>
                </div>

                {/* Document URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Document URL
                  </label>
                  <input
                    type="url"
                    value={formData.documentUrl}
                    onChange={(e) => setFormData({ ...formData, documentUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                    placeholder="https://..."
                  />
                  <p className="text-xs text-gray-500 mt-1">PDF, study guide, or document URL</p>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 flex items-center">
                    <SparklesIcon className="w-4 h-4 mr-1" />
                    Featured Article
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 flex items-center">
                    <CheckCircleIcon className="w-4 h-4 mr-1" />
                    Publish Immediately
                  </span>
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
