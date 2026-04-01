'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { CalendarIcon, ShoppingBagIcon, BellIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export function BookPromo() {
  const [notified, setNotified] = useState(false)
  const [email, setEmail] = useState('')
  const [showForm, setShowForm] = useState(false)

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault()
    setNotified(true)
    setShowForm(false)
  }

  return (
    <section className="padding-responsive-lg bg-white border-y border-[#E3E4E6]">
      <div className="container-responsive">

        {/* Section Header — same style as Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#203685]/10 rounded-full mb-3">
            <span className="w-2 h-2 bg-[#203685] rounded-full animate-pulse" />
            <span className="text-[#203685] text-xs sm:text-sm font-semibold tracking-wide">
              የመጽሐፍ ምርቃ — New Book
            </span>
          </div>
          <h2 className="text-responsive-2xl font-bold text-[#203685] mb-3">
            Coming Soon
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-[#203685] mx-auto rounded-full" />
        </motion.div>

        {/* Main Card — same style as TELOS explanation card in Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#203685]/5 to-[#203685]/10 rounded-xl sm:rounded-2xl border border-[#E3E4E6] overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row items-center gap-0">

            {/* Book Image */}
            <div className="w-full lg:w-1/2 bg-[#203685]/5 flex items-center justify-center p-6 sm:p-10">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-full max-w-md"
              >
                <div className="absolute inset-0 bg-[#203685]/10 blur-2xl rounded-full scale-90" />
                <Image
                  src="/images/book-promo.png"
                  alt="የመስቀሉ መልዕክት - ብርሃኑ ተስፋዬ"
                  width={600}
                  height={340}
                  className="relative w-full h-auto rounded-xl shadow-xl"
                  priority
                />
              </motion.div>
            </div>

            {/* Book Info */}
            <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 text-center lg:text-left">

              {/* Publication date badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E3E4E6] rounded-lg mb-4 shadow-sm">
                <CalendarIcon className="h-4 w-4 text-[#203685] flex-shrink-0" />
                <span className="text-[#203685] text-xs sm:text-sm font-semibold">
                  መጋቢት 27 · April 5, 2026
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#203685] mb-2 leading-tight font-serif">
                የመስቀሉ መልዕክት
              </h3>

              {/* Author */}
              <p className="text-base sm:text-lg font-semibold text-gray-600 mb-4">
                በ ብርሃኑ ተስፋዬ
              </p>

              {/* Divider */}
              <div className="w-10 h-0.5 bg-[#203685] mb-4 mx-auto lg:mx-0" />

              {/* Description */}
              <p className="text-responsive-sm text-gray-600 leading-relaxed mb-6 max-w-md mx-auto lg:mx-0">
                ሆሳዕና መካነ አየሱስ ማ/ምዕመናን — ሙሉ ትምህርት ለሁሉም ክርስቲያን
              </p>

              {/* CTA */}
              {!notified ? (
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  {!showForm ? (
                    <>
                      <motion.button
                        onClick={() => setShowForm(true)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#203685] text-white font-bold rounded-lg hover:bg-[#203685]/90 transition-all duration-200 text-sm sm:text-base min-h-[48px] shadow-md"
                      >
                        <ShoppingBagIcon className="h-5 w-5" />
                        Pre-Order Now
                      </motion.button>
                      <motion.button
                        onClick={() => setShowForm(true)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#203685] font-semibold rounded-lg border border-[#203685] hover:bg-[#203685]/5 transition-all duration-200 text-sm sm:text-base min-h-[48px]"
                      >
                        <BellIcon className="h-5 w-5" />
                        Notify Me
                      </motion.button>
                    </>
                  ) : (
                    <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-2 w-full max-w-md mx-auto lg:mx-0">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-3 rounded-lg bg-white border border-[#E3E4E6] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#203685] text-sm min-h-[48px]"
                      />
                      <button
                        type="submit"
                        className="px-5 py-3 bg-[#203685] text-white font-bold rounded-lg hover:bg-[#203685]/90 transition-all duration-200 text-sm min-h-[48px] whitespace-nowrap"
                      >
                        Notify Me
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#203685]/10 border border-[#203685]/20 rounded-lg text-[#203685] font-semibold text-sm"
                >
                  ✓ You'll be notified on launch day!
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
