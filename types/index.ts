export interface User {
  id: string
  email: string
  name?: string
  role: 'READER' | 'CONTRIBUTOR' | 'EDITOR' | 'ADMIN'
  bio?: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface Article {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  category: Category
  featured: boolean
  published: boolean
  publishedAt?: Date
  readTime?: number
  createdAt: Date
  updatedAt: Date
  author: User
  authorId: string
  issue?: Issue
  issueId?: string
}

export interface Poem {
  id: string
  title: string
  slug: string
  content: string
  featured: boolean
  published: boolean
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
  author: User
  authorId: string
  issue?: Issue
  issueId?: string
}

export interface Issue {
  id: string
  title: string
  slug: string
  description?: string
  coverImage?: string
  month: number
  year: number
  published: boolean
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
  articles: Article[]
  poems: Poem[]
}

export type Category = 'EDITORIAL' | 'PERSONAL' | 'LEADERSHIP' | 'POETRY'

export interface CategoryInfo {
  key: Category
  amharic: string
  english: string
  description: string
  color: string
}

export const CATEGORIES: CategoryInfo[] = [
  {
    key: 'EDITORIAL',
    amharic: 'የአዘጋጁ ማስታወሻ',
    english: 'Editorial',
    description: 'Editorial reflections and insights',
    color: 'blue'
  },
  {
    key: 'PERSONAL',
    amharic: 'ሰውነት',
    english: 'Personal Growth',
    description: 'Personal growth & character formation',
    color: 'green'
  },
  {
    key: 'LEADERSHIP',
    amharic: 'የመሪ በትር',
    english: 'Leadership',
    description: 'Leadership & vision',
    color: 'purple'
  },
  {
    key: 'POETRY',
    amharic: 'ግጥም',
    english: 'Poetry',
    description: 'Spiritual poetry & worship writing',
    color: 'rose'
  }
]

export interface SearchFilters {
  category?: Category
  author?: string
  dateRange?: {
    from: Date
    to: Date
  }
  featured?: boolean
}

export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}