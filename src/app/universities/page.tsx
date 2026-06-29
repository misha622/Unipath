'use client'

import { useState } from 'react'
import { UNIVERSITIES_BY_COUNTRY } from '@/data/universities'
import Link from 'next/link'

export default function UniversitiesPage() {
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')

  const countries = Object.keys(UNIVERSITIES_BY_COUNTRY).sort()

  const filteredCountries = countries.filter(c =>
    c.toLowerCase().includes(search.toLowerCase())
  )

  const universities = selectedCountry ? UNIVERSITIES_BY_COUNTRY[selectedCountry] || [] : []

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">🏛️ Университеты мира</h1>
      <p className="text-gray-600 mb-6">Выберите страну, чтобы увидеть список университетов</p>

      {/* Поиск страны */}
      <input
        type="text"
        placeholder="🔍 Поиск страны..."
        value={search}
        onChange={(e) => { setSearch(e.target.value); setSelectedCountry('') }}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Список стран */}
      <div className="flex flex-wrap gap-2 mb-6 max-h-48 overflow-y-auto">
        {filteredCountries.map(country => (
          <button
            key={country}
            onClick={() => setSelectedCountry(country)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all
              ${selectedCountry === country
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
              }`}
          >
            {country}
          </button>
        ))}
      </div>

      {/* Университеты выбранной страны */}
      {selectedCountry && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {selectedCountry} — {universities.length} университетов
          </h2>

          {universities.length === 0 ? (
            <p className="text-gray-500">Нет данных об университетах этой страны.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {universities.map((uni, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-1">{uni.name}</h3>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                    <span className={`px-2 py-0.5 rounded-full ${uni.type === 'public' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                      {uni.type === 'public' ? 'Государственный' : 'Частный'}
                    </span>
                    {uni.founded && (
                      <span className="bg-gray-100 px-2 py-0.5 rounded-full">Осн. {uni.founded}</span>
                    )}
                    {uni.students && (
                      <span className="bg-gray-100 px-2 py-0.5 rounded-full">{uni.students.toLocaleString()} студ.</span>
                    )}
                  </div>
                  {uni.description && (
                    <p className="text-sm text-gray-600">{uni.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {!selectedCountry && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-5xl mb-4">🌍</p>
          <p>Выберите страну из списка выше</p>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link href="/explore" className="text-blue-600 hover:underline">
          ← К поиску программ
        </Link>
      </div>
    </div>
  )
}