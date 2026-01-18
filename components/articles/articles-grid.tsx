'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  CalendarIcon, 
  ClockIcon, 
  UserIcon,
  EyeIcon,
  HeartIcon,
  BookmarkIcon,
  ChatBubbleLeftIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { CATEGORIES } from '@/types'
import { useArticles } from '@/lib/hooks/use-api'
import { api } from '@/lib/api-client'

// Utility functions for CSS-generated content
const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const getAvatarGradient = (name: string) => {
  const gradients = [
    'from-blue-500 to-blue-600',
    'from-green-500 to-green-600', 
    'from-purple-500 to-purple-600',
    'from-rose-500 to-rose-600',
    'from-amber-500 to-amber-600',
    'from-indigo-500 to-indigo-600',
    'from-teal-500 to-teal-600',
    'from-orange-500 to-orange-600'
  ]
  const index = name.length % gradients.length
  return gradients[index]
}

const categoryColors = {
  EDITORIAL: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  PERSONAL: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  LEADERSHIP: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
  POETRY: 'bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-400'
}

export function ArticlesGrid() {
  const { data: articles, loading, error } = useArticles()
  const searchParams = useSearchParams()
  
  // Get filter values from URL params
  const categoryFilter = searchParams.get('category') || ''
  const featuredFilter = searchParams.get('featured') === 'true'

  // Apply filters to articles
  const filteredArticles = useMemo(() => {
    if (!articles) return []
    
    return articles.filter(article => {
      // Category filter
      if (categoryFilter && article.category !== categoryFilter) {
        return false
      }
      
      // Featured filter
      if (featuredFilter && !article.featured) {
        return false
      }
      
      return true
    })
  }, [articles, categoryFilter, featuredFilter])

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-8"></div>
          <div className="grid gap-8 lg:grid-cols-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-2xl h-64"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 dark:text-red-400 mb-4">
          <BookmarkIcon className="h-12 w-12 mx-auto mb-2" />
          <p>Unable to load articles: {error}</p>
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12">
        <BookmarkIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          No articles found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Check back soon for new articles.
        </p>
      </div>
    )
  }

  if (filteredArticles.length === 0) {
    return (
      <div className="text-center py-12">
        <BookmarkIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          No articles match your filters
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your filters to see more articles.
        </p>
      </div>
    )
  }

  const getCategoryInfo = (categoryKey: string) => {
    return CATEGORIES.find(cat => cat.key === categoryKey)
  }

  return (
    <div className="space-y-8">
      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
        </p>
      </div>

      {/* Articles grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        {filteredArticles.map((article, index) => {
          const categoryInfo = getCategoryInfo(article.category)
          
          return (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="card card-hover p-0 overflow-hidden h-full flex flex-col">
                {/* Article Image/Header */}
                <div className="aspect-[16/9] relative overflow-hidden">
                  {article.coverImage ? (
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${
                      article.category === 'EDITORIAL' ? 'from-blue-400 via-blue-500 to-blue-600' :
                      article.category === 'PERSONAL' ? 'from-green-400 via-green-500 to-green-600' :
                      article.category === 'LEADERSHIP' ? 'from-purple-400 via-purple-500 to-purple-600' :
                      'from-rose-400 via-rose-500 to-rose-600'
                    }`}>
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-6">
                          <div className="text-4xl mb-2 text-white/80">
                            {article.category === 'EDITORIAL' ? '✍️' :
                             article.category === 'PERSONAL' ? '🌱' :
                             article.category === 'LEADERSHIP' ? '👑' : '🎭'}
                          </div>
                          <h3 className="text-lg font-bold text-white line-clamp-2">
                            {article.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${categoryColors[article.category as keyof typeof categoryColors]}`}>
                      {categoryInfo?.label || article.category}
                    </span>
                  </div>

                  {/* Featured Badge */}
                  {article.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-semibold rounded-full">
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Stats Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center justify-between text-white text-sm">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <EyeIcon className="h-4 w-4 mr-1" />
                          <span>{article.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center">
                          <HeartIconSolid className="h-4 w-4 mr-1 text-red-400" />
                          <span>{article.likes}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        <span>{article.readTime || 5} min</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {article.author.avatar ? (
                        <Image
                          src={article.author.avatar}
                          alt={article.author.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      ) : (
                        <div className={`w-8 h-8 bg-gradient-to-br ${getAvatarGradient(article.author.name)} rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md`}>
                          {getInitials(article.author.name)}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {article.author.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(article.publishedAt || article.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors duration-200">
                        <HeartIcon className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-yellow-500 transition-colors duration-200">
                        <BookmarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-display font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 line-clamp-2">
                    <Link href={`/articles/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>

                  {/* Amharic Title */}
                  {article.titleAm && (
                    <h3 className="text-lg text-gray-600 dark:text-gray-400 mb-3 line-clamp-1" dir="rtl">
                      {article.titleAm}
                    </h3>
                  )}
                  
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 flex-1 line-clamp-3">
                    {article.excerpt || 'Read this amazing article...'}
                  </p>

                  {/* Tags */}
                  {article.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {api.parseTags(article.tags).slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
                        <span>{article._count.comments}</span>
                      </div>
                      <div className="flex items-center">
                        <EyeIcon className="h-4 w-4 mr-1" />
                        <span>{Math.round(article.views / 1000)}k</span>
                      </div>
                    </div>
                    
                    <Link
                      href={`/articles/${article.slug}`}
                      className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors duration-200"
                    >
                      Read More
                      <ArrowRightIcon className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          )
        })}
      </div>

      {/* Load more button */}
      <div className="text-center">
        <button className="btn-secondary">
          Load More Articles
        </button>
      </div>
    </div>
  )
}