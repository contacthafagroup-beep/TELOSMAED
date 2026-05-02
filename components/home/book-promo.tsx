'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { PhoneIcon, BookOpenIcon } from '@heroicons/react/24/outline'

export function BookPromo() {
  return (
    <section className="padding-responsive-lg bg-white border-y border-[#E3E4E6]">
      <div className="container-responsive">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#203685]/10 rounded-full mb-3">
            <BookOpenIcon className="h-4 w-4 text-[#203685]" />
            <span className="text-[#203685] text-xs sm:text-sm font-semibold tracking-wide">
              አዲስ መጽሐፍ — Now Available
            </span>
          </div>
          <h2 className="text-responsive-2xl font-bold text-[#203685] mb-3">
            Get Your Copy Today
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-[#203685] mx-auto rounded-full" />
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#203685]/5 to-[#203685]/10 rounded-xl sm:rounded-2xl border border-[#E3E4E6] overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row items-center">

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

              {/* Available badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg mb-4">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-green-700 text-xs sm:text-sm font-semibold">
                  Available Now
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

              {/* Call to get book */}
              <div className="flex flex-col gap-3 items-center lg:items-start">
                <p className="text-sm text-gray-500">
                  መጽሐፉን ለማግኘት ይደውሉ
                </p>
                <motion.a
                  href="tel:+251910769060"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#203685] text-white font-bold rounded-xl shadow-md hover:bg-[#203685]/90 transition-all duration-200 text-base sm:text-lg min-h-[56px] w-full sm:w-auto"
                >
                  <PhoneIcon className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
                  <span>0910 769 060</span>
                </motion.a>
                <p className="text-xs text-gray-400">
                  Tap to call directly
                </p>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
