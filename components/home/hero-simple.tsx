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
    <section className="relative overflow-hidden min-h-[50vh] sm:min-h-[60vh] lg:min-h-[100vh] flex items-start justify-center bg-gray-50 pt-0">
      {/* Hero Image Container with Margins and Border Radius */}
      <div className="relative mx-6 sm:mx-8 lg:mx-12 mt-0 mb-4 sm:mb-6 lg:mb-8 w-full max-w-7xl h-screen sm:h-[55vh] lg:h-[85vh] rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero-cover.png')",
          }}
        />
        {/* Overlay for better text readability - Removed for clarity */}
        {/* <div className="absolute inset-0 bg-white/10 lg:bg-white/5" /> */}
        
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
      
      <div className="absolute inset-0 flex items-center justify-center z-10 pb-0 sm:pb-0 lg:pb-0">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8 lg:py-16 text-center w-full">
          {/* Centered Content */}
          <div className="flex flex-col justify-end h-full min-h-[60vh] sm:min-h-[50vh] lg:min-h-[75vh]">
            {/* Enhanced Main Title - Moved Up */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-2 sm:mb-6 lg:mb-8"
            >
              <motion.h1 
                className="font-display font-bold text-xl sm:text-4xl lg:text-5xl xl:text-7xl text-white mb-1 sm:mb-4 lg:mb-6 drop-shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                TELOS MAED
              </motion.h1>
              
              <motion.div 
                className="w-12 sm:w-24 lg:w-32 h-1 bg-white mx-auto mb-1 sm:mb-4 lg:mb-6 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 128 }}
                transition={{ duration: 1, delay: 0.8 }}
              />
              
              <motion.p 
                className="text-sm sm:text-xl lg:text-2xl font-serif text-white font-medium drop-shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Live purposefully lead effectively!
              </motion.p>
            </motion.div>

            {/* Amharic Bible Verse Description - All Devices */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-3xl mx-4 sm:mx-6 lg:mx-auto mb-2 sm:mb-8 lg:mb-12 px-3 sm:px-6 lg:px-8 py-2 sm:py-4 lg:py-6 bg-black/20 rounded-lg sm:rounded-xl backdrop-blur-sm"
            >
              <motion.p 
                className="text-xs sm:text-xl text-white leading-tight font-serif italic drop-shadow-md text-center"
                dir="rtl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                "ከቅዱሳን ሁሉ ጋር ስፋቱና ርዝመቱ ከፍታውም ጥልቅነቱም ምን ያህል መሆኑን ለማስተዋል፥ ከመታወቅም የሚያልፈውን የክርስቶስን ፍቅር ለማወቅ ትበረቱ ዘንድ፥ እስከ እግዚአብሔርም ፍጹም ሙላት ደርሳችሁ ትሞሉ ዘንድ።"
              </motion.p>
              <motion.p 
                className="text-xs sm:text-lg font-medium text-white mt-1 sm:mt-3 drop-shadow-sm text-center"
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
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-4 sm:mb-8 lg:mb-12"
            >
              {/* Read Latest Issue Button */}
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/articles"
                  className="inline-flex items-center gap-2 sm:gap-4 px-6 sm:px-10 py-3 sm:py-5 bg-[#203685] text-white font-semibold sm:font-bold text-sm sm:text-lg rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl hover:bg-[#203685]/90 transition-all duration-300 group"
                >
                  <BookOpenIcon className="h-4 w-4 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="text-sm sm:text-lg">Read Latest Articles</div>
                    <div className="text-xs sm:text-sm opacity-90 font-normal hidden sm:block">Discover Deep Truths</div>
                  </div>
                  <ArrowRightIcon className="h-3 w-3 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
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
                    className="inline-flex items-center gap-2 sm:gap-4 px-6 sm:px-8 py-3 sm:py-5 bg-white border border-[#E3E4E6] sm:border-2 text-gray-700 font-medium sm:font-semibold text-sm sm:text-lg rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 hover:border-[#203685] hover:text-[#203685] group"
                  >
                    <div className="flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 bg-gray-50 border border-[#E3E4E6] rounded-full group-hover:bg-[#203685]/5 group-hover:border-[#203685]/20 transition-all">
                      <PlayIcon className="h-4 w-4 sm:h-6 sm:w-6 text-[#203685] ml-0.5" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm sm:text-lg">{videoData.title}</div>
                      <div className="text-xs sm:text-sm text-slate-500 font-normal hidden sm:block">{videoData.description}</div>
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