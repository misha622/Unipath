'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLang } from '@/i18n/LangContext'
import { supabase } from '@/lib/supabase'
import ThemeToggle from '@/components/ThemeToggle'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { lang, t, toggleLang } = useLang()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
  }, [])

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` }
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-lg group-hover:bg-brand-700 transition-colors">U</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">UniPath</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link href="/universities" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand-700 hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors">
            {t.nav.search}
          </Link>
          <Link href="/exams" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand-700 hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors">
            {t.nav.exams}
          </Link>
          <Link href="/compare" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand-700 hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors">
            {t.nav.compare}
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand-700 hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors">
                {user.email?.split('@')[0]}
              </Link>
              <button onClick={handleLogout} className="px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900 transition-colors">
                {lang === 'ru' ? 'Выйти' : 'Logout'}
              </button>
            </>
          ) : (
            <button onClick={handleLogin} className="ml-2 px-4 py-2 rounded-lg text-sm font-medium bg-brand-600 text-white hover:bg-brand-700 transition-colors">
              {lang === 'ru' ? 'Войти' : 'Login'}
            </button>
          )}
          <ThemeToggle />
          <button onClick={toggleLang} className="ml-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            {lang === 'ru' ? '🇬🇧 EN' : '🇷🇺 RU'}
          </button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button onClick={toggleLang} className="px-2 py-1 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 dark:text-gray-300">
            {lang === 'ru' ? 'EN' : 'RU'}
          </button>
          {user ? (
            <button onClick={handleLogout} className="px-2 py-1 rounded-lg text-xs font-medium text-red-600">
              {lang === 'ru' ? 'Выйти' : 'X'}
            </button>
          ) : (
            <button onClick={handleLogin} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-600 text-white">
              {lang === 'ru' ? 'Войти' : 'Login'}
            </button>
          )}
          <button onClick={() => setOpen(!open)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 flex flex-col gap-1">
          <Link href="/universities" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800" onClick={() => setOpen(false)}>{t.nav.search}</Link>
          <Link href="/exams" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800" onClick={() => setOpen(false)}>{t.nav.exams}</Link>
          <Link href="/compare" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800" onClick={() => setOpen(false)}>{t.nav.compare}</Link>
        </div>
      )}
    </header>
  )
}