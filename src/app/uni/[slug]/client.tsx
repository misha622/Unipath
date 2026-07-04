'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLang } from '@/i18n/LangContext'

interface Univ {
  n: string; a: string; c: string; t: string; r: string; s: string;
  w: string; e: string; p: string;
  f: number | null; y: string; d: string;
  l: string[]; u: { name: string; fields: string[] }[];
  i: string; x: string; o: string;
  wiki?: string; desc?: string; students?: string;
  history?: string; accreditation?: string;
}

export default function UniClient({ slug }: { slug: string }) {
  const [uni, setUni] = useState<Univ | null>(null)
  const [loading, setLoading] = useState(true)
  const { t } = useLang()

  useEffect(() => {
    async function load() {
      const name = decodeURIComponent(slug)
      const res = await fetch(`/api/universities?search=${encodeURIComponent(name)}&perPage=1`)
      const data = await res.json()
      setUni(data.items?.[0] || null)
      setLoading(false)
    }
    load()
  }, [slug])

  if (loading) return <div className="max-w-4xl mx-auto px-4 py-20 text-center"><div className="animate-spin text-4xl mb-4">🔍</div></div>
  if (!uni) return <div className="max-w-4xl mx-auto px-4 py-20 text-center"><h1 className="text-3xl font-bold mb-4">{t.compare.notFound}</h1><Link href="/universities" className="text-brand-600 hover:underline">{t.uni.back}</Link></div>

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-brand-600">{t.universities.back.split('← ')[1] || 'Home'}</Link><span>/</span>
        <Link href="/universities" className="hover:text-brand-600">{t.universities.title.split(' ').slice(1).join(' ')}</Link><span>/</span>
        <span className="text-gray-900">{uni.n}</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{uni.n}</h1>
      {uni.a && <p className="text-lg text-gray-500 mb-6">{uni.a}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">{t.uni.location}</h3>
          <p className="font-medium">{uni.c}</p>
          {uni.t && <p className="text-gray-600">{uni.t}{uni.r ? `, ${uni.r}` : ''}</p>}
          {uni.s && <p className="text-gray-500 text-sm mt-1">{uni.s}</p>}
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">{t.uni.info}</h3>
          <div className="space-y-2 text-sm">
            {uni.f && <div className="flex justify-between"><span className="text-gray-500">{t.uni.founded}</span><span className="font-medium">{uni.f}</span></div>}
            {uni.d && <div className="flex justify-between"><span className="text-gray-500">{t.uni.type}</span><span className={uni.d === 'Private' ? 'text-purple-600 font-medium' : 'text-green-600 font-medium'}>{uni.d === 'Private' ? t.universities.private : t.universities.public}</span></div>}
            {uni.students && <div className="flex justify-between"><span className="text-gray-500">{t.uni.students}</span><span className="font-medium">{uni.students}</span></div>}
            {uni.accreditation && <div className="flex justify-between"><span className="text-gray-500">{t.uni.accreditation}</span><span className="font-medium text-xs">{uni.accreditation}</span></div>}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">{t.uni.links}</h3>
          {uni.w && <a href={uni.w} target="_blank" rel="noopener noreferrer" className="block text-brand-600 hover:underline text-sm">🌐 {uni.w.replace('https://', '').replace('www.', '')}</a>}
          {uni.wiki && <a href={uni.wiki} target="_blank" rel="noopener noreferrer" className="block mt-2 text-brand-600 hover:underline text-sm">📖 Wikipedia</a>}
          {uni.x && <a href={uni.x} target="_blank" rel="noopener noreferrer" className="block mt-2 text-brand-600 hover:underline text-sm">📋 WHED Profile</a>}
        </div>
      </div>

      {uni.desc && <div className="mb-8"><h2 className="text-xl font-bold text-gray-900 mb-3">{t.uni.description}</h2><p className="text-gray-700">{uni.desc}</p></div>}
      {uni.history && <div className="mb-8"><h2 className="text-xl font-bold text-gray-900 mb-3">{t.uni.history}</h2><p className="text-gray-700 text-sm">{uni.history}</p></div>}

      {uni.l && uni.l.length > 0 && (
        <div className="mb-8"><h2 className="text-xl font-bold text-gray-900 mb-3">{t.uni.languages}</h2><div className="flex flex-wrap gap-2">{uni.l.map(lang => <span key={lang} className="bg-brand-50 text-brand-700 px-3 py-1.5 rounded-full text-sm">{lang}</span>)}</div></div>
      )}

      {uni.u && uni.u.length > 0 && (
        <div className="mb-8"><h2 className="text-xl font-bold text-gray-900 mb-3">{t.uni.faculties} ({uni.u.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{uni.u.map((fac, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-4"><h3 className="font-semibold text-gray-900 mb-1">{fac.name}</h3>{fac.fields?.length > 0 && <div className="flex flex-wrap gap-1 mt-2">{fac.fields.map(f => <span key={f} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{f}</span>)}</div>}</div>
          ))}</div>
        </div>
      )}

      <div className="text-center mt-8"><Link href="/universities" className="text-brand-600 hover:underline">{t.uni.back}</Link></div>
    </div>
  )
}