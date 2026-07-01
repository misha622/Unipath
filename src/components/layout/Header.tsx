'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-lg bg-white/90">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-lg group-hover:bg-brand-700 transition-colors">U</span>
          <span className="text-xl font-bold text-gray-900">UniPath</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link href="/universities" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-brand-700 hover:bg-brand-50 transition-colors">
            🔍 Поиск вузов
          </Link>
          <Link href="/exams" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-brand-700 hover:bg-brand-50 transition-colors">
            📋 Экзамены
          </Link>
          <Link href="/compare" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-brand-700 hover:bg-brand-50 transition-colors">
            ⚖️ Сравнить
          </Link>
        </nav>

        {/* Mobile burger */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1">
          <Link href="/universities" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">🔍 Поиск вузов</Link>
          <Link href="/exams" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">📋 Экзамены</Link>
          <Link href="/compare" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">⚖️ Сравнить</Link>
        </div>
      )}
    </header>
  )
}