'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  TagIcon
} from '@heroicons/react/24/outline'

interface EditorialCategory {
  id: string
  name: string
  description: string
  color: string
  articleCount: number
  createdAt: string
}

export function EditorialCategoriesManagement() {
  const [categories, setCategories] = useState<EditorialCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<EditorialCategory | null>(null)

  // Mock data for now - replace with actual API calls
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCategories([
        {
          id: '1',
          name: 'Editorial Notes',
          description: 'Editor insights and commentary',
          color: '#3B82F6',
          articleCount: 12,
          createdAt: '2024-01-15'
        },
        {
          id: '2',
          name: 'Personal Growth',
          description: 'Articles about spiritual and personal development',
          color: '#10B981',
          articleCount: 8,
          createdAt: '2024-01-10'
        },
        {
          id: '3',
          name: 'Leadership',
          description: 'Christian leadership principles and practices',
          color: '#F59E0B',
          articleCount: 15,
          createdAt: '2024-01-05'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const handleEdit = (category: EditorialCategory) => {
    setEditingCategory(category)
    setShowForm(true)
  }

  const handleDelete = async (categoryId: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      // Simulate API call
      setCategories(prev => prev.filter(cat => cat.id !== categoryId))
    }
  }

  const handleSubmit = async (formData: any) => {
    // Simulate API call
    if (editingCategory) {
      // Update existing
      setCategories(prev => prev.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, ...formData }
          : cat
      ))
    } else {
      // Create new
      const newCategory: EditorialCategory = {
        id: Date.now().toString(),
        ...formData,
        articleCount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      }
      setCategories(prev => [...prev, newCategory])
    }
    
    setShowForm(false)
    setEditingCategory(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-dark-word dark:text-light-word">
            Editorial Categories
          </h1>
          <p className="text-dark-word/70 dark:text-light-word/70 mt-1">
            Manage article categories and their organization
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setEditingCategory(null)
            setShowForm(true)
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-light-word rounded-lg transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Category</span>
        </motion.button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-light-surface dark:bg-dark-surface rounded-lg p-6 shadow-sm border border-light-border dark:border-dark-border"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <TagIcon className="h-5 w-5 text-dark-word/60 dark:text-light-word/60" />
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="p-1 text-dark-word/60 hover:text-primary-600 dark:text-light-word/60 dark:hover:text-primary-400 transition-colors"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-1 text-dark-word/60 hover:text-red-600 dark:text-light-word/60 dark:hover:text-red-400 transition-colors"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            <h3 className="font-semibold text-dark-word dark:text-light-word mb-2">
              {category.name}
            </h3>
            
            <p className="text-sm text-dark-word/70 dark:text-light-word/70 mb-4">
              {category.description}
            </p>

            <div className="flex items-center justify-between text-sm">
              <span className="text-dark-word/60 dark:text-light-word/60">
                {category.articleCount} articles
              </span>
              <span className="text-dark-word/60 dark:text-light-word/60">
                Created {category.createdAt}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <CategoryForm
          category={editingCategory}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false)
            setEditingCategory(null)
          }}
        />
      )}
    </div>
  )
}

// Category Form Component
function CategoryForm({ 
  category, 
  onSubmit, 
  onCancel 
}: {
  category: EditorialCategory | null
  onSubmit: (data: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    description: category?.description || '',
    color: category?.color || '#3B82F6'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-light-surface dark:bg-dark-surface rounded-lg p-6 w-full max-w-md mx-4"
      >
        <h2 className="text-xl font-semibold text-dark-word dark:text-light-word mb-4">
          {category ? 'Edit Category' : 'Add New Category'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark-word dark:text-light-word mb-2">
              Category Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-background dark:bg-dark-background text-dark-word dark:text-light-word focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-word dark:text-light-word mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-background dark:bg-dark-background text-dark-word dark:text-light-word focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-word dark:text-light-word mb-2">
              Color
            </label>
            <input
              type="color"
              value={formData.color}
              onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
              className="w-full h-10 border border-light-border dark:border-dark-border rounded-lg"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-dark-word dark:text-light-word hover:bg-light-border dark:hover:bg-dark-border rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-light-word rounded-lg transition-colors"
            >
              {category ? 'Update' : 'Create'} Category
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}