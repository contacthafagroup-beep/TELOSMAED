import { Hero } from '@/components/home/hero-simple'
import { LatestArticles } from '@/components/home/latest-articles'
import { Mission } from '@/components/home/mission'
import { Newsletter } from '@/components/home/newsletter'

export default function HomePage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <Hero />
      <LatestArticles />
      <Mission />
      <Newsletter />
    </div>
  )
}