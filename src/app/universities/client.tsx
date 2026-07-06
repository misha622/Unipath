'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useLang } from '@/i18n/LangContext'
import { supabase } from '@/lib/supabase'
import type { Univ } from '@/data/universities-whed'

const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
  'Bangladesh', 'Belarus', 'Belgium', 'Bolivia', 'Brazil', 'Bulgaria',
  'Cambodia', 'Cameroon', 'Chile', 'China', 'Colombia', 'Croatia', 'Cuba', 'Czechia',
  'Denmark', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Ethiopia',
  'Finland', 'France', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Guatemala',
  'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
  'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyzstan',
  'Latvia', 'Lebanon', 'Libya', 'Lithuania', 'Madagascar', 'Malawi', 'Malaysia', 'Mali', 'Malta', 'Mexico', 'Moldova', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar',
  'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Nigeria', 'North Macedonia', 'Norway',
  'Oman', 'Pakistan', 'Palestine', 'Panama', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
  'Romania', 'Russia', 'Saudi Arabia', 'Senegal', 'Serbia', 'Singapore', 'Slovakia', 'Slovenia', 'Somalia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'Sudan', 'Sweden', 'Switzerland',
  'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tunisia', 'Turkey',
  'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'Uruguay', 'Uzbekistan',
  'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe',
]

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois',
  'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
  'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
]

const CA_PROVINCES = [
  'Alberta', 'British Columbia / Colombie-Britannique', 'Manitoba',
  'New Brunswick / Nouveau-Brunswick', 'Newfoundland & Labrador / Terre-Neuve et Labrador',
  'Nova Scotia / Nouvelle-Écosse', 'Ontario',
  'Prince Edward Island / Île-du-Prince-Édouard', 'Quebec / Québec', 'Saskatchewan', 'Yukon',
]

const FUNDING_TYPES = ['', 'Public', 'Private']
const FOUNDED_RANGES = [
  { label: 'Любой', labelEn: 'Any', min: 0, max: 9999 },
  { label: 'До 1800', labelEn: 'Before 1800', min: 0, max: 1800 },
  { label: '1800-1900', labelEn: '1800-1900', min: 1800, max: 1900 },
  { label: '1900-1950', labelEn: '1900-1950', min: 1900, max: 1950 },
  { label: '1950-2000', labelEn: '1950-2000', min: 1950, max: 2000 },
  { label: 'После 2000', labelEn: 'After 2000', min: 2000, max: 9999 },
]

const ALL_LANGUAGES = [
  'English', 'French', 'Spanish', 'German', 'Arabic', 'Russian', 'Chinese', 'Japanese',
  'Korean', 'Italian', 'Portuguese', 'Dutch', 'Turkish', 'Polish', 'Ukrainian', 'Czech',
  'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Slovak', 'Slovenian',
  'Macedonian', 'Albanian', 'Greek', 'Hebrew', 'Hindi', 'Bengali', 'Urdu', 'Persian',
  'Thai', 'Vietnamese', 'Malay', 'Indonesian', 'Filipino', 'Mongolian', 'Kazakh', 'Uzbek',
]

