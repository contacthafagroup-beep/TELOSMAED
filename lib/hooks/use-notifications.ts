import { useState, useEffect } from 'react'

interface Notification {
  id: string
  type: 'new_article' | 'new_poetry' | 'comment' | 'feature' | 'system'
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
  icon: string
  priority: 'high' | 'normal' | 'low'
}

interface NotificationsResponse {
  notifications: Notification[]
  unreadCount: number
  total: number
}

export function useNotifications(options?: {
  limit?: number
  unreadOnly?: boolean
  autoRefresh?: boolean
}) {
  const [data, setData] = useState<NotificationsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNotifications = async () => {
    try {
      setError(null)
      
      const params = new URLSearchParams({
        ...(options?.limit && { limit: options.limit.toString() }),
        ...(options?.unreadOnly && { unread: 'true' }),
      })

      const response = await fetch(`/api/notifications?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch notifications')
      }

      const notificationsData = await response.json()
      setData(notificationsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch notifications')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()

    // Auto-refresh notifications every 5 minutes if enabled
    if (options?.autoRefresh) {
      const interval = setInterval(fetchNotifications, 5 * 60 * 1000)
      return () => clearInterval(interval)
    }
  }, [options?.limit, options?.unreadOnly, options?.autoRefresh])

  const markAsRead = async (notificationId: string) => {
    try {
      const response = await fetch('/api/notifications', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          notificationId,
          action: 'mark_read'
        })
      })

      if (response.ok && data) {
        // Update local state
        setData(prev => prev ? {
          ...prev,
          notifications: prev.notifications.map(n => 
            n.id === notificationId ? { ...n, read: true } : n
          ),
          unreadCount: Math.max(0, prev.unreadCount - 1)
        } : null)
      }
    } catch (err) {
      console.error('Failed to mark notification as read:', err)
    }
  }

  const markAllAsRead = async () => {
    try {
      const response = await fetch('/api/notifications', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'mark_all_read'
        })
      })

      if (response.ok && data) {
        // Update local state
        setData(prev => prev ? {
          ...prev,
          notifications: prev.notifications.map(n => ({ ...n, read: true })),
          unreadCount: 0
        } : null)
      }
    } catch (err) {
      console.error('Failed to mark all notifications as read:', err)
    }
  }

  const refresh = () => {
    setLoading(true)
    fetchNotifications()
  }

  return {
    data,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    refresh
  }
}