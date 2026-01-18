'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  EnvelopeIcon,
  SparklesIcon,
  BookOpenIcon,
  UsersIcon,
  ArrowRightIcon,
  GiftIcon,
  CheckCircleIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { useNewsletterSubscription } from '@/lib/hooks/use-api'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const { subscribe, loading, error, success, reset } = useNewsletterSubscription()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await subscribe({ email, name })
    
    if (success) {
      setEmail('')
      setName('')
      setTimeout(() => reset(), 5000)
    }
  }

  return (
    <section className="relative py-4 sm:py-6 lg:py-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main CTA Section */}
        <div className="text-center mb-4 sm:mb-6">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold rounded-full mb-3 sm:mb-4">
            <GiftIcon className="h-3 w-3 mr-1.5 text-emerald-400" />
            Free Weekly Newsletter
            <div className="ml-2 flex space-x-0.5">
              {[...Array(5)].map((_, i) => (
                <StarIconSolid key={i} className="h-2.5 w-2.5 text-yellow-400" />
              ))}
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-black mb-3 sm:mb-4 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
              Don't Miss Out on
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Deep Faith Content
            </span>
          </h2>

          <p className="text-sm text-white/80 max-w-2xl mx-auto leading-relaxed mb-3 sm:mb-4">
            Join 15,000+ young Christians receiving weekly insights, exclusive articles, and spiritual growth resources.
          </p>

          {/* Value Propositions */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
            {[
              { text: 'Always Free', color: 'text-green-400' },
              { text: 'Weekly Delivery', color: 'text-blue-400' },
              { text: 'Exclusive Content', color: 'text-purple-400' },
              { text: 'Unsubscribe Anytime', color: 'text-yellow-400' }
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-1 border border-white/20"
              >
                <CheckCircleIcon className={`h-2.5 w-2.5 ${item.color} mr-1`} />
                <span className="text-white text-xs font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup Form */}
        <div className="max-w-lg mx-auto mb-4 sm:mb-6">
          {success ? (
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-green-500 rounded-full mb-3">
                <CheckCircleIcon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Welcome to the Community!
              </h3>
              <p className="text-white/80 mb-2 text-sm">
                Thank you for subscribing! You'll receive our next issue in your inbox.
              </p>
              <div className="flex items-center justify-center text-xs text-white/60">
                <HeartIcon className="h-3 w-3 mr-1.5" />
                Check your email for a welcome message
              </div>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex flex-col gap-2">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-white mb-1.5">
                      Name (Optional)
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border-0 bg-white/20 backdrop-blur-sm text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/30 transition-all duration-150"
                      placeholder="Your name (optional)"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-white mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border-0 bg-white/20 backdrop-blur-sm text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/30 transition-all duration-150"
                      placeholder="Enter your email address"
                    />
                  </div>
                  
                  {error && (
                    <div className="text-red-300 text-xs bg-red-500/20 rounded-lg p-2 border border-red-500/30">
                      {error}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                        Subscribing...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <EnvelopeIcon className="h-3 w-3 mr-2" />
                        Subscribe Free
                        <ArrowRightIcon className="h-3 w-3 ml-2" />
                      </div>
                    )}
                  </button>
                </div>
                
                <div className="text-center">
                  <p className="text-xs text-white/60">
                    Join 15,000+ subscribers • No spam, ever • Unsubscribe with one click
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Simple CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-lg p-4 border border-white/20">
            <h3 className="text-lg font-bold text-white mb-2">
              Ready to Deepen Your Faith?
            </h3>
            <p className="text-blue-100 mb-4 max-w-xl mx-auto text-xs">
              Join thousands of young Christians who are growing in wisdom, knowledge, and spiritual maturity through our weekly content.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
              <Link
                href="/submit"
                className="inline-flex items-center px-4 py-2 text-sm bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold rounded-lg hover:bg-white/30 transition-all duration-300"
              >
                <SparklesIcon className="h-4 w-4 mr-1.5" />
                Share Your Story
                <ArrowRightIcon className="h-4 w-4 ml-1.5" />
              </Link>
              <Link
                href="/articles"
                className="inline-flex items-center px-4 py-2 text-sm bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold rounded-lg hover:bg-white/30 transition-all duration-300"
              >
                <BookOpenIcon className="h-4 w-4 mr-1.5" />
                Browse Articles
                <ArrowRightIcon className="h-4 w-4 ml-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
