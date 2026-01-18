'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ReadingProgressProps {
  className?: string
}

export function ReadingProgress({ className = '' }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setProgress(Math.min(100, Math.max(0, scrollPercent)))
    }

    window.addEventListener('scroll', updateProgress)
    updateProgress() // Initial calculation

    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200 dark:bg-dark-border ${className}`}>
      <motion.div
        className="h-full bg-gradient-to-r from-primary-600 to-glory-500"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  )
}