'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { CATEGORIES } from '@/types'
import { FunnelIcon } from '@heroicons/react/24/outline'

export function ArticlesFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get('category') || ''
  const featuredOnly = searchParams.get('featured') === 'true'

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/articles?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('/articles')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <FunnelIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Filters
        </h3>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
          Category
        </label>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="category"
              value=""
              checked={selectedCategory === ''}
              onChange={(e) => updateFilters('category', e.target.value)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              All Categories
            </span>
          </label>
          {CATEGORIES.map((category) => (
            <label key={category.key} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="category"
                value={category.key}
                checked={selectedCategory === category.key}
                onChange={(e) => updateFilters('category', e.target.value)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {category.amharic}
              </span>
              <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                ({category.english})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Featured Filter */}
      <div>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={featuredOnly}
            onChange={(e) => updateFilters('featured', e.target.checked ? 'true' : '')}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
          />
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            Featured articles only
          </span>
        </label>
      </div>

      {/* Clear Filters */}
      {(selectedCategory || featuredOnly) && (
        <button
          onClick={clearFilters}
          className="w-full text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
        >
          Clear all filters
        </button>
      )}
    </div>
  )
}