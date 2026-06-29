import { programs } from '@/data/programs'
import Link from 'next/link'

interface Props {
  searchParams: { [key: string]: string | undefined }
}

export default function ComparePage({ searchParams }: Props) {
  const ids = (searchParams.ids || '').split(',').filter(Boolean)
  const selected = programs.filter(p => ids.includes(p.id))

  const removeId = (id: string) => {
    const newIds = ids.filter(i => i !== id)
    const qs = newIds.length ? `?ids=${newIds.join(',')}` : ''
    return `/compare${qs}`
  }

  const rows: { label: string; get: (p: typeof programs[0]) => string }[] = [
    { label: 'Страна', get: (p) => p.country },
    { label: 'Город', get: (p) => p.city },
    { label: 'Уровень', get: (p) => p.degree },
    { label: 'Длительность', get: (p) => p.duration },
    { label: 'Стоимость', get: (p) => p.costPerYear === 0 ? 'Бесплатно' : `${p.costPerYear.toLocaleString()} ${p.currency}/год` },
    { label: 'IELTS', get: (p) => String(p.ielts) },
    { label: 'GPA', get: (p) => String(p.gpa) },
    { label: 'Стипендия', get: (p) => p.scholarship ? '✅ Да' : '❌ Нет' },
    { label: 'Дедлайн', get: (p) => p.deadline },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Сравнение программ</h1>

      {selected.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-gray-600 text-lg mb-4">Выберите программы для сравнения</p>
          <Link href="/explore" className="text-blue-600 hover:underline">
            ← Перейти в каталог
          </Link>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl border border-gray-200">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="p-4 text-left text-sm font-medium text-gray-500 w-48">Параметр</th>
                  {selected.map(p => (
                    <th key={p.id} className="p-4 text-left">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-semibold text-gray-900">{p.university}</span>
                        <a href={removeId(p.id)} className="text-red-400 hover:text-red-600 text-lg leading-none">&times;</a>
                      </div>
                      <p className="text-xs text-gray-500">{p.program}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map(row => (
                  <tr key={row.label}>
                    <td className="p-4 text-sm font-medium text-gray-500">{row.label}</td>
                    {selected.map(p => (
                      <td key={p.id} className="p-4 text-sm text-gray-900">
                        {row.get(p)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-center">
            <Link href="/explore" className="text-blue-600 hover:underline">
              ← Добавить ещё программы
            </Link>
          </div>
        </>
      )}
    </div>
  )
}