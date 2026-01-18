'use client'

import { motion } from 'framer-motion'
import { 
  DocumentTextIcon, 
  ClockIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline'

const guidelines = [
  {
    title: 'Content Requirements',
    icon: DocumentTextIcon,
    items: [
      'Articles: 800-2500 words',
      'Poetry: Any length welcome',
      'Original, unpublished work preferred',
      'Biblical foundation and Christian worldview',
      'Relevant to young adult audience'
    ]
  },
  {
    title: 'Review Process',
    icon: ClockIcon,
    items: [
      'Initial review within 1 week',
      'Editorial decision within 2-3 weeks',
      'Feedback provided for all submissions',
      'Revisions may be requested',
      'Publication timeline varies'
    ]
  },
  {
    title: 'What We Accept',
    icon: CheckCircleIcon,
    items: [
      'Theological reflections',
      'Personal testimonies',
      'Leadership insights',
      'Cultural commentary',
      'Spiritual poetry',
      'Creative non-fiction'
    ]
  },
  {
    title: 'What We Avoid',
    icon: ExclamationTriangleIcon,
    items: [
      'Divisive denominational issues',
      'Political partisanship',
      'Purely academic papers',
      'Fiction or creative writing',
      'Previously published content'
    ]
  }
]

export function SubmissionGuidelines() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100 mb-4">
          Submission Guidelines
        </h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          We're looking for thoughtful, well-written content that engages with faith, 
          culture, and the Christian life from a young adult perspective.
        </p>
      </motion.div>

      {guidelines.map((section, index) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="card p-6"
        >
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0">
              <section.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="ml-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
              {section.title}
            </h3>
          </div>
          
          <ul className="space-y-2">
            {section.items.map((item, itemIndex) => (
              <li key={itemIndex} className="flex items-start">
                <span className="flex-shrink-0 w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full mt-2 mr-3"></span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="card p-6 bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Questions?
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          If you have questions about submissions or would like to discuss a potential article, 
          we'd love to hear from you.
        </p>
        <a
          href="/contact"
          className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm"
        >
          Contact our editorial team →
        </a>
      </motion.div>
    </div>
  )
}