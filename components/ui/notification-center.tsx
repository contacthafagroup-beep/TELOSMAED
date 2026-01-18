'use client'

import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BellIcon,
  XMarkIcon,
  CheckIcon,
  SparklesIcon,
  BookOpenIcon,
  UserGroupIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { formatDistanceToNow } from 'date-fns'
import { useNotifications } from '@/lib/hooks/use-notifications'

interface NotificationCenterProps {
  isOpen: boolean
  onClose: () => void
}

const iconMap = {
  BookOpenIcon,
  SparklesIcon,
  UserGroupIcon,
  BellIcon
}

export function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const { data, loading, markAsRead, markAllAsRead } = useNotifications({
    limit: 20,
    autoRefresh: true
  })

  const notifications = data?.notifications || []
  const unreadCount = data?.unreadCount || 0

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'new_article':
        return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20'
      case 'new_poetry':
        return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/20'
      case 'comment':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20'
      case 'feature':
        return 'text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/20'
      case 'system':
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/20'
      default:
        return 'text-primary-600 dark:text-dark-primary bg-primary-100 dark:bg-primary-900/20'
    }
  }

  const getIcon = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || BellIcon
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-truth/25 dark:bg-dark-bg/75 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 pt-16 sm:pt-24">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-light-word dark:bg-dark-card shadow-2xl transition-all border border-gray-200 dark:border-dark-border">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-dark-border">
                  <div className="flex items-center space-x-3">
                    <BellIcon className="h-5 w-5 text-primary-600 dark:text-dark-primary" />
                    <h2 className="text-lg font-semibold text-truth dark:text-dark-text">
                      Notifications
                    </h2>
                    {unreadCount > 0 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-glory-500 text-light-word">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-primary-600 dark:text-dark-primary hover:text-primary-700 dark:hover:text-blue-300 font-medium"
                      >
                        Mark all read
                      </button>
                    )}
                    <button
                      onClick={onClose}
                      className="p-1 text-wisdom dark:text-dark-secondary hover:text-truth dark:hover:text-dark-text transition-colors duration-200"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Notifications List */}
                <div className="max-h-96 overflow-y-auto">
                  {loading ? (
                    <div className="p-6 text-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 dark:border-dark-primary mx-auto mb-4"></div>
                      <p className="text-wisdom dark:text-dark-secondary">Loading notifications...</p>
                    </div>
                  ) : notifications.length === 0 ? (
                    <div className="p-6 text-center py-12">
                      <BellIcon className="h-12 w-12 text-wisdom dark:text-dark-secondary mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-truth dark:text-dark-text mb-2">
                        No notifications
                      </h3>
                      <p className="text-wisdom dark:text-dark-secondary">
                        You're all caught up! Check back later for updates.
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-200 dark:divide-dark-border">
                      {notifications.map((notification, index) => {
                        const IconComponent = getIcon(notification.icon)
                        return (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className={`p-4 hover:bg-scripture dark:hover:bg-dark-bg transition-colors duration-200 ${
                              !notification.read ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`flex-shrink-0 p-2 rounded-lg ${getTypeColor(notification.type)}`}>
                                <IconComponent className="h-4 w-4" />
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                      <h4 className="text-sm font-medium text-truth dark:text-dark-text">
                                        {notification.title}
                                      </h4>
                                      {notification.priority === 'high' && (
                                        <span className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full"></span>
                                      )}
                                    </div>
                                    <p className="text-sm text-wisdom dark:text-dark-secondary mt-1">
                                      {notification.message}
                                    </p>
                                    <div className="flex items-center mt-2 text-xs text-wisdom dark:text-dark-secondary">
                                      <ClockIcon className="h-3 w-3 mr-1" />
                                      {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                                    </div>
                                  </div>
                                  
                                  {!notification.read && (
                                    <button
                                      onClick={() => markAsRead(notification.id)}
                                      className="flex-shrink-0 p-1 text-primary-600 dark:text-dark-primary hover:text-primary-700 dark:hover:text-blue-300 transition-colors duration-200"
                                      title="Mark as read"
                                    >
                                      <CheckIcon className="h-4 w-4" />
                                    </button>
                                  )}
                                </div>
                                
                                {notification.actionUrl && (
                                  <button
                                    onClick={() => {
                                      markAsRead(notification.id)
                                      onClose()
                                      // Navigate to action URL
                                      window.location.href = notification.actionUrl!
                                    }}
                                    className="mt-2 text-xs text-primary-600 dark:text-dark-primary hover:text-primary-700 dark:hover:text-blue-300 font-medium"
                                  >
                                    View →
                                  </button>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-6 py-3 border-t border-gray-200 dark:border-dark-border bg-scripture dark:bg-dark-bg">
                  <button
                    onClick={onClose}
                    className="w-full text-center text-sm text-primary-600 dark:text-dark-primary hover:text-primary-700 dark:hover:text-blue-300 font-medium"
                  >
                    View all notifications
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}