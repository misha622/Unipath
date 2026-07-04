'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { translations, Lang, TranslationDict } from './translations'

const LangContext = createContext<{
  lang: Lang
  t: TranslationDict
  toggleLang: () => void
}>({ lang: 'ru', t: translations.ru, toggleLang: () => {} })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ru')
  const toggleLang = () => setLang(l => l === 'ru' ? 'en' : 'ru')
  return (
    <LangContext.Provider value={{ lang, t: translations[lang], toggleLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}