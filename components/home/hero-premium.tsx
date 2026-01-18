'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowRightIcon, 
  PlayIcon,
  SparklesIcon,
  BookOpenIcon,
  UsersIcon,
  StarIcon,
  ChevronDownIcon,
  GlobeAltIcon,
  HeartIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline'

// Premium stats with real-time counters
const premiumStats = [
  { label: 'Active Readers', value: 15247, icon: UsersIcon, suffix: '+', color: '#1F3C88' },
  { label: 'Published Articles', value: 342, icon: BookOpenIcon, suffix: '', color: '#F4C430' },
  { label: 'Countries Reached', value: 67, icon: GlobeAltIcon, suffix: '+', color: '#2F56B0' },
  { label: 'Lives Transformed', value: 8934, icon: HeartIcon, suffix: '+', color: '#10B981' },
]

const testimonialQuotes = [
  { 
    quote: "TELOS MAED has revolutionized my understanding of faith and intellect. Every article is a masterpiece.", 
    author: "Dr. Sarah Mitchell", 
    role: "Theologian & Author",
    avatar: "SM"
  },
  { 
    quote: "The depth of wisdom and modern approach makes this magazine essential for young Christian leaders.", 
    author: "Pastor David Chen", 
    role: "Youth Pastor",
    avatar: "DC"
  },
  { 
    quote: "Finally, a Christian publication that speaks to both heart and mind with incredible sophistication.", 
    author: "Prof. Maria Santos", 
    role: "Philosophy Professor",
    avatar: "MS"
  }
]

