'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  BookmarkIcon,
  ShareIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  LanguageIcon
} from '@heroicons/react/24/outline'
import { useAdminArticles, useContentActions } from '@/lib/hooks/use-admin-api'
import { api } from '@/lib/api-client'

const categoryColors = {
  EDITORIAL: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  PERSONAL: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  LEADERSHIP: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
  POETRY: 'bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-400'
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'published': return 'text-green-600 bg-green-100'
    case 'draft': return 'text-gray-600 bg-gray-100'
    case 'review': return 'text-yellow-600 bg-yellow-100'
    default: return 'text-gray-600 bg-gray-100'
  }
}

export function ArticlesManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'views' | 'likes'>('newest')

  const { data: articles, loading, error, refetch } = useAdminArticles({ 
    status: statusFilter === 'all' ? undefined : statusFilter,
    limit: 100 
  })
  const contentActions = useContentActions()

  // Filter and sort articles
  const filteredArticles = articles?.filter((article: any) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.titleAm?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter
    return matchesSearch && matchesCategory
  }).sort((a: any, b: any) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime()
      case 'oldest':
        return new Date(a.publishedAt || a.createdAt).getTime() - new Date(b.publishedAt || b.createdAt).getTime()
      case 'views':
        return b.views - a.views
      case 'likes':
        return b.likes - a.likes
      default:
        return 0
    }
  }) || []

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      try {
        const response = await fetch(`/api/articles/id/${id}`, { method: 'DELETE' })
        if (!response.ok) throw new Error('Failed to delete article')
        refetch()
      } catch (error) {
        console.error('Delete error:', error)
        alert('Failed to delete article')
      }
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse mb-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <XCircleIcon className="h-12 w-12 mx-auto mb-2" />
          <p>Error loading articles: {error}</p>
        </div>
        <button onClick={refetch} className="btn-primary">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Articles Management</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {filteredArticles.length} articles found
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          New Article
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Articles</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{articles?.length || 0}</p>
            </div>
            <CheckCircleIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Published</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {articles?.filter((a: any) => a.published).length || 0}
              </p>
            </div>
            <CheckCircleIcon className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Drafts</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {articles?.filter((a: any) => !a.published).length || 0}
              </p>
            </div>
            <ClockIcon className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Views</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {articles?.reduce((sum: number, a: any) => sum + a.views, 0).toLocaleString() || 0}
              </p>
            </div>
            <EyeIcon className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="all">All Categories</option>
            <option value="EDITORIAL">Editorial</option>
            <option value="PERSONAL">Personal Growth</option>
            <option value="LEADERSHIP">Leadership</option>
            <option value="POETRY">Poetry</option>
          </select>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="views">Most Viewed</option>
            <option value="likes">Most Liked</option>
          </select>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article: any) => (
          <div key={article.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-200">
            {/* Cover Image */}
            <div className="aspect-[16/9] relative overflow-hidden bg-gray-200 dark:bg-gray-700">
              {article.coverImage ? (
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  article.category === 'EDITORIAL' ? 'from-blue-400 to-blue-600' :
                  article.category === 'PERSONAL' ? 'from-green-400 to-green-600' :
                  article.category === 'LEADERSHIP' ? 'from-purple-400 to-purple-600' :
                  'from-rose-400 to-rose-600'
                } flex items-center justify-center`}>
                  <span className="text-4xl text-white/80">
                    {article.category === 'EDITORIAL' ? '✍️' :
                     article.category === 'PERSONAL' ? '🌱' :
                     article.category === 'LEADERSHIP' ? '👑' : '🎭'}
                  </span>
                </div>
              )}
              
              {/* Status Badge */}
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(article.published ? 'published' : 'draft')}`}>
                  {article.published ? 'Published' : 'Draft'}
                </span>
              </div>

              {/* Featured Badge */}
              {article.featured && (
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-semibold">
                    Featured
                  </span>
                </div>
              )}

              {/* Bilingual Indicator */}
              {article.titleAm && article.title && (
                <div className="absolute bottom-2 right-2">
                  <span className="px-2 py-1 bg-blue-500 text-white rounded-full text-xs font-medium flex items-center">
                    <LanguageIcon className="w-3 h-3 mr-1" />
                    EN+አማ
                  </span>
                </div>
              )}
              {article.titleAm && !article.title && (
                <div className="absolute bottom-2 right-2">
                  <span className="px-2 py-1 bg-green-500 text-white rounded-full text-xs font-medium flex items-center">
                    <LanguageIcon className="w-3 h-3 mr-1" />
                    አማርኛ
                  </span>
                </div>
              )}
              {!article.titleAm && article.title && (
                <div className="absolute bottom-2 right-2">
                  <span className="px-2 py-1 bg-purple-500 text-white rounded-full text-xs font-medium flex items-center">
                    <LanguageIcon className="w-3 h-3 mr-1" />
                    EN
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Category */}
              <div className="mb-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${categoryColors[article.category as keyof typeof categoryColors]}`}>
                  {article.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                {article.title || article.titleAm}
              </h3>

              {/* Amharic Title (if bilingual) */}
              {article.titleAm && article.title && (
                <h4 className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-1" dir="rtl">
                  {article.titleAm}
                </h4>
              )}

              {/* Author & Date */}
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                <span className="font-medium">{article.author.name}</span>
                <span className="mx-2">•</span>
                <span>{new Date(article.publishedAt || article.createdAt).toLocaleDateString()}</span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-2 mb-3 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <EyeIcon className="w-3 h-3 mr-1" />
                  {article.views}
                </div>
                <div className="flex items-center">
                  <HeartIcon className="w-3 h-3 mr-1" />
                  {article.likes}
                </div>
                <div className="flex items-center">
                  <ChatBubbleLeftIcon className="w-3 h-3 mr-1" />
                  {article._count.comments}
                </div>
                <div className="flex items-center">
                  <ShareIcon className="w-3 h-3 mr-1" />
                  {article.shares}
                </div>
              </div>

              {/* Tags */}
              {article.tags && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {api.parseTags(article.tags).slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <Link
                    href={`/articles/${article.slug}`}
                    target="_blank"
                    className="p-2 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    title="View"
                  >
                    <EyeIcon className="w-4 h-4" />
                  </Link>
                  <Link
                    href={`/admin/articles/${article.id}/edit`}
                    className="p-2 text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                    title="Edit"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(article.id)}
                    disabled={contentActions.loading}
                    className="p-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
                {article.readTime && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {article.readTime} min read
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <CheckCircleIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No articles found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
              ? 'Try adjusting your filters'
              : 'Get started by creating your first article'}
          </p>
          <Link href="/admin/articles/new" className="btn-primary">
            <PlusIcon className="w-5 h-5 mr-2 inline" />
            Create Article
          </Link>
        </div>
      )}

      {/* Action Feedback */}
      {contentActions.error && (
        <div className="fixed bottom-4 right-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-lg">
          {contentActions.error}
        </div>
      )}

      {contentActions.success && (
        <div className="fixed bottom-4 right-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg shadow-lg">
          Action completed successfully!
        </div>
      )}
    </div>
  )
}
