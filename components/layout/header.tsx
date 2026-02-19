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
import UserMenu from '@/components/layout/UserMenu'

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
            ? `rgba(255, 255, 255, 0.98)` 
            : `rgba(255, 255, 255, 0.95)`,
          boxShadow: scrolled 
            ? '0 4px 20px rgba(32, 54, 133, 0.1), 0 0 0 1px rgba(227, 228, 230, 0.5)'
            : '0 2px 10px rgba(32, 54, 133, 0.05)'
        }}
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'backdrop-blur-xl border-b border-[#E3E4E6]' 
            : 'backdrop-blur-lg border-b border-[#E3E4E6]/50'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Brand Color Background Effects */}
        <motion.div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(32, 54, 133, 0.1) 0%, transparent 50%)`
          }}
          animate={{
            opacity: isHovered ? 0.15 : 0.05
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Subtle Brand Accent */}
        <motion.div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent 0%, rgba(32, 54, 133, 0.1) ${mousePosition.x}%, transparent 100%)`
          }}
          animate={{
            opacity: isHovered ? 0.1 : 0.03
          }}
        />
        
        {/* Minimal Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`nav-particle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-[#203685]/20"
              style={{
                left: `${15 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [0, -8, 0],
                opacity: [0.1, 0.3, 0.1],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        <nav className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="flex h-16 items-center justify-between">
            {/* ENHANCED Logo with Spectacular Effects - Fixed Mobile Overflow */}
            <motion.div 
              className="flex items-center flex-shrink-0 min-w-0"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link href="/" className="flex items-center space-x-2 xl:space-x-3 group relative min-w-0">
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
                  className="flex-shrink-0"
                >
                  <Logo className="h-8 sm:h-10 lg:h-12 w-auto relative z-10" />
                </motion.div>
                
                <div className="flex flex-col relative z-10 min-w-0 overflow-hidden">
                  <motion.span 
                    className="font-display text-lg sm:text-xl lg:text-2xl font-semibold text-[#203685] truncate"
                    whileHover={{ 
                      opacity: 0.8,
                      scale: 1.02
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    TELOS MAED
                  </motion.span>
                  <motion.span 
                    className="text-xs sm:text-sm text-gray-600 font-medium tracking-wide truncate hidden sm:block"
                    whileHover={{ 
                      color: '#203685',
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
                    className="absolute text-xs opacity-0 group-hover:opacity-100 pointer-events-none hidden lg:block"
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

            {/* SPECTACULAR Desktop Navigation - Fixed Overflow */}
            <div className="hidden lg:flex lg:items-center lg:space-x-0.5 xl:space-x-1">
              {navigation.map((item, index) => (
                <motion.div 
                  key={item.name} 
                  className="relative"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{ position: 'relative' }}
                >
                  {item.simple ? (
                    <motion.div
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href={item.href}
                        className={`relative px-2 xl:px-3 py-1.5 xl:py-2 rounded-lg xl:rounded-xl text-xs xl:text-sm font-medium transition-all duration-300 overflow-hidden group whitespace-nowrap ${
                          pathname === item.href
                            ? 'text-white bg-[#203685] shadow-lg'
                            : item.highlight
                            ? 'text-white bg-[#203685] hover:bg-[#203685]/90 shadow-lg hover:shadow-xl'
                            : 'text-gray-700 hover:text-[#203685] hover:bg-gray-50 border border-transparent hover:border-[#E3E4E6]'
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
                      </Link>
                    </motion.div>
                  ) : (
                    <>
                      <motion.button
                        data-dropdown-button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          console.log('Dropdown clicked:', item.name, 'Current active:', activeDropdown)
                          setActiveDropdown(activeDropdown === item.name ? null : item.name)
                        }}
                        className={`flex items-center space-x-1 px-2 xl:px-3 py-1.5 xl:py-2 rounded-lg xl:rounded-xl text-xs xl:text-sm font-medium transition-all duration-300 group relative overflow-hidden whitespace-nowrap ${
                          pathname.startsWith(item.href)
                            ? 'text-[#203685] bg-gray-50 border border-[#E3E4E6] shadow-sm'
                            : 'text-gray-700 hover:text-[#203685] hover:bg-gray-50 border border-transparent hover:border-[#E3E4E6]'
                        }`}
                        whileHover={{ scale: 1.02, y: -1 }}
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

                      {/* Simple Dropdown Menu */}
                      <AnimatePresence>
                        {activeDropdown === item.name && item.dropdownItems && (
                          <div
                            data-dropdown-content
                            className="absolute top-full left-0 mt-2 w-72 bg-white border-2 border-[#203685] rounded-lg shadow-2xl z-[100]"
                            style={{ 
                              zIndex: 100,
                              position: 'absolute',
                              top: '100%',
                              left: '0',
                              marginTop: '8px'
                            }}
                          >
                            <div className="py-2">
                              {item.dropdownItems.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.name}
                                  href={dropdownItem.href}
                                  onClick={() => setActiveDropdown(null)}
                                  className="flex items-center space-x-3 px-4 py-3 hover:bg-[#E3E4E6] transition-colors"
                                >
                                  <dropdownItem.icon className="h-5 w-5 text-[#203685]" />
                                  <div>
                                    <div className={`font-medium text-gray-900 ${
                                      dropdownItem.amharic ? 'font-serif text-base' : 'text-sm'
                                    }`}>
                                      {dropdownItem.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {dropdownItem.description}
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </motion.div>
              ))}
            </div>

            {/* SPECTACULAR Right Side Actions - Compact */}
            <div className="flex items-center space-x-1 xl:space-x-2">
              {/* Enhanced Search Button */}
              <motion.button
                onClick={() => setSearchOpen(true)}
                className="p-2 xl:p-3 text-gray-600 hover:text-[#203685] hover:bg-gray-50 rounded-lg xl:rounded-xl transition-all duration-300 group relative overflow-hidden border border-transparent hover:border-[#E3E4E6]"
                aria-label="Search"
                whileHover={{ scale: 1.05, y: -1 }}
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
                className="p-2 xl:p-3 text-gray-600 hover:text-[#203685] hover:bg-gray-50 rounded-lg xl:rounded-xl transition-all duration-300 group relative overflow-hidden border border-transparent hover:border-[#E3E4E6]"
                aria-label="Notifications"
                whileHover={{ scale: 1.05, y: -1 }}
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                <ThemeToggle />
              </motion.div>

              {/* Enhanced User Menu */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                <UserMenu />
              </motion.div>
              
              {/* Mobile Menu Button */}
              <motion.button
                type="button"
                className="lg:hidden p-2 xl:p-3 text-gray-600 hover:text-[#203685] hover:bg-gray-50 rounded-lg xl:rounded-xl transition-all duration-300 group relative overflow-hidden border border-transparent hover:border-[#E3E4E6]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileHover={{ scale: 1.05, y: -1 }}
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
                className="lg:hidden border-t border-[#E3E4E6] overflow-hidden"
              >
                <div className="py-3 space-y-1 w-full overflow-hidden">
                  {navigation.map((item) => (
                    <div key={item.name} className="w-full">
                      {item.simple ? (
                        <Link
                          href={item.href}
                          className={`block px-3 py-2 text-sm font-medium rounded-lg mx-2 transition-all duration-200 truncate ${
                            pathname === item.href
                              ? 'text-[#203685] bg-gray-50 border border-[#E3E4E6]'
                              : item.highlight
                              ? 'text-white bg-[#203685]'
                              : 'text-gray-700 hover:text-[#203685] hover:bg-gray-50'
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <div className="w-full">
                          <div className="px-3 py-1.5 text-xs font-semibold text-[#203685] uppercase tracking-wider mx-2">
                            {item.name}
                          </div>
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className={`flex items-start space-x-2 px-4 py-2 text-xs rounded-lg mx-2 transition-all duration-200 ${
                                pathname === dropdownItem.href
                                  ? 'text-[#203685] bg-gray-50 border border-[#E3E4E6]'
                                  : 'text-gray-700 hover:text-[#203685] hover:bg-gray-50'
                              }`}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <dropdownItem.icon className="h-3 w-3 flex-shrink-0 mt-0.5" />
                              <div className="flex-1 min-w-0 overflow-hidden">
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