export function Hero() {
  const [currentTitle, setCurrentTitle] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollProgress, setScrollProgress] = useState(0)
  const [counters, setCounters] = useState(premiumStats.map(stat => ({ ...stat, current: 0 })))
  
  const heroRef = useRef<HTMLElement>(null)
  const isInView = useInView(heroRef, { once: true, margin: "-100px" })
  const { scrollY } = useScroll()
  
  // Smooth scroll transforms
  const y = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8])
  const scale = useTransform(scrollY, [0, 500], [1, 0.95])
  
  // Spring animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const titleY = useSpring(0, springConfig)
  const titleScale = useSpring(1, springConfig)

  const titles = ['TELOS MAED', 'ቴሎስ ማዕድ']

  // Advanced mouse tracking with parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroRef.current?.getBoundingClientRect()
      if (rect) {
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setMousePosition({ x, y })
      }
    }
    
    const handleScroll = () => {
      const scrolled = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(scrolled / maxScroll)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Animated counters
  useEffect(() => {
    if (isInView) {
      const intervals = premiumStats.map((stat, index) => {
        return setInterval(() => {
          setCounters(prev => prev.map((counter, i) => {
            if (i === index && counter.current < stat.value) {
              return { ...counter, current: Math.min(counter.current + Math.ceil(stat.value / 100), stat.value) }
            }
            return counter
          }))
        }, 50)
      })
      
      return () => intervals.forEach(clearInterval)
    }
  }, [isInView])

  // Auto-rotate titles and testimonials
  useEffect(() => {
    const titleInterval = setInterval(() => {
      setCurrentTitle(prev => (prev + 1) % titles.length)
      titleY.set(-20)
      titleScale.set(0.95)
      setTimeout(() => {
        titleY.set(0)
        titleScale.set(1)
      }, 100)
    }, 4000)

    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonialQuotes.length)
    }, 6000)

    return () => {
      clearInterval(titleInterval)
      clearInterval(testimonialInterval)
    }
  }, [titleY, titleScale])

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0B1220 0%, #1F3C88 25%, #2F56B0 50%, #1F3C88 75%, #0B1220 100%)',
      }}
    >
      {/* ULTRA PREMIUM Background System */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0"
      >
        {/* Animated Mesh Gradient */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(244, 196, 48, 0.3) 0%, transparent 50%),
              radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, rgba(31, 60, 136, 0.4) 0%, transparent 50%),
              linear-gradient(135deg, rgba(47, 86, 176, 0.1) 0%, rgba(244, 196, 48, 0.1) 100%)
            `,
          }}
          animate={{
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Premium Floating Orbs */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-xl"
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              background: `radial-gradient(circle, ${i % 3 === 0 ? '#1F3C88' : i % 3 === 1 ? '#F4C430' : '#2F56B0'}40, transparent)`,
              left: `${10 + (i * 8)}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 50, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 360],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
        
        {/* Dynamic Grid Pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(244, 196, 48, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(244, 196, 48, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
          animate={{
            backgroundPosition: [`0px 0px`, `100px 100px`],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Premium Content Container */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20"
      >
        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-8"
        >
          <motion.div
            className="inline-flex items-center px-8 py-4 rounded-full backdrop-blur-xl border border-white/20 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(244,196,48,0.1))',
            }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <SparklesIcon className="h-5 w-5 text-yellow-400 mr-3" />
            <span className="text-white font-semibold text-lg">Premium Christian Magazine</span>
            <div className="ml-4 flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* SPECTACULAR Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-center mb-12"
        >
          <motion.h1 
            style={{ y: titleY, scale: titleScale }}
            className="relative"
          >
            {/* Title Background Glow */}
            <motion.div
              className="absolute inset-0 blur-3xl"
              style={{
                background: 'linear-gradient(135deg, #1F3C88, #F4C430, #2F56B0)',
                opacity: 0.6,
              }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            
            {/* Main Title Text - FIXED SIZE CONTAINER */}
            <motion.div
              key={currentTitle}
              initial={{ opacity: 0, rotateX: -90 }}
              animate={{ opacity: 1, rotateX: 0 }}
              exit={{ opacity: 0, rotateX: 90 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative"
              style={{
                minHeight: '12rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%'
              }}
            >
              <motion.span
                className="absolute inset-0 flex items-center justify-center text-8xl md:text-9xl lg:text-[12rem] font-black leading-none"
                style={{
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #F4C430 25%, #FFFFFF 50%, #1F3C88 75%, #FFFFFF 100%)',
                  backgroundSize: '400% 400%',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 100px rgba(244, 196, 48, 0.5)',
                  filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))',
                  whiteSpace: 'nowrap',
                  fontSize: 'clamp(4rem, 12vw, 12rem)',
                  fontWeight: '900'
                }}
              >
                <motion.span
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    background: 'inherit',
                    backgroundSize: 'inherit',
                    WebkitBackgroundClip: 'inherit',
                    backgroundClip: 'inherit',
                    WebkitTextFillColor: 'inherit',
                  }}
                >
                  {titles[currentTitle]}
                </motion.span>
              </motion.span>
              
              {/* Invisible placeholder to maintain consistent space */}
              <span 
                className="opacity-0 text-8xl md:text-9xl lg:text-[12rem] font-black leading-none"
                style={{
                  fontSize: 'clamp(4rem, 12vw, 12rem)',
                  fontWeight: '900',
                  whiteSpace: 'nowrap'
                }}
                aria-hidden="true"
              >
                TELOS MAED
              </span>
            </motion.div>
            
            {/* Holographic Shine Effect - FIXED TO CONTAINER */}
            <motion.div
              className="absolute inset-0 pointer-events-none flex items-center justify-center"
              style={{
                background: 'linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.8) 50%, transparent 75%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                minHeight: '12rem'
              }}
              animate={{
                backgroundPosition: ['-200% 0%', '200% 0%'],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <span 
                className="text-8xl md:text-9xl lg:text-[12rem] font-black leading-none opacity-0"
                style={{
                  fontSize: 'clamp(4rem, 12vw, 12rem)',
                  fontWeight: '900',
                  whiteSpace: 'nowrap'
                }}
              >
                {titles[currentTitle]}
              </span>
            </motion.div>
          </motion.h1>
          
          {/* Premium Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Where Faith Meets Intellect
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              An Evangelical Christian magazine for young leaders, thinkers, and creatives.
              <span className="block mt-2 text-yellow-400 font-semibold">
                Deep truths for the next generation.
              </span>
            </p>
          </motion.div>
        </motion.div>

        {/* Premium Stats Counter */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {counters.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-6 rounded-2xl backdrop-blur-xl border border-white/10"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(244,196,48,0.05))',
              }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                style={{ backgroundColor: `${stat.color}20`, border: `2px solid ${stat.color}40` }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="h-8 w-8" style={{ color: stat.color }} />
              </motion.div>
              <motion.div
                className="text-3xl font-black text-white mb-2"
                key={stat.current}
                initial={{ scale: 1.2, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {stat.current.toLocaleString()}{stat.suffix}
              </motion.div>
              <div className="text-gray-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Premium CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16"
        >
          {/* Primary CTA */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/magazine"
              className="group relative inline-flex items-center px-12 py-6 text-xl font-bold text-white rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #1F3C88, #F4C430, #2F56B0)',
                backgroundSize: '200% 200%',
              }}
            >
              <motion.div
                className="absolute inset-0"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  background: 'linear-gradient(135deg, #1F3C88, #F4C430, #2F56B0)',
                  backgroundSize: '200% 200%',
                }}
              />
              <BookOpenIcon className="h-8 w-8 mr-4 relative z-10" />
              <span className="relative z-10">Read Latest Issue</span>
              <ArrowRightIcon className="h-6 w-6 ml-4 relative z-10 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>

          {/* Secondary CTA */}
          <motion.button
            onClick={() => setIsVideoModalOpen(true)}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center px-10 py-5 text-lg font-semibold text-white rounded-2xl backdrop-blur-xl border border-white/20"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(244,196,48,0.1))',
            }}
          >
            <motion.div
              className="flex items-center justify-center w-12 h-12 rounded-full mr-4"
              style={{ background: 'linear-gradient(135deg, #1F3C88, #F4C430)' }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <PlayIcon className="h-6 w-6 text-white ml-1" />
            </motion.div>
            <span>Watch Our Story</span>
          </motion.button>
        </motion.div>

        {/* Premium Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-center mb-16"
        >
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto p-8 rounded-3xl backdrop-blur-xl border border-white/10"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(244,196,48,0.05))',
            }}
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-6"
              style={{ background: 'linear-gradient(135deg, #1F3C88, #F4C430)' }}
            >
              <span className="text-white font-bold text-lg">
                {testimonialQuotes[currentTestimonial].avatar}
              </span>
            </div>
            <blockquote className="text-2xl text-white font-medium mb-6 italic">
              "{testimonialQuotes[currentTestimonial].quote}"
            </blockquote>
            <div className="text-yellow-400 font-semibold text-lg">
              {testimonialQuotes[currentTestimonial].author}
            </div>
            <div className="text-gray-400">
              {testimonialQuotes[currentTestimonial].role}
            </div>
          </motion.div>
        </motion.div>

        {/* Premium Category Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { name: 'የአዘጋጁ ማስታወሻ', desc: 'Editorial', href: '/articles?category=editorial', emoji: '✍️', color: '#1F3C88' },
            { name: 'ሰውነት', desc: 'Growth', href: '/articles?category=personal', emoji: '🌱', color: '#10B981' },
            { name: 'የመሪ በትር', desc: 'Leadership', href: '/articles?category=leadership', emoji: '👑', color: '#8B5CF6' },
            { name: 'ግጥም', desc: 'Poetry', href: '/poetry', emoji: '🎭', color: '#F59E0B' },
          ].map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 40, rotateY: -30 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 2 + index * 0.1 }}
              whileHover={{ y: -10, rotateY: 5, scale: 1.02 }}
              className="group"
            >
              <Link
                href={category.href}
                className="block p-8 rounded-3xl backdrop-blur-xl border border-white/10 transition-all duration-500 h-48"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(244,196,48,0.02))',
                }}
              >
                <div className="text-center h-full flex flex-col justify-center">
                  <motion.div
                    className="text-5xl mb-4"
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.6 }}
                  >
                    {category.emoji}
                  </motion.div>
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-yellow-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-400 group-hover:text-white transition-colors">
                    {category.desc}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-white/60"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <ChevronDownIcon className="h-6 w-6" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Premium Video Modal */}
      {isVideoModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateY: -30 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateY: 30 }}
            className="relative w-full max-w-6xl mx-4 aspect-video rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1F3C88, #2F56B0)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-xl transition-colors duration-200"
            >
              ×
            </button>
            <div className="flex items-center justify-center h-full text-white">
              <motion.div
                className="text-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-full mb-8 backdrop-blur-xl"
                >
                  <PlayIcon className="h-12 w-12 ml-2" />
                </motion.div>
                <h3 className="text-4xl font-bold mb-4">TELOS MAED Story</h3>
                <p className="text-xl opacity-80">Coming Soon - Behind the Vision</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}