import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { LangProvider } from '@/i18n/LangContext'

export const metadata: Metadata = {
  title: 'UniPath — Find Your University | 23 898 Universities Worldwide',
  description: 'Global university navigator. Search 23,898 universities from 252 countries. Up-to-date requirements, deadlines and tuition fees. WHED/IAU data.',
  keywords: ['university', 'search', 'universities', 'higher education', 'WHED', 'admission', 'tuition', 'study abroad', 'университет', 'поиск вузов', 'образование'],
  authors: [{ name: 'UniPath' }],
  creator: 'UniPath',
  publisher: 'UniPath',
  metadataBase: new URL('https://unipath.vercel.app'),
  openGraph: {
    title: 'UniPath — Find Your University',
    description: 'Search 23,898 universities from 252 countries. WHED/IAU data.',
    url: 'https://unipath.vercel.app',
    siteName: 'UniPath',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UniPath — Find Your University',
    description: 'Search 23,898 universities from 252 countries.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: { icon: '/favicon.ico' },
  alternates: { canonical: 'https://unipath.vercel.app' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#4c6ef5" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body className="font-sans bg-gray-50 min-h-screen flex flex-col antialiased">
        <LangProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  )
}