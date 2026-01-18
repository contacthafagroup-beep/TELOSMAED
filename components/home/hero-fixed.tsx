'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowRightIcon, 
  PlayIcon,
  SparklesIcon,
  BookOpenIcon,
  UsersIcon,
  StarIcon
} from '@heroicons/react/24/outline'

// Compact stats for the hero
const heroStats = [
  { label: 'Articles', value: '250+', icon: BookOpenIcon },
  { label: 'Readers', value: '15K+', icon: UsersIcon },
  { label: 'Countries', value: '45+', icon: SparklesIcon },
]

const quickTestimonials = [
  { quote: "Transforms how I approach faith", author: "Sarah M." },
  { quote: "Incredible wisdom in every issue", author: "David K." },
  { quote: "Speaks directly to my soul", author: "Maria L." }
]

export function Hero() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [currentTitle, setCurrentTitle] = useState(0)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, 50])
  const opacity = useTransform(scrollY, [0, 200], [1, 0.8])
  const scale = useTransform(scrollY, [0, 300], [1, 0.95])
  const rotate = useTransform(scrollY, [0, 300], [0, 2])

  const titles = ['TELOS MAED', 'ቴሎስ ማዕድ']

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % quickTestimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Auto-rotate titles
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [titles])

  return (
    <section 
      className="relative overflow-hidden min-h-[95vh] flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* SPECTACULAR Multi-Layer Background System */}
      <motion.div 
        style={{ y, scale, rotate }}
        className="absolute inset-0"
      >
        {/* Primary Gradient Layer */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary-50 via-light-word to-scripture dark:from-primary-900/20 dark:via-dark-bg dark:to-secondary-900/20"
          animate={{
            background: [
              'linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #fef3c7 100%)',
              'linear-gradient(135deg, #dbeafe 0%, #f8fafc 50%, #fde68a 100%)',
              'linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #fef3c7 100%)'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Animated Mesh Gradient */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(31, 60, 136, 0.3) 0%, transparent 50%)`
          }}
          animate={{
            opacity: isHovered ? 0.5 : 0.3
          }}
        />
        
        {/* Interactive Gradient Orbs - Official Brand Colors */}
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #1F3C88 0%, #F4C430 50%, transparent 70%)',
            left: `${mousePosition.x * 0.5}%`,
            top: `${mousePosition.y * 0.3}%`,
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.25, 0.5, 0.25],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Secondary Orb - Brand Colors */}
        <motion.div
          className="absolute w-64 h-64 rounded-full opacity-25 blur-2xl"
          style={{
            background: 'radial-gradient(circle, #F4C430 0%, #2F56B0 70%, transparent 100%)',
            right: `${mousePosition.x * 0.3}%`,
            bottom: `${mousePosition.y * 0.4}%`,
          }}
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.2, 0.4, 0.2],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Animated Light Rays - Brand Colors */}
        <motion.div
          className="absolute inset-0 opacity-15"
          style={{
            background: `conic-gradient(from ${mousePosition.x}deg at 50% 50%, transparent 0deg, rgba(244, 196, 48, 0.4) 45deg, transparent 90deg, rgba(31, 60, 136, 0.4) 135deg, transparent 180deg, rgba(47, 86, 176, 0.3) 225deg, transparent 270deg)`
          }}
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>
      
      {/* SPECTACULAR Floating Elements System */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`primary-${i}`}
            className="absolute"
            style={{
              left: `${15 + (i * 4.5)}%`,
              top: `${8 + (i * 4.2)}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [0, Math.sin(i) * 20, 0],
              rotate: [0, 360, 0],
              opacity: [0.1, 0.6, 0.1],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: 8 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          >
            <div 
              className="w-3 h-3 rounded-full"
              style={{
                background: `linear-gradient(45deg, ${i % 3 === 0 ? '#1F3C88' : i % 3 === 1 ? '#F4C430' : '#2F56B0'}, transparent)`
              }}
            />
          </motion.div>
        ))}
        
        {/* Secondary Geometric Shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`geo-${i}`}
            className="absolute"
            style={{
              left: `${20 + (i * 12)}%`,
              top: `${15 + (i * 8)}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.5, 0.8],
              opacity: [0.05, 0.3, 0.05]
            }}
            transition={{
              duration: 12 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          >
            <div 
              className={`w-4 h-4 ${i % 2 === 0 ? 'rounded-full' : 'rotate-45'}`}
              style={{
                background: `conic-gradient(from 0deg, #1F3C88, #F4C430, #2F56B0, #1F3C88)`,
                opacity: 0.4
              }}
            />
          </motion.div>
        ))}
        
        {/* Floating Text Elements */}
        {['✨', '📖', '🙏', '💫', '⭐'].map((emoji, i) => (
          <motion.div
            key={`emoji-${i}`}
            className="absolute text-2xl opacity-20"
            style={{
              left: `${25 + (i * 18)}%`,
              top: `${20 + (i * 15)}%`,
            }}
            animate={{
              y: [-40, 40, -40],
              rotate: [0, 360],
              opacity: [0.1, 0.4, 0.1],
              scale: [0.8, 1.3, 0.8]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      <motion.div 
        style={{ opacity }}
        className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center"
      >
        {/* Premium Badge with Glow Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-glory-100 via-primary-100 to-secondary-100 dark:from-glory-900/20 dark:via-primary-900/20 dark:to-secondary-900/20 text-primary-800 dark:text-primary-300 text-sm font-medium mb-8 border border-primary-200 dark:border-primary-700 shadow-lg"
        >
          <SparklesIcon className="h-4 w-4 mr-2" />
          Premium Christian Magazine
          <motion.div className="ml-3 flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="h-3 w-3 text-glory-500 fill-current" />
            ))}
          </motion.div>
        </motion.div>

        {/* ULTIMATE SPECTACULAR Main Title - Programming Marvel - FIXED LAYOUT */}
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: -30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          transition={{ 
            duration: 2, 
            delay: 0.5, 
            type: "spring", 
            stiffness: 80,
            damping: 12
          }}
          className="perspective-1000 mb-12"
          style={{
            minHeight: '16rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Holographic Title Container */}
          <motion.div
            className="relative"
            whileHover={{ 
              scale: 1.03,
              rotateY: 3,
              rotateX: 2
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* ULTIMATE SPECTACULAR TITLE - PERFECTLY CENTERED */}
            <motion.h1 
              className="font-display font-black relative select-none"
              style={{
                fontSize: 'clamp(4rem, 15vw, 16rem)',
                lineHeight: '0.9',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                minHeight: '16rem',
                maxHeight: '16rem',
                height: '16rem',
                marginBottom: '3rem',
                position: 'relative',
                zIndex: 10
              }}
            >
              {/* SPECTACULAR Background Glow - Official Brand Colors */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(31, 60, 136, 0.4) 0%, rgba(244, 196, 48, 0.3) 50%, transparent 80%)',
                  filter: 'blur(50px)',
                  transform: 'scale(1.8)'
                }}
                animate={{
                  scale: [1.5, 2.0, 1.5],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Main Title Container - ABSOLUTE CENTER */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  y: [0, -8, 0],
                  rotateX: [0, 2, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* PERFECTLY CENTERED Title Text */}
                <motion.div 
                  key={currentTitle}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    rotateY: 0
                  }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                  transition={{ 
                    duration: 0.8,
                    ease: "backOut"
                  }}
                  className="flex items-center justify-center"
                >
                  <motion.span
                    style={{
                      background: 'linear-gradient(135deg, #1F3C88 0%, #F4C430 25%, #2F56B0 50%, #F4C430 75%, #1F3C88 100%)',
                      backgroundSize: '400% 400%',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: '#1F3C88',
                      WebkitTextFillColor: 'transparent',
                      textShadow: '6px 6px 0px rgba(244, 196, 48, 0.9), 12px 12px 0px rgba(47, 86, 176, 0.8), 18px 18px 25px rgba(17, 24, 39, 0.4)',
                      filter: 'drop-shadow(0 0 50px rgba(31, 60, 136, 0.8)) drop-shadow(0 0 100px rgba(244, 196, 48, 0.6))',
                      WebkitTextStroke: '3px rgba(31, 60, 136, 0.9)',
                      fontSize: 'clamp(4rem, 15vw, 16rem)',
                      fontWeight: '900',
                      lineHeight: '0.9',
                      whiteSpace: 'nowrap',
                      textAlign: 'center',
                      display: 'block'
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      textShadow: [
                        '6px 6px 0px rgba(244, 196, 48, 0.9), 12px 12px 0px rgba(47, 86, 176, 0.8), 18px 18px 25px rgba(17, 24, 39, 0.4)',
                        '6px 6px 0px rgba(47, 86, 176, 0.9), 12px 12px 0px rgba(244, 196, 48, 0.8), 18px 18px 25px rgba(17, 24, 39, 0.4)',
                        '6px 6px 0px rgba(244, 196, 48, 0.9), 12px 12px 0px rgba(47, 86, 176, 0.8), 18px 18px 25px rgba(17, 24, 39, 0.4)'
                      ]
                    }}
                    transition={{ 
                      backgroundPosition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                      textShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    {titles[currentTitle]}
                  </motion.span>
                </motion.div>
              </motion.div>
            </motion.h1>
          </motion.div>
        </motion.div>

        {/* SPECTACULAR Enhanced Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: -20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="relative"
        >
          <motion.p 
            className="text-4xl font-serif font-bold mb-10 relative"
            whileHover={{ 
              scale: 1.05,
              rotateY: 2
            }}
            style={{
              background: 'linear-gradient(135deg, #1F3C88 0%, #F4C430 50%, #2F56B0 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              filter: 'drop-shadow(0 3px 6px rgba(17, 24, 39, 0.15))'
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ duration: 10, repeat: Infinity }}
          >
            Where Faith Meets Intellect
          </motion.p>
        </motion.div>

        {/* SPECTACULAR Animated Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <motion.p 
            className="text-xl text-wisdom dark:text-dark-secondary leading-relaxed relative"
            whileHover={{ scale: 1.02 }}
          >
            <span>An Evangelical Christian magazine for young leaders, thinkers, and creatives.</span>
            <br />
            <span className="text-primary-600 dark:text-dark-primary font-bold text-2xl">
              Deep truths for the next generation.
            </span>
          </motion.p>
        </motion.div>

        {/* Enhanced CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-10 mb-16"
        >
          {/* Read Latest Issue Button */}
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.05, y: -8 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/magazine"
              className="relative flex items-center gap-6 px-12 py-6 bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-700 text-white font-bold text-xl rounded-3xl shadow-2xl transition-all duration-500 hover:shadow-primary-500/40"
            >
              <BookOpenIcon className="h-8 w-8" />
              <div>
                <div className="text-2xl">Read Latest Issue</div>
                <div className="text-sm opacity-90">Discover Deep Truths</div>
              </div>
              <ArrowRightIcon className="h-6 w-6" />
            </Link>
          </motion.div>

          {/* Watch Our Story Button */}
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.button
              onClick={() => setIsVideoModalOpen(true)}
              className="flex items-center gap-5 text-xl font-bold text-truth dark:text-dark-text hover:text-primary-600 dark:hover:text-dark-primary transition-all duration-300 px-8 py-6 rounded-2xl bg-light-word/80 dark:bg-dark-card/80 backdrop-blur-sm border border-gray-200/50 dark:border-dark-border/50 hover:border-primary-300 dark:hover:border-primary-600 shadow-lg hover:shadow-xl"
            >
              <motion.div 
                className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 border-2 border-primary-600 dark:border-dark-primary rounded-full shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
              >
                <PlayIcon className="h-7 w-7 text-primary-600 dark:text-dark-primary ml-1" />
              </motion.div>
              
              <div className="text-left">
                <div className="font-display">Watch Our Story</div>
                <div className="text-sm text-wisdom dark:text-dark-secondary font-normal mt-1">
                  Behind the Vision
                </div>
              </div>
              
              <ArrowRightIcon className="h-5 w-5 text-primary-600 dark:text-dark-primary" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Enhanced Category Cards - COMPLETELY ISOLATED FROM TITLE */}
        <div className="fixed-category-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="grid grid-cols-2 gap-6 sm:grid-cols-4 max-w-6xl mx-auto mb-12"
          >
            {[
              { 
                name: 'የአዘጋጁ ማስታወሻ', 
                desc: 'Editorial', 
                href: '/articles?category=editorial', 
                emoji: '✍️', 
                color: 'from-blue-500 to-blue-600'
              },
              { 
                name: 'ሰውነት', 
                desc: 'Growth', 
                href: '/articles?category=personal', 
                emoji: '🌱', 
                color: 'from-green-500 to-green-600'
              },
              { 
                name: 'የመሪ በትር', 
                desc: 'Leadership', 
                href: '/articles?category=leadership', 
                emoji: '👑', 
                color: 'from-purple-500 to-purple-600'
              },
              { 
                name: 'ግጥም', 
                desc: 'Poetry', 
                href: '/poetry', 
                emoji: '🎭', 
                color: 'from-rose-500 to-rose-600'
              },
            ].map((category, index) => (
              <motion.div
                key={`${category.name}-fixed`}
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 1, 
                  delay: 1.8 + index * 0.2,
                  type: "spring",
                  stiffness: 120
                }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.08,
                  rotateY: 8
                }}
                className="group relative"
              >
                <Link
                  href={category.href}
                  className="block relative overflow-hidden rounded-3xl backdrop-blur-xl border-2 border-white/20 dark:border-white/10 hover:border-white/40 dark:hover:border-white/20 transition-all duration-700 hover:shadow-2xl transform-gpu"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7)) dark:linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.8))',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.2) inset',
                    padding: '2rem',
                    height: '200px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div className="relative text-center w-full h-full flex flex-col justify-center items-center">
                    <motion.div 
                      className="text-5xl mb-4"
                      whileHover={{ 
                        scale: 1.3,
                        rotate: [0, -15, 15, 0]
                      }}
                      style={{
                        height: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {category.emoji}
                    </motion.div>
                    
                    <div className="flex-1 flex flex-col justify-center items-center">
                      <h3 
                        className="font-serif text-lg font-bold text-truth dark:text-dark-text group-hover:text-primary-600 dark:group-hover:text-dark-primary transition-colors duration-500 mb-2 text-center leading-tight"
                        style={{
                          minHeight: '48px',
                          maxHeight: '48px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden'
                        }}
                      >
                        {category.name}
                      </h3>
                      
                      <p 
                        className="text-base text-wisdom dark:text-dark-secondary group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-500 font-medium"
                        style={{
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {category.desc}
                      </p>
                    </div>
                    
                    <motion.div
                      className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      whileHover={{ x: 4, scale: 1.2 }}
                    >
                      <ArrowRightIcon className="h-5 w-5 text-primary-600 dark:text-dark-primary" />
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full max-w-4xl mx-4 aspect-video bg-gradient-to-br from-primary-900 to-secondary-900 rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200"
            >
              ×
            </button>
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
                  className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6"
                >
                  <PlayIcon className="h-8 w-8 ml-1" />
                </motion.div>
                <h3 className="text-2xl font-display font-bold mb-2">TELOS MAED Story</h3>
                <p className="text-lg opacity-80">Coming Soon</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}