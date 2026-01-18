/**
 * API Client for TELOS MAED Frontend
 * This file provides typed functions to interact with the backend APIs
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

// Types for API responses
export interface Article {
  id: string
  title: string
  titleAm?: string
  slug: string
  excerpt?: string
  excerptAm?: string
  content: string
  contentAm?: string
  category: string
  tags: string
  featured: boolean
  published: boolean
  publishedAt?: string
  readTime?: number
  views: number
  likes: number
  shares: number
  coverImage?: string
  author: {
    id: string
    name: string
    avatar?: string
    bio?: string
  }
  issue?: {
    id: string
    title: string
    slug: string
    month: number
    year: number
  }
  _count: {
    comments: number
    articleLikes: number
    bookmarks: number
  }
}

export interface Poem {
  id: string
  title: string
  titleAm?: string
  slug: string
  content: string
  contentAm?: string
  type: string
  featured: boolean
  published: boolean
  publishedAt?: string
  views: number
  likes: number
  shares: number
  author: {
    id: string
    name: string
    avatar?: string
    bio?: string
  }
  _count: {
    comments: number
    poemLikes: number
    bookmarks: number
  }
}

export interface Issue {
  id: string
  title: string
  titleAm?: string
  slug: string
  description?: string
  descriptionAm?: string
  coverImage?: string
  theme?: string
  month: number
  year: number
  published: boolean
  publishedAt?: string
  featured: boolean
  downloadUrl?: string
  _count: {
    articles: number
    poems: number
  }
}

export interface SearchResults {
  query: string
  results: {
    articles: Article[]
    poems: Poem[]
  }
  total: number
}

// API Client Class
class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}/api${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error)
      throw error
    }
  }

  // Articles API
  async getArticles(params?: {
    category?: string
    featured?: boolean
    limit?: number
    skip?: number
    search?: string
  }): Promise<Article[]> {
    const searchParams = new URLSearchParams()
    
    if (params?.category) searchParams.set('category', params.category)
    if (params?.featured !== undefined) searchParams.set('featured', String(params.featured))
    if (params?.limit) searchParams.set('limit', String(params.limit))
    if (params?.skip) searchParams.set('skip', String(params.skip))
    if (params?.search) searchParams.set('search', params.search)

    const query = searchParams.toString()
    return this.request<Article[]>(`/articles${query ? `?${query}` : ''}`)
  }

  async getArticle(slug: string): Promise<Article> {
    return this.request<Article>(`/articles/${slug}`)
  }

  async getFeaturedArticles(limit: number = 5): Promise<Article[]> {
    return this.getArticles({ featured: true, limit })
  }

  async getArticlesByCategory(category: string, limit?: number): Promise<Article[]> {
    return this.getArticles({ category, limit })
  }

  // Poems API
  async getPoems(params?: {
    featured?: boolean
    limit?: number
    skip?: number
    search?: string
  }): Promise<Poem[]> {
    const searchParams = new URLSearchParams()
    
    if (params?.featured !== undefined) searchParams.set('featured', String(params.featured))
    if (params?.limit) searchParams.set('limit', String(params.limit))
    if (params?.skip) searchParams.set('skip', String(params.skip))
    if (params?.search) searchParams.set('search', params.search)

    const query = searchParams.toString()
    return this.request<Poem[]>(`/poems${query ? `?${query}` : ''}`)
  }

  async getPoem(slug: string): Promise<Poem> {
    return this.request<Poem>(`/poems/${slug}`)
  }

  async getFeaturedPoems(limit: number = 3): Promise<Poem[]> {
    return this.getPoems({ featured: true, limit })
  }

  // Issues API
  async getIssues(params?: {
    featured?: boolean
    limit?: number
    skip?: number
  }): Promise<Issue[]> {
    const searchParams = new URLSearchParams()
    
    if (params?.featured !== undefined) searchParams.set('featured', String(params.featured))
    if (params?.limit) searchParams.set('limit', String(params.limit))
    if (params?.skip) searchParams.set('skip', String(params.skip))

    const query = searchParams.toString()
    return this.request<Issue[]>(`/issues${query ? `?${query}` : ''}`)
  }

  async getIssue(slug: string): Promise<Issue> {
    return this.request<Issue>(`/issues/${slug}`)
  }

  async getLatestIssue(): Promise<Issue> {
    const issues = await this.getIssues({ limit: 1 })
    if (issues.length === 0) {
      throw new Error('No issues found')
    }
    return issues[0]
  }

  // Search API
  async search(query: string, params?: {
    type?: 'articles' | 'poems' | 'all'
    limit?: number
  }): Promise<SearchResults> {
    const searchParams = new URLSearchParams()
    searchParams.set('q', query)
    
    if (params?.type) searchParams.set('type', params.type)
    if (params?.limit) searchParams.set('limit', String(params.limit))

    return this.request<SearchResults>(`/search?${searchParams.toString()}`)
  }

  // Newsletter API
  async subscribeNewsletter(data: {
    email: string
    name?: string
    preferences?: any
  }): Promise<{ message: string }> {
    return this.request<{ message: string }>('/newsletter', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async unsubscribeNewsletter(email: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/newsletter?email=${encodeURIComponent(email)}`, {
      method: 'DELETE',
    })
  }

  // Contact API
  async sendContactMessage(data: {
    name: string
    email: string
    subject: string
    message: string
    type?: string
  }): Promise<{ message: string; id: string }> {
    return this.request<{ message: string; id: string }>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Submissions API
  async submitContent(data: {
    title: string
    content: string
    type: 'ARTICLE' | 'POEM' | 'TESTIMONY'
    category?: string
    authorId: string
  }): Promise<{ message: string; submission: any }> {
    return this.request<{ message: string; submission: any }>('/submissions', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

// Export singleton instance
export const apiClient = new ApiClient()

// Utility functions for common operations
export const api = {
  // Get content for home page
  async getHomePageContent() {
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
  },

  // Get content for articles page
  async getArticlesPageContent(category?: string, page: number = 1, limit: number = 12) {
    const skip = (page - 1) * limit
    const articles = await apiClient.getArticles({ category, limit, skip })
    
    return {
      articles,
      hasMore: articles.length === limit,
      currentPage: page,
    }
  },

  // Get content for poetry page
  async getPoetryPageContent(page: number = 1, limit: number = 9) {
    const skip = (page - 1) * limit
    const poems = await apiClient.getPoems({ limit, skip })
    
    return {
      poems,
      hasMore: poems.length === limit,
      currentPage: page,
    }
  },

  // Get content for magazine page
  async getMagazinePageContent() {
    const [latestIssue, allIssues] = await Promise.all([
      apiClient.getLatestIssue().catch(() => null),
      apiClient.getIssues({ limit: 12 }),
    ])

    return {
      latestIssue,
      allIssues,
    }
  },

  // Parse tags from string
  parseTags(tagsString: string): string[] {
    return tagsString ? tagsString.split(',').map(tag => tag.trim()).filter(Boolean) : []
  },

  // Format tags to string
  formatTags(tags: string[]): string {
    return tags.join(',')
  },

  // Parse social media links
  parseSocialLinks(socialString?: string): Record<string, string> {
    if (!socialString) return {}
    try {
      return JSON.parse(socialString)
    } catch {
      return {}
    }
  },

  // Format social media links
  formatSocialLinks(social: Record<string, string>): string {
    return JSON.stringify(social)
  },
}

export default apiClient