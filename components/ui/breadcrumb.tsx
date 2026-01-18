'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

interface BreadcrumbItem {
  label: string
  href: string
  current?: boolean
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  const pathname = usePathname()

  // Auto-generate breadcrumbs if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ]

    let currentPath = ''
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      
      // Convert segment to readable label
      let label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      // Special cases for known routes
      if (segment === 'articles') label = 'Articles'
      if (segment === 'poetry') label = 'Poetry'
      if (segment === 'magazine') label = 'Magazine'
      if (segment === 'about') label = 'About'
      if (segment === 'submit') label = 'Submit'
      if (segment === 'contact') label = 'Contact'

      breadcrumbs.push({
        label,
        href: currentPath,
        current: index === pathSegments.length - 1
      })
    })

    return breadcrumbs
  }

  const breadcrumbItems = items || generateBreadcrumbs()

  // Don't show breadcrumbs on home page
  if (pathname === '/') return null

  return (
    <nav className={`flex items-center space-x-1 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbItems.map((item, index) => (
          <motion.li
            key={item.href}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center"
          >
            {index > 0 && (
              <ChevronRightIcon className="h-4 w-4 text-wisdom dark:text-dark-secondary mx-2" />
            )}
            
            {item.current ? (
              <span className="text-truth dark:text-dark-text font-medium">
                {index === 0 ? (
                  <HomeIcon className="h-4 w-4" />
                ) : (
                  item.label
                )}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-wisdom dark:text-dark-secondary hover:text-primary-600 dark:hover:text-dark-primary transition-colors duration-200 flex items-center"
              >
                {index === 0 ? (
                  <HomeIcon className="h-4 w-4" />
                ) : (
                  item.label
                )}
              </Link>
            )}
          </motion.li>
        ))}
      </ol>
    </nav>
  )
}