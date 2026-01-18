'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  SparklesIcon,
  LanguageIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'
import { useAdminPoems, useContentActions } from '@/lib/hooks/use-admin-api'

const getStatusColor = (status: string) => {
  switch (status) {
    case 'published': return 'text-green-600 bg-green-100'
    case 'draft': return 'text-gray-600 bg-gray-100'
    default: return 'text-gray-600 bg-gray-100'
  }
}

const getAvatarGradient = (name: string) => {
  const gradients = [
    'from-rose-500 to-pink-600',
    'from-purple-500 to-indigo-600', 
    'from-blue-500 to-cyan-600',
    'from-green-500 to-emerald-600',
  ]
  const index = name.length % gradients.length
  return gradients[index]
}

export function PoetryManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'views' | 'likes'>('newest')

  const { data: poems, loading, error, refetch } = useAdminPoems({ 
    status: statusFilter === 'all' ? undefined : statusFilter,
    limit: 100 
  })
  const contentActions = useContentActions()

  // Filter and sort poems
  const filteredPoems = poems?.filter(poem => {
    const matchesSearch = poem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         poem.titleAm?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         poem.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  }).sort((a, b) => {
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
    if (confirm('Are you sure you want to delete this poem?')) {
      await contentActions.deletePoem(id)
      if (contentActions.success) {
        refetch()
      }
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-pulse">
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
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
          <p>Error loading poetry: {error}</p>
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Poetry Management</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {filteredPoems.length} poems found
          </p>
        </div>
        <Link
          href="/admin/poetry/new"
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          New Poem
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Poems</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{poems?.length || 0}</p>
            </div>
            <SparklesIcon className="w-8 h-8 text-rose-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Published</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {poems?.filter(p => p.published).length || 0}
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
                {poems?.filter(p => !p.published).length || 0}
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
                {poems?.reduce((sum, p) => sum + p.views, 0).toLocaleString() || 0}
              </p>
            </div>
            <EyeIcon className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search poems..."
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

      {/* Poems Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPoems.map((poem) => (
          <div key={poem.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-200">
            {/* Header with gradient */}
            <div className={`relative p-6 bg-gradient-to-br ${getAvatarGradient(poem.author.name)} text-white`}>
              <div className="absolute inset-0 bg-black/10"></div>
              
              {/* Status Badge */}
              <div className="relative z-10 mb-4 flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(poem.published ? 'published' : 'draft')}`}>
                  {poem.published ? 'Published' : 'Draft'}
                </span>
                {poem.featured && (
                  <span className="px-2 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-semibold">
                    Featured
                  </span>
                )}
              </div>

              {/* Title */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2 line-clamp-2">
                  {poem.title}
                </h3>
                {poem.titleAm && (
                  <h4 className="text-lg text-white/90 mb-2 line-clamp-1" dir="rtl">
                    {poem.titleAm}
                  </h4>
                )}
                <p className="text-sm text-white/80">
                  by {poem.author.name}
                </p>
              </div>

              {/* Bilingual Indicator */}
              {poem.titleAm && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-medium flex items-center">
                    <LanguageIcon className="w-3 h-3 mr-1" />
                    አማ
                  </span>
                </div>
              )}
            </div>

            {/* Content Preview */}
            <div className="p-4">
              <div className="font-serif text-gray-700 dark:text-gray-300 text-sm leading-relaxed italic mb-4 line-clamp-4">
                {poem.content.split('\n').slice(0, 3).map((line, i) => (
                  <div key={i}>{line || '\u00A0'}</div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-2 mb-3 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <EyeIcon className="w-3 h-3 mr-1" />
                  {poem.views}
                </div>
                <div className="flex items-center">
                  <HeartIcon className="w-3 h-3 mr-1" />
                  {poem.likes}
                </div>
                <div className="flex items-center">
                  <ChatBubbleLeftIcon className="w-3 h-3 mr-1" />
                  {poem._count.comments}
                </div>
                <div className="flex items-center">
                  <ShareIcon className="w-3 h-3 mr-1" />
                  {poem.shares}
                </div>
              </div>

              {/* Type & Date */}
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                <span className="px-2 py-1 bg-rose-100 dark:bg-rose-900/20 text-rose-800 dark:text-rose-400 rounded-full">
                  {poem.type || 'Poetry'}
                </span>
                <span>
                  {new Date(poem.publishedAt || poem.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <Link
                    href={`/poetry/${poem.slug}`}
                    target="_blank"
                    className="p-2 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    title="View"
                  >
                    <EyeIcon className="w-4 h-4" />
                  </Link>
                  <Link
                    href={`/admin/poetry/${poem.id}/edit`}
                    className="p-2 text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                    title="Edit"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(poem.id)}
                    disabled={contentActions.loading}
                    className="p-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPoems.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <SparklesIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No poems found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchTerm || statusFilter !== 'all'
              ? 'Try adjusting your filters'
              : 'Get started by creating your first poem'}
          </p>
          <Link href="/admin/poetry/new" className="btn-primary">
            <PlusIcon className="w-5 h-5 mr-2 inline" />
            Create Poem
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
