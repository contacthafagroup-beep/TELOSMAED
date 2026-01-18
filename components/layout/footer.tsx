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
  SparklesIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

export function Footer() {
  const content = {
    brand: {
      description: 'An Evangelical Christian intellectual magazine focused on faith, leadership, youth culture, and creative worship. Where faith meets intellect.',
      mission: {
        title: 'Our Mission',
        text: 'To equip, inspire, and connect young Christian leaders, thinkers, and creatives as they navigate faith in the modern world.'
      },
      contact: {
        email: 'telosmaed@gmail.com',
        phone: '+251924749060',
        location: 'Global Community • 45+ Countries'
      }
    },
    stats: [
      { label: 'Active Readers', value: '15K+', icon: UsersIcon },
      { label: 'Countries Reached', value: '45+', icon: GlobeAltIcon },
      { label: 'Articles Published', value: '500+', icon: BookOpenIcon },
      { label: 'Community Rating', value: '4.9★', icon: SparklesIcon },
    ],
    navigation: {
      main: {
        title: 'Navigation',
        items: [
          { name: 'Home', href: '/', description: 'Welcome to TELOS MAED' },
          { name: 'Articles', href: '/articles', description: 'Thoughtful Christian content' },
          { name: 'Poetry', href: '/poetry', description: 'Creative expressions of faith' },
          { name: 'About', href: '/about', description: 'Our story and mission' },
          { name: 'Submit', href: '/submit', description: 'Share your voice' },
          { name: 'Contact', href: '/contact', description: 'Get in touch with us' },
        ]
      },
      categories: {
        title: 'Categories',
        items: [
          { name: 'Editorial Notes', href: '/articles?category=editorial', description: 'Editorial insights' },
          { name: 'Personal Growth', href: '/articles?category=personal', description: 'Personal development' },
          { name: 'Leadership', href: '/articles?category=leadership', description: 'Leadership wisdom' },
          { name: 'Poetry', href: '/poetry', description: 'Poetry and creative writing' },
        ]
      },
      resources: {
        title: 'Resources',
        items: [
          { name: 'Study Guides', href: '/resources/study-guides', description: 'Biblical study materials' },
          { name: 'Prayer Resources', href: '/resources/prayer', description: 'Spiritual growth tools' },
          { name: 'Reading Plans', href: '/resources/reading-plans', description: 'Structured learning paths' },
          { name: 'Community Guidelines', href: '/community/guidelines', description: 'How we engage together' },
        ]
      },
      community: {
        title: 'Community',
        items: [
          { name: 'Discussion Forums', href: '/community/forums', description: 'Join the conversation' },
          { name: 'Events', href: '/community/events', description: 'Upcoming gatherings' },
          { name: 'Prayer Requests', href: '/community/prayer', description: 'Share and pray together' },
          { name: 'Testimonies', href: '/community/testimonies', description: 'Stories of faith' },
        ]
      }
    },
    social: {
      title: 'Connect With Us',
      subtitle: 'Join our community across social platforms'
    },
    newsletter: {
      title: 'Stay Updated with Our Newsletter',
      description: 'Get weekly insights, new articles, and community updates delivered to your inbox',
      button: 'Subscribe Free'
    },
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Accessibility', href: '/accessibility' },
    ],
    copyright: {
      text: 'All rights reserved.',
      love: 'Made with love for the global Christian community'
    },
    description: 'TELOS MAED is a global Christian intellectual magazine committed to biblical truth, academic excellence, and cultural engagement. We serve young Christian leaders, thinkers, and creatives across 45+ countries with thoughtful content that bridges faith and reason.'
  }

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
    <footer className="relative overflow-hidden">
      {/* Simple Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-white">
        {/* Compact Brand & Stats Section */}
        <div className="mb-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 items-center">
            {/* Brand Section */}
            <div className="space-y-3">
              <Link href="/" className="inline-flex items-center space-x-2 group">
                <Logo className="h-8 w-auto" />
                <div>
                  <span className="font-display text-xl font-black bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-purple-500 transition-colors duration-150">
                    TELOS MAED
                  </span>
                </div>
              </Link>
              
              <p className="text-white/80 leading-relaxed max-w-md text-sm">
                {content.brand.description}
              </p>

              {/* Contact Info */}
              <div className="space-y-1.5">
                <div className="flex items-center text-white/70 text-xs">
                  <EnvelopeIcon className="h-3 w-3 mr-2 text-blue-400" />
                  <a href={`mailto:${content.brand.contact.email}`} className="hover:text-white transition-colors duration-150">
                    {content.brand.contact.email}
                  </a>
                </div>
                <div className="flex items-center text-white/70 text-xs">
                  <PhoneIcon className="h-3 w-3 mr-2 text-green-400" />
                  <a href={`tel:${content.brand.contact.phone}`} className="hover:text-white transition-colors duration-150">
                    {content.brand.contact.phone}
                  </a>
                </div>
                <div className="flex items-center text-white/70 text-xs">
                  <MapPinIcon className="h-3 w-3 mr-2 text-purple-400" />
                  <span>{content.brand.contact.location}</span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {content.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 text-center group hover:bg-white/20 transition-colors duration-150"
                >
                  <stat.icon className="h-5 w-5 text-yellow-400 mx-auto mb-1.5" />
                  <div className="text-lg font-bold text-white mb-0.5">{stat.value}</div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Compact Navigation Grid */}
        <div className="grid gap-4 md:grid-cols-2 mb-6">
          {/* Main Navigation */}
          <div>
            <h3 className="text-xs font-bold text-white mb-3 flex items-center">
              <BookOpenIcon className="h-3 w-3 mr-1.5 text-blue-400" />
              {content.navigation.main.title}
            </h3>
            <ul className="space-y-1.5">
              {content.navigation.main.items.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group flex items-start space-x-1.5 text-white/70 hover:text-white transition-colors duration-150 text-xs"
                  >
                    <ArrowRightIcon className="h-2.5 w-2.5 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-bold text-white mb-3 flex items-center">
              <SparklesIcon className="h-3 w-3 mr-1.5 text-purple-400" />
              {content.navigation.categories.title}
            </h3>
            <ul className="space-y-1.5">
              {content.navigation.categories.items.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group flex items-start space-x-1.5 text-white/70 hover:text-white transition-colors duration-150 text-xs"
                  >
                    <ArrowRightIcon className="h-2.5 w-2.5 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Compact Social & Newsletter Section */}
        <div className="mb-4">
          {/* Social Media */}
          <div className="text-center mb-4">
            <h3 className="text-sm font-bold text-white mb-3">{content.social.title}</h3>
            
            <div className="flex justify-center space-x-2">
              {socialIcons.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group flex items-center justify-center w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all duration-150"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter CTA */}
          <div>
            <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-lg p-3 border border-white/20 text-center">
              <h3 className="text-sm font-bold text-white mb-1.5">
                {content.newsletter.title}
              </h3>
              <p className="text-white/70 mb-2 text-xs">
                {content.newsletter.description}
              </p>
              <div>
                <Link
                  href="#newsletter"
                  className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-150 shadow-md"
                >
                  <EnvelopeIcon className="h-3 w-3 mr-1.5" />
                  {content.newsletter.button}
                  <ArrowRightIcon className="h-3 w-3 ml-1.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
            {/* Legal Links */}
            <div className="flex flex-wrap gap-3 text-xs">
              {content.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white/60 hover:text-white transition-colors duration-150"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <div className="flex items-center text-xs text-white/60">
              <span>&copy; {new Date().getFullYear()} TELOS MAED. {content.copyright.text}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}