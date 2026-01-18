'use client'

import { motion } from 'framer-motion'
import { EyeIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'

export function VisionMission() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                <EyeIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h2 className="ml-4 text-3xl font-display font-bold text-gray-900 dark:text-gray-100">
                Our Vision
              </h2>
            </div>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                To be the premier intellectual Christian magazine that bridges the gap between deep theological 
                thinking and practical faith living for the next generation of Christian leaders.
              </p>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                We envision a global community of young Christians who are equipped with both spiritual wisdom 
                and intellectual rigor, ready to engage with the complex challenges of our time while remaining 
                rooted in biblical truth.
              </p>
              
              <blockquote className="border-l-4 border-primary-600 pl-6 italic text-gray-700 dark:text-gray-300">
                "Where young minds encounter deep truths, and where faith meets the future."
              </blockquote>
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-secondary-100 dark:bg-secondary-900/20 rounded-lg">
                <RocketLaunchIcon className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
              </div>
              <h2 className="ml-4 text-3xl font-display font-bold text-gray-900 dark:text-gray-100">
                Our Mission
              </h2>
            </div>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                TELOS MAED exists to equip, inspire, and connect young Christian leaders, thinkers, and creatives 
                as they navigate faith in the modern world through:
              </p>
              
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full mt-2 mr-3"></span>
                  <span><strong>Thoughtful Content:</strong> Publishing articles that engage with contemporary issues through a biblical lens</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full mt-2 mr-3"></span>
                  <span><strong>Creative Expression:</strong> Celebrating poetry, art, and worship as pathways to spiritual growth</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full mt-2 mr-3"></span>
                  <span><strong>Leadership Development:</strong> Providing resources and insights for emerging Christian leaders</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full mt-2 mr-3"></span>
                  <span><strong>Community Building:</strong> Creating spaces for meaningful dialogue and spiritual formation</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}