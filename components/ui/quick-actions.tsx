'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  PlusIcon,
  BookmarkIcon,
  ShareIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ArrowUpIcon
} from '@heroicons/react/24/outline'

interface QuickAction {
  name: string
  icon: React.ComponentType<any>
  action: () => void
  color: string
}

export function QuickActions() {
  const [isOpen, setIsOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Show scroll to top button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const quickActions: QuickAction[] = [
    {
      name: 'Bookmark',
      icon: BookmarkIcon,
      action: () => {
        // Add to bookmarks in localStorage
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')
        const currentPage = {
          url: window.location.href,
          title: document.title,
          timestamp: new Date().toISOString()
        }
        
        // Check if already bookmarked
        const isBookmarked = bookmarks.some((b: any) => b.url === currentPage.url)
        if (!isBookmarked) {
          bookmarks.push(currentPage)
          localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
          alert('Page bookmarked!')
        } else {
          alert('Page already bookmarked!')
        }
      },
      color: 'bg-blue-600 hover:bg-blue-700 text-light-word'
    },
    {
      name: 'Share',
      icon: ShareIcon,
      action: () => {
        if (navigator.share) {
          navigator.share({
            title: 'TELOS MAED - Where Faith Meets Intellect',
            text: 'Check out this Christian magazine for young leaders, thinkers, and creatives',
            url: window.location.href
          })
        } else {
          navigator.clipboard.writeText(window.location.href)
          alert('Link copied to clipboard!')
        }
      },
      color: 'bg-green-600 hover:bg-green-700 text-light-word'
    },
    {
      name: 'Like',
      icon: HeartIcon,
      action: () => {
        // Add to liked pages in localStorage
        const likes = JSON.parse(localStorage.getItem('likedPages') || '[]')
        const currentPage = {
          url: window.location.href,
          title: document.title,
          timestamp: new Date().toISOString()
        }
        
        // Check if already liked
        const isLiked = likes.some((l: any) => l.url === currentPage.url)
        if (!isLiked) {
          likes.push(currentPage)
          localStorage.setItem('likedPages', JSON.stringify(likes))
          alert('Page liked! ❤️')
        } else {
          // Remove like
          const updatedLikes = likes.filter((l: any) => l.url !== currentPage.url)
          localStorage.setItem('likedPages', JSON.stringify(updatedLikes))
          alert('Like removed')
        }
      },
      color: 'bg-rose-600 hover:bg-rose-700 text-light-word'
    },
    {
      name: 'Comment',
      icon: ChatBubbleLeftIcon,
      action: () => {
        // Scroll to comments section if it exists, or show feedback
        const commentsSection = document.getElementById('comments') || 
                               document.querySelector('[data-comments]') ||
                               document.querySelector('.comments')
        
        if (commentsSection) {
          commentsSection.scrollIntoView({ behavior: 'smooth' })
        } else {
          // If no comments section, open feedback form or redirect
          const feedback = prompt('Leave your comment or feedback:')
          if (feedback) {
            // Store feedback in localStorage for now
            const feedbacks = JSON.parse(localStorage.getItem('pageFeedback') || '[]')
            feedbacks.push({
              url: window.location.href,
              comment: feedback,
              timestamp: new Date().toISOString()
            })
            localStorage.setItem('pageFeedback', JSON.stringify(feedbacks))
            alert('Thank you for your feedback!')
          }
        }
      },
      color: 'bg-purple-600 hover:bg-purple-700 text-light-word'
    }
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Quick Actions Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {quickActions.map((action, index) => (
              <motion.button
                key={action.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                onClick={() => {
                  action.action()
                  setIsOpen(false)
                }}
                className={`flex items-center space-x-3 px-4 py-3 rounded-full shadow-lg transition-all duration-200 group ${action.color}`}
                title={action.name}
              >
                <action.icon className="h-5 w-5" />
                <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {action.name}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && !isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="absolute bottom-16 right-0 p-3 bg-secondary-600 hover:bg-secondary-700 text-light-word rounded-full shadow-lg transition-all duration-200"
            title="Scroll to top"
          >
            <ArrowUpIcon className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-lg transition-all duration-200 ${
          isOpen 
            ? 'bg-red-600 hover:bg-red-700 text-light-word rotate-45' 
            : 'bg-primary-600 hover:bg-primary-700 text-light-word'
        }`}
        title={isOpen ? 'Close menu' : 'Quick actions'}
      >
        <PlusIcon className="h-6 w-6" />
      </motion.button>
    </div>
  )
}