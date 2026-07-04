'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useLang } from '@/i18n/LangContext'
import type { Univ } from '@/data/universities-whed'

const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
  'Bangladesh', 'Belarus', 'Belgium', 'Bolivia', 'Brazil', 'Bulgaria',
  'Cambodia', 'Cameroon', 'Canada', 'Chile', 'China', 'Colombia', 'Croatia', 'Cuba', 'Czechia',
  'Denmark', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Ethiopia',
  'Finland', 'France', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Guatemala',
  'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
  'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyzstan',
  'Latvia', 'Lebanon', 'Libya', 'Lithuania', 'Madagascar', 'Malawi', 'Malaysia', 'Mali', 'Malta', 'Mexico', 'Moldova', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar',
  'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Nigeria', 'North Macedonia', 'Norway',
  'Oman', 'Pakistan', 'Palestine', 'Panama', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
  'Romania', 'Russia', 'Saudi Arabia', 'Senegal', 'Serbia', 'Singapore', 'Slovakia', 'Slovenia', 'Somalia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'Sudan', 'Sweden', 'Switzerland',
  'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tunisia', 'Turkey',
  'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'Uruguay', 'USA', 'Uzbekistan',
  'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe',
]

const FUNDING_TYPES = ['', 'Public', 'Private']
const FOUNDED_RANGES = [
  { label: 'Любой', min: 0, max: 9999 },
  { label: 'До 1800', min: 0, max: 1800 },
  { label: '1800-1900', min: 1800, max: 1900 },
  { label: '1900-1950', min: 1900, max: 1950 },
  { label: '1950-2000', min: 1950, max: 2000 },
  { label: 'После 2000', min: 2000, max: 9999 },
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
  const { t } = useLang()

  const [items, setItems] = useState<Univ[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const [search, setSearch] = useState(urlParams.get('search') || '')
  const [country, setCountry] = useState(urlParams.get('country') || '')
  const [funding, setFunding] = useState(urlParams.get('funding') || '')
  const [language, setLanguage] = useState(urlParams.get('language') || '')
  const [foundedRange, setFoundedRange] = useState(urlParams.get('founded') || '0-9999')
  const [debouncedSearch, setDebouncedSearch] = useState(urlParams.get('search') || '')

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
    router.replace(`/universities${params.toString() ? '?' + params.toString() : ''}`, { scroll: false })
  }, [debouncedSearch, country, funding, language, foundedRange])

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
    setSearch(''); setCountry(''); setFunding(''); setLanguage(''); setFoundedRange('0-9999'); setSelected(new Set())
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t.universities.title}</h1>
          <p className="text-gray-600 text-sm">{t.universities.subtitle}</p>
        </div>
        {selected.size > 0 && (
          <button onClick={goCompare} disabled={selected.size < 2}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selected.size >= 2 ? 'bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-200' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
            {t.universities.compare} ({selected.size})
          </button>
        )}
      </div>

      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
          <input type="text" placeholder={t.universities.search} value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-600 text-sm" />
        </div>
        <button onClick={resetFilters} className="px-5 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">{t.universities.reset}</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">{t.universities.country}</label>
          <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
            <option value="">{t.universities.allCountries}</option>
            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">{t.universities.type}</label>
          <select value={funding} onChange={(e) => setFunding(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
            <option value="">{t.universities.allTypes}</option>
            {FUNDING_TYPES.filter(f => f).map(f => <option key={f} value={f}>{f === 'Private' ? t.universities.private : t.universities.public}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">{t.universities.language}</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
            <option value="">{t.universities.allLanguages}</option>
            {ALL_LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">{t.universities.founded}</label>
          <select value={foundedRange} onChange={(e) => setFoundedRange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
            {FOUNDED_RANGES.map(r => <option key={r.label} value={`${r.min}-${r.max}`}>{r.label}</option>)}
          </select>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
        <span className="text-sm text-gray-600"><strong>{total.toLocaleString()}</strong> {t.universities.found}</span>
        {totalPages > 1 && <span className="text-sm text-gray-500">{t.universities.page} {page} {t.universities.of} {totalPages}</span>}
      </div>

      {loading ? (
        <div className="text-center py-12"><div className="animate-spin text-4xl mb-4">🔍</div><p className="text-gray-500">{t.universities.loading}</p></div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 text-gray-500"><p className="text-4xl mb-3">😕</p><p>{t.universities.noResults}</p></div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((u: Univ) => {
              const isSelected = selected.has(u.n)
              return (
                <div key={u.i || u.n}
                  className={`bg-white rounded-xl border-2 p-4 transition-all cursor-pointer ${isSelected ? 'border-brand-500 shadow-md bg-brand-50' : 'border-gray-200 hover:shadow-md hover:border-gray-300'}`}
                  onClick={() => toggleSelect(u.n)}>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" checked={isSelected} onChange={() => toggleSelect(u.n)} className="mt-1 w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" onClick={(e) => e.stopPropagation()} />
                    <div className="flex-1 min-w-0">
                      <Link href={`/uni/${encodeURIComponent(u.n)}`} className="font-semibold text-gray-900 mb-1 hover:text-brand-600 block" onClick={(e) => e.stopPropagation()}>{u.n}</Link>
                      {u.a && <p className="text-sm text-gray-500 mb-1">{u.a}</p>}
                      <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                        <span className="bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full">{u.c}</span>
                        {u.t && <span className="bg-gray-100 px-2 py-0.5 rounded-full">📍 {u.t}</span>}
                        {u.d && <span className={`px-2 py-0.5 rounded-full ${u.d === 'Private' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>{u.d === 'Private' ? t.universities.private : t.universities.public}</span>}
                        {u.f && <span className="bg-gray-100 px-2 py-0.5 rounded-full">{t.universities.foundedLabel} {u.f}</span>}
                        {(u as any).students && <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full">{t.universities.students} {(u as any).students}</span>}
                      </div>
                      {(u as any).desc && <p className="text-xs text-gray-500 mb-2 line-clamp-2">{(u as any).desc}</p>}
                      <div className="flex items-center gap-2 mt-1">
                        {u.w && <a href={u.w} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-600 hover:underline" onClick={(e) => e.stopPropagation()}>{t.universities.site}</a>}
                        {(u as any).wiki && <a href={(u as any).wiki} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-gray-600" onClick={(e) => e.stopPropagation()}>{t.universities.wiki}</a>}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button onClick={() => goPage(page - 1)} disabled={page <= 1} className="px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50">{t.universities.prev}</button>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
                  const start = Math.max(1, Math.min(page - 4, totalPages - 9))
                  const p = start + i
                  if (p > totalPages) return null
                  return <button key={p} onClick={() => goPage(p)} className={`w-10 h-10 rounded-lg text-sm font-medium border transition-all ${p === page ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-gray-700 border-gray-300 hover:border-brand-400'}`}>{p}</button>
                })}
              </div>
              <button onClick={() => goPage(page + 1)} disabled={page >= totalPages} className="px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50">{t.universities.next}</button>
            </div>
          )}
        </>
      )}
      <div className="mt-8 text-center">
        <Link href="/" className="text-brand-600 hover:underline">{t.universities.back}</Link>
      </div>
    </div>
  )
}