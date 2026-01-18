import Link from 'next/link'
import { 
  HeartIcon, 
  BookOpenIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

export function Mission() {
  return (
    <section className="py-4 sm:py-6 lg:py-8 xl:py-12 relative overflow-hidden">
      {/* Dark Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-4 sm:mb-6 lg:mb-8">
          {/* Badge */}
          <div className="relative inline-block mb-3 sm:mb-4">
            <div className="inline-flex items-center px-6 py-2 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-full shadow-2xl">
              <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-3">
                <HeartIconSolid className="h-3 w-3 text-white" />
              </div>
              <span className="text-base font-bold">Our Mission</span>
            </div>
          </div>
          
          {/* Title */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-white to-blue-200 leading-tight">
              TELOS MAED
            </h2>
            
            {/* Underline */}
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full shadow-lg mb-4" />
            
            {/* Tagline */}
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-200">
              Live Purposefully and Lead Effectively!
            </p>
          </div>
        </div>

        {/* Mission Content */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
            {/* Left Column - TELOS Meaning */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-800/50 to-purple-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 shadow-2xl">
                <div className="text-4xl mb-4 text-center">
                  🎯
                </div>
                
                <h3 className="text-xl font-bold text-yellow-300 mb-4 text-center">
                  What is TELOS?
                </h3>
                
                <div className="space-y-3">
                  <p className="text-blue-100 leading-relaxed text-sm">
                    <span className="text-yellow-300 font-bold">TELOS</span> is a Greek word meaning 
                    <span className="text-orange-300 font-bold"> "purpose"</span> or 
                    <span className="text-blue-300 font-bold"> "ultimate goal."</span> When Christian leaders are equipped holistically through the power of the Holy Spirit, they become agents of positive change for families, churches, organizations, and communities.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Ministry Description */}
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-800/50 to-indigo-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 shadow-2xl">
                <div className="text-4xl mb-4 text-center">
                  📖
                </div>
                
                <h3 className="text-xl font-bold text-yellow-300 mb-4 text-center">
                  Our Digital Magazine
                </h3>
                
                <div className="space-y-3">
                  <p className="text-blue-100 leading-relaxed text-sm">
                    TELOS Digital Magazine is part of TELOS MAED Ministry, centered on Scripture to develop holistic competencies within the Christian community. We strive to equip and empower emerging and existing leaders, contributing to the expansion of God's Kingdom.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <div className="text-center mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-white to-blue-200 mb-3 sm:mb-4">
              Our Four Pillars
            </h3>
            
            <div className="w-20 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                icon: '📖',
                title: 'Scripture-Centered',
                description: 'Built on God\'s Word',
                bgColor: 'from-blue-800/30 to-blue-900/30'
              },
              {
                icon: '👥',
                title: 'Leadership Development',
                description: 'Equipping Leaders',
                bgColor: 'from-green-800/30 to-green-900/30'
              },
              {
                icon: '🌍',
                title: 'Kingdom Expansion',
                description: 'Growing God\'s Kingdom',
                bgColor: 'from-purple-800/30 to-purple-900/30'
              },
              {
                icon: '🎯',
                title: 'Purpose Discovery',
                description: 'Finding God\'s Calling',
                bgColor: 'from-orange-800/30 to-orange-900/30'
              }
            ].map((pillar, index) => (
              <div key={index} className="group">
                <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${pillar.bgColor} backdrop-blur-sm border border-white/20 p-3 sm:p-4 shadow-2xl hover:shadow-3xl transition-all duration-300`}>
                  {/* Icon */}
                  <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 text-center">
                    {pillar.icon}
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-1 sm:space-y-2">
                    <h4 className="font-bold text-white text-sm sm:text-base group-hover:text-yellow-300 transition-colors duration-300">
                      {pillar.title}
                    </h4>
                    <p className="text-blue-100 text-xs">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 sm:p-6 shadow-xl max-w-4xl mx-auto">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">
              Join Our Kingdom Mission
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/articles"
                className="inline-flex items-center px-5 py-2 bg-white text-blue-600 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm"
              >
                <BookOpenIcon className="h-4 w-4 mr-2" />
                Explore Articles
                <ArrowRightIcon className="h-3 w-3 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
