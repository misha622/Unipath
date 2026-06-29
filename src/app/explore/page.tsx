'use client'

import { useState, useMemo } from 'react'
import { programs } from '@/data/programs'

const COUNTRIES = Array.from(new Set(programs.map(p => p.country))).sort()
const DEGREES = ['All', 'Bachelor', 'Master', 'PhD']
const BUDGETS = [
  { label: 'Любой', value: Infinity },
  { label: 'Бесплатно', value: 0 },
  { label: 'До $5,000', value: 5000 },
  { label: 'До $10,000', value: 10000 },
  { label: 'До $20,000', value: 20000 },
  { label: 'До $50,000', value: 50000 },
]

export default function ExplorePage() {
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState('All')
  const [degree, setDegree] = useState('All')
  const [maxBudget, setMaxBudget] = useState(Infinity)
  const [scholarshipOnly, setScholarshipOnly] = useState(false)

  const filtered = useMemo(() => {
    return programs.filter(p => {
      if (search && !p.university.toLowerCase().includes(search.toLowerCase())
          && !p.program.toLowerCase().includes(search.toLowerCase())) {
        return false
      }
      if (country !== 'All' && p.country !== country) return false
      if (degree !== 'All' && p.degree !== degree) return false
      if (scholarshipOnly) {
        if (!p.scholarship) return false
      } else {
        if (p.costPerYear > maxBudget) return false
      }
      return true
    })
  }, [search, country, degree, maxBudget, scholarshipOnly])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Заголовок */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Все программы</h1>

      {/* Поисковая строка */}
      <input
        type="text"
        placeholder="🔍 Поиск по вузу или программе..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      {/* Фильтры */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-300 bg-white"
        >
          <option value="All">🌍 Все страны</option>
          {COUNTRIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-300 bg-white"
        >
          {DEGREES.map(d => (
            <option key={d} value={d}>
              {d === 'All' ? '🎓 Все уровни' : `🎓 ${d}`}
            </option>
          ))}
        </select>

        <select
          value={maxBudget}
          onChange={(e) => { setMaxBudget(Number(e.target.value)); setScholarshipOnly(false) }}
          className="px-4 py-2 rounded-xl border border-gray-300 bg-white"
        >
          {BUDGETS.map(b => (
            <option key={b.value} value={b.value}>{b.label}</option>
          ))}
        </select>

        <button
          onClick={() => { setScholarshipOnly(!scholarshipOnly); setMaxBudget(Infinity) }}
          className={`px-4 py-2 rounded-xl border-2 font-medium transition-all
            ${scholarshipOnly ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-300 bg-white hover:border-gray-400'}`}
        >
          🎓 Стипендия
        </button>
      </div>

      {/* Результаты */}
      <p className="text-gray-600 mb-4">Найдено: {filtered.length} программ</p>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-5xl mb-4">😕</p>
          <p className="text-gray-600 text-lg">Ничего не найдено. Измените фильтры.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map(p => {
            const daysLeft = Math.ceil(
              (new Date(p.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
            )

            return (
              <div
                key={p.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{p.program}</h3>
                    <p className="text-gray-600">{p.university} • {p.city}, {p.country}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                    daysLeft <= 7 ? 'bg-red-100 text-red-700' :
                    daysLeft <= 30 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {daysLeft <= 0 ? 'Прошёл' : `${daysLeft} дн.`}
                  </span>
                </div>

                <p className="text-gray-500 text-sm mb-3">{p.description}</p>

                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    💰 {p.costPerYear === 0 ? 'Бесплатно' : `${p.costPerYear.toLocaleString()} ${p.currency}/год`}
                  </span>
                  <span className="bg-gray-100 px-2 py-1 rounded">📚 IELTS {p.ielts}</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">📊 GPA {p.gpa}+</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">⏱ {p.duration}</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">{p.degree}</span>
                  {p.scholarship && (
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">🎓 Стипендия</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}