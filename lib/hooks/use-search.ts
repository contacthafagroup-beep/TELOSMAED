import { useState, useEffect } from 'react'

interface SearchResult {
  id: string
  title: string
  titleAm?: string
  type: 'Article' | 'Poetry'
  category: string
  excerpt: string
  href: string
  author: string
  publishedAt: string
  featured: boolean
  views: number
  likes: number
  commentsCount: number
}

interface SearchResponse {
  query: string
  results: {
    articles: SearchResult[]
    poems: SearchResult[]
  }
  total: number
}

export function useSearch(query: string, options?: {
  type?: 'articles' | 'poems' | 'all'
  category?: string
  limit?: number
}) {
  const [data, setData] = useState<SearchResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setData(null)
      setLoading(false)
      setError(null)
      return
    }

    const searchWithDebounce = setTimeout(async () => {
      setLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams({
          q: query.trim(),
          ...(options?.type && { type: options.type }),
          ...(options?.category && { category: options.category }),
          ...(options?.limit && { limit: options.limit.toString() }),
        })

        const response = await fetch(`/api/search?${params.toString()}`)
        
        if (!response.ok) {
          throw new Error('Search failed')
        }

        const searchData = await response.json()
        setData(searchData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed')
        setData(null)
      } finally {
        setLoading(false)
      }
    }, 300) // 300ms debounce

    return () => clearTimeout(searchWithDebounce)
  }, [query, options?.type, options?.category, options?.limit])

  return { data, loading, error }
}

// Hook for popular categories and recent searches
export function useSearchSuggestions() {
  const [suggestions, setSuggestions] = useState({
    recentSearches: [] as string[],
    popularCategories: [] as Array<{
      name: string
      href: string
      count: number
    }>
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        // Get recent searches from localStorage
        const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]')
        
        // Fetch real popular categories from API
        const response = await fetch('/api/categories/stats')
        if (response.ok) {
          const data = await response.json()
          setSuggestions({
            recentSearches: recentSearches.slice(0, 4),
            popularCategories: data.categories
          })
        } else {
          // Fallback to empty categories if API fails
          setSuggestions({
            recentSearches: recentSearches.slice(0, 4),
            popularCategories: []
          })
        }
      } catch (error) {
        console.error('Failed to fetch suggestions:', error)
        // Fallback to recent searches only
        const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]')
        setSuggestions({
          recentSearches: recentSearches.slice(0, 4),
          popularCategories: []
        })
      } finally {
        setLoading(false)
      }
    }

    fetchSuggestions()
  }, [])

  const addRecentSearch = (query: string) => {
    if (!query.trim()) return

    const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]')
    const updatedSearches = [
      query.trim(),
      ...recentSearches.filter((s: string) => s !== query.trim())
    ].slice(0, 10) // Keep only last 10 searches

    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches))
    setSuggestions(prev => ({
      ...prev,
      recentSearches: updatedSearches.slice(0, 4)
    }))
  }

  return { suggestions, loading, addRecentSearch }
}