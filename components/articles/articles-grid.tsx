'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CalendarIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { BookOpenIcon } from '@heroicons/react/24/solid'
import { useArticles } from '@/lib/hooks/use-api'

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

const getCategoryBg = (category: string) => {
  const bgs: Record<string, string> = {
    'EDITORIAL': 'from-[#203685] to-[#2F56B0]',
    'PERSONAL': 'from-emerald-600 to-emerald-700',
    'LEADERSHIP': 'from-purple-600 to-purple-700',
  }
  return bgs[category] || 'from-gray-500 to-gray-600'
}

const getInitials = (name: string) =>
  name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

export function ArticlesGrid() {
  const { data: articles, loading, error } = useArticles()
  const searchParams = useSearchParams()

  const categoryFilter = searchParams.get('category') || ''
  const featuredFilter = searchParams.get('featured') === 'true'

  const filteredArticles = useMemo(() => {
    if (!articles) return []
    return articles.filter(article => {
      if (categoryFilter && article.category !== categoryFilter) return false
      if (featuredFilter && !article.featured) return false
      return true
    })
  }, [articles, categoryFilter, featuredFilter])

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
        <p className="text-gray-500 mb-4">ጽሑፎቹን መጫን አልተቻለም።</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-[#203685] text-white text-sm rounded-lg">
          እንደገና ሞክር
        </button>
      </div>
    )
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-16">
        <BookOpenIcon className="h-10 w-10 mx-auto mb-3 text-gray-300" />
        <p className="text-gray-500">ምንም ጽሑፍ አልተገኘም።</p>
      </div>
    )
  }

  if (filteredArticles.length === 0) {
    return (
      <div className="text-center py-16">
        <BookOpenIcon className="h-10 w-10 mx-auto mb-3 text-gray-300" />
        <p className="text-gray-500">ከዚህ ምድብ ምንም ጽሑፍ አልተገኘም።</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-400">{filteredArticles.length} ጽሑፎች</p>

      <div className="space-y-4">
        {filteredArticles.map((article, index) => (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
          >
            <Link href={`/articles/${article.slug}`} className="group block">
              <div className="flex gap-4 p-4 rounded-xl border border-[#E3E4E6] hover:shadow-md hover:border-[#203685]/20 transition-all duration-200 bg-white">
                {/* Thumbnail */}
                <div className="w-28 h-20 sm:w-36 sm:h-24 relative rounded-lg overflow-hidden flex-shrink-0">
                  {article.coverImage ? (
                    <Image
                      src={article.coverImage}
                      alt={article.titleAm || article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-400"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryBg(article.category)} flex items-center justify-center`}>
                      <BookOpenIcon className="h-7 w-7 text-white/40" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${getCategoryColor(article.category)}`}>
                        {getCategoryLabel(article.category)}
                      </span>
                      {article.featured && (
                        <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">
                          ★ Featured
                        </span>
                      )}
                    </div>
                    <h2
                      className="text-sm sm:text-base font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#203685] transition-colors duration-200"
                      dir="rtl"
                    >
                      {article.titleAm || article.title}
                    </h2>
                    {(article.excerptAm || article.excerpt) && (
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1 hidden sm:block" dir="rtl">
                        {article.excerptAm || article.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${getCategoryBg(article.category)} flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0`}>
                        {getInitials(article.author.name)}
                      </div>
                      <span className="text-xs text-gray-400 truncate max-w-[80px] sm:max-w-none">{article.author.name}</span>
                      <span className="text-gray-200">·</span>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <CalendarIcon className="h-3 w-3" />
                        {new Date(article.publishedAt || (article as any).createdAt || Date.now())
                          .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                    <ArrowRightIcon className="h-4 w-4 text-[#203685] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
