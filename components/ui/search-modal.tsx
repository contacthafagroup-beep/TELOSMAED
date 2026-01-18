'use client'

import { useState, useEffect, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MagnifyingGlassIcon, 
  XMarkIcon,
  ClockIcon,
  BookOpenIcon,
  SparklesIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useSearch, useSearchSuggestions } from '@/lib/hooks/use-search'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const { data: searchData, loading: isSearching } = useSearch(query)
  const { suggestions, addRecentSearch } = useSearchSuggestions()

  // Reset search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setQuery('')
    }
  }, [isOpen])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        if (!isOpen) {
          // Open search modal
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleSearchClick = (searchQuery: string) => {
    setQuery(searchQuery)
    addRecentSearch(searchQuery)
  }

  const handleResultClick = (href: string) => {
    if (query.trim()) {
      addRecentSearch(query.trim())
    }
    onClose()
  }

  const allResults = searchData ? [
    ...searchData.results.articles.map(article => ({
      ...article,
      icon: BookOpenIcon
    })),
    ...searchData.results.poems.map(poem => ({
      ...poem,
      icon: SparklesIcon
    }))
  ] : []

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-truth/25 dark:bg-dark-bg/75 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 pt-16 sm:pt-24">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-light-word dark:bg-dark-card shadow-2xl transition-all border border-gray-200 dark:border-dark-border">
                {/* Search Input */}
                <div className="flex items-center px-6 py-4 border-b border-gray-200 dark:border-dark-border">
                  <MagnifyingGlassIcon className="h-5 w-5 text-wisdom dark:text-dark-secondary mr-3" />
                  <input
                    type="text"
                    placeholder="Search articles, poetry, and more..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 bg-transparent text-truth dark:text-dark-text placeholder-wisdom dark:placeholder-dark-secondary focus:outline-none text-lg"
                    autoFocus
                  />
                  <div className="flex items-center space-x-2">
                    <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-medium text-wisdom dark:text-dark-secondary bg-scripture dark:bg-dark-bg rounded border border-gray-300 dark:border-dark-border">
                      ⌘K
                    </kbd>
                    <button
                      onClick={onClose}
                      className="p-1 text-wisdom dark:text-dark-secondary hover:text-truth dark:hover:text-dark-text transition-colors duration-200"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Search Results */}
                <div className="max-h-96 overflow-y-auto">
                  {query.trim() === '' ? (
                    // Default state - show recent searches and popular categories
                    <div className="p-6 space-y-6">
                      {/* Recent Searches */}
                      {suggestions.recentSearches.length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold text-truth dark:text-dark-text mb-3 flex items-center">
                            <ClockIcon className="h-4 w-4 mr-2" />
                            Recent Searches
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {suggestions.recentSearches.map((search) => (
                              <button
                                key={search}
                                onClick={() => handleSearchClick(search)}
                                className="px-3 py-1 text-sm bg-scripture dark:bg-dark-bg text-wisdom dark:text-dark-secondary hover:text-primary-600 dark:hover:text-dark-primary rounded-full transition-colors duration-200"
                              >
                                {search}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Popular Categories */}
                      <div>
                        <h3 className="text-sm font-semibold text-truth dark:text-dark-text mb-3">
                          Popular Categories
                        </h3>
                        <div className="space-y-2">
                          {suggestions.popularCategories.map((category) => (
                            <Link
                              key={category.name}
                              href={category.href}
                              onClick={onClose}
                              className="flex items-center justify-between p-3 rounded-lg hover:bg-scripture dark:hover:bg-dark-bg transition-colors duration-200 group"
                            >
                              <div>
                                <div className="font-serif font-medium text-truth dark:text-dark-text group-hover:text-primary-600 dark:group-hover:text-dark-primary transition-colors duration-200">
                                  {category.name}
                                </div>
                                <div className="text-sm text-wisdom dark:text-dark-secondary">
                                  {category.count} articles
                                </div>
                              </div>
                              <ArrowRightIcon className="h-4 w-4 text-wisdom dark:text-dark-secondary group-hover:text-primary-600 dark:group-hover:text-dark-primary transition-colors duration-200" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : isSearching ? (
                    // Loading state
                    <div className="p-6">
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 dark:border-dark-primary"></div>
                      </div>
                    </div>
                  ) : allResults.length > 0 ? (
                    // Search results
                    <div className="p-2">
                      {searchData && (
                        <div className="px-4 py-2 text-sm text-wisdom dark:text-dark-secondary">
                          Found {searchData.total} results for "{searchData.query}"
                        </div>
                      )}
                      {allResults.map((result, index) => (
                        <motion.div
                          key={result.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                          <Link
                            href={result.href}
                            onClick={() => handleResultClick(result.href)}
                            className="flex items-start space-x-3 p-4 rounded-lg hover:bg-scripture dark:hover:bg-dark-bg transition-colors duration-200 group"
                          >
                            <div className="flex-shrink-0 mt-1">
                              <result.icon className="h-5 w-5 text-primary-600 dark:text-dark-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="text-sm font-medium text-truth dark:text-dark-text group-hover:text-primary-600 dark:group-hover:text-dark-primary transition-colors duration-200 truncate">
                                  {result.title}
                                </h4>
                                <span className="flex-shrink-0 text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-full">
                                  {result.type}
                                </span>
                                {result.featured && (
                                  <span className="flex-shrink-0 text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-full">
                                    Featured
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-wisdom dark:text-dark-secondary line-clamp-2">
                                {result.excerpt}
                              </p>
                              <div className="flex items-center mt-1 space-x-3 text-xs text-wisdom dark:text-dark-secondary">
                                <span>by {result.author}</span>
                                <span>•</span>
                                <span>{result.views} views</span>
                                <span>•</span>
                                <span>{result.likes} likes</span>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    // No results
                    <div className="p-6 text-center py-12">
                      <MagnifyingGlassIcon className="h-12 w-12 text-wisdom dark:text-dark-secondary mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-truth dark:text-dark-text mb-2">
                        No results found
                      </h3>
                      <p className="text-wisdom dark:text-dark-secondary">
                        Try searching for something else or browse our categories.
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-6 py-3 border-t border-gray-200 dark:border-dark-border bg-scripture dark:bg-dark-bg">
                  <div className="flex items-center justify-between text-xs text-wisdom dark:text-dark-secondary">
                    <div className="flex items-center space-x-4">
                      <span>Press <kbd className="px-1 py-0.5 bg-light-word dark:bg-dark-card rounded border">↵</kbd> to select</span>
                      <span>Press <kbd className="px-1 py-0.5 bg-light-word dark:bg-dark-card rounded border">↑↓</kbd> to navigate</span>
                    </div>
                    <span>Press <kbd className="px-1 py-0.5 bg-light-word dark:bg-dark-card rounded border">esc</kbd> to close</span>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}