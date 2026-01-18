'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  CalendarIcon, 
  UserIcon, 
  HeartIcon,
  EyeIcon,
  BookmarkIcon,
  ChatBubbleLeftIcon,
  ArrowRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { usePoems } from '@/lib/hooks/use-api'

// Utility functions for CSS-generated content
const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const getAvatarGradient = (name: string) => {
  const gradients = [
    'from-rose-500 to-pink-600',
    'from-purple-500 to-indigo-600', 
    'from-blue-500 to-cyan-600',
    'from-green-500 to-emerald-600',
    'from-yellow-500 to-orange-600',
    'from-red-500 to-rose-600',
    'from-indigo-500 to-purple-600',
    'from-teal-500 to-blue-600'
  ]
  const index = name.length % gradients.length
  return gradients[index]
}

export function PoetryGrid() {
  const { data: poems, loading, error } = usePoems()
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (poemId: string) => {
    setFavorites(prev => 
      prev.includes(poemId) 
        ? prev.filter(id => id !== poemId)
        : [...prev, poemId]
    )
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-8"></div>
          <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
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
          <SparklesIcon className="h-12 w-12 mx-auto mb-2" />
          <p>Unable to load poetry: {error}</p>
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

  if (!poems || poems.length === 0) {
    return (
      <div className="text-center py-12">
        <SparklesIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          No poetry found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Check back soon for new poetry.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {poems.length} poems
        </p>
      </div>

      {/* Poetry grid */}
      <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {poems.map((poem, index) => (
          <motion.article
            key={poem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group"
          >
            <div className="card card-hover p-0 overflow-hidden h-full flex flex-col relative">
              {/* Header with gradient background */}
              <div className={`relative p-6 bg-gradient-to-br ${getAvatarGradient(poem.author.name)} text-white`}>
                <div className="absolute inset-0 bg-black/10"></div>
                
                {/* Favorite button */}
                <button
                  onClick={() => toggleFavorite(poem.id)}
                  className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors duration-200 z-10"
                  aria-label="Add to favorites"
                >
                  <HeartIcon 
                    className={`h-5 w-5 ${favorites.includes(poem.id) ? 'fill-white text-white' : ''}`} 
                  />
                </button>

                {/* Featured badge */}
                {poem.featured && (
                  <div className="relative z-10 mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30">
                      <SparklesIcon className="h-3 w-3 mr-1" />
                      Featured
                    </span>
                  </div>
                )}
                
                <div className="relative z-10">
                  <h2 className="text-xl font-display font-bold mb-3 group-hover:scale-105 transition-transform duration-200">
                    <Link href={`/poetry/${poem.slug}`}>
                      {poem.title}
                    </Link>
                  </h2>

                  {/* Amharic Title */}
                  {poem.titleAm && (
                    <h3 className="text-lg font-bold text-white/90 mb-3" dir="rtl">
                      {poem.titleAm}
                    </h3>
                  )}

                  {/* Author info */}
                  <div className="flex items-center space-x-3">
                    {poem.author.avatar ? (
                      <Image
                        src={poem.author.avatar}
                        alt={poem.author.name}
                        width={32}
                        height={32}
                        className="rounded-full border-2 border-white/30"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-xs border border-white/30">
                        {getInitials(poem.author.name)}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-white">
                        {poem.author.name}
                      </p>
                      <p className="text-xs text-white/80">
                        {new Date(poem.publishedAt || (poem as any).createdAt || Date.now()).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.3) 2px, transparent 2px)',
                    backgroundSize: '30px 30px'
                  }}></div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Poem preview */}
                <div className="flex-1 mb-6">
                  <div className="font-serif text-gray-700 dark:text-gray-300 leading-relaxed italic">
                    {poem.content.split('\n').slice(0, 4).map((line, i) => (
                      <div key={i} className="mb-1">
                        {line || '\u00A0'} {/* Non-breaking space for empty lines */}
                      </div>
                    ))}
                    {poem.content.split('\n').length > 4 && (
                      <div className="text-primary-600 dark:text-primary-400 font-sans not-italic text-sm mt-3 flex items-center">
                        <SparklesIcon className="h-4 w-4 mr-1" />
                        Continue reading...
                      </div>
                    )}
                  </div>

                  {/* Amharic Content Preview */}
                  {poem.contentAm && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="font-serif text-gray-600 dark:text-gray-400 leading-relaxed italic" dir="rtl">
                        {poem.contentAm.split('\n').slice(0, 3).map((line, i) => (
                          <div key={i} className="mb-1">
                            {line || '\u00A0'}
                          </div>
                        ))}
                        {poem.contentAm.split('\n').length > 3 && (
                          <div className="text-primary-600 dark:text-primary-400 font-sans not-italic text-sm mt-2">
                            ...ቀጣይ
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Stats and actions */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <EyeIcon className="h-4 w-4 mr-1" />
                      <span>{Math.round(poem.views / 1000)}k</span>
                    </div>
                    <div className="flex items-center">
                      <HeartIconSolid className="h-4 w-4 mr-1 text-red-400" />
                      <span>{poem.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
                      <span>{poem._count.comments}</span>
                    </div>
                  </div>
                  
                  <Link
                    href={`/poetry/${poem.slug}`}
                    className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors duration-200"
                  >
                    Read Full
                    <ArrowRightIcon className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Load more button */}
      <div className="text-center">
        <button className="btn-secondary">
          Load More Poetry
        </button>
      </div>
    </div>
  )
}