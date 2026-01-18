/**
 * React hooks for API data fetching
 * These hooks provide easy-to-use data fetching with loading states and error handling
 */

import { useState, useEffect } from 'react'
import { apiClient, Article, Poem, Issue, SearchResults } from '../api-client'

// Generic hook for API calls
function useApiCall<T>(
  apiCall: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await apiCall()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await apiCall()
        if (isMounted) {
          setData(result)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An error occurred')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, dependencies)

  return { data, loading, error, refetch: fetchData }
}

// Articles hooks
export function useArticles(params?: {
  category?: string
  featured?: boolean
  limit?: number
  skip?: number
}) {
  return useApiCall(
    () => apiClient.getArticles(params),
    [params?.category, params?.featured, params?.limit, params?.skip]
  )
}

export function useArticle(slug: string) {
  return useApiCall(
    () => apiClient.getArticle(slug),
    [slug]
  )
}

export function useFeaturedArticles(limit: number = 5) {
  return useApiCall(
    () => apiClient.getFeaturedArticles(limit),
    [limit]
  )
}

export function useArticlesByCategory(category: string, limit?: number) {
  return useApiCall(
    () => apiClient.getArticlesByCategory(category, limit),
    [category, limit]
  )
}

// Poems hooks
export function usePoems(params?: {
  featured?: boolean
  limit?: number
  skip?: number
}) {
  return useApiCall(
    () => apiClient.getPoems(params),
    [params?.featured, params?.limit, params?.skip]
  )
}

export function usePoem(slug: string) {
  return useApiCall(
    () => apiClient.getPoem(slug),
    [slug]
  )
}

export function useFeaturedPoems(limit: number = 3) {
  return useApiCall(
    () => apiClient.getFeaturedPoems(limit),
    [limit]
  )
}

// Issues hooks
export function useIssues(params?: {
  featured?: boolean
  limit?: number
  skip?: number
}) {
  return useApiCall(
    () => apiClient.getIssues(params),
    [params?.featured, params?.limit, params?.skip]
  )
}

export function useIssue(slug: string) {
  return useApiCall(
    () => apiClient.getIssue(slug),
    [slug]
  )
}

export function useLatestIssue() {
  return useApiCall(() => apiClient.getLatestIssue(), [])
}

// Search hook
export function useSearch(query: string, params?: {
  type?: 'articles' | 'poems' | 'all'
  limit?: number
}) {
  const [results, setResults] = useState<SearchResults | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults(null)
      setLoading(false)
      return
    }

    let isMounted = true
    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true)
        setError(null)
        const searchResults = await apiClient.search(query, params)
        if (isMounted) {
          setResults(searchResults)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Search failed')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }, 300) // Debounce search

    return () => {
      isMounted = false
      clearTimeout(timeoutId)
    }
  }, [query, params?.type, params?.limit])

  return { results, loading, error }
}

// Home page content hook
export function useHomePageContent() {
  return useApiCall(async () => {
    const [featuredArticles, featuredPoems, latestIssue] = await Promise.all([
      apiClient.getFeaturedArticles(3),
      apiClient.getFeaturedPoems(2),
      apiClient.getLatestIssue().catch(() => null),
    ])

    return {
      featuredArticles,
      featuredPoems,
      latestIssue,
    }
  }, [])
}

// Newsletter subscription hook
export function useNewsletterSubscription() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const subscribe = async (data: {
    email: string
    name?: string
    preferences?: any
  }) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)
      
      await apiClient.subscribeNewsletter(data)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Subscription failed')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setError(null)
    setSuccess(false)
  }

  return { subscribe, loading, error, success, reset }
}

// Contact form hook
export function useContactForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const sendMessage = async (data: {
    name: string
    email: string
    subject: string
    message: string
    type?: string
  }) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)
      
      await apiClient.sendContactMessage(data)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setError(null)
    setSuccess(false)
  }

  return { sendMessage, loading, error, success, reset }
}

// Content submission hook
export function useContentSubmission() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const submitContent = async (data: {
    title: string
    content: string
    type: 'ARTICLE' | 'POEM' | 'TESTIMONY'
    category?: string
    authorId: string
  }) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)
      
      await apiClient.submitContent(data)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setError(null)
    setSuccess(false)
  }

  return { submitContent, loading, error, success, reset }
}