'use client'

import { motion } from 'framer-motion'
import { 
  BookOpenIcon, 
  HeartIcon, 
  LightBulbIcon, 
  UsersIcon, 
  SparklesIcon,
  GlobeAltIcon 
} from '@heroicons/react/24/outline'

const values = [
  {
    name: 'Biblical Foundation',
    description: 'Every piece of content is grounded in Scripture and evangelical Christian theology, providing readers with truth they can trust.',
    icon: BookOpenIcon,
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
  },
  {
    name: 'Intellectual Integrity',
    description: 'We engage with complex ideas honestly and thoughtfully, never shying away from difficult questions or nuanced discussions.',
    icon: LightBulbIcon,
    color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400'
  },
  {
    name: 'Authentic Community',
    description: 'We foster genuine relationships and create safe spaces for spiritual growth, questions, and mutual encouragement.',
    icon: UsersIcon,
    color: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
  },
  {
    name: 'Creative Excellence',
    description: 'We celebrate the arts as gifts from God, encouraging creative expression that glorifies Him and enriches the soul.',
    icon: SparklesIcon,
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
  },
  {
    name: 'Pastoral Heart',
    description: 'Our content is written with love and care, always considering the spiritual well-being of our readers.',
    icon: HeartIcon,
    color: 'bg-rose-100 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400'
  },
  {
    name: 'Global Perspective',
    description: 'We embrace the diversity of the global church while maintaining unity in essential Christian truths.',
    icon: GlobeAltIcon,
    color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400'
  }
]

export function Values() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
            Our Values
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            These core values guide everything we do, from the content we publish to the community we build.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <motion.div
              key={value.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card p-6 text-center"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${value.color}`}>
                <value.icon className="h-6 w-6" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                {value.name}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100 mb-4">
              Live These Values With Us
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Whether you're a reader, writer, or supporter, you're invited to be part of a community 
              that lives out these values together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/submit" className="btn-primary">
                Share Your Story
              </a>
              <a href="/contact" className="btn-secondary">
                Get Involved
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}