'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { CalendarIcon, ClockIcon, UserIcon, HeartIcon, BookmarkIcon, ShareIcon, EyeIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon, BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid'
import { CATEGORIES } from '@/types'

// Enhanced mock data with more details
const mockArticles = [
  {
    id: '1',
    title: 'The Power of Authentic Community in Youth Ministry',
    slug: 'authentic-community-youth-ministry',
    excerpt: 'Exploring how genuine relationships transform young lives and create lasting spiritual impact in our digital age. Discover practical strategies for building meaningful connections.',
    category: 'LEADERSHIP' as const,
    author: { 
      name: 'Pastor David Kim', 
      avatar: '/api/placeholder/40/40',
      bio: 'Youth Pastor with 15+ years of ministry experience'
    },
    publishedAt: '2026-01-05',
    readTime: 7,
    featured: true,
    likes: 234,
    views: 1847,
    bookmarks: 89,
    tags: ['Youth Ministry', 'Community', 'Leadership', 'Relationships'],
    image: '/api/placeholder/600/400'
  },
  {
    id: '2',
    title: 'Finding God in the Ordinary Moments',
    slug: 'finding-god-ordinary-moments',
    excerpt: 'A profound reflection on how daily routines become sacred when we learn to see with spiritual eyes. Transform your perspective on everyday life.',
    category: 'PERSONAL' as const,
    author: { 
      name: 'Maria Santos', 
      avatar: '/api/placeholder/40/40',
      bio: 'Spiritual Director and Author'
    },
    publishedAt: '2026-01-03',
    readTime: 5,
    featured: false,
    likes: 156,
    views: 923,
    bookmarks: 67,
    tags: ['Spirituality', 'Daily Life', 'Mindfulness', 'Faith'],
    image: '/api/placeholder/600/400'
  },
  {
    id: '3',
    title: 'Navigating Faith Transitions in University',
    slug: 'faith-transitions-university',
    excerpt: 'Practical wisdom for young adults facing questions, doubts, and spiritual growth during college years. A comprehensive guide for students.',
    category: 'EDITORIAL' as const,
    author: { 
      name: 'Editorial Team', 
      avatar: '/api/placeholder/40/40',
      bio: 'TELOS MAED Editorial Collective'
    },
    publishedAt: '2025-12-28',
    readTime: 9,
    featured: false,
    likes: 298,
    views: 1456,
    bookmarks: 123,
    tags: ['University', 'Faith', 'Young Adults', 'Growth'],
    image: '/api/placeholder/600/400'
  },
  {
    id: '4',
    title: 'The Art of Contemplative Prayer',
    slug: 'contemplative-prayer-art',
    excerpt: 'Dive deep into the ancient practice of contemplative prayer and discover how silence can transform your relationship with God.',
    category: 'PERSONAL' as const,
    author: { 
      name: 'Brother Thomas', 
      avatar: '/api/placeholder/40/40',
      bio: 'Contemplative Monk and Spiritual Guide'
    },
    publishedAt: '2025-01-08',
    readTime: '8 min read',
    image: '/api/placeholder/600/400'
  }
]