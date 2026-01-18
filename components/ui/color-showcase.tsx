'use client'

import { motion } from 'framer-motion'

// This component showcases the official TELOS MAED color system
// Can be used for design reference or style guide pages
export function ColorShowcase() {
  const colorGroups = [
    {
      name: 'Primary Brand Colors',
      colors: [
        { name: 'Royal Faith Blue', class: 'bg-primary-600', hex: '#1F3C88', usage: 'Logo, headings, buttons, links' },
        { name: 'Heaven Deep Blue', class: 'bg-secondary-600', hex: '#2F56B0', usage: 'Hover states, sub-headings, icons' },
      ]
    },
    {
      name: 'Brand Neutrals',
      colors: [
        { name: 'Light of Word White', class: 'bg-light-word border border-gray-300', hex: '#FFFFFF', usage: 'Main background, text contrast' },
        { name: 'Scripture Gray', class: 'bg-scripture', hex: '#F2F4F8', usage: 'Section backgrounds, cards' },
        { name: 'Wisdom Gray', class: 'bg-wisdom', hex: '#6B7280', usage: 'Body text, secondary labels' },
        { name: 'Truth Black', class: 'bg-truth', hex: '#111827', usage: 'Main text, titles' },
      ]
    },
    {
      name: 'Accent Colors',
      colors: [
        { name: 'Glory Gold', class: 'bg-glory-500', hex: '#F4C430', usage: 'Featured content, highlights (use sparingly)' },
      ]
    },
    {
      name: 'Dark Mode Variants',
      colors: [
        { name: 'Dark Background', class: 'bg-dark-bg', hex: '#0B1220', usage: 'Dark mode main background' },
        { name: 'Dark Card', class: 'bg-dark-card', hex: '#121A2F', usage: 'Dark mode card backgrounds' },
        { name: 'Dark Primary', class: 'bg-dark-primary', hex: '#3B82F6', usage: 'Dark mode primary elements' },
        { name: 'Dark Text', class: 'bg-dark-text', hex: '#E5E7EB', usage: 'Dark mode main text' },
        { name: 'Dark Secondary', class: 'bg-dark-secondary', hex: '#9CA3AF', usage: 'Dark mode secondary text' },
        { name: 'Dark Border', class: 'bg-dark-border', hex: '#1F2933', usage: 'Dark mode borders' },
      ]
    }
  ]

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-display font-bold text-truth dark:text-dark-text mb-4">
          TELOS MAED Color System
        </h2>
        <p className="text-wisdom dark:text-dark-secondary max-w-2xl mx-auto">
          Our carefully crafted color palette reflects the brand values of faith, wisdom, and intellectual depth.
        </p>
      </div>

      {colorGroups.map((group, groupIndex) => (
        <motion.div
          key={group.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
          className="space-y-6"
        >
          <h3 className="text-xl font-semibold text-truth dark:text-dark-text">
            {group.name}
          </h3>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.colors.map((color, colorIndex) => (
              <motion.div
                key={color.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: (groupIndex * 0.1) + (colorIndex * 0.05) }}
                className="card p-4"
              >
                <div className={`w-full h-16 rounded-lg mb-3 ${color.class}`}></div>
                <h4 className="font-semibold text-truth dark:text-dark-text text-sm mb-1">
                  {color.name}
                </h4>
                <p className="text-xs text-wisdom dark:text-dark-secondary mb-2 font-mono">
                  {color.hex}
                </p>
                <p className="text-xs text-wisdom dark:text-dark-secondary">
                  {color.usage}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Usage Principles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="card p-8 bg-scripture dark:bg-dark-card"
      >
        <h3 className="text-xl font-semibold text-truth dark:text-dark-text mb-4">
          Color Usage Principles
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h4 className="font-medium text-truth dark:text-dark-text mb-2">Primary Combinations</h4>
            <ul className="text-sm text-wisdom dark:text-dark-secondary space-y-1">
              <li>• White + Blue = Faith & Clarity</li>
              <li>• Gray = Wisdom & Reflection</li>
              <li>• Gold = Glory & Focus (sparingly)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-truth dark:text-dark-text mb-2">Guidelines</h4>
            <ul className="text-sm text-wisdom dark:text-dark-secondary space-y-1">
              <li>• Avoid bright red/green</li>
              <li>• Keep design calm and intellectual</li>
              <li>• Use Glory Gold for special highlights only</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}