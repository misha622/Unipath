'use client'

import { useState, useMemo } from 'react'
import { universities } from '@/data/universities-whed'
import type { Univ } from '@/data/universities-whed'
import Link from 'next/link'

const COUNTRIES = Array.from(new Set(universities.map(u => u.c))).sort()

export default function UniversitiesPage() {
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState('All')

  const filtered = useMemo(() => {
    return universities.filter(u => {
      if (country !== 'All' && u.c !== country) return false
      if (search) {
        const q = search.toLowerCase()
        return u.n.toLowerCase().includes(q) || u.a.toLowerCase().includes(q) || u.c.toLowerCase().includes(q) || u.t.toLowerCase().includes(q)
      }
      return true
    })
  }, [search, country])

  const countryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    universities.forEach(u => { counts[u.c] = (counts[u.c] || 0) + 1 })
    return counts
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">🏛️ Университеты мира</h1>
      <p className="text-gray-600 mb-6">
        {universities.length.toLocaleString()} вузов из {COUNTRIES.length} стран
      </p>

      {/* Поиск */}
      <input
        type="text"
        placeholder="🔍 Поиск по названию, городу или стране..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Фильтр по стране */}
      <div className="flex flex-wrap gap-2 mb-6 max-h-48 overflow-y-auto">
        <button
          onClick={() => setCountry('All')}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all
            ${country === 'All' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'}`}
        >
          Все страны ({universities.length.toLocaleString()})
        </button>
        {COUNTRIES.map(c => (
          <button
            key={c}
            onClick={() => setCountry(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all
              ${country === c ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'}`}
          >
            {c} ({countryCounts[c]})
          </button>
        ))}
      </div>

      {/* Результаты */}
      <p className="text-gray-600 mb-4">Показано: <strong>{filtered.length.toLocaleString()}</strong> вузов</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.slice(0, 300).map((u: Univ, i: number) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-1">{u.n}</h3>
            {u.a && <p className="text-sm text-gray-500 mb-1">{u.a}</p>}
            <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
              <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{u.c}</span>
              {u.t && <span className="bg-gray-100 px-2 py-0.5 rounded-full">{u.t}</span>}
              {u.r && <span className="bg-gray-100 px-2 py-0.5 rounded-full">{u.r}</span>}
              {u.d && (
                <span className={`px-2 py-0.5 rounded-full ${u.d === 'Private' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                  {u.d === 'Private' ? 'Частный' : 'Государственный'}
                </span>
              )}
              {u.f && <span className="bg-gray-100 px-2 py-0.5 rounded-full">Осн. {u.f}</span>}
            </div>
            {u.l && u.l.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {u.l.map((lang: string) => (
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
              <a href={u.w} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                🌐 {u.w.replace('https://', '').replace('www.', '').split('/')[0]}
              </a>
            )}
          </div>
        ))}
      </div>

      {filtered.length > 300 && (
        <p className="text-center text-gray-500 mt-6">
          Показаны первые 300 из {filtered.length.toLocaleString()} вузов. Уточните поиск.
        </p>
      )}

      <div className="mt-8 text-center">
        <Link href="/explore" className="text-blue-600 hover:underline">← К поиску программ</Link>
      </div>
    </div>
  )
}