import { Hero } from '@/components/home/hero-simple'
import { BookPromo } from '@/components/home/book-promo'
import { LatestArticles } from '@/components/home/latest-articles'
import { Mission } from '@/components/home/mission'
import { Newsletter } from '@/components/home/newsletter'

export default function HomePage() {
  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-12 xl:space-y-16">
      <Hero />
      <BookPromo />
      <LatestArticles />
      <Mission />
      <Newsletter />
    </div>
  )
}