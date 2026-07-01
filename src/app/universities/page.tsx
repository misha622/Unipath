'use client'

import { useState, useMemo } from 'react'
import { universities } from '@/data/universities-whed'
import type { Univ } from '@/data/universities-whed'
import Link from 'next/link'

const COUNTRIES = Array.from(new Set(universities.map(u => u.c))).sort()
const FUNDING_TYPES = ['All', 'Private', 'Public']
const FOUNDED_RANGES = [
  { label: 'Любой', min: 0, max: 9999 },
  { label: 'До 1800', min: 0, max: 1800 },
  { label: '1800-1900', min: 1800, max: 1900 },
  { label: '1900-1950', min: 1900, max: 1950 },
  { label: '1950-2000', min: 1950, max: 2000 },
  { label: 'После 2000', min: 2000, max: 9999 },
]
const PER_PAGE = 100

export default function UniversitiesPage() {
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState('All')
  const [funding, setFunding] = useState('All')
  const [language, setLanguage] = useState('All')
  const [foundedRange, setFoundedRange] = useState('0-9999')
  const [page, setPage] = useState(1)

  const allLanguages = useMemo(() => {
    const langs = new Set<string>()
    universities.forEach(u => u.l?.forEach((l: string) => langs.add(l)))
    return Array.from(langs).sort()
  }, [])

  const filtered = useMemo(() => {
    const [minYear, maxYear] = foundedRange.split('-').map(Number)

    return universities.filter(u => {
      if (country !== 'All' && u.c !== country) return false
      if (funding !== 'All' && u.d !== funding) return false
      if (language !== 'All' && !u.l?.includes(language)) return false
      if (u.f && (u.f < minYear || u.f > maxYear)) return false
      if (search) {
        const q = search.toLowerCase()
        return u.n.toLowerCase().includes(q) || u.a.toLowerCase().includes(q) || u.c.toLowerCase().includes(q) || u.t.toLowerCase().includes(q)
      }
      return true
    })
  }, [search, country, funding, language, foundedRange])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const safePage = Math.min(page, Math.max(totalPages, 1))
  const paged = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE)

  const countryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    universities.forEach(u => { counts[u.c] = (counts[u.c] || 0) + 1 })
    return counts
  }, [])

  // Сброс страницы при изменении фильтров
  const updateFilter = (setter: (v: string) => void, value: string) => {
    setter(value)
    setPage(1)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">🏛️ Университеты мира</h1>
      <p className="text-gray-600 mb-4">{universities.length.toLocaleString()} вузов из {COUNTRIES.length} стран</p>

      {/* Поиск + Сброс */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
          <input
            type="text"
            placeholder="Поиск университета или программы..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        <button
          onClick={() => { setSearch(''); updateFilter(setCountry, 'All'); updateFilter(setFunding, 'All'); updateFilter(setLanguage, 'All'); updateFilter(setFoundedRange, '0-9999') }}
          className="px-5 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          Сбросить всё
        </button>
      </div>

      {/* Фильтры */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Страна</label>
          <select value={country} onChange={(e) => updateFilter(setCountry, e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
            <option value="All">Все страны</option>
            {COUNTRIES.map(c => (
              <option key={c} value={c}>{c} ({countryCounts[c]})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Тип</label>
          <select value={funding} onChange={(e) => updateFilter(setFunding, e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
            {FUNDING_TYPES.map(f => (
              <option key={f} value={f}>{f === 'All' ? 'Все типы' : f === 'Private' ? 'Частный' : 'Государственный'}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Язык</label>
          <select value={language} onChange={(e) => updateFilter(setLanguage, e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
            <option value="All">Все языки</option>
            {allLanguages.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Год основания</label>
          <select value={foundedRange} onChange={(e) => updateFilter(setFoundedRange, e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
            {FOUNDED_RANGES.map(r => (
              <option key={r.label} value={`${r.min}-${r.max}`}>{r.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Результаты */}
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
        <span className="text-sm text-gray-600"><strong>{filtered.length.toLocaleString()}</strong> вузов найдено</span>
        {totalPages > 1 && (
          <span className="text-sm text-gray-500">Стр. {safePage} из {totalPages}</span>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-4xl mb-3">😕</p>
          <p>Нет вузов, подходящих под фильтры.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paged.map((u: Univ, i: number) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-900 mb-1">{u.n}</h3>
                {u.a && <p className="text-sm text-gray-500 mb-1">{u.a}</p>}
                <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                  <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{u.c}</span>
                  {u.t && <span className="bg-gray-100 px-2 py-0.5 rounded-full">📍 {u.t}</span>}
                  {u.r && <span className="bg-gray-100 px-2 py-0.5 rounded-full">{u.r}</span>}
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
                    {u.l.length > 4 && <span className="text-xs text-gray-400">+{u.l.length - 4}</span>}
                  </div>
                )}
                {u.u && u.u.length > 0 && (
                  <p className="text-xs text-gray-500 mb-2">
                    {u.u.slice(0, 3).map((f: any) => f.name).join(' • ')}
                    {u.u.length > 3 && ` + ещё ${u.u.length - 3}`}
                  </p>
                )}
                {u.w && (
                  <a href={u.w} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                    🌐 {u.w.replace('https://', '').replace('www.', '').split('/')[0]}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Пагинация */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                ← Назад
              </button>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium border transition-all
                      ${p === safePage ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Вперёд →
              </button>
            </div>
          )}
        </>
      )}

      <div className="mt-8 text-center">
        <Link href="/explore" className="text-blue-600 hover:underline">← К поиску программ</Link>
      </div>
    </div>
  )
}