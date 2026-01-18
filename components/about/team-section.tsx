'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

// Mock team data
const team = [
  {
    name: 'Dr. Sarah Johnson',
    role: 'Editor-in-Chief',
    bio: 'Theologian and author with a passion for equipping young Christian leaders. PhD in Systematic Theology from Fuller Seminary.',
    image: '/api/placeholder/300/300',
    social: {
      twitter: '#',
      linkedin: '#'
    }
  },
  {
    name: 'Pastor Michael Chen',
    role: 'Senior Editor',
    bio: 'Youth pastor and writer focused on bridging generational gaps in the church. MDiv from Gordon-Conwell Seminary.',
    image: '/api/placeholder/300/300',
    social: {
      twitter: '#',
      linkedin: '#'
    }
  },
  {
    name: 'Maria Santos',
    role: 'Creative Director',
    bio: 'Artist and worship leader passionate about creative expression in Christian community. BFA in Visual Arts.',
    image: '/api/placeholder/300/300',
    social: {
      instagram: '#',
      linkedin: '#'
    }
  },
  {
    name: 'Joshua Emmanuel',
    role: 'Poetry Editor',
    bio: 'Published poet and literature professor specializing in spiritual and contemporary Christian poetry.',
    image: '/api/placeholder/300/300',
    social: {
      twitter: '#',
      website: '#'
    }
  }
]

export function TeamSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
            Meet Our Team
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Passionate individuals committed to serving the global Christian community through thoughtful content and creative expression.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card p-6 text-center"
            >
              {/* Profile Image */}
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-800 to-primary-700 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-600 dark:text-primary-200">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                {member.name}
              </h3>
              
              <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                {member.role}
              </p>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {member.bio}
              </p>
              
              {/* Social Links */}
              <div className="flex justify-center space-x-3">
                {Object.entries(member.social).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                    aria-label={`${member.name} on ${platform}`}
                  >
                    <span className="sr-only">{platform}</span>
                    <div className="w-5 h-5 bg-current rounded"></div>
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join the team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="card p-8 lg:p-12">
            <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100 mb-4">
              Join Our Editorial Team
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              We're always looking for passionate writers, editors, and creatives who share our vision 
              for thoughtful Christian content.
            </p>
            <a href="/contact" className="btn-primary">
              Get In Touch
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}