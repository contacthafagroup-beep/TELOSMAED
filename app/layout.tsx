import type { Metadata } from 'next'
import { Inter, Crimson_Text, Playfair_Display } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ReadingProgress } from '@/components/ui/reading-progress'
import { QuickActions } from '@/components/ui/quick-actions'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const crimsonText = Crimson_Text({ 
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-crimson',
  display: 'swap'
})

const playfairDisplay = Playfair_Display({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'TELOS MAED - Premium Christian Magazine',
  description: 'An Evangelical Christian intellectual magazine focused on faith, leadership, youth culture, and creative worship.',
  keywords: ['Christian magazine', 'faith', 'leadership', 'youth culture', 'worship', 'evangelical'],
  authors: [{ name: 'TELOS MAED Editorial Team' }],
  openGraph: {
    title: 'TELOS MAED - Premium Christian Magazine',
    description: 'An Evangelical Christian intellectual magazine focused on faith, leadership, youth culture, and creative worship.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TELOS MAED - Premium Christian Magazine',
    description: 'An Evangelical Christian intellectual magazine focused on faith, leadership, youth culture, and creative worship.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${crimsonText.variable} ${playfairDisplay.variable} font-sans antialiased`}>
        <ThemeProvider>
          <ReadingProgress />
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <QuickActions />
        </ThemeProvider>
      </body>
    </html>
  )
}