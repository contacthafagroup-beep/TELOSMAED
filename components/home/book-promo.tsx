'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { CalendarIcon, ShoppingBagIcon, BellIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export function BookPromo() {
  const [notified, setNotified] = useState(false)
  const [email, setEmail] = useState('')
  const [showForm, setShowForm] = useState(false)

  const handlePreOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setNotified(true)
    setShowForm(false)
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#203685] via-[#2F56B0] to-[#203685] py-10 sm:py-14 lg:py-20">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />
      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F4C430] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F4C430] to-transparent" />

      <div className="relative container-responsive">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

          {/* Book Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-shrink-0 w-full max-w-sm lg:max-w-md"
          >
            <div className="relative">
              {/* Glow behind book */}
              <div className="absolute inset-0 bg-[#F4C430]/20 blur-3xl rounded-full scale-75" />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <Image
                  src="/images/book-promo.png"
                  alt="የማስቀሉ መልዕክት - ብርሃኑ ተስፋዬ"
                  width={600}
                  height={340}
                  className="w-full h-auto rounded-xl shadow-2xl"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Book Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex-1 text-center lg:text-left"
          >
            {/* Coming Soon Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F4C430]/20 border border-[#F4C430]/50 rounded-full mb-4">
              <span className="w-2 h-2 bg-[#F4C430] rounded-full animate-pulse" />
              <span className="text-[#F4C430] text-xs sm:text-sm font-semibold tracking-wide">
                የመጽሐፍ ምርቃ — Coming Soon
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight font-serif">
              የማስቀሉ መልዕክት
            </h2>

            {/* Author */}
            <p className="text-[#F4C430] text-base sm:text-lg font-semibold mb-3">
              በ ብርሃኑ ተስፋዬ
            </p>

            {/* Tagline */}
            <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-5 max-w-lg mx-auto lg:mx-0">
              ሃሳዕና መካነ አየሱስ ማ/ምዕመናን — ሙሉ ትምህርት ለሁሉም ክርስቲያን
            </p>

            {/* Publication Date */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg mb-8 border border-white/20">
              <CalendarIcon className="h-4 w-4 text-[#F4C430] flex-shrink-0" />
              <span className="text-white text-sm font-medium">
                መጋቢት 27 &nbsp;·&nbsp; April 5, 2026
              </span>
            </div>

            {/* CTA Buttons */}
            {!notified ? (
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                {!showForm ? (
                  <>
                    <motion.button
                      onClick={() => setShowForm(true)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#F4C430] text-[#203685] font-bold rounded-xl shadow-lg hover:bg-[#f0b800] transition-all duration-200 text-sm sm:text-base min-h-[48px]"
                    >
                      <ShoppingBagIcon className="h-5 w-5" />
                      Pre-Order Now
                    </motion.button>
                    <motion.button
                      onClick={() => setShowForm(true)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/40 hover:bg-white/20 transition-all duration-200 text-sm sm:text-base min-h-[48px]"
                    >
                      <BellIcon className="h-5 w-5" />
                      Notify Me
                    </motion.button>
                  </>
                ) : (
                  <form onSubmit={handlePreOrder} className="flex flex-col sm:flex-row gap-2 w-full max-w-md mx-auto lg:mx-0">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-[#F4C430] text-sm min-h-[48px]"
                    />
                    <button
                      type="submit"
                      className="px-5 py-3 bg-[#F4C430] text-[#203685] font-bold rounded-xl hover:bg-[#f0b800] transition-all duration-200 text-sm min-h-[48px] whitespace-nowrap"
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
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#F4C430]/20 border border-[#F4C430]/50 rounded-xl text-[#F4C430] font-semibold text-sm"
              >
                ✓ You'll be notified on launch day!
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
