'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Bars3Icon, 
  XMarkIcon, 
  ChevronDownIcon,
  BookOpenIcon,
  PencilSquareIcon,
  UserGroupIcon,
  SparklesIcon,
  MagnifyingGlassIcon,
  BellIcon,
  UserCircleIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'
import { Logo } from '@/components/ui/logo'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { SearchModal } from '@/components/ui/search-modal'
import { NotificationCenter } from '@/components/ui/notification-center'
import { UserMenu } from '@/components/ui/user-menu'

// Enhanced navigation structure with dropdowns and descriptions
const navigation = [
  { 
    name: 'Home', 
    href: '/',
    simple: true
  },
  {
    name: 'Content',
    href: '/articles',
    hasDropdown: true,
    dropdownItems: [
      {
        name: 'የአዘጋጁ ማስታወሻ',
        href: '/articles?category=editorial',
        description: 'Editorial reflections',
        icon: PencilSquareIcon,
        amharic: true
      },
      {
        name: 'ሰውነት',
        href: '/articles?category=personal',
        description: 'Personal growth & character',
        icon: UserCircleIcon,
        amharic: true
      },
      {
        name: 'የመሪ በትር',
        href: '/articles?category=leadership',
        description: 'Leadership & vision',
        icon: UserGroupIcon,
        amharic: true
      },
      {
        name: 'ግጥም',
        href: '/poetry',
        description: 'Spiritual poetry & worship',
        icon: SparklesIcon,
        amharic: true
      }
    ]
  },
  { 
    name: 'About', 
    href: '/about',
    simple: true
  },
  { 
    name: 'Submit', 
    href: '/submit',
    simple: true,
    highlight: true
  }
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const headerY = useTransform(scrollY, [0, 100], [0, -5])
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.98])

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.querySelector('header')?.getBoundingClientRect()
      if (rect) {
        setMousePosition({ 
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Don't close if clicking on a dropdown button or dropdown content
      const target = event.target as HTMLElement
      if (target.closest('[data-dropdown-button]') || target.closest('[data-dropdown-content]')) {
        return
      }
      setActiveDropdown(null)
    }
    
    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [activeDropdown])

  return (
    <>
      <motion.header 
        style={{ 
          y: headerY, 
          opacity: headerOpacity,
          zIndex: 1000,
          background: scrolled 
            ? `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.98) 100%)` 
            : `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.95) 100%)`,
          boxShadow: scrolled 
            ? '0 20px 60px rgba(31, 60, 136, 0.1), 0 0 0 1px rgba(31, 60, 136, 0.05) inset'
            : '0 10px 30px rgba(0, 0, 0, 0.05)'
        }}
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-light-word/95 dark:bg-dark-bg/95 backdrop-blur-xl shadow-2xl border-b border-primary-200/30 dark:border-primary-700/30' 
            : 'bg-light-word/90 dark:bg-dark-bg/90 backdrop-blur-lg border-b border-gray-200/20 dark:border-dark-border/20'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* SPECTACULAR Background Effects */}
        <motion.div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(31, 60, 136, 0.15) 0%, transparent 50%)`
          }}
          animate={{
            opacity: isHovered ? 0.3 : 0.1
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Animated Light Ray */}
        <motion.div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent 0%, rgba(244, 196, 48, 0.3) ${mousePosition.x}%, transparent 100%)`
          }}
          animate={{
            opacity: isHovered ? 0.2 : 0.05
          }}
        />
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`nav-particle-${i}`}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: `linear-gradient(45deg, ${i % 3 === 0 ? '#1F3C88' : i % 3 === 1 ? '#F4C430' : '#2F56B0'}, transparent)`,
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 2) * 60}%`,
              }}
              animate={{
                y: [0, -10, 0],
                x: [0, Math.sin(i) * 5, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1.2, 0.5]
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        <nav className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="flex h-16 items-center justify-between">
            {/* ENHANCED Logo with Spectacular Effects */}
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link href="/" className="flex items-center space-x-3 group relative">
                {/* Logo Glow Effect */}
                <motion.div
                  className="absolute -inset-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(31, 60, 136, 0.1), rgba(244, 196, 48, 0.1))',
                    filter: 'blur(8px)'
                  }}
                />
                
                <motion.div
                  whileHover={{ 
                    rotate: [0, -5, 5, 0],
                    scale: 1.1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Logo className="h-8 w-auto relative z-10" />
                </motion.div>
                
                <div className="flex flex-col relative z-10">
                  <motion.span 
                    className="font-display text-xl font-semibold relative"
                    style={{
                      background: 'linear-gradient(135deg, #1F3C88 0%, #F4C430 50%, #2F56B0 100%)',
                      backgroundSize: '200% 200%',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                      WebkitTextFillColor: 'transparent'
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                  >
                    TELOS MAED
                  </motion.span>
                  <motion.span 
                    className="text-xs text-wisdom dark:text-dark-secondary font-medium tracking-wider"
                    whileHover={{ 
                      color: '#1F3C88',
                      scale: 1.05
                    }}
                  >
                    CHRISTIAN MAGAZINE
                  </motion.span>
                </div>
                
                {/* Floating Sparkles around Logo */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={`logo-sparkle-${i}`}
                    className="absolute text-xs opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                      left: `${-10 + i * 15}px`,
                      top: `${-5 + (i % 2) * 10}px`,
                    }}
                    animate={{
                      y: [0, -8, 0],
                      rotate: [0, 360],
                      scale: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </Link>
            </motion.div>

            {/* SPECTACULAR Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-1">
              {navigation.map((item, index) => (
                <motion.div 
                  key={item.name} 
                  className="relative"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {item.simple ? (
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href={item.href}
                        className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 overflow-hidden group ${
                          pathname === item.href
                            ? 'text-light-word bg-gradient-to-r from-primary-600 to-secondary-600 shadow-lg'
                            : item.highlight
                            ? 'text-light-word bg-gradient-to-r from-glory-500 to-glory-600 hover:from-glory-600 hover:to-glory-700 shadow-lg hover:shadow-xl'
                            : 'text-wisdom dark:text-dark-secondary hover:text-primary-600 dark:hover:text-dark-primary hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 dark:hover:from-primary-900/20 dark:hover:to-secondary-900/20'
                        }`}
                      >
                        {/* Animated Background */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100"
                          style={{
                            background: 'linear-gradient(135deg, rgba(31, 60, 136, 0.1), rgba(244, 196, 48, 0.1))',
                          }}
                          initial={{ scale: 0, rotate: 180 }}
                          whileHover={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        {/* Text with Glow Effect */}
                        <motion.span 
                          className="relative z-10"
                          whileHover={{ 
                            textShadow: item.highlight ? 'none' : '0 0 10px rgba(31, 60, 136, 0.5)'
                          }}
                        >
                          {item.name}
                        </motion.span>
                        
                        {/* Floating Particles on Hover */}
                        {!item.highlight && (
                          <motion.div
                            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                          >
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-primary-400 rounded-full"
                                style={{
                                  left: `${20 + i * 20}%`,
                                  top: `${30 + i * 10}%`,
                                }}
                                animate={{
                                  y: [0, -8, 0],
                                  opacity: [0.5, 1, 0.5],
                                  scale: [0.5, 1, 0.5]
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  delay: i * 0.2
                                }}
                              />
                            ))}
                          </motion.div>
                        )}
                      </Link>
                    </motion.div>
                  ) : (
                    <>
                      <motion.button
                        data-dropdown-button
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveDropdown(activeDropdown === item.name ? null : item.name)
                        }}
                        className={`flex items-center space-x-1 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group relative overflow-hidden ${
                          pathname.startsWith(item.href)
                            ? 'text-primary-600 dark:text-dark-primary bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 shadow-lg'
                            : 'text-wisdom dark:text-dark-secondary hover:text-primary-600 dark:hover:text-dark-primary hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 dark:hover:from-primary-900/20 dark:hover:to-secondary-900/20'
                        }`}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Animated Background */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100"
                          style={{
                            background: 'linear-gradient(135deg, rgba(31, 60, 136, 0.1), rgba(244, 196, 48, 0.1))',
                          }}
                          initial={{ scale: 0, rotate: 180 }}
                          whileHover={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        <span className="relative z-10">{item.name}</span>
                        <motion.div
                          animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="relative z-10"
                        >
                          <ChevronDownIcon className="h-4 w-4" />
                        </motion.div>
                      </motion.button>

                      {/* SPECTACULAR Enhanced Dropdown Menu - No Scrollbars */}
                      <AnimatePresence>
                        {activeDropdown === item.name && item.dropdownItems && (
                          <motion.div
                            data-dropdown-content
                            initial={{ opacity: 0, y: -20, scale: 0.9, rotateX: -15 }}
                            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                            exit={{ opacity: 0, y: -20, scale: 0.9, rotateX: -15 }}
                            transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                            className="absolute top-full left-0 mt-3 w-80 rounded-2xl shadow-2xl border z-50"
                            style={{ 
                              zIndex: 9999,
                              background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.95) 100%)',
                              backdropFilter: 'blur(20px)',
                              border: '1px solid rgba(31, 60, 136, 0.1)',
                              boxShadow: '0 25px 80px rgba(31, 60, 136, 0.15), 0 0 0 1px rgba(255,255,255,0.2) inset',
                              overflow: 'visible'
                            }}
                          >
                            {/* Dropdown Background Effects */}
                            <motion.div
                              className="absolute inset-0 opacity-30 rounded-2xl"
                              style={{
                                background: `radial-gradient(circle at 50% 0%, rgba(31, 60, 136, 0.1) 0%, transparent 50%)`
                              }}
                            />
                            
                            <div className="relative p-3" style={{ overflow: 'visible' }}>
                              {item.dropdownItems.map((dropdownItem, dropIndex) => (
                                <motion.div
                                  key={dropdownItem.name}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: dropIndex * 0.1 }}
                                >
                                  <Link
                                    href={dropdownItem.href}
                                    onClick={() => setActiveDropdown(null)}
                                    className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 dark:hover:from-primary-900/20 dark:hover:to-secondary-900/20 transition-all duration-300 group relative"
                                    style={{ overflow: 'visible' }}
                                  >
                                    {/* Hover Background Effect */}
                                    <motion.div
                                      className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-xl"
                                      style={{
                                        background: 'linear-gradient(135deg, rgba(31, 60, 136, 0.05), rgba(244, 196, 48, 0.05))',
                                      }}
                                      initial={{ scale: 0.8, rotate: 180 }}
                                      whileHover={{ scale: 1, rotate: 0 }}
                                      transition={{ duration: 0.3 }}
                                    />
                                    
                                    <motion.div 
                                      className="flex-shrink-0 relative"
                                      whileHover={{ 
                                        scale: 1.2,
                                        rotate: [0, -10, 10, 0]
                                      }}
                                      transition={{ duration: 0.5 }}
                                    >
                                      <dropdownItem.icon className="h-6 w-6 text-primary-600 dark:text-dark-primary relative z-10" />
                                      
                                      {/* Icon Glow Effect */}
                                      <motion.div
                                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                                        style={{
                                          background: 'radial-gradient(circle, rgba(31, 60, 136, 0.2) 0%, transparent 70%)',
                                          filter: 'blur(4px)'
                                        }}
                                        animate={{
                                          scale: [1, 1.5, 1],
                                          opacity: [0, 0.5, 0]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                      />
                                    </motion.div>
                                    
                                    <div className="flex-1 min-w-0 relative z-10">
                                      <motion.p 
                                        className={`text-sm font-medium text-truth dark:text-dark-text group-hover:text-primary-600 dark:group-hover:text-dark-primary transition-colors duration-300 ${
                                          dropdownItem.amharic ? 'font-serif text-base' : ''
                                        }`}
                                        whileHover={{ x: 2 }}
                                      >
                                        {dropdownItem.name}
                                      </motion.p>
                                      <motion.p 
                                        className="text-xs text-wisdom dark:text-dark-secondary mt-1 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300"
                                        whileHover={{ x: 2 }}
                                      >
                                        {dropdownItem.description}
                                      </motion.p>
                                    </div>
                                    
                                    {/* Floating Arrow */}
                                    <motion.div
                                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                      whileHover={{ x: 3, scale: 1.1 }}
                                    >
                                      <ChevronDownIcon className="h-4 w-4 text-primary-600 dark:text-dark-primary rotate-[-90deg]" />
                                    </motion.div>
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </motion.div>
              ))}
            </div>

            {/* SPECTACULAR Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* Enhanced Search Button */}
              <motion.button
                onClick={() => setSearchOpen(true)}
                className="p-3 text-wisdom dark:text-dark-secondary hover:text-primary-600 dark:hover:text-dark-primary rounded-xl transition-all duration-300 group relative overflow-hidden"
                aria-label="Search"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Button Background Effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(31, 60, 136, 0.1), rgba(244, 196, 48, 0.1))',
                  }}
                  initial={{ scale: 0, rotate: 180 }}
                  whileHover={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                />
                
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </motion.div>
                
                {/* Search Ripple Effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'radial-gradient(circle, rgba(31, 60, 136, 0.2) 0%, transparent 70%)',
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>

              {/* Enhanced Notifications Button */}
              <motion.button
                onClick={() => setNotificationsOpen(true)}
                className="p-3 text-wisdom dark:text-dark-secondary hover:text-primary-600 dark:hover:text-dark-primary rounded-xl transition-all duration-300 group relative overflow-hidden"
                aria-label="Notifications"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Button Background Effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(31, 60, 136, 0.1), rgba(244, 196, 48, 0.1))',
                  }}
                  initial={{ scale: 0, rotate: 180 }}
                  whileHover={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                />
                
                <motion.div
                  whileHover={{ rotate: [0, -15, 15, 0] }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10"
                >
                  <BellIcon className="h-5 w-5" />
                </motion.div>
                
                {/* Animated Notification Badge */}
                <motion.span 
                  className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-r from-glory-500 to-glory-600 rounded-full shadow-lg"
                  animate={{
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(244, 196, 48, 0.7)',
                      '0 0 0 4px rgba(244, 196, 48, 0)',
                      '0 0 0 0 rgba(244, 196, 48, 0)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>

              {/* Enhanced Theme Toggle */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ThemeToggle />
              </motion.div>

              {/* Enhanced User Menu */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <UserMenu />
              </motion.div>
              
              {/* SPECTACULAR Mobile Menu Button */}
              <motion.button
                type="button"
                className="lg:hidden p-3 text-wisdom dark:text-dark-secondary hover:text-primary-600 dark:hover:text-dark-primary rounded-xl transition-all duration-300 group relative overflow-hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="sr-only">Open main menu</span>
                
                {/* Button Background Effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(31, 60, 136, 0.1), rgba(244, 196, 48, 0.1))',
                  }}
                  initial={{ scale: 0, rotate: 180 }}
                  whileHover={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                />
                
                <motion.div
                  animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  {mobileMenuOpen ? (
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  )}
                </motion.div>
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation - Fixed Overflow */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden border-t border-gray-200 dark:border-dark-border overflow-hidden"
              >
                <div className="py-3 space-y-1 max-w-full">
                  {navigation.map((item) => (
                    <div key={item.name} className="w-full">
                      {item.simple ? (
                        <Link
                          href={item.href}
                          className={`block px-3 py-2 text-sm font-medium rounded-lg mx-2 transition-all duration-200 truncate ${
                            pathname === item.href
                              ? 'text-primary-600 dark:text-dark-primary bg-primary-50 dark:bg-primary-900/20'
                              : item.highlight
                              ? 'text-light-word bg-primary-600'
                              : 'text-wisdom dark:text-dark-secondary hover:text-primary-600 dark:hover:text-dark-primary hover:bg-scripture dark:hover:bg-dark-card'
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <div className="w-full">
                          <div className="px-3 py-1.5 text-xs font-semibold text-primary-600 dark:text-dark-primary uppercase tracking-wider mx-2">
                            {item.name}
                          </div>
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className={`flex items-start space-x-2 px-4 py-2 text-xs rounded-lg mx-2 transition-all duration-200 ${
                                pathname === dropdownItem.href
                                  ? 'text-primary-600 dark:text-dark-primary bg-primary-50 dark:bg-primary-900/20'
                                  : 'text-wisdom dark:text-dark-secondary hover:text-primary-600 dark:hover:text-dark-primary hover:bg-scripture dark:hover:bg-dark-card'
                              }`}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <dropdownItem.icon className="h-3 w-3 flex-shrink-0 mt-0.5" />
                              <div className="flex-1 min-w-0">
                                <div className={`font-medium truncate ${dropdownItem.amharic ? 'font-serif text-sm' : 'text-xs'}`}>
                                  {dropdownItem.name}
                                </div>
                                <div className="text-xs text-wisdom dark:text-dark-secondary truncate">
                                  {dropdownItem.description}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      
      {/* Notification Center */}
      <NotificationCenter isOpen={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
    </>
  )
}