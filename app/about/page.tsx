'use client'

import Link from 'next/link'
import { 
  BookOpenIcon,
  UsersIcon,
  HeartIcon,
  PhoneIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-[#203685]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            TELOS MAED
          </h1>
          <p className="text-xl text-[#E3E4E6]">
            Live Purposefully Lead Effectively!
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 bg-[#E3E4E6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <BookOpenIcon className="w-6 h-6 text-[#203685] mr-3" />
                <h2 className="text-xl font-bold text-[#203685]">About TELOS</h2>
              </div>
              <p className="text-base text-gray-700 leading-relaxed">
                <strong>TELOS</strong> is a Greek word meaning "purpose" or "ultimate goal." 
                We equip Christian leaders holistically through the Holy Spirit to become 
                agents of positive change.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm" dir="rtl">
              <div className="flex items-center mb-4">
                <BookOpenIcon className="w-6 h-6 text-[#203685] ml-3" />
                <h2 className="text-xl font-bold text-[#203685]">ስለ ቴሎስ</h2>
              </div>
              <p className="text-base text-gray-700 leading-relaxed">
                <strong>ቴሎስ</strong> የግሪክ ቃል ሲሆን "ዓላማ" ወይም "የመጨረሻው ግብ" ማለት ነው። 
                ክርስቲያን መሪዎችን በመንፈስ ቅዱስ ኃይል በሁለንተናዊ መልኩ እናስታጥቃለን።
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-[#E3E4E6] rounded-lg p-6">
              <div className="flex items-center mb-4">
                <UsersIcon className="w-6 h-6 text-[#203685] mr-3" />
                <h3 className="text-xl font-bold text-[#203685]">Our Mission</h3>
              </div>
              <p className="text-base text-gray-700 leading-relaxed">
                To develop holistic competencies within the Christian community, 
                equipping leaders for God's Kingdom expansion.
              </p>
            </div>

            <div className="border border-[#E3E4E6] rounded-lg p-6" dir="rtl">
              <div className="flex items-center mb-4">
                <UsersIcon className="w-6 h-6 text-[#203685] ml-3" />
                <h3 className="text-xl font-bold text-[#203685]">የእኛ ተልእኮ</h3>
              </div>
              <p className="text-base text-gray-700 leading-relaxed">
                በክርስቲያኑ ማህበረሰብ ውስጥ ሁለንተናዊ ብቃቶችን በማዳበር፣ 
                መሪዎችን ለእግዚአብሔር መንግስት መስፋፋት ማስታጠቅ።
              </p>
            </div>

            <div className="border border-[#E3E4E6] rounded-lg p-6">
              <div className="flex items-center mb-4">
                <HeartIcon className="w-6 h-6 text-[#203685] mr-3" />
                <h3 className="text-xl font-bold text-[#203685]">Our Vision</h3>
              </div>
              <p className="text-base text-gray-700 leading-relaxed">
                Christian leaders living purposefully and leading effectively, 
                transforming communities through the Gospel.
              </p>
            </div>

            <div className="border border-[#E3E4E6] rounded-lg p-6" dir="rtl">
              <div className="flex items-center mb-4">
                <HeartIcon className="w-6 h-6 text-[#203685] ml-3" />
                <h3 className="text-xl font-bold text-[#203685]">የእኛ ራዕይ</h3>
              </div>
              <p className="text-base text-gray-700 leading-relaxed">
                ክርስቲያን መሪዎች በዓላማ እየኖሩ እና በብቃት እየመሩ፣ 
                በወንጌል ኃይል ማህበረሰባቸውን እየለወጡ ማየት።
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}