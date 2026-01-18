'use client'

import { useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { 
  CalendarIcon, 
  ClockIcon, 
  ArrowRightIcon,
  SparklesIcon,
  BookOpenIcon,
  UsersIcon,
  HeartIcon,
  StarIcon,
  PlayIcon
} from '@heroicons/react/24/outline'
import { useRef } from 'react'

const featuredIssue = {
  id: '1',
  title: 'Faith in the Digital Age',
  slug: 'faith-digital-age-january-2026',
  description: 'Exploring how young Christians navigate faith, technology, and authentic community in our interconnected world.',
  month: 'January',
  year: 2026,
  coverImage: '/api/placeholder/600/800',
  publishedAt: '2026-01-01',
  featured: true,
  downloads: 12847,
  rating: 4.9
}

export function FeaturedIssue() {
  const [isHovered, setIsHovered] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, -100])

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        style={{ y }}
        className="absolute inset-0"
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 25%, #f1f5f9 50%, #ffffff 75%, #f8fafc 100%)'
          }}
        />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center px-8 py-4 rounded-full backdrop-blur-xl border-2 shadow-xl mb-8 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(31,60,136,0.1))',
              borderImage: 'linear-gradient(135deg, #1F3C88, #F4C430) 1'
            }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <SparklesIcon className="h-6 w-6 text-yellow-500 mr-3" />
            <span className="text-gray-800 font-bold text-lg">Featured This Month</span>
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-6xl font-display font-black mb-6 relative"
            style={{
              background: 'linear-gradient(135deg, #1F3C88 0%, #F4C430 50%, #2F56B0 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            This Month's Issue
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Dive deep into carefully curated content that challenges, inspires, and transforms
          </motion.p>
        </motion.div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-20 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
            className="relative group"
          >
            <motion.div
              className="aspect-[3/4] relative rounded-3xl overflow-hidden shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #1F3C88 0%, #2F56B0 25%, #F4C430 50%, #2F56B0 75%, #1F3C88 100%)'
              }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 25px 80px rgba(31, 60, 136, 0.3)'
              }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                <div className="text-center">
                  <motion.div
                    className="text-2xl font-display font-bold mb-2"
                  >
                    TELOS MAED
                  </motion.div>
                  <div className="text-sm opacity-80">CHRISTIAN MAGAZINE</div>
                </div>
                
                <div className="text-center">
                  <motion.h3 
                    className="text-3xl md:text-4xl font-display font-black mb-4 leading-tight"
                  >
                    {featuredIssue.title}
                  </motion.h3>
                  <div className="text-lg opacity-90">
                    {featuredIssue.month} {featuredIssue.year}
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <UsersIcon className="h-4 w-4 mr-1" />
                      {featuredIssue.downloads.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <StarIcon className="h-4 w-4 mr-1 fill-current" />
                      {featuredIssue.rating}
                    </div>
                  </div>
                  <motion.div
                    className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <ArrowRightIcon className="h-6 w-6" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="mt-12 lg:mt-0"
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-display font-bold text-gray-900 mb-4">
                  {featuredIssue.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {featuredIssue.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center px-4 py-2 bg-blue-50 rounded-full">
                  <CalendarIcon className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-blue-800 font-medium">
                    {featuredIssue.month} {featuredIssue.year}
                  </span>
                </div>
                <div className="flex items-center px-4 py-2 bg-green-50 rounded-full">
                  <UsersIcon className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-green-800 font-medium">
                    {featuredIssue.downloads.toLocaleString()} downloads
                  </span>
                </div>
                <div className="flex items-center px-4 py-2 bg-yellow-50 rounded-full">
                  <StarIcon className="h-5 w-5 text-yellow-600 mr-2 fill-current" />
                  <span className="text-yellow-800 font-medium">
                    {featuredIssue.rating} rating
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={`/magazine/${featuredIssue.slug}`}
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <BookOpenIcon className="h-5 w-5 mr-2" />
                    Read Full Issue
                    <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-2xl shadow-lg hover:shadow-xl hover:border-gray-400 transition-all duration-300">
                    <PlayIcon className="h-5 w-5 mr-2" />
                    Preview
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}