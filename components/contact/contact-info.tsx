'use client'

import { motion } from 'framer-motion'
import { 
  EnvelopeIcon, 
  MapPinIcon, 
  ClockIcon,
  ChatBubbleLeftRightIcon 
} from '@heroicons/react/24/outline'

const contactMethods = [
  {
    name: 'Email',
    description: 'Send us an email anytime',
    contact: 'editorial@telosmaed.com',
    icon: EnvelopeIcon,
  },
  {
    name: 'Response Time',
    description: 'We typically respond within',
    contact: '24-48 hours',
    icon: ClockIcon,
  },
  {
    name: 'Editorial Office',
    description: 'Based in',
    contact: 'Global (Remote Team)',
    icon: MapPinIcon,
  },
  {
    name: 'Community',
    description: 'Join the conversation',
    contact: 'Follow us on social media',
    icon: ChatBubbleLeftRightIcon,
  },
]

const faqs = [
  {
    question: 'How do I submit an article?',
    answer: 'Use our submission form on the Submit page. Include your full article, bio, and contact information.'
  },
  {
    question: 'Do you accept previously published work?',
    answer: 'We prefer original, unpublished content, but may consider previously published work on a case-by-case basis.'
  },
  {
    question: 'How long does the review process take?',
    answer: 'Our editorial team reviews submissions within 2-3 weeks and provides feedback regardless of the decision.'
  },
  {
    question: 'Can I write for multiple categories?',
    answer: 'Absolutely! We welcome writers who can contribute across different categories and topics.'
  }
]

export function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Contact Methods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100 mb-6">
          Get in Touch
        </h2>
        
        <div className="space-y-4">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-start"
            >
              <div className="flex-shrink-0">
                <method.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {method.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {method.description}
                </p>
                <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
                  {method.contact}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Frequently Asked Questions
        </h3>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                {faq.question}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Editorial Team */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="card p-6 bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Our Editorial Team
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          TELOS MAED is led by a diverse team of Christian writers, theologians, and creatives 
          from around the world, united in our mission to serve the global church.
        </p>
        <a
          href="/about"
          className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm"
        >
          Meet the team →
        </a>
      </motion.div>
    </div>
  )
}