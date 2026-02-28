'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  CalendarIcon, 
  ClockIcon, 
  UserIcon,
  BookmarkIcon,
  ShareIcon,
  HeartIcon,
  EyeIcon,
  ArrowRightIcon,
  StarIcon,
  ArrowTrendingUpIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline'
import { 
  BookmarkIcon as BookmarkIconSolid,
  HeartIcon as HeartIconSolid,
  BookOpenIcon
} from '@heroicons/react/24/solid'
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

const getCategoryGradient = (category: string) => {
  const gradients = {
    'EDITORIAL': 'from-blue-400 via-blue-500 to-blue-600',
    'PERSONAL': 'from-green-400 via-green-500 to-green-600',
    'LEADERSHIP': 'from-purple-400 via-purple-500 to-purple-600',
    'POETRY': 'from-rose-400 via-rose-500 to-rose-600'
  }
  return gradients[category as keyof typeof gradients] || 'from-gray-400 via-gray-500 to-gray-600'
}

const getCategoryIcon = (category: string) => {
  const icons = {
    'EDITORIAL': '✍️',
    'PERSONAL': '🌱',
    'LEADERSHIP': '👑',
    'POETRY': '🎭'
  }
  return icons[category as keyof typeof icons] || '📖'
}

const getCategoryLabel = (category: string) => {
  const labels = {
    'EDITORIAL': 'Editorial',
    'PERSONAL': 'Personal Growth',
    'LEADERSHIP': 'Leadership',
    'POETRY': 'Poetry & Worship'
  }
  return labels[category as keyof typeof labels] || category
}

const categoryColors = {
  'EDITORIAL': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  'PERSONAL': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  'LEADERSHIP': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
  'POETRY': 'bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-400'
}

