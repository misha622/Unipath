import { Suspense } from 'react'
import UniClient from './client'

export const dynamic = 'force-dynamic'

export default function UniPage({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto px-4 py-20 text-center"><div className="animate-spin text-4xl mb-4">🔍</div><p className="text-gray-500">Загрузка...</p></div>}>
      <UniClient slug={params.slug} />
    </Suspense>
  )
}