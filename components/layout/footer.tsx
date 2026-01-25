'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Logo } from '@/components/ui/logo'
import { 
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  HeartIcon,
  BookOpenIcon,
  UsersIcon,
  GlobeAltIcon,
  ArrowRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

export function Footer() {
  const socialIcons = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/share/1HStfysvUz/',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'http://www.youtube.com/@TELOSMAED',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@telosmaed',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.16 20.5a6.34 6.34 0 0 0 10.86-4.43V7.83a8.2 8.2 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.2-.26z"/>
        </svg>
      ),
    },
    {
      name: 'Telegram',
      href: 'https://t.me/telosmaed',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
    },
  ]

  return (
    <footer className="bg-white border-t border-[#E3E4E6]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content - Mobile Compact, Desktop Original */}
        <div className="py-6 sm:py-8 lg:py-12">
          
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-6 sm:mb-8 lg:mb-12"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#203685] mb-3">
              Live purposefully and lead effectively!
            </h2>
            <div className="w-16 h-1 bg-[#203685] mx-auto rounded-full"></div>
          </motion.div>

          {/* Responsive Grid Layout - Mobile: 2 cols, Desktop: Original */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-12"
          >
            
            {/* Brand */}
            <div className="col-span-2 md:col-span-1 lg:col-span-1">
              <Link href="/" className="inline-flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4 group">
                <Logo className="h-8 sm:h-10 w-auto" />
                <div>
                  <span className="font-display text-base sm:text-xl font-bold text-[#203685] group-hover:opacity-80 transition-opacity">
                    TELOS MAED
                  </span>
                  <div className="text-xs text-gray-500 font-medium">
                    CHRISTIAN MAGAZINE
                  </div>
                </div>
              </Link>
              
              {/* Contact Info */}
              <div className="space-y-1 sm:space-y-2">
                <div className="flex items-center text-gray-600 text-sm sm:text-sm">
                  <EnvelopeIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-[#203685]" />
                  <a href="mailto:telosmaed@gmail.com" className="hover:text-[#203685] transition-colors">
                    telosmaed@gmail.com
                  </a>
                </div>
                <div className="flex items-center text-gray-600 text-sm sm:text-sm">
                  <PhoneIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-[#203685]" />
                  <a href="tel:+251924749060" className="hover:text-[#203685] transition-colors">
                    +251 924 749 060
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-[#203685] mb-2 sm:mb-4 text-base sm:text-base">Quick Links</h3>
              <ul className="space-y-1 sm:space-y-2">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'Articles', href: '/articles' },
                  { name: 'Poetry', href: '/poetry' },
                  { name: 'About', href: '/about' },
                  { name: 'Submit', href: '/submit' },
                  { name: 'Contact', href: '/contact' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-600 hover:text-[#203685] transition-colors text-sm sm:text-sm flex items-center group"
                    >
                      <ArrowRightIcon className="h-2 w-2 sm:h-3 sm:w-3 mr-1 sm:mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold text-[#203685] mb-2 sm:mb-4 text-base sm:text-base">Categories</h3>
              <ul className="space-y-1 sm:space-y-2">
                {[
                  { name: 'የአዘጋጁ ማስታወሻ', href: '/articles?category=editorial' },
                  { name: 'ሰውነት', href: '/articles?category=personal' },
                  { name: 'የመሪ በትር', href: '/articles?category=leadership' },
                  { name: 'ግጥም', href: '/poetry' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-600 hover:text-[#203685] transition-colors text-sm sm:text-sm flex items-center group font-serif"
                    >
                      <ArrowRightIcon className="h-2 w-2 sm:h-3 sm:w-3 mr-1 sm:mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Social Media Section - Desktop Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="font-semibold text-[#203685] mb-3 sm:mb-4 text-base sm:text-base">Connect With Us</h3>
            <p className="text-gray-600 text-sm sm:text-sm mb-3 sm:mb-4">
              Join our community across social platforms and stay updated with the latest content.
            </p>
            <div className="flex justify-center space-x-2 sm:space-x-3">
              {socialIcons.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white border-2 border-[#E3E4E6] rounded-lg text-[#203685] hover:border-[#203685] hover:bg-[#203685] hover:text-white transition-all duration-300 group"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#E3E4E6] py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div className="flex flex-wrap gap-3 sm:gap-4 text-sm sm:text-sm">
              {[
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms of Service', href: '/terms' },
                { name: 'Cookie Policy', href: '/cookies' },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-500 hover:text-[#203685] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center text-sm sm:text-sm text-gray-500">
              <span>&copy; {new Date().getFullYear()} TELOS MAED. All rights reserved.</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}