'use client'

import { useLang } from '@/i18n/LangContext'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-sm">U</span>
            <span className="text-lg font-bold text-white">UniPath</span>
          </div>
          <p className="text-sm">{t.footer.tagline}</p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">{t.footer.nav}</h4>
          <div className="flex flex-col gap-2 text-sm">
            <a href="/universities" className="hover:text-white transition-colors">{t.nav.search}</a>
            <a href="/exams" className="hover:text-white transition-colors">{t.nav.exams}</a>
            <a href="/compare" className="hover:text-white transition-colors">{t.nav.compare}</a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">{t.footer.data}</h4>
          <p className="text-sm">{t.footer.stats}</p>
          <p className="text-sm mt-1">{t.footer.updated}</p>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center py-4 text-xs">
        {t.footer.copyright}
      </div>
    </footer>
  )
}