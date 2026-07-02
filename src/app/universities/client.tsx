'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import type { Univ } from '@/data/universities-whed'

const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
  'Bangladesh', 'Belarus', 'Belgium', 'Bolivia', 'Brazil', 'Bulgaria',
  'Cambodia', 'Cameroon', 'Canada', 'Chile', 'China', 'Colombia', 'Croatia', 'Cuba', 'Czechia',
  'Denmark', 'Dominican Republic',
  'Ecuador', 'Egypt', 'El Salvador', 'Ethiopia',
  'Finland', 'France',
  'Georgia', 'Germany', 'Ghana', 'Greece', 'Guatemala',
  'Haiti', 'Honduras', 'Hungary',
  'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
  'Jamaica', 'Japan', 'Jordan',
  'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyzstan',
  'Latvia', 'Lebanon', 'Libya', 'Lithuania',
  'Madagascar', 'Malawi', 'Malaysia', 'Mali', 'Malta', 'Mexico', 'Moldova', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar',
  'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Nigeria', 'North Macedonia', 'Norway',
  'Oman',
  'Pakistan', 'Palestine', 'Panama', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
  'Romania', 'Russia',
  'Saudi Arabia', 'Senegal', 'Serbia', 'Singapore', 'Slovakia', 'Slovenia', 'Somalia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'Sudan', 'Sweden', 'Switzerland',
  'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tunisia', 'Turkey',
  'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'Uruguay', 'USA', 'Uzbekistan',
  'Venezuela', 'Vietnam',
  'Yemen',
  'Zambia', 'Zimbabwe',
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
  'Turkmen', 'Kyrgyz', 'Tajik', 'Armenian', 'Georgian', 'Azerbaijani', 'Estonian',
  'Latvian', 'Lithuanian', 'Belarusian', 'Moldovan', 'Bosnian', 'Montenegrin',
]

export default function UniversitiesClient() {
  const [items, setItems] = useState<Univ[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [country, setCountry] = useState('')
  const [funding, setFunding] = useState('')
  const [language, setLanguage] = useState('')
  const [foundedRange, setFoundedRange] = useState('0-9999')

  const fetchData = useCallback(async (p: number) => {
    setLoading(true)
    const [minYear, maxYear] = foundedRange.split('-').map(Number)
    const params = new URLSearchParams()
    if (search) params.set('search', search)
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
  }, [search, country, funding, language, foundedRange])

  useEffect(() => {
    fetchData(1)
  }, [fetchData])

  const goPage = (p: number) => {
    if (p >= 1 && p <= totalPages) {
      fetchData(p)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const resetFilters = () => {
    setSearch('')
    setCountry('')
    setFunding('')
    setLanguage('')
    setFoundedRange('0-9999')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">🏛️ Университеты мира</h1>
      <p className="text-gray-600 mb-4">23 898 вузов из 252 стран</p>

      {/* Поиск + Сброс */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
          <input
            type="text"
            placeholder="Поиск университета или города..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-600 text-sm"
          />
        </div>
        <button
          onClick={resetFilters}
          className="px-5 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          Сбросить всё
        </button>
      </div>

      {/* Фильтры */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Страна</label>
          <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
            <option value="">Все страны</option>
            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Тип</label>
          <select value={funding} onChange={(e) => setFunding(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
            {FUNDING_TYPES.map(f => <option key={f} value={f}>{f === '' ? 'Все типы' : f === 'Private' ? 'Частный' : 'Государственный'}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Язык</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
            <option value="">Все языки</option>
            {ALL_LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Год основания</label>
          <select value={foundedRange} onChange={(e) => setFoundedRange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
            {FOUNDED_RANGES.map(r => <option key={r.label} value={`${r.min}-${r.max}`}>{r.label}</option>)}
          </select>
        </div>
      </div>

      {/* Результаты */}
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
        <span className="text-sm text-gray-600"><strong>{total.toLocaleString()}</strong> вузов найдено</span>
        {totalPages > 1 && <span className="text-sm text-gray-500">Стр. {page} из {totalPages}</span>}
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin text-4xl mb-4">🔍</div>
          <p className="text-gray-500">Загрузка...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-4xl mb-3">😕</p>
          <p>Нет вузов, подходящих под фильтры.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((u: Univ) => (
              <div key={u.i || u.n} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-900 mb-1">{u.n}</h3>
                {u.a && <p className="text-sm text-gray-500 mb-1">{u.a}</p>}
                <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                  <span className="bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full">{u.c}</span>
                  {u.t && <span className="bg-gray-100 px-2 py-0.5 rounded-full">📍 {u.t}</span>}
                  {u.d && (
                    <span className={`px-2 py-0.5 rounded-full ${u.d === 'Private' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                      {u.d === 'Private' ? 'Частный' : 'Гос.'}
                    </span>
                  )}
                  {u.f && <span className="bg-gray-100 px-2 py-0.5 rounded-full">Осн. {u.f}</span>}
                </div>
                {u.l && u.l.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {u.l.slice(0, 4).map((lang: string) => (
                      <span key={lang} className="text-xs bg-gray-50 text-gray-600 px-1.5 py-0.5 rounded">{lang}</span>
                    ))}
                  </div>
                )}
                {u.u && u.u.length > 0 && (
                  <p className="text-xs text-gray-500 mb-2">
                    {u.u.slice(0, 3).map((f: any) => f.name).join(' • ')}
                    {u.u.length > 3 && ` + ещё ${u.u.length - 3}`}
                  </p>
                )}
                {u.w && (
                  <a href={u.w} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-600 hover:underline">
                    🌐 {u.w.replace('https://', '').replace('www.', '').split('/')[0]}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Пагинация */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button onClick={() => goPage(page - 1)} disabled={page <= 1} className="px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50">
                ← Назад
              </button>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
                  const start = Math.max(1, Math.min(page - 4, totalPages - 9))
                  const p = start + i
                  if (p > totalPages) return null
                  return (
                    <button key={p} onClick={() => goPage(p)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium border transition-all
                        ${p === page ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-gray-700 border-gray-300 hover:border-brand-400'}`}
                    >{p}</button>
                  )
                })}
              </div>
              <button onClick={() => goPage(page + 1)} disabled={page >= totalPages} className="px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50">
                Вперёд →
              </button>
            </div>
          )}
        </>
      )}

      <div className="mt-8 text-center">
        <Link href="/" className="text-brand-600 hover:underline">← На главную</Link>
      </div>
    </div>
  )
}