import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { LangProvider } from '@/i18n/LangContext'

export const metadata: Metadata = {
  title: 'UniPath — Find Your University',
  description: 'Global university navigator. 23,898 universities from 252 countries.',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
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