'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CalendarIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { BookOpenIcon } from '@heroicons/react/24/solid'

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    'EDITORIAL': 'የአዘጋጁ ማስታወሻ',
    'PERSONAL': 'ሰውነት',
    'LEADERSHIP': 'የመሪ በትር',
    'POETRY': 'ግጥም',
  }
  return labels[category] || category
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    'EDITORIAL': 'bg-blue-50 text-blue-700 border-blue-200',
    'PERSONAL': 'bg-green-50 text-green-700 border-green-200',
    'LEADERSHIP': 'bg-purple-50 text-purple-700 border-purple-200',
    'POETRY': 'bg-rose-50 text-rose-700 border-rose-200',
  }
  return colors[category] || 'bg-gray-50 text-gray-700 border-gray-200'
}

const getCategoryBg = (category: string) => {
  const bgs: Record<string, string> = {
    'EDITORIAL': 'from-[#203685] to-[#2F56B0]',
    'PERSONAL': 'from-emerald-600 to-emerald-700',
    'LEADERSHIP': 'from-purple-600 to-purple-700',
    'POETRY': 'from-rose-500 to-rose-600',
  }
  return bgs[category] || 'from-gray-500 to-gray-600'
}

const getInitials = (name: string) =>
  name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

export function ArticlesGrid() {
  const [allContent, setAllContent] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()

  const categoryFilter = searchParams.get('category') || ''
  const featuredFilter = searchParams.get('featured') === 'true'

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (categoryFilter) params.set('category', categoryFilter)
        const res = await fetch(`/api/content${params.toString() ? `?${params}` : ''}`)
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setAllContent(data)
      } catch (err) {
        setError('Failed to load content')
      } finally {
        setLoading(false)
      }
    }
    fetchContent()
  }, [categoryFilter])

  const filtered = useMemo(() => {
    if (!allContent) return []
    if (featuredFilter) return allContent.filter(item => item.featured)
    return allContent
  }, [allContent, featuredFilter])

  if (loading) {
    return (
      <div className="space-y-5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse flex gap-4 p-4 border border-gray-100 rounded-xl">
            <div className="w-32 h-24 bg-gray-100 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-3 bg-gray-100 rounded w-20" />
              <div className="h-5 bg-gray-100 rounded w-3/4" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <BookOpenIcon className="h-10 w-10 mx-auto mb-3 text-gray-300" />
        <p className="text-gray-500 mb-4">Unable to load content.</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-[#203685] text-white text-sm rounded-lg">
          Try Again
        </button>
      </div>
    )
  }

  if (filtered.length === 0) {
    return (
      <div className="text-center py-16">
        <BookOpenIcon className="h-10 w-10 mx-auto mb-3 text-gray-300" />
        <p className="text-gray-500">No content found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-400">{filtered.length} {filtered.length === 1 ? 'item' : 'items'}</p>

      <div className="space-y-4">
        {filtered.map((item, index) => {
          const href = item.isPoem ? `/poetry/${item.slug}` : `/articles/${item.slug}`
          return (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <Link href={href} className="group block">
                <div className="flex gap-4 p-4 rounded-xl border border-[#E3E4E6] hover:shadow-md hover:border-[#203685]/20 transition-all duration-200 bg-white">
                  {/* Thumbnail */}
                  <div className="w-28 h-20 sm:w-36 sm:h-24 relative rounded-lg overflow-hidden flex-shrink-0">
                    {item.coverImage ? (
                      <Image
                        src={item.coverImage}
                        alt={item.titleAm || item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryBg(item.category)} flex items-center justify-center`}>
                        <BookOpenIcon className="h-7 w-7 text-white/40" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${getCategoryColor(item.category)}`}>
                          {getCategoryLabel(item.category)}
                        </span>
                        {item.featured && (
                          <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">
                            ★ Featured
                          </span>
                        )}
                      </div>
                      <h2
                        className="text-sm sm:text-base font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#203685] transition-colors duration-200"
                       
                      >
                        {item.titleAm || item.title}
                      </h2>
                      {(item.excerptAm || item.excerpt) && (
                        <p className="text-xs text-gray-400 mt-1 line-clamp-1 hidden sm:block">
                          {item.excerptAm || item.excerpt}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${getCategoryBg(item.category)} flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0`}>
                          {getInitials(item.author.name)}
                        </div>
                        <span className="text-xs text-gray-400 truncate max-w-[80px] sm:max-w-none">{item.author.name}</span>
                        <span className="text-gray-200">·</span>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <CalendarIcon className="h-3 w-3" />
                          {new Date(item.publishedAt || item.createdAt || Date.now())
                            .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                      <ArrowRightIcon className="h-4 w-4 text-[#203685] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          )
        })}
      </div>
    </div>
  )
}