export default function UniversitiesClient() {
  const router = useRouter()
  const urlParams = useSearchParams()
  const { t, lang } = useLang()

  const [items, setItems] = useState<Univ[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [session, setSession] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  const [search, setSearch] = useState(urlParams.get('search') || '')
  const [country, setCountry] = useState(urlParams.get('country') || '')
  const [countryOpen, setCountryOpen] = useState(false)
  const [funding, setFunding] = useState(urlParams.get('funding') || '')
  const [language, setLanguage] = useState(urlParams.get('language') || '')
  const [foundedRange, setFoundedRange] = useState(urlParams.get('founded') || '0-9999')
  const [debouncedSearch, setDebouncedSearch] = useState(urlParams.get('search') || '')

  const [myIelts, setMyIelts] = useState(Number(urlParams.get('myIelts')) || 0)
  const [myToefl, setMyToefl] = useState(Number(urlParams.get('myToefl')) || 0)
  const [myGpa, setMyGpa] = useState(Number(urlParams.get('myGpa')) || 0)
  const [myBudget, setMyBudget] = useState(Number(urlParams.get('myBudget')) || 0)
  const [scoresOpen, setScoresOpen] = useState(!!(myIelts || myToefl || myGpa || myBudget))

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) loadFavorites(session.access_token)
    })
  }, [])

  const loadFavorites = async (token: string) => {
    const res = await fetch('/api/favorites', { headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    if (data.favorites) setFavorites(new Set(data.favorites))
  }

  const toggleFavorite = async (name: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!session) { router.push('/auth'); return }
    const token = session.access_token
    const next = new Set(favorites)
    if (next.has(name)) {
      next.delete(name)
      await fetch('/api/favorites', { method: 'DELETE', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ name }) })
    } else {
      next.add(name)
      await fetch('/api/favorites', { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ name }) })
    }
    setFavorites(next)
  }

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    const params = new URLSearchParams()
    if (debouncedSearch) params.set('search', debouncedSearch)
    if (country) params.set('country', country)
    if (funding) params.set('funding', funding)
    if (language) params.set('language', language)
    if (foundedRange !== '0-9999') params.set('founded', foundedRange)
    if (myIelts) params.set('myIelts', String(myIelts))
    if (myToefl) params.set('myToefl', String(myToefl))
    if (myGpa) params.set('myGpa', String(myGpa))
    if (myBudget) params.set('myBudget', String(myBudget))
    router.replace(`/universities${params.toString() ? '?' + params.toString() : ''}`, { scroll: false })
  }, [debouncedSearch, country, funding, language, foundedRange, myIelts, myToefl, myGpa, myBudget])

  const fetchData = useCallback(async (p: number) => {
    setLoading(true)
    const [minYear, maxYear] = foundedRange.split('-').map(Number)
    const params = new URLSearchParams()
    if (debouncedSearch) params.set('search', debouncedSearch)
    if (country) params.set('country', country)
    if (funding) params.set('funding', funding)
    if (language) params.set('language', language)
    if (minYear > 0) params.set('foundedMin', String(minYear))
    if (maxYear < 9999) params.set('foundedMax', String(maxYear))
    params.set('page', String(p))
    params.set('perPage', '100')

    const res = await fetch(`/api/universities?${params}`)
    const data = await res.json()
    setItems(data.items)
    setTotal(data.total)
    setTotalPages(data.totalPages)
    setPage(data.page)
    setLoading(false)
  }, [debouncedSearch, country, funding, language, foundedRange])

  useEffect(() => { fetchData(1) }, [fetchData])

  const goPage = (p: number) => {
    if (p >= 1 && p <= totalPages) { fetchData(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  }

  const resetFilters = () => {
    setSearch(''); setCountry(''); setFunding(''); setLanguage(''); setFoundedRange('0-9999')
    setMyIelts(0); setMyToefl(0); setMyGpa(0); setMyBudget(0); setSelected(new Set())
    setCountryOpen(false)
  }

  const toggleSelect = (name: string) => {
    const next = new Set(selected)
    next.has(name) ? next.delete(name) : next.size < 5 && next.add(name)
    setSelected(next)
  }

  const goCompare = () => {
    if (selected.size < 2) return
    router.push(`/compare?ids=${Array.from(selected).map(encodeURIComponent).join(',')}`)
  }

  const getMatchScore = (u: Univ) => {
    let score = 0; let total = 0
    if (myIelts > 0) { total++; if (u.l && u.l.includes('English')) score++ }
    if (myBudget > 0) { total++; if ((u as any).costPerYear === undefined) score += 0.5; else if ((u as any).costPerYear <= myBudget) score++ }
    if (total === 0) return -1
    return score / total
  }

  const selectCountry = (c: string) => { setCountry(c); setCountryOpen(false) }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{t.universities.title}</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">{t.universities.subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => { navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
            className="px-3 py-2 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 whitespace-nowrap">
            {copied ? (lang === 'ru' ? '✅ Скопировано' : '✅ Copied') : '🔗 ' + (lang === 'ru' ? 'Поделиться' : 'Share')}
          </button>
          {selected.size > 0 && (
            <button onClick={goCompare} disabled={selected.size < 2}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${selected.size >= 2 ? 'bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-200' : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'}`}>
              {t.universities.compare} ({selected.size})
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base sm:text-lg">🔍</span>
          <input type="text" placeholder={t.universities.search} value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-600 text-sm" />
        </div>
        <button onClick={resetFilters} className="px-4 sm:px-5 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 whitespace-nowrap">{t.universities.reset}</button>
      </div>

      <div className="bg-brand-50 dark:bg-brand-900/20 rounded-xl p-3 sm:p-4 mb-4">
        <button onClick={() => setScoresOpen(!scoresOpen)}
          className="text-sm font-semibold text-brand-700 dark:text-brand-300 cursor-pointer flex items-center gap-2 w-full text-left">
          <span>{lang === 'ru' ? '📊 Мои баллы' : '📊 My Scores'}</span>
          <span className="text-xs text-brand-500 font-normal">({scoresOpen ? (lang === 'ru' ? 'свернуть' : 'collapse') : (lang === 'ru' ? 'развернуть' : 'expand')})</span>
          {(myIelts > 0 || myToefl > 0 || myGpa > 0 || myBudget > 0) && (
            <span className="ml-auto text-xs bg-brand-200 dark:bg-brand-800 text-brand-700 dark:text-brand-300 px-2 py-0.5 rounded-full">
              {[myIelts && `IELTS ${myIelts}`, myToefl && `TOEFL ${myToefl}`, myGpa && `GPA ${myGpa}`, myBudget && `€${myBudget.toLocaleString()}`].filter(Boolean).join(' • ')}
            </span>
          )}
        </button>
        {scoresOpen && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">IELTS</label>
              <select value={myIelts} onChange={(e) => setMyIelts(Number(e.target.value))} className="w-full px-2 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-xs">
                <option value="0">{lang === 'ru' ? 'Не сдавал' : 'Not taken'}</option>
                {[5.0,5.5,6.0,6.5,7.0,7.5,8.0,8.5,9.0].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">TOEFL</label>
              <select value={myToefl} onChange={(e) => setMyToefl(Number(e.target.value))} className="w-full px-2 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-xs">
                <option value="0">{lang === 'ru' ? 'Не сдавал' : 'Not taken'}</option>
                {[60,70,80,90,100,110,120].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">GPA (4.0)</label>
              <select value={myGpa} onChange={(e) => setMyGpa(Number(e.target.value))} className="w-full px-2 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-xs">
                <option value="0">{lang === 'ru' ? 'Не знаю' : 'Unknown'}</option>
                {[2.0,2.5,3.0,3.3,3.5,3.7,4.0].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">{lang === 'ru' ? 'Бюджет (EUR/год)' : 'Budget (EUR/yr)'}</label>
              <select value={myBudget} onChange={(e) => setMyBudget(Number(e.target.value))} className="w-full px-2 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-xs">
                <option value="0">{lang === 'ru' ? 'Не важно' : 'Any'}</option>
                <option value="5000">{lang === 'ru' ? 'До 5 000' : 'Up to 5,000'}</option>
                <option value="10000">{lang === 'ru' ? 'До 10 000' : 'Up to 10,000'}</option>
                <option value="20000">{lang === 'ru' ? 'До 20 000' : 'Up to 20,000'}</option>
                <option value="50000">{lang === 'ru' ? 'До 50 000' : 'Up to 50,000'}</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="relative">
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">{t.universities.country}</label>
          <button onClick={() => setCountryOpen(!countryOpen)}
            className="w-full px-2 sm:px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-xs sm:text-sm text-left flex items-center justify-between">
            <span className={country ? 'text-gray-900 dark:text-white truncate' : 'text-gray-400'}>{country || t.universities.allCountries}</span>
            <span className="text-gray-400 text-xs ml-1">{countryOpen ? '▲' : '▼'}</span>
          </button>
          {countryOpen && (
            <div className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg max-h-80 overflow-y-auto">
              <button onClick={() => selectCountry('')} className="w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white rounded-t-xl font-medium">{t.universities.allCountries}</button>
              <details className="group">
                <summary className="px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">🇺🇸 United States</summary>
                {US_STATES.map(s => <button key={s} onClick={() => selectCountry(s)} className="w-full text-left px-6 py-1.5 text-xs hover:bg-brand-50 dark:hover:bg-brand-900 hover:text-brand-700 dark:hover:text-brand-300 dark:text-gray-300">{s}</button>)}
              </details>
              <details className="group">
                <summary className="px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">🇨🇦 Canada</summary>
                {CA_PROVINCES.map(p => <button key={p} onClick={() => selectCountry(p)} className="w-full text-left px-6 py-1.5 text-xs hover:bg-brand-50 dark:hover:bg-brand-900 hover:text-brand-700 dark:hover:text-brand-300 dark:text-gray-300">{p}</button>)}
              </details>
              <details className="group">
                <summary className="px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">🇦🇪 UAE</summary>
                <button onClick={() => selectCountry('United Arab Emirates')} className="w-full text-left px-6 py-1.5 text-xs hover:bg-brand-50 dark:hover:bg-brand-900 hover:text-brand-700 dark:hover:text-brand-300 dark:text-gray-300">{lang === 'ru' ? 'Все эмираты' : 'All Emirates'}</button>
              </details>
              <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
              {COUNTRIES.map(c => <button key={c} onClick={() => selectCountry(c)} className="w-full text-left px-3 py-1.5 text-xs hover:bg-brand-50 dark:hover:bg-brand-900 hover:text-brand-700 dark:hover:text-brand-300 dark:text-gray-300">{c}</button>)}
            </div>
          )}
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">{t.universities.type}</label>
          <select value={funding} onChange={(e) => setFunding(e.target.value)} className="w-full px-2 sm:px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-xs sm:text-sm">
            <option value="">{t.universities.allTypes}</option>
            {FUNDING_TYPES.filter(f => f).map(f => <option key={f} value={f}>{f === 'Private' ? t.universities.private : t.universities.public}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">{t.universities.language}</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full px-2 sm:px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-xs sm:text-sm">
            <option value="">{t.universities.allLanguages}</option>
            {ALL_LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">{t.universities.founded}</label>
          <select value={foundedRange} onChange={(e) => setFoundedRange(e.target.value)} className="w-full px-2 sm:px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-xs sm:text-sm">
            {FOUNDED_RANGES.map(r => <option key={r.label} value={`${r.min}-${r.max}`}>{lang === 'ru' ? r.label : r.labelEn}</option>)}
          </select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-200 dark:border-gray-700 gap-1">
        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400"><strong>{total.toLocaleString()}</strong> {t.universities.found}</span>
        {totalPages > 1 && <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{t.universities.page} {page} {t.universities.of} {totalPages}</span>}
      </div>

      {loading ? (
        <div className="text-center py-12"><div className="animate-spin text-3xl sm:text-4xl mb-4">🔍</div><p className="text-gray-500 dark:text-gray-400 text-sm">{t.universities.loading}</p></div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 text-gray-500 dark:text-gray-400"><p className="text-3xl sm:text-4xl mb-3">😕</p><p className="text-sm">{t.universities.noResults}</p></div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {items.map((u: Univ) => {
              const isSelected = selected.has(u.n)
              const isFav = favorites.has(u.n)
              const matchScore = getMatchScore(u)
              return (
                <div key={u.i || u.n}
                  className={`bg-white dark:bg-gray-800 rounded-xl border-2 p-3 sm:p-4 transition-all cursor-pointer ${isSelected ? 'border-brand-500 shadow-md bg-brand-50 dark:bg-brand-900/20' : 'border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600'}`}
                  onClick={() => toggleSelect(u.n)}>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <input type="checkbox" checked={isSelected} onChange={() => toggleSelect(u.n)} className="mt-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-gray-300 dark:border-gray-600 text-brand-600 focus:ring-brand-500" onClick={(e) => e.stopPropagation()} />
                    <button onClick={(e) => toggleFavorite(u.n, e)} className="shrink-0 text-lg leading-none mt-0.5">{isFav ? '⭐' : '☆'}</button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <Link href={`/uni/${encodeURIComponent(u.n)}`} className="font-semibold text-gray-900 dark:text-white hover:text-brand-600 block text-sm sm:text-base truncate" onClick={(e) => e.stopPropagation()}>{u.n}</Link>
                        {matchScore >= 0 && (
                          <span className={`shrink-0 px-1.5 py-0.5 rounded-full text-xs font-bold ${matchScore >= 0.8 ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' : matchScore >= 0.5 ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300' : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'}`}>{Math.round(matchScore * 100)}%</span>
                        )}
                      </div>
                      {u.a && <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">{u.a}</p>}
                      <div className="flex flex-wrap gap-1 sm:gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1.5 sm:mb-2">
                        <span className="bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 px-1.5 sm:px-2 py-0.5 rounded-full text-xs">{u.c}</span>
                        {u.t && <span className="bg-gray-100 dark:bg-gray-700 px-1.5 sm:px-2 py-0.5 rounded-full text-xs">📍 {u.t}</span>}
                        {u.d && <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-xs ${u.d === 'Private' ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'}`}>{u.d === 'Private' ? t.universities.private : t.universities.public}</span>}
                        {u.f && <span className="bg-gray-100 dark:bg-gray-700 px-1.5 sm:px-2 py-0.5 rounded-full text-xs">{t.universities.foundedLabel} {u.f}</span>}
                        {(u as any).students && <span className="bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 px-1.5 sm:px-2 py-0.5 rounded-full text-xs">{t.universities.students} {(u as any).students}</span>}
                      </div>
                      {(u as any).desc && <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5 sm:mb-2 line-clamp-2">{(u as any).desc}</p>}
                      {matchScore >= 0 && (
                        <div className="mb-2 space-y-0.5">
                          {myIelts > 0 && <div className="flex items-center gap-1 text-xs"><span>{u.l?.includes('English') ? '✅' : '❌'}</span><span className="text-gray-500 dark:text-gray-400">{u.l?.includes('English') ? (lang === 'ru' ? 'Английский язык поддерживается' : 'English supported') : (lang === 'ru' ? 'Английский не подтверждён' : 'English not confirmed')}</span></div>}
                          {myBudget > 0 && <div className="flex items-center gap-1 text-xs"><span>{(u as any).costPerYear === undefined || (u as any).costPerYear <= myBudget ? '✅' : '❌'}</span><span className="text-gray-500 dark:text-gray-400">{(u as any).costPerYear ? `€${(u as any).costPerYear?.toLocaleString()}/год ${(u as any).costPerYear <= myBudget ? '✅' : '❌'}` : (lang === 'ru' ? 'Стоимость не указана' : 'Cost not specified')}</span></div>}
                          {myGpa > 0 && <div className="flex items-center gap-1 text-xs"><span>⚠️</span><span className="text-gray-500 dark:text-gray-400">{lang === 'ru' ? 'GPA-требования неизвестны' : 'GPA requirements unknown'}</span></div>}
                        </div>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        {u.w && <a href={u.w} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-600 hover:underline" onClick={(e) => e.stopPropagation()}>{t.universities.site}</a>}
                        {(u as any).wiki && <a href={(u as any).wiki} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600" onClick={(e) => e.stopPropagation()}>{t.universities.wiki}</a>}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 sm:gap-4 mt-6 sm:mt-8">
              <button onClick={() => goPage(page - 1)} disabled={page <= 1} className="px-3 sm:px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-xs sm:text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-300">{t.universities.prev}</button>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const start = Math.max(1, Math.min(page - 2, totalPages - 4)); const p = start + i
                  if (p > totalPages) return null
                  return <button key={p} onClick={() => goPage(p)} className={`w-7 h-7 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm font-medium border transition-all ${p === page ? 'bg-brand-600 text-white border-brand-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-brand-400'}`}>{p}</button>
                })}
              </div>
              <button onClick={() => goPage(page + 1)} disabled={page >= totalPages} className="px-3 sm:px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-xs sm:text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-300">{t.universities.next}</button>
            </div>
          )}
        </>
      )}
      <div className="mt-6 sm:mt-8 text-center">
        <Link href="/" className="text-brand-600 hover:underline text-sm">{t.universities.back}</Link>
      </div>
    </div>
  )
}