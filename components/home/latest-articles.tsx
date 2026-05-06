'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { CalendarIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { BookOpenIcon } from '@heroicons/react/24/solid'
import { useArticles } from '@/lib/hooks/use-api'

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

export function LatestArticles() {
  const { data: articles, loading, error } = useArticles({ limit: 7 })

  if (loading) {
    return (
      <section className="padding-responsive-lg bg-white">
        <div className="container-responsive">
          <div className="animate-pulse space-y-8">
            <div className="h-6 bg-gray-100 rounded w-48 mx-auto" />
            <div className="h-72 bg-gray-100 rounded-2xl" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-56 bg-gray-100 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error || !articles || articles.length === 0) {
    return (
      <section className="padding-responsive-lg bg-white">
        <div className="container-responsive text-center py-16">
          <BookOpenIcon className="h-10 w-10 mx-auto mb-3 text-gray-300" />
          <p className="text-gray-500">No articles available yet.</p>
        </div>
      </section>
    )
  }

  const featured = articles[0]
  const rest = articles.slice(1, 7)

  return (
    <section className="padding-responsive-lg bg-white">
      <div className="container-responsive">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8 sm:mb-10"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#203685]">Latest Articles</h2>
            <div className="w-10 h-0.5 bg-[#203685] mt-2 rounded-full" />
          </div>
          <Link
            href="/articles"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#203685] hover:gap-2.5 transition-all duration-200"
          >
            View All
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Featured article — large horizontal card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10"
        >
          <Link href={`/articles/${featured.slug}`} className="group block">
            <div className="flex flex-col sm:flex-row rounded-2xl overflow-hidden border border-[#E3E4E6] hover:shadow-lg transition-shadow duration-300 bg-white">
              {/* Image */}
              <div className="sm:w-2/5 aspect-[16/9] sm:aspect-auto relative flex-shrink-0">
                {featured.coverImage ? (
                  <Image
                    src={featured.coverImage}
                    alt={featured.titleAm || featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryBg(featured.category)} flex items-center justify-center`}>
                    <BookOpenIcon className="h-16 w-16 text-white/30" />
                  </div>
                )}
                <span className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-full border ${getCategoryColor(featured.category)}`}>
                  {getCategoryLabel(featured.category)}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 p-5 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <CalendarIcon className="h-3.5 w-3.5" />
                    {new Date(featured.publishedAt || (featured as any).createdAt || Date.now())
                      .toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug mb-3 group-hover:text-[#203685] transition-colors duration-200 line-clamp-2">
                    {featured.titleAm || featured.title}
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed line-clamp-3">
                    {featured.excerptAm || featured.excerpt || ''}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getCategoryBg(featured.category)} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                      {getInitials(featured.author.name)}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{featured.author.name}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#203685] group-hover:gap-2 transition-all duration-200">
                    Read <ArrowRightIcon className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Grid of remaining articles */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-8 sm:mb-10">
            {rest.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                viewport={{ once: true }}
              >
                <Link href={`/articles/${article.slug}`} className="group block h-full">
                  <div className="h-full flex flex-col rounded-xl overflow-hidden border border-[#E3E4E6] hover:shadow-md transition-shadow duration-300 bg-white">
                    {/* Image */}
                    <div className="aspect-[16/9] relative flex-shrink-0">
                      {article.coverImage ? (
                        <Image
                          src={article.coverImage}
                          alt={article.titleAm || article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryBg(article.category)} flex items-center justify-center`}>
                          <BookOpenIcon className="h-10 w-10 text-white/30" />
                        </div>
                      )}
                      <span className={`absolute top-2.5 left-2.5 px-2 py-0.5 text-xs font-semibold rounded-full border ${getCategoryColor(article.category)}`}>
                        {getCategoryLabel(article.category)}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col p-4">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                        <CalendarIcon className="h-3 w-3" />
                        {new Date(article.publishedAt || (article as any).createdAt || Date.now())
                          .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <h3 className="text-base font-bold text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-[#203685] transition-colors duration-200 flex-1">
                        {article.titleAm || article.title}
                      </h3>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${getCategoryBg(article.category)} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>
                            {getInitials(article.author.name)}
                          </div>
                          <span className="text-xs text-gray-500 truncate max-w-[100px]">{article.author.name}</span>
                        </div>
                        <span className="text-xs font-semibold text-[#203685]">Read →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* View all — mobile */}
        <div className="text-center sm:hidden">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#203685] text-white text-sm font-semibold rounded-lg hover:bg-[#203685]/90 transition-colors min-h-[44px]"
          >
            View All Articles
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  )
}
