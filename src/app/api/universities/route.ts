import { NextRequest, NextResponse } from 'next/server'
import { universities } from '@/data/universities-whed'
import type { Univ } from '@/data/universities-whed'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') || ''
  const country = searchParams.get('country') || ''
  const funding = searchParams.get('funding') || ''
  const language = searchParams.get('language') || ''
  const foundedMin = parseInt(searchParams.get('foundedMin') || '0')
  const foundedMax = parseInt(searchParams.get('foundedMax') || '9999')
  const page = parseInt(searchParams.get('page') || '1')
  const perPage = parseInt(searchParams.get('perPage') || '100')

  // Убираем дубликаты по iau_id
  const seen = new Set<string>()
  const uniqueUniversities = universities.filter(u => {
  const key = u.i || u.n
  if (seen.has(key)) return false
  seen.add(key)
  return true
  })


let filtered = uniqueUniversities

  if (country) {
    filtered = filtered.filter(u => u.c === country)
  }
  if (funding) {
    filtered = filtered.filter(u => u.d === funding)
  }
  if (language) {
    filtered = filtered.filter(u => u.l?.includes(language))
  }
  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter(u =>
      (u.n || '').toLowerCase().includes(q) ||
      (u.a || '').toLowerCase().includes(q) ||
      (u.c || '').toLowerCase().includes(q) ||
      (u.t || '').toLowerCase().includes(q)
    )
  }
  if (foundedMin > 0 || foundedMax < 9999) {
    filtered = filtered.filter(u => u.f && u.f >= foundedMin && u.f <= foundedMax)
  }

  const total = filtered.length
  const totalPages = Math.ceil(total / perPage)
  const start = (page - 1) * perPage
  const items = filtered.slice(start, start + perPage)

  return NextResponse.json({
    items,
    total,
    page,
    perPage,
    totalPages,
  })
}