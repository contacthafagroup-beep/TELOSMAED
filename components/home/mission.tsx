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
    <section className="py-6 sm:py-8 lg:py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#203685] mb-3">
            Our Mission
          </h2>
          <div className="w-16 h-1 bg-[#203685] mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Empowering young Christians to live purposefully lead effectively through faith-centered content and community.
          </p>
        </motion.div>

        {/* Mission Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
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
              <div className="bg-white border border-[#E3E4E6] rounded-xl p-4 sm:p-6 text-center hover:shadow-lg transition-all duration-300 hover:border-[#203685]/20">
                <div className={`${item.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-[#203685] mb-2 text-sm sm:text-base">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
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
          className="bg-gradient-to-r from-[#203685]/5 to-[#203685]/10 rounded-2xl p-6 sm:p-8 mb-8 sm:mb-12 border border-[#E3E4E6]"
        >
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[#203685] rounded-full flex items-center justify-center mr-3">
                  <SparklesIcon className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#203685]">
                  What is TELOS?
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                <span className="font-semibold text-[#203685]">TELOS</span> is a Greek word meaning 
                <span className="font-semibold"> "purpose"</span> or 
                <span className="font-semibold"> "ultimate goal."</span> We believe that when Christian leaders are equipped holistically through the power of the Holy Spirit, they become agents of positive change for families, churches, organizations, and communities.
              </p>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[#203685] rounded-full flex items-center justify-center mr-3">
                  <BookOpenIcon className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#203685]">
                  Our Magazine
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
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
            className="inline-flex items-center px-6 py-3 bg-[#203685] text-white rounded-lg font-semibold hover:bg-[#203685]/90 transition-all duration-300 text-sm group"
          >
            <BookOpenIcon className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
            Explore Articles
            <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
