'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  CalendarIcon,
  ClockIcon,
  ShareIcon,
  BookmarkIcon,
  HeartIcon,
  EyeIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'
import {
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid
} from '@heroicons/react/24/solid'

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  
  const [article, setArticle] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [likesCount, setLikesCount] = useState(0)

  useEffect(() => {
    async function fetchArticle() {
      try {
        setLoading(true)
        const res = await fetch(`/api/articles/${slug}`)
        
        if (!res.ok) {
          if (res.status === 404) {
            setError('Article not found')
          } else {
            setError('Failed to load article')
          }
          return
        }
        
        const data = await res.json()
        setArticle(data)
        setLikesCount(data.likes || 0)
      } catch (err) {
        console.error('Error fetching article:', err)
        setError('Failed to load article')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchArticle()
    }
  }, [slug])

  const handleLike = async () => {
    if (!article) return
    
    try {
      const res = await fetch(`/api/articles/${slug}/like`, {
        method: 'POST',
      })
      
      if (res.ok) {
        const data = await res.json()
        setLikesCount(data.likes)
        setLiked(true)
      }
    } catch (err) {
      console.error('Error liking article:', err)
    }
  }

  const handleSave = () => {
    setSaved(!saved)
    // TODO: Implement bookmark API
  }

  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title || article.titleAm,
          text: article.excerpt || article.excerptAm,
          url: window.location.href,
        })
      } catch (err) {
        console.error('Error sharing:', err)
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const categoryColors = {
    'EDITORIAL': 'bg-blue-100 text-blue-800',
    'PERSONAL': 'bg-green-100 text-green-800',
    'LEADERSHIP': 'bg-purple-100 text-purple-800',
    'POETRY': 'bg-rose-100 text-rose-800'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading article...</p>
        </div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Article Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error || 'The article you are looking for does not exist or has been removed.'}
          </p>
          <Link
            href="/articles"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Articles
          </Link>
        </div>
      </div>
    )
  }

  return (
    <article className="min-h-screen bg-white dark:bg-gray-900">
      {/* Back Button */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/articles"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Articles
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <header className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category & Date */}
          <div className="flex items-center space-x-4 mb-6">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${categoryColors[article.category as keyof typeof categoryColors]}`}>
              {article.category}
            </span>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <CalendarIcon className="h-4 w-4 mr-1" />
              {new Date(article.publishedAt || article.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <ClockIcon className="h-4 w-4 mr-1" />
              {article.readTime || 5} min read
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
            {article.title}
          </h1>

          {/* Amharic Title */}
          {article.titleAm && (
            <h2 className="text-3xl font-bold text-gray-600 dark:text-gray-400 mb-6">
              {article.titleAm}
            </h2>
          )}

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              {article.excerpt}
            </p>
          )}

          {/* Author Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {article.author.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {article.author.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {article.author.bio || 'TELOS MAED Contributor'}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <EyeIcon className="h-4 w-4 mr-1" />
                {article.views.toLocaleString()}
              </div>
              <div className="flex items-center">
                <HeartIcon className="h-4 w-4 mr-1" />
                {article.likes}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {article.coverImage && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="aspect-[16/9] relative rounded-2xl overflow-hidden">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Content Section */}
        <div className="mb-12">
          {/* Determine article language mode */}
          {(() => {
            const hasEnglishContent = article.content && article.title
            const hasAmharicContent = article.contentAm && article.titleAm
            
            // Check if content is identical (meaning it's single-language stored in both fields)
            const contentIsIdentical = article.content === article.contentAm
            const titleIsIdentical = article.title === article.titleAm
            
            // If content is identical, it's a single-language article
            const isBilingual = hasEnglishContent && hasAmharicContent && !contentIsIdentical && !titleIsIdentical
            const isAmharicOnly = hasAmharicContent && (contentIsIdentical || !hasEnglishContent)
            const isEnglishOnly = hasEnglishContent && !hasAmharicContent

            if (isBilingual) {
              // Show both with labels
              return (
                <>
                  {/* English Content */}
                  <div className="mb-12">
                    <div className="mb-4 pb-2 border-b border-gray-300 dark:border-gray-600">
                      <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                        English
                      </span>
                    </div>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <div className="whitespace-pre-wrap leading-relaxed text-gray-800 dark:text-gray-200">
                        {article.content}
                      </div>
                    </div>
                  </div>

                  {/* Amharic Content */}
                  <div className="mb-12 border-t-2 border-gray-300 dark:border-gray-600 pt-12">
                    <div className="mb-4 pb-2 border-b border-gray-300 dark:border-gray-600">
                      <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                        አማርኛ (Amharic)
                      </span>
                    </div>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <div className="whitespace-pre-wrap leading-relaxed text-gray-800 dark:text-gray-200">
                        {article.contentAm}
                      </div>
                    </div>
                  </div>
                </>
              )
            } else if (isAmharicOnly) {
              // Show only Amharic content (left-to-right)
              return (
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap leading-relaxed text-gray-800 dark:text-gray-200">
                    {article.contentAm || article.content}
                  </div>
                </div>
              )
            } else {
              // Show only English content
              return (
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap leading-relaxed text-gray-800 dark:text-gray-200">
                    {article.content}
                  </div>
                </div>
              )
            }
          })()}
        </div>

        {/* Tags */}
        {article.tags && (
          <div className="flex flex-wrap gap-2 mb-12 pb-12 border-b border-gray-200 dark:border-gray-700">
            {article.tags.split(',').map((tag: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full"
              >
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Share & Actions */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleLike}
              disabled={liked}
              className={`inline-flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                liked 
                  ? 'bg-red-500 text-white shadow-lg scale-105' 
                  : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 hover:scale-105'
              }`}
            >
              {liked ? (
                <HeartIconSolid className="h-5 w-5 mr-2 animate-pulse" />
              ) : (
                <HeartIcon className="h-5 w-5 mr-2" />
              )}
              {liked ? 'Liked' : 'Like'} ({likesCount})
            </button>
            <button 
              onClick={handleSave}
              className={`inline-flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                saved
                  ? 'bg-yellow-500 text-white shadow-lg scale-105'
                  : 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 hover:scale-105'
              }`}
            >
              {saved ? (
                <BookmarkIconSolid className="h-5 w-5 mr-2" />
              ) : (
                <BookmarkIcon className="h-5 w-5 mr-2" />
              )}
              {saved ? 'Saved' : 'Save'}
            </button>
            <button 
              onClick={handleShare}
              className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:scale-105 transition-all duration-200"
            >
              <ShareIcon className="h-5 w-5 mr-2" />
              Share
            </button>
          </div>
        </div>

        {/* Author Bio */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-12">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            About the Author
          </h3>
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              {article.author.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {article.author.name}
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {article.author.bio || 'A contributor to TELOS MAED, sharing insights on faith, leadership, and spiritual growth.'}
              </p>
            </div>
          </div>
        </div>

        {/* Back to Articles */}
        <div className="text-center">
          <Link
            href="/articles"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to All Articles
          </Link>
        </div>
      </div>
    </article>
  )
}
