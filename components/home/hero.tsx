'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowRightIcon, 
  PlayIcon,
  SparklesIcon,
  BookOpenIcon,
  UsersIcon,
  StarIcon,
  XMarkIcon,
  HeartIcon,
  LightBulbIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'

// Category data with Amharic descriptions
const categories = [
  { 
    name: 'የአዘጋጁ ማስታወሻ', 
    desc: 'Editorial', 
    href: '/articles?category=editorial', 
    emoji: '✍️', 
    color: 'from-blue-500 to-blue-600',
    amharicTitle: 'የአዘጋጁ ማስታወሻ',
    amharicDescription: `የአዘጋጁ ማስታወሻ ክፍል የቴሎስ ማዕድ መጽሔት ዋና አዘጋጆች እና የአዘጋጅ ቡድን አባላት የሚጽፉበት ክፍል ነው። በዚህ ክፍል ውስጥ፣ የወቅቱ ጉዳዮች፣ የሃይማኖት እና የማህበረሰብ ጉዳዮች፣ እንዲሁም የመጽሔቱ አቅጣጫ እና ራዕይ ላይ ጥልቅ ትንተና እና አስተያየት ይገኛል።

ይህ ክፍል የሚያተኩረው በወጣት ክርስቲያኖች ፊት ያሉ ተግዳሮቶች፣ እድሎች እና የእምነት ጉዞ ላይ ነው። አዘጋጆቹ በመጽሐፍ ቅዱስ መሰረት ያላቸውን እይታ እና ልምድ በማካፈል፣ አንባቢዎች በዘመናዊው ዓለም ውስጥ እምነታቸውን እንዴት እንደሚኖሩ መመሪያ ይሰጣሉ።

የአዘጋጁ ማስታወሻ ክፍል እንዲሁም የመጽሔቱን ራዕይ፣ ተልእኮ እና እሴቶች የሚያንፀባርቅ ሲሆን፣ አንባቢዎች ከመጽሔቱ ጋር ጥልቅ ግንኙነት እንዲፈጥሩ ይረዳል።`,
    features: [
      'የወቅቱ ጉዳዮች ትንተና',
      'የእምነት መመሪያዎች',
      'የመጽሔቱ ራዕይ እና ተልእኮ',
      'የአዘጋጅ ቡድን አስተያየቶች'
    ]
  },
  { 
    name: 'ሰውነት', 
    desc: 'Personal Growth', 
    href: '/articles?category=personal', 
    emoji: '🌱', 
    color: 'from-green-500 to-green-600',
    amharicTitle: 'ሰውነት - የግል እድገት',
    amharicDescription: `ሰውነት ክፍል የግል እድገት እና የመንፈሳዊ ብስለት ላይ የሚያተኩር ክፍል ነው። ይህ ክፍል ወጣት ክርስቲያኖች በእምነት ጉዞአቸው ውስጥ እንዴት እንደሚያድጉ፣ ባህሪያቸውን እንዴት እንደሚቀርፁ እና ከእግዚአብሔር ጋር ያላቸውን ግንኙነት እንዴት እንደሚያጠናክሩ ይመለከታል።

በዚህ ክፍል ውስጥ የሚገኙ ጽሑፎች የግል ጸሎት፣ የመጽሐፍ ቅዱስ ጥናት፣ የባህሪ ለውጥ፣ የስሜት አያያዝ፣ እና የመንፈሳዊ ዲሲፕሊን ጉዳዮችን ይሸፍናሉ። እንዲሁም የግል ምስክርነቶች እና የእምነት ታሪኮች ይካተታሉ።

ሰውነት ክፍል አንባቢዎች በእግዚአብሔር ፊት ተጠያቂነታቸውን እንዲረዱ፣ የግል ቅድስናን እንዲፈልጉ እና በክርስቶስ ውስጥ ያላቸውን ማንነት እንዲያውቁ ይረዳል።`,
    features: [
      'የግል ጸሎት እና ጥናት',
      'የባህሪ ለውጥ መመሪያዎች',
      'የመንፈሳዊ ዲሲፕሊን',
      'የግል ምስክርነቶች'
    ]
  },
  { 
    name: 'የመሪ በትር', 
    desc: 'Leadership', 
    href: '/articles?category=leadership', 
    emoji: '👑', 
    color: 'from-purple-500 to-purple-600',
    amharicTitle: 'የመሪ በትር - አመራር',
    amharicDescription: `የመሪ በትር ክፍል የክርስቲያን አመራር ላይ የሚያተኩር ክፍል ነው። ይህ ክፍል ወጣት ክርስቲያኖች በተለያዩ የህይወት ዘርፎች ውስጥ እንዴት መሪ እንደሚሆኑ፣ እንዴት ተጽዕኖ እንደሚያሳድሩ እና እንዴት ለለውጥ ወኪል እንደሚሆኑ ይመለከታል።

በዚህ ክፍል ውስጥ የቤተክርስቲያን አመራር፣ የንግድ አመራር፣ የማህበረሰብ አመራር፣ እና የቤተሰብ አመራር ጉዳዮች ይሸፍናሉ። እንዲሁም የአመራር መርሆዎች፣ የቡድን አመራር፣ የውሳኔ አሰጣጥ፣ እና የግንኙነት ክህሎቶች ይካተታሉ።

የመሪ በትር ክፍል አንባቢዎች የአገልግሎት አመራርን እንዲማሩ፣ የክርስቶስን ምሳሌ እንዲከተሉ እና በማህበረሰባቸው ውስጥ አወንታዊ ለውጥ እንዲያመጡ ይረዳል።`,
    features: [
      'የክርስቲያን አመራር መርሆዎች',
      'የቤተክርስቲያን አመራር',
      'የንግድ እና ሙያ አመራር',
      'የማህበረሰብ ተጽዕኖ'
    ]
  },
  { 
    name: 'ግጥም', 
    desc: 'Poetry', 
    href: '/poetry', 
    emoji: '🎭', 
    color: 'from-rose-500 to-rose-600',
    amharicTitle: 'ግጥም - የመንፈሳዊ ግጥም',
    amharicDescription: `ግጥም ክፍል የመንፈሳዊ ግጥሞች እና የፈጠራ ጽሑፎች የሚገኙበት ክፍል ነው። ይህ ክፍል ወጣት ክርስቲያኖች እምነታቸውን በጥበብ እና በፈጠራ እንዴት እንደሚገልጹ ያሳያል። ግጥሞቹ የእግዚአብሔርን ፍቅር፣ ጸጋ፣ እና ታማኝነት ያወድሳሉ።

በዚህ ክፍል ውስጥ የሚገኙ ግጥሞች የተለያዩ ጭብጦችን ይሸፍናሉ - የአምልኮ ግጥሞች፣ የምስጋና ግጥሞች፣ የጸሎት ግጥሞች፣ እና የመንፈሳዊ ጉዞ ግጥሞች። እንዲሁም የተፈጥሮ እና የፍጥረት ውበት ላይ የሚያተኩሩ ግጥሞች ይካተታሉ።

ግጥም ክፍል አንባቢዎች እምነታቸውን በጥበብ እንዲገልጹ፣ የመንፈሳዊ ስሜቶችን እንዲያካፍሉ እና በፈጠራ አምልኮ እንዲሳተፉ ያበረታታል። እንዲሁም ወጣት ገጣሚዎች ስራቸውን እንዲያካፍሉ መድረክ ይሰጣል።`,
    features: [
      'የመንፈሳዊ ግጥሞች',
      'የአምልኮ እና ምስጋና ግጥሞች',
      'የወጣት ገጣሚዎች ስራዎች',
      'የፈጠራ አምልኮ መግለጫዎች'
    ]
  },
]

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
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(null)
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
        
        {/* Interactive Gradient Orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-25 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #1F3C88 0%, #F4C430 50%, transparent 70%)',
            left: `${mousePosition.x * 0.5}%`,
            top: `${mousePosition.y * 0.3}%`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Secondary Orb */}
        <motion.div
          className="absolute w-64 h-64 rounded-full opacity-20 blur-2xl"
          style={{
            background: 'radial-gradient(circle, #F4C430 0%, #2F56B0 70%, transparent 100%)',
            right: `${mousePosition.x * 0.3}%`,
            bottom: `${mousePosition.y * 0.4}%`,
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.35, 0.15],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Animated Light Rays */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            background: `conic-gradient(from ${mousePosition.x}deg at 50% 50%, transparent 0deg, rgba(244, 196, 48, 0.3) 45deg, transparent 90deg, rgba(31, 60, 136, 0.3) 135deg, transparent 180deg)`
          }}
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 20,
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
            {/* ULTIMATE SPECTACULAR TITLE - SUPER VISIBLE & CENTERED */}
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
                marginBottom: '3rem',
                position: 'relative',
                zIndex: 10
              }}
            >
              {/* SPECTACULAR Background Glow */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(31, 60, 136, 0.3) 0%, rgba(244, 196, 48, 0.2) 50%, transparent 80%)',
                  filter: 'blur(40px)',
                  transform: 'scale(1.5)'
                }}
                animate={{
                  scale: [1.3, 1.8, 1.3],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Main Title Container - PERFECTLY CENTERED */}
              <motion.div
                className="relative"
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
                animate={{
                  y: [0, -8, 0],
                  rotateX: [0, 2, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* SUPER VISIBLE Title Text */}
                <motion.span 
                  className="relative"
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
                  style={{
                    background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 25%, #FFD700 50%, #F7931E 75%, #FF6B35 100%)',
                    backgroundSize: '400% 400%',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: '#FF6B35',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '6px 6px 0px rgba(255, 215, 0, 0.9), 12px 12px 0px rgba(255, 107, 53, 0.7), 18px 18px 30px rgba(0,0,0,0.5)',
                    filter: 'drop-shadow(0 0 50px rgba(255, 107, 53, 0.8)) drop-shadow(0 0 100px rgba(255, 215, 0, 0.6))',
                    WebkitTextStroke: '3px rgba(255, 107, 53, 0.9)',
                    position: 'relative',
                    zIndex: 5
                  }}
                >
                  <motion.span
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      textShadow: [
                        '6px 6px 0px rgba(255, 215, 0, 0.9), 12px 12px 0px rgba(255, 107, 53, 0.7), 18px 18px 30px rgba(0,0,0,0.5)',
                        '6px 6px 0px rgba(255, 107, 53, 0.9), 12px 12px 0px rgba(255, 215, 0, 0.7), 18px 18px 30px rgba(0,0,0,0.5)',
                        '6px 6px 0px rgba(255, 215, 0, 0.9), 12px 12px 0px rgba(255, 107, 53, 0.7), 18px 18px 30px rgba(0,0,0,0.5)'
                      ]
                    }}
                    transition={{ 
                      backgroundPosition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                      textShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                    style={{
                      background: 'inherit',
                      backgroundSize: 'inherit',
                      WebkitBackgroundClip: 'inherit',
                      backgroundClip: 'inherit',
                      WebkitTextFillColor: 'inherit'
                    }}
                  >
                    {titles[currentTitle]}
                  </motion.span>
                </motion.span>
                
                {/* SPECTACULAR Holographic Shine Effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.9) 50%, transparent 75%)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: 'inherit',
                    fontWeight: 'inherit',
                    lineHeight: 'inherit',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  animate={{
                    backgroundPosition: ['-200% 0%', '200% 0%']
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  {titles[currentTitle]}
                </motion.div>
                
                {/* AMAZING Floating Particles Around Title */}
                {[...Array(16)].map((_, i) => (
                  <motion.div
                    key={`title-magic-${i}`}
                    className="absolute"
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: `linear-gradient(45deg, ${i % 3 === 0 ? '#1F3C88' : i % 3 === 1 ? '#F4C430' : '#2F56B0'}, transparent)`,
                      left: `${10 + (i * 5)}%`,
                      top: `${15 + ((i % 4) * 20)}%`,
                      filter: 'blur(1px)'
                    }}
                    animate={{
                      y: [0, -60, 0],
                      x: [0, Math.sin(i) * 40, 0],
                      opacity: [0.3, 1, 0.3],
                      scale: [0.5, 2, 0.5],
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 8 + i * 0.3,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
                
                {/* SPECTACULAR Light Rays */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `conic-gradient(from 0deg at 50% 50%, 
                      transparent 0deg, 
                      rgba(244, 196, 48, 0.3) 30deg, 
                      transparent 60deg,
                      rgba(31, 60, 136, 0.3) 120deg,
                      transparent 150deg,
                      rgba(47, 86, 176, 0.3) 210deg,
                      transparent 240deg,
                      rgba(244, 196, 48, 0.3) 300deg,
                      transparent 330deg)`,
                    filter: 'blur(20px)',
                    opacity: 0.6
                  }}
                  animate={{
                    rotate: [0, 360]
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
              
              {/* ULTIMATE 3D Underline Effect */}
              <motion.div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                style={{
                  width: '90%',
                  height: '8px',
                  borderRadius: '4px',
                  background: 'linear-gradient(90deg, #1F3C88, #F4C430, #2F56B0, #F4C430, #1F3C88)',
                  backgroundSize: '400% 100%',
                  boxShadow: '0 10px 40px rgba(31, 60, 136, 0.5), 0 0 80px rgba(244, 196, 48, 0.4)',
                  filter: 'blur(1px)'
                }}
                initial={{ scaleX: 0, rotateX: -45, opacity: 0 }}
                animate={{ 
                  scaleX: 1, 
                  rotateX: 0, 
                  opacity: 1,
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ 
                  scaleX: { duration: 2, delay: 1 },
                  rotateX: { duration: 2, delay: 1 },
                  opacity: { duration: 2, delay: 1 },
                  backgroundPosition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }}
              />
            </motion.h1>
          
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
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 10, repeat: Infinity }}
            >
              Where Faith Meets Intellect
            </motion.p>
            
            {/* Animated Decorative Elements */}
            <motion.div
              className="absolute -left-12 top-1/2 transform -translate-y-1/2"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.3, 1]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              <span className="text-4xl">✨</span>
            </motion.div>
            <motion.div
              className="absolute -right-12 top-1/2 transform -translate-y-1/2"
              animate={{ 
                rotate: [360, 0],
                scale: [1, 1.3, 1]
              }}
              transition={{ duration: 8, repeat: Infinity, delay: 4 }}
            >
              <span className="text-4xl">✨</span>
            </motion.div>
            
            {/* Floating Cross Symbol */}
            <motion.div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <span className="text-3xl text-glory-500">✝</span>
            </motion.div>
          </motion.div>
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
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.05, delay: 1.5 }}
            >
              An Evangelical Christian magazine for young leaders, thinkers, and creatives.
            </motion.span>
            <br />
            <motion.span 
              className="text-primary-600 dark:text-dark-primary font-bold text-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 2 }}
              whileHover={{ 
                scale: 1.1,
                textShadow: "0 0 20px rgba(31, 60, 136, 0.5)"
              }}
            >
              Deep truths for the next generation.
            </motion.span>
            
            {/* Animated Cursor */}
            <motion.span
              className="inline-block w-1 h-6 bg-primary-600 ml-1"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            
            {/* Floating Quote Marks */}
            <motion.span
              className="absolute -left-6 -top-2 text-4xl text-glory-400 opacity-30"
              animate={{ 
                rotate: [0, 10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              "
            </motion.span>
            <motion.span
              className="absolute -right-6 -bottom-2 text-4xl text-glory-400 opacity-30"
              animate={{ 
                rotate: [0, -10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            >
              "
            </motion.span>
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

        {/* Debug Elements - SUPER VISIBLE */}
        <div 
          className="fixed top-4 right-4 z-[9999]"
          style={{ 
            position: 'fixed', 
            top: '20px', 
            right: '20px', 
            zIndex: 9999,
            pointerEvents: 'auto'
          }}
        >
          <button
            onClick={() => {
              console.log('Test button clicked');
              alert('Test button clicked!');
              setSelectedCategory(categories[0]);
            }}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 shadow-2xl border-2 border-white font-bold text-lg"
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              border: '2px solid white',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
            }}
          >
            🔴 TEST MODAL 🔴
          </button>
        </div>
        
        {selectedCategory && (
          <div className="fixed top-4 left-4 bg-red-500 text-white p-2 rounded z-50 shadow-lg">
            Selected: {selectedCategory.name}
          </div>
        )}

        {/* Enhanced Category Cards - FIXED DIMENSIONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="grid grid-cols-2 gap-6 sm:grid-cols-4 max-w-6xl mx-auto mb-12"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
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
              className="group relative cursor-pointer"
              style={{
                minHeight: '200px',
                height: '200px'
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Category clicked:', category.name);
                console.log('Setting selectedCategory to:', category);
                setSelectedCategory(category);
                console.log('selectedCategory state should now be:', category.name);
              }}
            >
              <div
                className="relative overflow-hidden rounded-3xl backdrop-blur-xl border-2 border-white/20 dark:border-white/10 hover:border-white/40 dark:hover:border-white/20 transition-all duration-700 hover:shadow-2xl transform-gpu"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7)) dark:linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.8))',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.2) inset',
                  padding: '2rem',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div className="relative text-center w-full">
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
                  
                  <div 
                    style={{
                      minHeight: '80px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <h3 
                      className="font-serif text-lg font-bold text-truth dark:text-dark-text group-hover:text-primary-600 dark:group-hover:text-dark-primary transition-colors duration-500 mb-2"
                      style={{
                        minHeight: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        lineHeight: '1.2'
                      }}
                    >
                      {category.name}
                    </h3>
                    
                    <p 
                      className="text-base text-wisdom dark:text-dark-secondary group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-500 font-medium"
                      style={{
                        minHeight: '24px',
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
                    <SparklesIcon className="h-5 w-5 text-primary-600 dark:text-dark-primary" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        </motion.div>
      </motion.div>

      {/* Premium Category Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <>
            {console.log('Rendering modal for:', selectedCategory.name)}
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedCategory(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="relative w-full max-w-4xl bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 2px, transparent 2px)',
                    backgroundSize: '40px 40px'
                  }}></div>
                </div>
                
                <div className="relative p-8 text-white">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200 group"
                  >
                    <XMarkIcon className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  </button>
                  
                  <div className="flex items-center mb-6">
                    <motion.div
                      className="text-6xl mr-6"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {selectedCategory.emoji}
                    </motion.div>
                    <div>
                      <h2 className="text-4xl font-display font-black mb-2">
                        {selectedCategory.amharicTitle}
                      </h2>
                      <p className="text-blue-100 text-lg">
                        {selectedCategory.desc} • ቴሎስ ማዕድ
                      </p>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white/30 rounded-full"
                        style={{
                          left: `${20 + (i * 15)}%`,
                          top: `${30 + (i % 3) * 20}%`,
                        }}
                        animate={{
                          y: [-10, 10, -10],
                          opacity: [0.3, 0.8, 0.3],
                          scale: [0.8, 1.2, 0.8]
                        }}
                        transition={{
                          duration: 3 + i * 0.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Main Description */}
                  <div className="lg:col-span-2">
                    <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                      <BookOpenIcon className="h-6 w-6 mr-3 text-blue-600" />
                      ስለ ይህ ክፍል
                    </h3>
                    
                    <div className="prose prose-lg text-slate-700 leading-relaxed space-y-4">
                      {selectedCategory.amharicDescription.split('\n\n').map((paragraph, index) => (
                        <motion.p
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="text-justify"
                        >
                          {paragraph}
                        </motion.p>
                      ))}
                    </div>
                  </div>

                  {/* Features Sidebar */}
                  <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200">
                      <h4 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                        <SparklesIcon className="h-5 w-5 mr-2 text-blue-600" />
                        ዋና ዋና ባህሪያት
                      </h4>
                      
                      <ul className="space-y-3">
                        {selectedCategory.features.map((feature, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                            className="flex items-center text-slate-700"
                          >
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                            <span className="font-medium">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* Stats */}
                      <div className="mt-6 pt-6 border-t border-blue-200">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div className="bg-white/60 rounded-xl p-3">
                            <div className="text-2xl font-bold text-blue-600">50+</div>
                            <div className="text-xs text-slate-600">ጽሑፎች</div>
                          </div>
                          <div className="bg-white/60 rounded-xl p-3">
                            <div className="text-2xl font-bold text-green-600">4.8★</div>
                            <div className="text-xs text-slate-600">ደረጃ</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Community Engagement */}
                    <div className="mt-6 bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-6 border border-purple-200">
                      <h4 className="text-lg font-bold text-slate-800 mb-3 flex items-center">
                        <UsersIcon className="h-5 w-5 mr-2 text-purple-600" />
                        የማህበረሰብ ተሳትፎ
                      </h4>
                      
                      <div className="space-y-3 text-sm text-slate-700">
                        <div className="flex items-center">
                          <HeartIcon className="h-4 w-4 mr-2 text-red-500" />
                          <span>በወር 2,500+ አንባቢዎች</span>
                        </div>
                        <div className="flex items-center">
                          <LightBulbIcon className="h-4 w-4 mr-2 text-yellow-500" />
                          <span>ንቁ ውይይቶች እና አስተያየቶች</span>
                        </div>
                        <div className="flex items-center">
                          <AcademicCapIcon className="h-4 w-4 mr-2 text-blue-500" />
                          <span>የጥናት መመሪያዎች ይገኛሉ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 pt-8 border-t border-slate-200">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href={selectedCategory.href}
                        className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={() => setSelectedCategory(null)}
                      >
                        <BookOpenIcon className="h-6 w-6 mr-3" />
                        <div className="text-left">
                          <div>ክፍሉን ይመልከቱ</div>
                          <div className="text-sm opacity-90">View {selectedCategory.desc}</div>
                        </div>
                        <ArrowRightIcon className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-slate-300 text-slate-700 font-bold text-lg rounded-2xl hover:border-slate-400 hover:bg-slate-50 transition-all duration-300"
                      >
                        <XMarkIcon className="h-5 w-5 mr-2" />
                        ዝጋ
                      </button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          </>
        )}
      </AnimatePresence>

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