'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  HeartIcon,
  EyeIcon,
  ChatBubbleLeftIcon,
  ArrowRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

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
  return gradients[name.length % gradients.length]
}

interface Poem {
  id: string
  title: string
  titleAm?: string | null
  slug: string
  content: string
  contentAm?: string | null
  featured: boolean
  publishedAt?: Date | null
  createdAt: Date
  views: number
  likes: number
  author: {
    id: string
    name: string
    avatar?: string | null
    bio?: string | null
  }
  _count: {
    comments: number
    poemLikes: number
    bookmarks: number
  }
}

interface Props {
  poems: Poem[]
}

export function PoetryGridClient({ poems }: Props) {
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (poemId: string) => {
    setFavorites(prev =>
      prev.includes(poemId) ? prev.filter(id => id !== poemId) : [...prev, poemId]
    )
  }

  if (!poems || poems.length === 0) {
    return (
      <div className="text-center py-16">
        <SparklesIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-medium text-gray-700 mb-2">No poetry found</h3>
        <p className="text-gray-500">Check back soon for new poetry.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Results count */}
      <p className="text-sm text-gray-500">{poems.length} {poems.length === 1 ? 'poem' : 'poems'}</p>

      {/* Poetry grid */}
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {poems.map((poem, index) => (
          <motion.article
            key={poem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            className="group"
          >
            <div className="bg-white border border-[#E3E4E6] rounded-xl overflow-hidden h-full flex flex-col hover:shadow-lg transition-all duration-300">
              {/* Gradient header */}
              <div className={`relative p-5 sm:p-6 bg-gradient-to-br ${getAvatarGradient(poem.author.name)} text-white`}>
                <div className="absolute inset-0 bg-black/10" />

                {/* Favorite button */}
                <button
                  onClick={() => toggleFavorite(poem.id)}
                  className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Add to favorites"
                >
                  <HeartIcon className={`h-5 w-5 ${favorites.includes(poem.id) ? 'fill-white' : ''}`} />
                </button>

                {/* Featured badge */}
                {poem.featured && (
                  <div className="relative z-10 mb-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm border border-white/30">
                      <SparklesIcon className="h-3 w-3 mr-1" />
                      Featured
                    </span>
                  </div>
                )}

                <div className="relative z-10">
                  <h2 className="text-lg sm:text-xl font-display font-bold mb-2 leading-tight">
                    <Link href={`/poetry/${poem.slug}`} className="hover:opacity-90 transition-opacity">
                      {poem.title}
                    </Link>
                  </h2>

                  {poem.titleAm && (
                    <h3 className="text-base font-bold text-white/90 mb-3" dir="rtl">
                      {poem.titleAm}
                    </h3>
                  )}

                  {/* Author */}
                  <div className="flex items-center gap-2.5">
                    {poem.author.avatar ? (
                      <Image
                        src={poem.author.avatar}
                        alt={poem.author.name}
                        width={28}
                        height={28}
                        className="rounded-full border-2 border-white/30 w-7 h-7"
                      />
                    ) : (
                      <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-xs border border-white/30 flex-shrink-0">
                        {getInitials(poem.author.name)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{poem.author.name}</p>
                      <p className="text-xs text-white/75">
                        {new Date(poem.publishedAt || poem.createdAt).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative dots */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }} />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col">
                <div className="flex-1 mb-5">
                  <div className="font-serif text-gray-700 leading-relaxed italic text-sm sm:text-base">
                    {poem.content.split('\n').slice(0, 4).map((line, i) => (
                      <div key={i} className="mb-1">{line || '\u00A0'}</div>
                    ))}
                    {poem.content.split('\n').length > 4 && (
                      <div className="text-[#203685] font-sans not-italic text-sm mt-2 flex items-center gap-1">
                        <SparklesIcon className="h-3.5 w-3.5" />
                        Continue reading...
                      </div>
                    )}
                  </div>

                  {poem.contentAm && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="font-serif text-gray-500 leading-relaxed italic text-sm" dir="rtl">
                        {poem.contentAm.split('\n').slice(0, 3).map((line, i) => (
                          <div key={i} className="mb-1">{line || '\u00A0'}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Stats and read more */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="flex items-center gap-1">
                      <EyeIcon className="h-4 w-4" />
                      <span>{poem.views > 999 ? `${Math.round(poem.views / 1000)}k` : poem.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <HeartIconSolid className="h-4 w-4 text-red-400" />
                      <span>{poem.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ChatBubbleLeftIcon className="h-4 w-4" />
                      <span>{poem._count.comments}</span>
                    </div>
                  </div>

                  <Link
                    href={`/poetry/${poem.slug}`}
                    className="inline-flex items-center gap-1 text-[#203685] hover:text-[#203685]/80 font-medium transition-colors"
                  >
                    Read Full
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
