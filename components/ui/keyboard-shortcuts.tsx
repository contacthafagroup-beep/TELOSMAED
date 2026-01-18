'use client'

import { useEffect } from 'react'

interface KeyboardShortcut {
  key: string
  metaKey?: boolean
  ctrlKey?: boolean
  shiftKey?: boolean
  action: () => void
  description: string
}

interface KeyboardShortcutsProps {
  onOpenSearch?: () => void
  onOpenNotifications?: () => void
  onToggleTheme?: () => void
}

export function KeyboardShortcuts({ 
  onOpenSearch, 
  onOpenNotifications, 
  onToggleTheme 
}: KeyboardShortcutsProps) {
  
  useEffect(() => {
    const shortcuts: KeyboardShortcut[] = [
      {
        key: 'k',
        metaKey: true,
        action: () => onOpenSearch?.(),
        description: 'Open search'
      },
      {
        key: 'k',
        ctrlKey: true,
        action: () => onOpenSearch?.(),
        description: 'Open search'
      },
      {
        key: 'n',
        metaKey: true,
        action: () => onOpenNotifications?.(),
        description: 'Open notifications'
      },
      {
        key: 'n',
        ctrlKey: true,
        action: () => onOpenNotifications?.(),
        description: 'Open notifications'
      },
      {
        key: 'd',
        metaKey: true,
        action: () => onToggleTheme?.(),
        description: 'Toggle dark mode'
      },
      {
        key: 'd',
        ctrlKey: true,
        action: () => onToggleTheme?.(),
        description: 'Toggle dark mode'
      },
      {
        key: '/',
        action: () => onOpenSearch?.(),
        description: 'Focus search'
      },
      {
        key: 'Escape',
        action: () => {
          // Close any open modals or dropdowns
          const event = new KeyboardEvent('keydown', { key: 'Escape' })
          document.dispatchEvent(event)
        },
        description: 'Close modals'
      }
    ]

    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement ||
        (event.target as HTMLElement)?.contentEditable === 'true'
      ) {
        return
      }

      const shortcut = shortcuts.find(s => {
        const keyMatch = s.key.toLowerCase() === event.key.toLowerCase()
        const metaMatch = s.metaKey ? event.metaKey : !event.metaKey
        const ctrlMatch = s.ctrlKey ? event.ctrlKey : !event.ctrlKey
        const shiftMatch = s.shiftKey ? event.shiftKey : !event.shiftKey

        return keyMatch && metaMatch && ctrlMatch && shiftMatch
      })

      if (shortcut) {
        event.preventDefault()
        shortcut.action()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onOpenSearch, onOpenNotifications, onToggleTheme])

  return null // This component doesn't render anything
}

// Helper component to show keyboard shortcuts help
export function KeyboardShortcutsHelp() {
  const shortcuts = [
    { keys: ['⌘', 'K'], description: 'Open search' },
    { keys: ['⌘', 'N'], description: 'Open notifications' },
    { keys: ['⌘', 'D'], description: 'Toggle dark mode' },
    { keys: ['/'], description: 'Focus search' },
    { keys: ['Esc'], description: 'Close modals' },
  ]

  return (
    <div className="p-4 bg-scripture dark:bg-dark-card rounded-lg">
      <h3 className="text-sm font-semibold text-truth dark:text-dark-text mb-3">
        Keyboard Shortcuts
      </h3>
      <div className="space-y-2">
        {shortcuts.map((shortcut, index) => (
          <div key={index} className="flex items-center justify-between text-xs">
            <span className="text-wisdom dark:text-dark-secondary">
              {shortcut.description}
            </span>
            <div className="flex items-center space-x-1">
              {shortcut.keys.map((key, keyIndex) => (
                <kbd
                  key={keyIndex}
                  className="px-2 py-1 bg-light-word dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded text-xs font-mono"
                >
                  {key}
                </kbd>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}