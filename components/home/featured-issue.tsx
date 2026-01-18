'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  CalendarIcon, 
  ClockIcon, 
  StarIcon,
  UserGroupIcon,
  BookOpenIcon,
  DocumentTextIcon,
  ArrowRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { useLatestIssue, useIssues, useArticles } from '@/lib/hooks/use-api'

export function FeaturedIssue() {
  const { data: latestIssue, loading: latestLoading, error: latestError } = useLatestIssue()
  const { data: otherIssues, loading: otherLoading } = useIssues({ limit: 3 })
  const { data: featuredArticles, loading: articlesLoading } = useArticles({ featured: true, limit: 4 })
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  if (latestLoading || articlesLoading) {
    return (
      <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-3xl h-96 animate-pulse"></div>
        </div>
      </section>
    )
  }

  if (latestError || !latestIssue) {
    return (
      <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <BookOpenIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400">
              {latestError || 'No magazine issues available yet.'}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300 rounded-full text-sm font-medium mb-4">
            <SparklesIcon className="h-4 w-4 mr-2" />
            Editor's Choice
          </div>
          <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-gray-100 sm:text-5xl mb-4">
            Featured Issue
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Dive deep into this month's carefully curated content exploring faith, leadership, and spiritual growth
          </p>
        </motion.div>

        {/* Enhanced Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="lg:grid lg:grid-cols-5 lg:gap-0">
            {/* Enhanced Issue Cover */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-2 relative"
            >
              <div className="aspect-[4/5] lg:aspect-[3/4] relative overflow-hidden lg:rounded-l-3xl">
                {/* Enhanced CSS-Generated Magazine Cover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600">
                  <div className="absolute inset-0 bg-black/20"></div>
                  
                  {/* Decorative Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `
                        radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 2px, transparent 2px),
                        radial-gradient(circle at 75% 75%, rgba(255,255,255,0.3) 2px, transparent 2px),
                        linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)
                      `,
                      backgroundSize: '40px 40px, 40px 40px, 80px 80px'
                    }}></div>
                  </div>
                  
                  {/* Magazine Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <div className="mb-8">
                      <h3 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4 leading-tight">
                        {latestIssue.title}
                      </h3>
                      {latestIssue.titleAm && (
                        <h4 className="text-2xl font-bold text-blue-200 mb-2" dir="rtl">
                          {latestIssue.titleAm}
                        </h4>
                      )}
                      <p className="text-blue-100 text-lg font-medium">
                        {monthNames[latestIssue.month - 1]} {latestIssue.year}
                      </p>
                    </div>
                    
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
                      <BookOpenIcon className="w-10 h-10 text-white" />
                    </div>
                    
                    <div className="text-white/90 text-sm">
                      {latestIssue._count.articles} Articles • {latestIssue._count.poems} Poems
                    </div>
                  </div>
                </div>

                {/* Stats Overlay */}
                <div className="absolute top-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    {latestIssue.featured && (
                      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                        <StarIconSolid className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Issue Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-3 p-8 lg:p-12"
            >
              {/* Issue Meta */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {monthNames[latestIssue.month - 1]} {latestIssue.year}
                  </div>
                  <div className="flex items-center">
                    <DocumentTextIcon className="h-4 w-4 mr-1" />
                    {latestIssue._count.articles} Articles
                  </div>
                </div>
              </div>

              <h3 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
                {latestIssue.title}
              </h3>

              {latestIssue.description && (
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  {latestIssue.description}
                </p>
              )}

              {/* Enhanced Content Preview */}
              {featuredArticles && featuredArticles.length > 0 && (
                <div className="space-y-6 mb-8">
                  {/* Featured Articles */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                      <DocumentTextIcon className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" />
                      Featured Articles
                    </h4>
                    <div className="space-y-3">
                      {featuredArticles.slice(0, 3).map((article, index) => (
                        <motion.div
                          key={article.id}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                          viewport={{ once: true }}
                          className="group p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
                        >
                          <Link href={`/articles/${article.slug}`} className="flex items-start justify-between">
                            <div className="flex-1">
                              <h5 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                                {article.title || article.titleAm}
                              </h5>
                              {article.excerpt && (
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                                  {article.excerpt}
                                </p>
                              )}
                              <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                                <span className="font-medium text-primary-600 dark:text-primary-400">
                                  {article.category}
                                </span>
                                <span>•</span>
                                <span>{article.author.name}</span>
                                {article.readTime && (
                                  <>
                                    <span>•</span>
                                    <span>{article.readTime} min</span>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <ArrowRightIcon className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Enhanced Call to Action */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/magazine/${latestIssue.slug}`}
                  className="btn-primary inline-flex items-center justify-center px-8 py-3 text-lg font-semibold group"
                >
                  <BookOpenIcon className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  Read Full Issue
                </Link>
                <Link
                  href="/magazine"
                  className="btn-secondary inline-flex items-center justify-center px-6 py-3 group"
                >
                  Browse All Issues
                  <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Additional Featured Issues Preview */}
        {otherIssues && otherIssues.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100 mb-8">
              More Featured Content
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {otherIssues.slice(0, 3).map((issue, index) => (
                <motion.div
                  key={issue.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Link href={`/magazine/${issue.slug}`} className="block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                    <div className="aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg mb-4 flex items-center justify-center">
                      {issue.coverImage ? (
                        <Image src={issue.coverImage} alt={issue.title} fill className="object-cover rounded-lg" />
                      ) : (
                        <BookOpenIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                      )}
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                      {issue.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {monthNames[issue.month - 1]} {issue.year}
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {issue._count.articles} Articles • {issue._count.poems} Poems
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8">
              <Link
                href="/magazine"
                className="inline-flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium rounded-lg transition-colors duration-200"
              >
                View All Issues
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}