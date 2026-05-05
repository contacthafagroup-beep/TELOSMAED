'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  CalendarIcon,
  ClockIcon,
  ShareIcon,
  BookmarkIcon,
  HeartIcon,
  EyeIcon,
  ArrowLeftIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline'
import {
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid,
} from '@heroicons/react/24/solid'

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    'EDITORIAL': 'የአዘጋጁ ማስታወሻ',
    'PERSONAL': 'ሰውነት',
    'LEADERSHIP': 'የመሪ በትር',
  }
  return labels[category] || category
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    'EDITORIAL': 'bg-blue-50 text-blue-700 border-blue-200',
    'PERSONAL': 'bg-green-50 text-green-700 border-green-200',
    'LEADERSHIP': 'bg-purple-50 text-purple-700 border-purple-200',
  }
  return colors[category] || 'bg-gray-50 text-gray-700 border-gray-200'
}

export default function ArticlePage() {
  const params = useParams()
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
          setError(res.status === 404 ? 'Article not found' : 'Failed to load article')
          return
        }
        const data = await res.json()
        setArticle(data)
        setLikesCount(data.likes || 0)
      } catch {
        setError('Failed to load article')
      } finally {
        setLoading(false)
      }
    }
    if (slug) fetchArticle()
  }, [slug])

  const handleLike = async () => {
    if (!article || liked) return
    try {
      const res = await fetch(`/api/articles/${slug}/like`, { method: 'POST' })
      if (res.ok) {
        const data = await res.json()
        setLikesCount(data.likes)
        setLiked(true)
      }
    } catch {}
  }

  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.titleAm || article.title,
          url: window.location.href,
        })
      } catch {}
    } else {
      await navigator.clipboard.writeText(window.location.href)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#203685] border-t-transparent" />
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <p className="text-5xl mb-4">📄</p>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Article Not Found</h1>
          <p className="text-gray-500 mb-6 text-sm">The article you are looking for does not exist or has been removed.</p>
          <Link href="/articles" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#203685] text-white text-sm font-medium rounded-lg hover:bg-[#203685]/90 transition-colors">
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Articles
          </Link>
        </div>
      </div>
    )
  }

  const title = article.titleAm || article.title
  const content = article.contentAm || article.content
  const excerpt = article.excerptAm || article.excerpt

  return (
    <article className="min-h-screen bg-white">

      {/* Top bar */}
      <div className="border-b border-[#E3E4E6] bg-white sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
          <Link href="/articles" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#203685] transition-colors">
            <ArrowLeftIcon className="h-4 w-4" />
            Articles
          </Link>
          <div className="flex items-center gap-1">
            <button
              onClick={handleShare}
              className="p-2 text-gray-400 hover:text-[#203685] transition-colors rounded-lg hover:bg-gray-50 min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label="Share"
            >
              <ShareIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => setSaved(!saved)}
              className="p-2 text-gray-400 hover:text-[#203685] transition-colors rounded-lg hover:bg-gray-50 min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label="Save"
            >
              {saved ? <BookmarkIconSolid className="h-4 w-4 text-[#203685]" /> : <BookmarkIcon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Article header */}
      <header className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-8">
        {/* Category + meta */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getCategoryColor(article.category)}`}>
            {getCategoryLabel(article.category)}
          </span>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <CalendarIcon className="h-3.5 w-3.5" />
            {new Date(article.publishedAt || article.createdAt).toLocaleDateString('en-US', {
              month: 'long', day: 'numeric', year: 'numeric'
            })}
          </div>
          {article.readTime && (
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <ClockIcon className="h-3.5 w-3.5" />
              {article.readTime} min
            </div>
          )}
        </div>

        {/* Title */}
        <h1
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug mb-4 text-right"
          dir="rtl"
        >
          {title}
        </h1>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-6 border-r-4 border-[#203685] pr-4 text-right" dir="rtl">
            {excerpt}
          </p>
        )}

        {/* Author row */}
        <div className="flex items-center justify-between pt-5 border-t border-[#E3E4E6]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#203685] to-[#2F56B0] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {article.author.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{article.author.name}</p>
              <p className="text-xs text-gray-400">{article.author.bio || 'TELOS MAED Contributor'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <EyeIcon className="h-3.5 w-3.5" />
              {article.views.toLocaleString()}
            </div>
            <div className="flex items-center gap-1">
              <ChatBubbleLeftIcon className="h-3.5 w-3.5" />
              {article._count?.comments || 0}
            </div>
          </div>
        </div>
      </header>

      {/* Cover image */}
      {article.coverImage && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-10">
          <div className="aspect-[16/9] relative rounded-2xl overflow-hidden shadow-sm">
            <Image
              src={article.coverImage}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Article body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
        <div
          className="text-gray-800 leading-[1.95] text-base sm:text-lg whitespace-pre-wrap text-right"
          dir="rtl"
          style={{ fontFamily: "'Noto Serif Ethiopic', 'Nyala', serif", fontSize: '18px' }}
        >
          {content}
        </div>

        {/* Tags */}
        {article.tags && article.tags.trim() && (
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-[#E3E4E6]">
            {article.tags.split(',').filter(Boolean).map((tag: string, i: number) => (
              <span key={i} className="px-3 py-1 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-200">
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Like / Share actions */}
        <div className="flex items-center gap-3 mt-8 pt-6 border-t border-[#E3E4E6]">
          <button
            onClick={handleLike}
            disabled={liked}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 min-h-[44px] ${
              liked
                ? 'bg-red-500 text-white'
                : 'bg-red-50 text-red-600 hover:bg-red-100'
            }`}
          >
            {liked ? <HeartIconSolid className="h-4 w-4" /> : <HeartIcon className="h-4 w-4" />}
            {liked ? 'Liked' : 'Like'} ({likesCount})
          </button>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors min-h-[44px]"
          >
            <ShareIcon className="h-4 w-4" />
            Share
          </button>
        </div>

        {/* Author card */}
        <div className="mt-10 p-5 sm:p-6 rounded-xl bg-[#203685]/5 border border-[#203685]/10">
          <p className="text-xs font-semibold text-[#203685] uppercase tracking-wider mb-3">About the Author</p>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#203685] to-[#2F56B0] flex items-center justify-center text-white font-bold flex-shrink-0">
              {article.author.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">{article.author.name}</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                {article.author.bio || 'A contributor to TELOS MAED, sharing insights on faith, leadership, and spiritual growth.'}
              </p>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#203685] text-white text-sm font-semibold rounded-lg hover:bg-[#203685]/90 transition-colors min-h-[48px]"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to All Articles
          </Link>
        </div>
      </div>
    </article>
  )
}
