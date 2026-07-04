'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface Univ {
  n: string; a: string; c: string; t: string; r: string;
  f: number | null; d: string; l: string[];
  u: { name: string; fields: string[] }[];
  w: string; i: string;
  wiki?: string; desc?: string; students?: string;
  history?: string; accreditation?: string;
}

export default function CompareClient() {
  const searchParams = useSearchParams()
  const ids = (searchParams.get('ids') || '').split(',').filter(Boolean)
  const [universities, setUniversities] = useState<Univ[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (ids.length === 0) { setLoading(false); return }
      const results = await Promise.all(
        ids.map(async (name) => {
          const res = await fetch(`/api/universities?search=${encodeURIComponent(name)}&perPage=1`)
          const data = await res.json()
          return data.items?.[0] || null
        })
      )
      setUniversities(results.filter(Boolean))
      setLoading(false)
    }
    load()
  }, [])

  const removeUni = (name: string) => {
    const newIds = ids.filter(id => id !== name)
    const qs = newIds.length ? `?ids=${newIds.join(',')}` : ''
    window.location.href = `/compare${qs}`
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="animate-spin text-4xl mb-4">🔍</div>
        <p className="text-gray-500">Загрузка...</p>
      </div>
    )
  }

  if (universities.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">⚖️ Сравнение вузов</h1>
        <p className="text-gray-600 mb-6">Выберите вузы для сравнения на странице поиска</p>
        <Link href="/universities" className="text-brand-600 hover:underline">← К поиску вузов</Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">⚖️ Сравнение вузов</h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-xl border border-gray-200">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="p-4 text-left text-sm font-semibold text-gray-500 w-48">Параметр</th>
              {universities.map((u, i) => (
                <th key={i} className="p-4 text-left min-w-[200px]">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{u.n}</p>
                      {u.a && <p className="text-xs text-gray-500">{u.a}</p>}
                    </div>
                    <button onClick={() => removeUni(u.n)} className="text-red-400 hover:text-red-600 text-lg leading-none">&times;</button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { label: 'Страна', get: (u: Univ) => u.c },
              { label: 'Город', get: (u: Univ) => u.t || '—' },
              { label: 'Тип', get: (u: Univ) => u.d === 'Private' ? 'Частный' : u.d === 'Public' ? 'Государственный' : u.d || '—' },
              { label: 'Год основания', get: (u: Univ) => u.f ? String(u.f) : '—' },
              { label: 'Языки', get: (u: Univ) => (u.l || []).join(', ') || '—' },
              { label: 'Факультетов', get: (u: Univ) => u.u ? String(u.u.length) : '0' },
              { label: 'Студентов', get: (u: Univ) => u.students || '—' },
              { label: 'Аккредитация', get: (u: Univ) => u.accreditation || '—' },
              { label: 'Сайт', get: (u: Univ) => u.w ? '✅ Есть' : '❌ Нет' },
              { label: 'Wikipedia', get: (u: Univ) => u.wiki ? '✅ Есть' : '❌ Нет' },
              { label: 'Описание', get: (u: Univ) => u.desc?.slice(0, 200) || '—' },
              { label: 'История', get: (u: Univ) => u.history?.slice(0, 200) || '—' },
            ].map(row => (
              <tr key={row.label}>
                <td className="p-4 text-sm font-medium text-gray-500">{row.label}</td>
                {universities.map((u, i) => (
                  <td key={i} className="p-4 text-sm text-gray-900">
                    {row.label === 'Сайт' && u.w
                      ? <a href={u.w} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">🌐 Перейти</a>
                      : row.label === 'Wikipedia' && u.wiki
                      ? <a href={u.wiki} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">📖 Перейти</a>
                      : row.get(u)
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-center">
        <Link href="/universities" className="text-brand-600 hover:underline">← Добавить ещё вузы</Link>
      </div>
    </div>
  )
}