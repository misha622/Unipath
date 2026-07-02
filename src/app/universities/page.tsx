import { Suspense } from 'react'
import UniversitiesClient from './client'

export const dynamic = 'force-dynamic'

export default function UniversitiesPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="animate-spin text-4xl mb-4">🔍</div>
        <p className="text-gray-500">Загрузка...</p>
      </div>
    }>
      <UniversitiesClient />
    </Suspense>
  )
}