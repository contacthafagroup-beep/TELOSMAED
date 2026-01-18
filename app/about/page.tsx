'use client'

import Link from 'next/link'
import { 
  PhoneIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  VideoCameraIcon,
  ArrowRightIcon,
  SparklesIcon,
  BookOpenIcon,
  UsersIcon,
  GlobeAltIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-8">
              <SparklesIcon className="w-4 h-4 mr-2" />
              About TELOS MAED
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                TELOS MAED
              </span>
            </h1>
            <p className="text-2xl text-gray-600 font-medium">
              Live Purposefully and Lead Effectively!
            </p>
            <p className="text-2xl text-gray-600 font-medium mt-2" dir="rtl">
              በዓላማ ኑሩ እና በብቃት መርሁ!
            </p>
          </div>
        </div>
      </section>

      {/* Main Content - Side by Side */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* English Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <BookOpenIcon className="w-8 h-8 text-blue-600 mr-3" />
                  About TELOS
                </h2>
                <div className="prose prose-lg text-gray-700 leading-relaxed">
                  <p className="mb-6">
                    <strong>TELOS</strong> is a Greek word meaning <em>"purpose"</em> or <em>"ultimate goal."</em> When Christian leaders are equipped holistically through the power of the Holy Spirit, they become agents of positive change for families, churches, organizations, and communities.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <UsersIcon className="w-7 h-7 text-purple-600 mr-3" />
                  Our Mission
                </h3>
                <div className="prose prose-lg text-gray-700 leading-relaxed">
                  <p>
                    TELOS Digital Magazine is part of TELOS MAED Ministry, centered on Scripture to develop holistic competencies within the Christian community. We strive to equip and empower emerging and existing leaders, contributing to the expansion of God's Kingdom. We help every believer understand and follow God's ultimate calling in their life.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <HeartIcon className="w-7 h-7 text-red-500 mr-3" />
                  Our Vision
                </h3>
                <div className="prose prose-lg text-gray-700 leading-relaxed">
                  <p>
                    To see Christian leaders living purposefully and leading effectively, transforming their communities through the power of the Gospel and the guidance of the Holy Spirit.
                  </p>
                </div>
              </div>
            </div>

            {/* Amharic Content */}
            <div className="space-y-8" dir="rtl">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <BookOpenIcon className="w-8 h-8 text-blue-600 ml-3" />
                  ስለ ቴሎስ
                </h2>
                <div className="prose prose-lg text-gray-700 leading-relaxed">
                  <p className="mb-6">
                    <strong>ቴሎስ (Telos)</strong> ማለት የግሪክ ቃል ሲሆን ትርጓሜው ደግሞ <em>"ዓላማ"</em> ወይም <em>"የመጨረሻው ግብ"</em> የሚለውን ሀሳብ የሚያንፀባርቅ ነው። ክርስቲያን መሪዎች በመንፈስ ቅዱስ ኃይል በሁለንተናዊ መልኩ ሲታጠቁ ለቤተሰብ፣ ለቤተ-ክርስቲያን፣ ለሚሰማሩበት ድርጅት እንዲሁም ለማህበረሰቡ የመልካም ለውጥ ምክንያት ይሆናሉ።
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <UsersIcon className="w-7 h-7 text-purple-600 ml-3" />
                  የእኛ ተልእኮ
                </h3>
                <div className="prose prose-lg text-gray-700 leading-relaxed">
                  <p>
                    ቴሎስ ዲጂታል መጽሔት የቴሎስ ማዕድ አገልግሎት ውስጥ አንዱ ሲሆን መፅሐፍ ቅዱስን ማዕከል በማድረግ በክርስቲያኑ ማህበረሰብ ውስጥ ሁለንተናዊ ብቃቶችን በማዳበር፣ ታዳጊ እና ነባር መሪዎችን በማስታጠቅና በማብቃት ለእግዚአብሔር መንግስት መስፋፋት የበኩሉን አስተዋፅኦ ለማድረግ ይተጋል። እንዲሁም እያንዳንዱን አማኝ በህይወቱ የእግዚአብሔርን ጥሪ የመጨረሻ ግብ እንዲረዳና እንዲከተል ያግዛል።
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <HeartIcon className="w-7 h-7 text-red-500 ml-3" />
                  የእኛ ራዕይ
                </h3>
                <div className="prose prose-lg text-gray-700 leading-relaxed">
                  <p>
                    ክርስቲያን መሪዎች በዓላማ እየኖሩ እና በብቃት እየመሩ፣ በወንጌል ኃይል እና በመንፈስ ቅዱስ መመሪያ ማህበረሰባቸውን እየለወጡ ማየት።
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <h2 className="text-3xl font-bold text-gray-900 mb-8" dir="rtl">የእኛ ዋና እሴቶች</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200">
                <BookOpenIcon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Scripture-Centered</h3>
              <h3 className="text-lg font-bold text-gray-900 mb-3" dir="rtl">በመጽሐፍ ቅዱስ ላይ ያተኮረ</h3>
              <p className="text-gray-600 text-sm">Built on God's Word</p>
              <p className="text-gray-600 text-sm" dir="rtl">በእግዚአብሔር ቃል ላይ የተመሰረተ</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200">
                <UsersIcon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Leadership Development</h3>
              <h3 className="text-lg font-bold text-gray-900 mb-3" dir="rtl">የመሪነት ልማት</h3>
              <p className="text-gray-600 text-sm">Equipping Leaders</p>
              <p className="text-gray-600 text-sm" dir="rtl">መሪዎችን ማስታጠቅ</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200">
                <GlobeAltIcon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Kingdom Expansion</h3>
              <h3 className="text-lg font-bold text-gray-900 mb-3" dir="rtl">የመንግስት መስፋፋት</h3>
              <p className="text-gray-600 text-sm">Growing God's Kingdom</p>
              <p className="text-gray-600 text-sm" dir="rtl">የእግዚአብሔርን መንግስት ማሳደግ</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200">
                <HeartIcon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Purpose Discovery</h3>
              <h3 className="text-lg font-bold text-gray-900 mb-3" dir="rtl">የዓላማ ግኝት</h3>
              <p className="text-gray-600 text-sm">Finding God's Calling</p>
              <p className="text-gray-600 text-sm" dir="rtl">የእግዚአብሔርን ጥሪ ማግኘት</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Connect With Us</h2>
            <h2 className="text-3xl font-bold text-gray-900 mb-8" dir="rtl">ከእኛ ጋር ይገናኙ</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <a
              href="https://t.me/telosmaed"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-blue-200"
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200">
                  <DevicePhoneMobileIcon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Telegram</h3>
                <h3 className="text-lg font-bold text-gray-900 mb-3" dir="rtl">ቴሌግራም</h3>
                <p className="text-gray-600 text-sm mb-2">Join our community</p>
                <p className="text-gray-600 text-sm" dir="rtl">ማህበረሰባችንን ይቀላቀሉ</p>
              </div>
            </a>

            <a
              href="https://www.youtube.com/@TELOSMAED"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-red-200"
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200">
                  <VideoCameraIcon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">YouTube</h3>
                <h3 className="text-lg font-bold text-gray-900 mb-3" dir="rtl">ዩቲዩብ</h3>
                <p className="text-gray-600 text-sm mb-2">Watch our content</p>
                <p className="text-gray-600 text-sm" dir="rtl">ይዘታችንን ይመልከቱ</p>
              </div>
            </a>

            <a
              href="mailto:telosmaed@gmail.com"
              className="group bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-green-200"
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200">
                  <EnvelopeIcon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Email</h3>
                <h3 className="text-lg font-bold text-gray-900 mb-3" dir="rtl">ኢሜይል</h3>
                <p className="text-gray-600 text-sm mb-2">Send us a message</p>
                <p className="text-gray-600 text-sm" dir="rtl">መልእክት ይላኩልን</p>
              </div>
            </a>

            <a
              href="tel:+251924749060"
              className="group bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-purple-200"
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200">
                  <PhoneIcon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Phone</h3>
                <h3 className="text-lg font-bold text-gray-900 mb-3" dir="rtl">ስልክ</h3>
                <p className="text-gray-600 text-sm mb-2">Call us directly</p>
                <p className="text-gray-600 text-sm" dir="rtl">በቀጥታ ይደውሉልን</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Join Our Mission
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8" dir="rtl">
            ተልእኮአችንን ይቀላቀሉ
          </h2>
          <p className="text-xl text-blue-100 mb-4 max-w-3xl mx-auto leading-relaxed">
            Be part of equipping Christian leaders to live purposefully and lead effectively.
          </p>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed" dir="rtl">
            ክርስቲያን መሪዎች በዓላማ እንዲኖሩ እና በብቃት እንዲመሩ በማስታጠቅ ውስጥ አካል ይሁኑ።
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/articles"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl group"
            >
              <span className="flex items-center justify-center">
                Read Our Articles
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}