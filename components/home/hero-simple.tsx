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
      {/* Brand Color Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-white" />
        
        {/* Subtle brand color accents */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#203685]/10 rounded-full"
              style={{
                left: `${15 + (i * 12)}%`,
                top: `${8 + (i * 11)}%`,
              }}
              animate={{
                y: [-25, 25, -25],
                opacity: [0.1, 0.3, 0.1],
                scale: [0.6, 1.2, 0.6]
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
                className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-7xl text-[#203685] mb-3 sm:mb-4 lg:mb-6"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                TELOS MAED
              </motion.h1>
              
              <motion.div 
                className="w-20 sm:w-24 lg:w-32 h-1 bg-[#203685] mx-auto mb-3 sm:mb-4 lg:mb-6 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 128 }}
                transition={{ duration: 1, delay: 0.8 }}
              />
              
              <motion.p 
                className="text-lg sm:text-xl lg:text-2xl font-serif text-[#203685] font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Live purposefully and lead effectively!
              </motion.p>
            </motion.div>

            {/* Amharic Bible Verse Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-3xl mx-auto mb-6 sm:mb-8 lg:mb-12"
            >
              <motion.p 
                className="text-lg sm:text-xl text-gray-600 leading-relaxed font-serif italic"
                dir="rtl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                "ከቅዱሳን ሁሉ ጋር ስፋቱና ርዝመቱ ከፍታውም ጥልቅነቱም ምን ያህል መሆኑን ለማስተዋል፥ ከመታወቅም የሚያልፈውን የክርስቶስን ፍቅር ለማወቅ ትበረቱ ዘንድ፥ እስከ እግዚአብሔርም ፍጹም ሙላት ደርሳችሁ ትሞሉ ዘንድ።"
              </motion.p>
              <motion.p 
                className="text-base sm:text-lg font-medium text-[#203685] mt-2 sm:mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                — ኤፌሶን 3፥18-19
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
                  className="inline-flex items-center gap-4 px-10 py-5 bg-[#203685] text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:bg-[#203685]/90 transition-all duration-300 group"
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
                    className="inline-flex items-center gap-4 px-8 py-5 bg-white border-2 border-[#E3E4E6] text-gray-700 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#203685] hover:text-[#203685] group"
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-50 border border-[#E3E4E6] rounded-full group-hover:bg-[#203685]/5 group-hover:border-[#203685]/20 transition-all">
                      <PlayIcon className="h-6 w-6 text-[#203685] ml-0.5" />
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