'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowRightIcon, 
  PlayIcon, 
  BookOpenIcon, 
  SparklesIcon,
} from '@heroicons/react/24/outline'

export function Hero() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [videoData, setVideoData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Fetch video from API
  useEffect(() => {
    fetch('/api/hero/video')
      .then(res => res.json())
      .then((videoData) => {
        // Only set video if it's active
        if (videoData.isActive) {
          setVideoData(videoData)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load hero data:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <section className="relative overflow-hidden min-h-[50vh] sm:min-h-[60vh] lg:min-h-[100vh] flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden min-h-[50vh] sm:min-h-[60vh] lg:min-h-[100vh] flex items-center justify-center">
      {/* Enhanced Background with subtle animations */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50" />
        
        {/* Subtle floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-200/30 rounded-full"
              style={{
                left: `${15 + (i * 12)}%`,
                top: `${8 + (i * 11)}%`,
              }}
              animate={{
                y: [-25, 25, -25],
                opacity: [0.2, 0.6, 0.2],
                scale: [0.6, 1.4, 0.6]
              }}
              transition={{
                duration: 5 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 py-4 sm:py-8 lg:py-16 sm:px-6 lg:px-8 z-10">
        {/* Centered Content */}
        <div className="max-w-4xl mx-auto">
          
          {/* Content */}
          <div className="text-center">
            {/* Enhanced Main Title - Moved Up */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-4 sm:mb-6 lg:mb-8"
            >
              <motion.h1 
                className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-7xl text-slate-800 mb-3 sm:mb-4 lg:mb-6"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                TELOS MAED
              </motion.h1>
              
              <motion.div 
                className="w-20 sm:w-24 lg:w-32 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-3 sm:mb-4 lg:mb-6 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 128 }}
                transition={{ duration: 1, delay: 0.8 }}
              />
              
              <motion.p 
                className="text-lg sm:text-xl lg:text-2xl font-serif text-amber-600 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Live purposefully and lead effectively!
              </motion.p>
            </motion.div>

            {/* Enhanced Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-2xl mx-auto mb-6 sm:mb-8 lg:mb-12"
            >
              <p className="text-lg text-slate-600 leading-relaxed mb-3">
                An Evangelical Christian magazine for young leaders, thinkers, and creatives.
              </p>
              <motion.p 
                className="text-xl font-semibold text-blue-700"
                whileHover={{ scale: 1.05 }}
              >
                Deep truths for the next generation.
              </motion.p>
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-12"
            >
              {/* Read Latest Issue Button */}
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/articles"
                  className="inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  <BookOpenIcon className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="text-lg">Read Latest Articles</div>
                    <div className="text-sm opacity-90 font-normal">Discover Deep Truths</div>
                  </div>
                  <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Watch Our Story Button */}
              {videoData && (
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button 
                    onClick={() => setIsVideoModalOpen(true)}
                    className="inline-flex items-center gap-4 px-8 py-5 bg-white/90 backdrop-blur-sm border-2 border-slate-200 text-slate-700 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300 group"
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full group-hover:from-blue-200 group-hover:to-indigo-200 transition-all">
                      <PlayIcon className="h-6 w-6 text-blue-600 ml-0.5" />
                    </div>
                    <div className="text-left">
                      <div className="text-lg">{videoData.title}</div>
                      <div className="text-sm text-slate-500 font-normal">{videoData.description}</div>
                    </div>
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Bible Verse Section - Ultra Compact Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-4 sm:mt-6 lg:mt-12"
        >
          <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 rounded-lg sm:rounded-xl lg:rounded-2xl p-2 sm:p-4 lg:p-6 xl:p-8 shadow-2xl border border-indigo-300/20 max-w-5xl mx-auto overflow-hidden">
            
            {/* Animated Background Elements - Reduced */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Floating Particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-15, 15, -15],
                    x: [0, Math.sin(i) * 10, 0],
                    opacity: [0.2, 0.6, 0.2],
                    scale: [0.5, 1.2, 0.5]
                  }}
                  transition={{
                    duration: 3 + i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center">
              {/* Decorative Header - Compact */}
              <div className="flex justify-center mb-2 sm:mb-3 lg:mb-4">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity }
                  }}
                  className="relative"
                >
                  <div className="w-8 sm:w-12 lg:w-16 h-8 sm:h-12 lg:h-16 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl">
                    <BookOpenIcon className="h-4 sm:h-6 lg:h-8 w-4 sm:w-6 lg:w-8 text-white" />
                  </div>
                </motion.div>
              </div>

              {/* Amharic Verse - Ultra Compact */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.6 }}
                className="mb-2 sm:mb-3 lg:mb-4"
              >
                <motion.blockquote 
                  className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-white to-blue-200 mb-1 sm:mb-2 leading-tight tracking-normal" 
                  dir="rtl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  "ከቅዱሳን ሁሉ ጋር ስፋቱና ርዝመቱ ከፍታውም ጥልቅነቱም ምን ያህል መሆኑን ለማስተዋል፥ ከመታወቅም የሚያልፈውን የክርስቶስን ፍቅር ለማወቅ ትበረቱ ዘንድ፥ እስከ እግዚአብሔርም ፍጹም ሙላት ደርሳችሁ ትሞሉ ዘንድ።"
                </motion.blockquote>
              </motion.div>

              {/* English Verse - Ultra Compact */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.8 }}
                className="mb-2 sm:mb-3 lg:mb-4"
              >
                <motion.blockquote 
                  className="text-xs sm:text-sm lg:text-base font-semibold text-blue-100 leading-tight italic tracking-normal"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-yellow-300">¹⁸</span> May be able to comprehend with all saints what is the <span className="text-yellow-300 font-bold">breadth, and length, and depth, and height;</span>
                  <br />
                  <span className="text-yellow-300">¹⁹</span> And to know the <span className="text-orange-300 font-bold">love of Christ</span>, which passeth knowledge, that ye might be <span className="text-blue-300 font-bold">filled with all the fulness of God</span>.
                </motion.blockquote>
              </motion.div>

              {/* Bible Reference - Compact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.0 }}
                className="relative"
              >
                <div className="flex items-center justify-center space-x-2 sm:space-x-3 lg:space-x-4 mb-2 sm:mb-3 lg:mb-4">
                  <motion.div 
                    className="w-8 sm:w-12 lg:w-16 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-orange-500"
                    initial={{ width: 0 }}
                    animate={{ width: 32 }}
                    transition={{ duration: 1.5, delay: 2.2 }}
                  />
                  <motion.span 
                    className="text-yellow-300 font-bold text-xs sm:text-sm lg:text-base px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-lg"
                    whileHover={{ scale: 1.05, y: -1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    ኤፌሶን 3፥18-19 / Ephesians 3:18-19
                  </motion.span>
                  <motion.div 
                    className="w-8 sm:w-12 lg:w-16 h-0.5 bg-gradient-to-r from-orange-500 via-yellow-400 to-transparent"
                    initial={{ width: 0 }}
                    animate={{ width: 32 }}
                    transition={{ duration: 1.5, delay: 2.2 }}
                  />
                </div>
              </motion.div>

              {/* Inspirational Tagline - Minimal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.4 }}
                className="mt-2 sm:mt-3 lg:mt-4"
              >
                <motion.p
                  className="text-blue-200 text-xs sm:text-sm font-medium italic"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Exploring the infinite dimensions of Christ's love through faith and intellect
                </motion.p>
                <motion.p
                  className="text-blue-200 text-xs font-medium mt-0.5 sm:mt-1" 
                  dir="rtl"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                >
                  በእምነት እና በምሁራዊነት የክርስቶስን ፍቅር ልኬቶች መመርመር
                </motion.p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Video Modal */}
      {isVideoModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="relative w-full max-w-4xl mx-4 aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Video content */}
            {videoData && videoData.videoUrl ? (
              <iframe
                src={videoData.videoUrl.replace('youtu.be/', 'www.youtube.com/embed/').replace('watch?v=', 'embed/').split('?')[0]}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex items-center justify-center h-full text-white">
                <motion.div
                  className="text-center"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6"
                  >
                    <PlayIcon className="h-8 w-8 ml-1" />
                  </motion.div>
                  <h3 className="text-3xl font-display font-bold mb-4">{videoData?.titleAm || 'TELOS MAED Story'}</h3>
                  <p className="text-lg opacity-80 mb-2">{videoData?.descriptionAm || 'Discover Our Mission'}</p>
                  <p className="text-sm opacity-60">Video Coming Soon</p>
                </motion.div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}