'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  HeartIcon, 
  BookOpenIcon,
  ArrowRightIcon,
  UserGroupIcon,
  SparklesIcon,
  GlobeAltIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline'

export function Mission() {
  return (
    <section className="padding-responsive-lg bg-white">
      <div className="container-responsive">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center spacing-responsive-md mb-8 sm:mb-12"
        >
          <h2 className="text-responsive-2xl font-bold text-[#203685] mb-3">
            Our Mission
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-[#203685] mx-auto rounded-full mb-3 sm:mb-4"></div>
          <p className="text-responsive-sm text-gray-600 max-w-2xl mx-auto px-4">
            Empowering young Christians to live purposefully lead effectively through faith-centered content and community.
          </p>
        </motion.div>

        {/* Mission Cards Grid */}
        <div className="grid-responsive-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {[
            {
              icon: BookOpenIcon,
              title: 'Scripture-Centered',
              description: 'Grounded in biblical truth and wisdom',
              color: 'bg-[#203685]'
            },
            {
              icon: UserGroupIcon,
              title: 'Leadership Development',
              description: 'Equipping the next generation of leaders',
              color: 'bg-[#203685]'
            },
            {
              icon: GlobeAltIcon,
              title: 'Global Impact',
              description: 'Expanding God\'s kingdom worldwide',
              color: 'bg-[#203685]'
            },
            {
              icon: LightBulbIcon,
              title: 'Purpose Discovery',
              description: 'Finding your calling in Christ',
              color: 'bg-[#203685]'
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white border border-[#E3E4E6] rounded-xl padding-responsive-sm text-center hover:shadow-lg transition-all duration-300 hover:border-[#203685]/20">
                <div className={`${item.color} w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="text-responsive-sm font-semibold text-[#203685] mb-1.5 sm:mb-2">
                  {item.title}
                </h3>
                <p className="text-responsive-xs text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* TELOS Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#203685]/5 to-[#203685]/10 rounded-xl sm:rounded-2xl padding-responsive-md mb-8 sm:mb-12 border border-[#E3E4E6]"
        >
          <div className="grid-responsive-2 gap-4 sm:gap-6 lg:gap-8 items-center">
            <div>
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#203685] rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                  <SparklesIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                </div>
                <h3 className="text-responsive-lg font-bold text-[#203685]">
                  What is TELOS?
                </h3>
              </div>
              <p className="text-responsive-sm text-gray-700 leading-relaxed">
                <span className="font-semibold text-[#203685]">TELOS</span> is a Greek word meaning 
                <span className="font-semibold"> "purpose"</span> or 
                <span className="font-semibold"> "ultimate goal."</span> We believe that when Christian leaders are equipped holistically through the power of the Holy Spirit, they become agents of positive change for families, churches, organizations, and communities.
              </p>
            </div>
            <div>
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#203685] rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                  <BookOpenIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                </div>
                <h3 className="text-responsive-lg font-bold text-[#203685]">
                  Our Magazine
                </h3>
              </div>
              <p className="text-responsive-sm text-gray-700 leading-relaxed">
                TELOS Digital Magazine is part of TELOS MAED Ministry, centered on Scripture to develop holistic competencies within the Christian community. We strive to equip and empower emerging and existing leaders.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action - Simple */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/articles"
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-[#203685] text-white rounded-lg font-semibold hover:bg-[#203685]/90 transition-all duration-300 text-sm sm:text-base group min-h-[44px]"
          >
            <BookOpenIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 group-hover:scale-110 transition-transform" />
            Explore Articles
            <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
