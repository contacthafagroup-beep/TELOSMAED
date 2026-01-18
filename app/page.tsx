import { Hero } from '@/components/home/hero-simple'
import { LatestArticles } from '@/components/home/latest-articles'
import { Mission } from '@/components/home/mission'
import { Newsletter } from '@/components/home/newsletter'

export default function HomePage() {
  return (
    <div className="space-y-8 sm:space-y-12 lg:space-y-16 xl:space-y-24">
      <Hero />
      <LatestArticles />
      <Mission />
      <Newsletter />
    </div>
  )
}