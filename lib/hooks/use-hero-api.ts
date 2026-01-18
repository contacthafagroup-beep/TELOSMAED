import { useState, useEffect } from 'react'

interface CategoryCard {
  id: number
  nameEn: string
  nameAm: string
  descEn: string
  descAm: string
  icon: string
  color: string
  href: string
  amharicTitle: string
  amharicDescription: string
  features: string[]
  isActive: boolean
  order: number
}

interface HeroVideo {
  id: number
  title: string
  titleAm: string
  description: string
  descriptionAm: string
  videoUrl: string
  isActive: boolean
}

export function useHeroCategories() {
  const [categories, setCategories] = useState<CategoryCard[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/hero/categories')
      if (!res.ok) throw new Error('Failed to fetch categories')
      const data = await res.json()
      setCategories(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const updateCategory = async (id: number, data: Partial<CategoryCard>) => {
    try {
      const res = await fetch(`/api/hero/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!res.ok) throw new Error('Failed to update category')
      const updated = await res.json()
      setCategories(cats => cats.map(cat => cat.id === id ? updated : cat))
      return updated
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    }
  }

  const createCategory = async (data: Omit<CategoryCard, 'id'>) => {
    try {
      const res = await fetch('/api/hero/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!res.ok) throw new Error('Failed to create category')
      const created = await res.json()
      setCategories(cats => [...cats, created])
      return created
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    }
  }

  const deleteCategory = async (id: number) => {
    try {
      const res = await fetch(`/api/hero/categories/${id}`, { 
        method: 'DELETE' 
      })
      if (!res.ok) throw new Error('Failed to delete category')
      setCategories(cats => cats.filter(cat => cat.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    }
  }

  return { 
    categories, 
    loading, 
    error,
    updateCategory, 
    createCategory, 
    deleteCategory,
    refetch: fetchCategories
  }
}

export function useHeroVideo() {
  const [video, setVideo] = useState<HeroVideo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVideo = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/hero/video')
      if (!res.ok) throw new Error('Failed to fetch video')
      const data = await res.json()
      setVideo(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVideo()
  }, [])

  const updateVideo = async (data: Partial<HeroVideo>) => {
    try {
      const res = await fetch('/api/hero/video', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!res.ok) throw new Error('Failed to update video')
      const updated = await res.json()
      setVideo(updated)
      return updated
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    }
  }

  return { video, loading, error, updateVideo, refetch: fetchVideo }
}
