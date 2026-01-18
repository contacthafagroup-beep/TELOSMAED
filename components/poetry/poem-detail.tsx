'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
  EyeIcon,
  CalendarIcon,
  UserIcon,
  ArrowLeftIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

interface PoemDetailProps {
  slug: string
}

export function PoemDetail({ slug }: PoemDetailProps) {
  const router = useRouter()
  const [poem, setPoem] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  useEffect(() => {
    fetchPoem()
  }, [slug])

  const fetchPoem = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/poems/${slug}`)
      if (!response.ok) {
        if (response.status === 404) {
          setError('Poem not found')
        } else {
          throw new Error('Failed to fetch poem')
        }
        return
      }
      const data = await response.json()
      setPoem(data)
      setLikeCount(data.likes || 0)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load poem')
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async () => {
    if (!poem) return
    
    try {
      const response = await fetch(`/api/poems/${slug}/like`, {
        method: 'POST',
      })
      
      if (response.ok) {
        setLiked(!liked)
        setLikeCount(prev => liked ? prev - 1 : prev + 1)
      }
    } catch (err) {
      console.error('Failed to like poem:', err)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: poem?.title || poem?.titleAm,
          text: 'Check out this beautiful poem',
          url: window.location.href,
        })
      } catch (err) {
        console.error('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !poem) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <SparklesIcon className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {error || 'Poem not found'}
          </h2>
          <Link href="/poetry" className="text-blue-600 hover:text-blue-700">
            ← Back to Poetry
          </Link>
        </div>
      </div>
    )
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

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with gradient */}
      <div className={`relative bg-gradient-to-br ${getAvatarGradient(poem.author.name)} text-white py-16`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/poetry"
            className="inline-flex items-center text-white/90 hover:text-white mb-6"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Poetry
          </Link>

          {/* Type Badge */}
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
              <SparklesIcon className="w-4 h-4 mr-1" />
              {poem.type || 'Poetry'}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            {poem.title}
          </h1>
          {poem.titleAm && (
            <h2 className="text-3xl md:text-4xl font-display mb-6" dir="rtl">
              {poem.titleAm}
            </h2>
          )}

          {/* Author & Meta */}
          <div className="flex items-center space-x-6 text-white/90">
            <div className="flex items-center">
              {poem.author.avatar ? (
                <Image
                  src={poem.author.avatar}
                  alt={poem.author.name}
                  width={40}
                  height={40}
                  className="rounded-full mr-3"
                />
              ) : (
                <div className={`w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-sm mr-3`}>
                  {getInitials(poem.author.name)}
                </div>
              )}
              <div>
                <p className="font-medium">{poem.author.name}</p>
                <p className="text-sm text-white/70">
                  {new Date(poem.publishedAt || poem.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <EyeIcon className="w-4 h-4 mr-1" />
                {poem.views.toLocaleString()}
              </div>
              <div className="flex items-center">
                <HeartIconSolid className="w-4 h-4 mr-1" />
                {likeCount}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                liked
                  ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
              }`}
            >
              {liked ? (
                <HeartIconSolid className="w-5 h-5" />
              ) : (
                <HeartIcon className="w-5 h-5" />
              )}
              <span className="text-sm font-medium">{likeCount}</span>
            </button>

            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 rounded-lg transition-colors">
              <BookmarkIcon className="w-5 h-5" />
              <span className="text-sm font-medium">Save</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              <ShareIcon className="w-5 h-5" />
              <span className="text-sm font-medium">Share</span>
            </button>
          </div>

          {/* Poem Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {poem.content && (
              <div className="mb-8">
                <div className="font-serif text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap text-lg">
                  {poem.content}
                </div>
              </div>
            )}

            {poem.contentAm && (
              <div className={poem.content ? 'pt-8 border-t border-gray-200 dark:border-gray-700' : ''}>
                <div className="font-serif text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap text-lg" dir="rtl">
                  {poem.contentAm}
                </div>
              </div>
            )}
          </div>

          {/* Author Bio */}
          {poem.author.bio && (
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                About the Author
              </h3>
              <div className="flex items-start space-x-4">
                {poem.author.avatar ? (
                  <Image
                    src={poem.author.avatar}
                    alt={poem.author.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                ) : (
                  <div className={`w-16 h-16 bg-gradient-to-br ${getAvatarGradient(poem.author.name)} rounded-full flex items-center justify-center text-white font-bold text-xl`}>
                    {getInitials(poem.author.name)}
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                    {poem.author.name}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {poem.author.bio}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related Poems */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            More Poetry
          </h3>
          <Link
            href="/poetry"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            View all poems →
          </Link>
        </div>
      </div>
    </div>
  )
}