export function LatestArticles() {
  // Changed from useFeaturedArticles to useArticles to show all published articles
  const { data: articles, loading, error } = useArticles({ limit: 6 })

  if (loading) {
    return (
      <section className="py-4 sm:py-6 lg:py-12 xl:py-16 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl h-64 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-4 sm:py-6 lg:py-12 xl:py-16 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-600 dark:text-red-400 mb-4">
              <BookOpenIcon className="h-12 w-12 mx-auto mb-2" />
              <p>Unable to load articles: {error}</p>
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    )
  }

  if (!articles || articles.length === 0) {
    return (
      <section className="py-4 sm:py-6 lg:py-12 xl:py-16 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <BookOpenIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400">No articles available yet.</p>
          </div>
        </div>
      </section>
    )
  }

  const featuredArticle = articles[0]
  const regularArticles = articles.slice(1, 4)
  const additionalArticles = articles.slice(4)

  return (
    <section className="padding-responsive-lg bg-white dark:bg-gray-900">
      <div className="container-responsive">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center spacing-responsive-md mb-8"
        >
          <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-secondary-100 dark:bg-secondary-900/20 text-secondary-800 dark:text-secondary-300 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            <ArrowTrendingUpIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
            Fresh Content
          </div>
          <h2 className="text-responsive-2xl font-display font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
            Latest Articles
          </h2>
          <p className="text-responsive-sm text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
            Fresh perspectives on faith, leadership, and spiritual growth from our community of writers
          </p>
        </motion.div>

        {/* Enhanced Featured Article */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12 lg:mb-16"
        >
          <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-primary-950 dark:via-gray-900 dark:to-secondary-950 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col lg:grid lg:grid-cols-5 lg:gap-0">
              {/* Article Image */}
              <div className="lg:col-span-2 relative">
                <div className="aspect-[16/4] sm:aspect-[16/6] lg:aspect-[4/5] relative overflow-hidden lg:rounded-l-3xl">
                  {featuredArticle.coverImage ? (
                    <Image
                      src={featuredArticle.coverImage}
                      alt={featuredArticle.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    /* CSS-Generated Background */
                    <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(featuredArticle.category)}`}>
                      <div className="absolute inset-0 bg-black/20"></div>
                      
                      {/* Category Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl lg:text-8xl opacity-30 text-white">
                          {getCategoryIcon(featuredArticle.category)}
                        </div>
                      </div>
                      
                      {/* Decorative Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.3) 2px, transparent 2px)',
                          backgroundSize: '40px 40px'
                        }}></div>
                      </div>
                    </div>
                  )}

                  {/* Featured Badge */}
                  {featuredArticle.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 bg-yellow-400 text-yellow-900 text-sm font-semibold rounded-full">
                        <StarIcon className="h-4 w-4 mr-1" />
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Stats Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                          <EyeIcon className="h-4 w-4 mr-1" />
                          <span>{featuredArticle.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                          <HeartIconSolid className="h-4 w-4 mr-1 text-red-400" />
                          <span>{featuredArticle.likes}</span>
                        </div>
                      </div>
                      <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        <span>{featuredArticle.readTime || 5} min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="lg:col-span-3 padding-responsive-md">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3 sm:mb-4">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className={`inline-flex items-center px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${categoryColors[featuredArticle.category as keyof typeof categoryColors]}`}>
                      {getCategoryLabel(featuredArticle.category)}
                    </span>
                    <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      <span className="hidden sm:inline">{new Date(featuredArticle.publishedAt || (featuredArticle as any).createdAt || Date.now()).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric'
                      })}</span>
                      <span className="sm:hidden">{new Date(featuredArticle.publishedAt || (featuredArticle as any).createdAt || Date.now()).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric'
                      })}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button className="p-1.5 sm:p-2 text-gray-400 hover:text-red-500 transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center">
                      <HeartIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                    <button className="p-1.5 sm:p-2 text-gray-400 hover:text-yellow-500 transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center">
                      <BookmarkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                    <button className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-500 transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center">
                      <ShareIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-responsive-xl font-display font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3 leading-tight hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  <Link href={`/articles/${featuredArticle.slug}`}>
                    {featuredArticle.title}
                  </Link>
                </h3>

                {/* Amharic Title */}
                {featuredArticle.titleAm && (
                  <h4 className="text-responsive-base font-bold text-gray-600 dark:text-gray-400 mb-2 sm:mb-3" dir="rtl">
                    {featuredArticle.titleAm}
                  </h4>
                )}

                <p className="text-responsive-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 sm:mb-6 line-clamp-3">
                  {featuredArticle.excerpt || 'Read this amazing article...'}
                </p>

                {/* Author Info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="flex items-center gap-3">
                    {/* CSS-Generated Avatar */}
                    {featuredArticle.author.avatar ? (
                      <Image
                        src={featuredArticle.author.avatar}
                        alt={featuredArticle.author.name}
                        width={40}
                        height={40}
                        className="rounded-full w-10 h-10 sm:w-12 sm:h-12"
                      />
                    ) : (
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${getAvatarGradient(featuredArticle.author.name)} rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg flex-shrink-0`}>
                        {getInitials(featuredArticle.author.name)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 truncate">
                        {featuredArticle.author.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                        {featuredArticle.author.bio || 'TELOS MAED Contributor'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <ChatBubbleLeftIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      {featuredArticle._count.comments}
                    </div>
                    <div className="flex items-center">
                      <BookmarkIconSolid className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-yellow-500" />
                      {featuredArticle._count.bookmarks}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {featuredArticle.tags && (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
                    {api.parseTags(featuredArticle.tags).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 sm:px-3 sm:py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs sm:text-sm rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/20 transition-colors duration-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <Link
                  href={`/articles/${featuredArticle.slug}`}
                  className="btn-primary inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold group min-h-[44px]"
                >
                  <BookOpenIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  <span className="hidden sm:inline">Read Full Article</span>
                  <span className="sm:hidden">Read Article</span>
                  <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Regular Articles Grid */}
        {regularArticles.length > 0 && (
          <div className="grid-responsive-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            {regularArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={`/articles/${article.slug}`} className="block h-full">
                  <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 cursor-pointer h-full flex flex-col">
                  {/* Article Image */}
                  <div className="aspect-[16/9] sm:aspect-[16/10] relative overflow-hidden flex-shrink-0">
                    {article.coverImage ? (
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      /* CSS-Generated Background */
                      <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(article.category)} group-hover:scale-105 transition-transform duration-500`}>
                        <div className="absolute inset-0 bg-black/10"></div>
                        
                        {/* Category Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-4xl opacity-40 text-white">
                            {getCategoryIcon(article.category)}
                          </div>
                        </div>
                        
                        {/* Decorative Pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 1px, transparent 1px), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.2) 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                          }}></div>
                        </div>
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${categoryColors[article.category as keyof typeof categoryColors]}`}>
                        {getCategoryLabel(article.category)}
                      </span>
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center space-x-1">
                        <button className="p-1.5 bg-white/90 dark:bg-gray-900/90 rounded-full text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors duration-200">
                          <HeartIcon className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 bg-white/90 dark:bg-gray-900/90 rounded-full text-gray-600 dark:text-gray-400 hover:text-yellow-500 transition-colors duration-200">
                          <BookmarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="padding-responsive-sm flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        {new Date(article.publishedAt || (article as any).createdAt || Date.now()).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        <ClockIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        {article.readTime || 5} min
                      </div>
                    </div>

                    <h3 className="text-responsive-sm font-display font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                      {article.title}
                    </h3>

                    {/* Amharic Title */}
                    {article.titleAm && (
                      <h4 className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-2 line-clamp-1" dir="rtl">
                        {article.titleAm}
                      </h4>
                    )}

                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3 sm:mb-4 line-clamp-2 flex-1">
                      {article.excerpt || 'Read this amazing article...'}
                    </p>

                    {/* Author & Stats */}
                    <div className="flex items-center justify-between gap-2 mt-auto">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        {/* CSS-Generated Avatar */}
                        {article.author.avatar ? (
                          <Image
                            src={article.author.avatar}
                            alt={article.author.name}
                            width={28}
                            height={28}
                            className="rounded-full w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0"
                          />
                        ) : (
                          <div className={`w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br ${getAvatarGradient(article.author.name)} rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md flex-shrink-0`}>
                            {getInitials(article.author.name)}
                          </div>
                        )}
                        <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                          {article.author.name}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 sm:gap-3 text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                        <div className="flex items-center">
                          <EyeIcon className="h-3 w-3 mr-0.5 sm:mr-1" />
                          <span className="hidden sm:inline">{Math.round(article.views / 1000)}k</span>
                          <span className="sm:hidden">{Math.round(article.views / 1000)}k</span>
                        </div>
                        <div className="flex items-center">
                          <HeartIconSolid className="h-3 w-3 mr-0.5 sm:mr-1 text-red-400" />
                          {article.likes}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8">
            <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100 mb-4">
              Explore More Articles
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Discover hundreds of articles on faith, leadership, personal growth, and spiritual formation from our community of writers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/articles"
                className="btn-primary inline-flex items-center px-8 py-3 group"
              >
                <BookOpenIcon className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                View All Articles
                <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/articles/categories"
                className="btn-secondary inline-flex items-center px-6 py-3"
              >
                Browse by Category
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}