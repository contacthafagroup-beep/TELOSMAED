'use client'

import { useState, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { motion } from 'framer-motion'
import { 
  UserCircleIcon,
  Cog6ToothIcon,
  BookmarkIcon,
  PencilSquareIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  HeartIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

// Mock user data - replace with actual authentication
const mockUser = {
  name: 'Sarah Johnson',
  email: 'sarah@example.com',
  avatar: null,
  role: 'Contributor',
  isAuthenticated: false // Set to true when user is logged in
}

const userMenuItems = [
  {
    name: 'Profile',
    href: '/profile',
    icon: UserIcon,
    description: 'Manage your account'
  },
  {
    name: 'My Articles',
    href: '/profile/articles',
    icon: PencilSquareIcon,
    description: 'View your submissions'
  },
  {
    name: 'Bookmarks',
    href: '/profile/bookmarks',
    icon: BookmarkIcon,
    description: 'Saved articles & poetry'
  },
  {
    name: 'Reading Stats',
    href: '/profile/stats',
    icon: ChartBarIcon,
    description: 'Your reading journey'
  },
  {
    name: 'Favorites',
    href: '/profile/favorites',
    icon: HeartIcon,
    description: 'Liked content'
  },
  {
    name: 'Settings',
    href: '/profile/settings',
    icon: Cog6ToothIcon,
    description: 'Preferences & privacy'
  }
]

interface UserMenuProps {
  className?: string
}

export function UserMenu({ className = '' }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (!mockUser.isAuthenticated) {
    return null // Hide the Sign In and Join Us buttons for now
    // return (
    //   <div className={`flex items-center space-x-2 ${className}`}>
    //     <Link
    //       href="/auth/login"
    //       className="text-sm font-medium text-wisdom dark:text-dark-secondary hover:text-primary-600 dark:hover:text-dark-primary transition-colors duration-200"
    //     >
    //       Sign In
    //     </Link>
    //     <Link
    //       href="/auth/register"
    //       className="btn-primary text-sm px-4 py-2"
    //     >
    //       Join Us
    //     </Link>
    //   </div>
    // )
  }

  return (
    <Menu as="div" className={`relative ${className}`}>
      <Menu.Button
        className="flex items-center space-x-2 p-2 text-wisdom dark:text-dark-secondary hover:text-primary-600 dark:hover:text-dark-primary hover:bg-scripture dark:hover:bg-dark-card rounded-lg transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {mockUser.avatar ? (
          <img
            src={mockUser.avatar}
            alt={mockUser.name}
            className="h-6 w-6 rounded-full object-cover"
          />
        ) : (
          <UserCircleIcon className="h-6 w-6" />
        )}
        <span className="hidden sm:block text-sm font-medium">
          {mockUser.name}
        </span>
      </Menu.Button>

      <Transition
        as={Fragment}
        show={isOpen}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-80 origin-top-right bg-light-word dark:bg-dark-card rounded-xl shadow-xl border border-gray-200 dark:border-dark-border overflow-hidden focus:outline-none z-50">
          {/* User Info Header */}
          <div className="px-4 py-4 border-b border-gray-200 dark:border-dark-border bg-scripture dark:bg-dark-bg">
            <div className="flex items-center space-x-3">
              {mockUser.avatar ? (
                <img
                  src={mockUser.avatar}
                  alt={mockUser.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="h-10 w-10 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-primary-600 dark:text-dark-primary" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-truth dark:text-dark-text truncate">
                  {mockUser.name}
                </p>
                <p className="text-xs text-wisdom dark:text-dark-secondary truncate">
                  {mockUser.email}
                </p>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 mt-1">
                  {mockUser.role}
                </span>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {userMenuItems.map((item, index) => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-start space-x-3 px-4 py-3 text-sm transition-colors duration-200 ${
                        active
                          ? 'bg-scripture dark:bg-dark-bg text-primary-600 dark:text-dark-primary'
                          : 'text-truth dark:text-dark-text hover:bg-scripture dark:hover:bg-dark-bg'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-wisdom dark:text-dark-secondary mt-0.5">
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </Menu.Item>
            ))}
          </div>

          {/* Sign Out */}
          <div className="border-t border-gray-200 dark:border-dark-border">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`flex items-center space-x-3 w-full px-4 py-3 text-sm text-left transition-colors duration-200 ${
                    active
                      ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                      : 'text-truth dark:text-dark-text hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400'
                  }`}
                  onClick={() => {
                    setIsOpen(false)
                    // Handle sign out
                    console.log('Sign out')
                  }}
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  <span className="font-medium">Sign Out</span>
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}