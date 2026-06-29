import { ALL_EXAMS, EXAM_TYPES, EXAM_REGIONS } from '@/data/all-exams'
import Link from 'next/link'

interface Props {
  searchParams: { [key: string]: string | undefined }
}

export default function ExamsPage({ searchParams }: Props) {
  const type = searchParams.type || 'all'
  const region = searchParams.region || 'all'
  const search = searchParams.search || ''

  let filtered = ALL_EXAMS

  if (type !== 'all') {
    filtered = filtered.filter(e => e.type === type)
  }
  if (region !== 'all') {
    filtered = filtered.filter(e => e.countries.includes(region))
  }
  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.code.toLowerCase().includes(q)
    )
  }

  const typeColors: Record<string, string> = {
    language: 'bg-blue-100 text-blue-700',
    school: 'bg-green-100 text-green-700',
    academic: 'bg-purple-100 text-purple-700',
    professional: 'bg-orange-100 text-orange-700',
    scholarship: 'bg-yellow-100 text-yellow-700',
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">📋 Все вступительные экзамены мира</h1>
      <p className="text-gray-600 mb-6">Полный справочник экзаменов для поступления в университеты</p>

      {/* Поиск */}
      <form method="GET" action="/exams" className="mb-4">
        <input
          type="text"
          name="search"
          placeholder="🔍 Поиск экзамена..."
          defaultValue={search}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>

      {/* Фильтры */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-sm font-semibold text-gray-500 mr-2">Тип:</span>
        {EXAM_TYPES.map(t => (
          <a
            key={t.key}
            href={`/exams?type=${t.key}&region=${region}${search ? `&search=${search}` : ''}`}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all
              ${type === t.key
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
              }`}
          >
            {t.label}
          </a>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-sm font-semibold text-gray-500 mr-2">Страна:</span>
        {EXAM_REGIONS.map(r => (
          <a
            key={r.key}
            href={`/exams?type=${type}&region=${r.key}${search ? `&search=${search}` : ''}`}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all
              ${region === r.key
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
              }`}
          >
            {r.label}
          </a>
        ))}
      </div>

      {/* Результаты */}
      <p className="text-gray-600 mb-4">Найдено: <strong>{filtered.length}</strong> экзаменов</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map(exam => (
          <div key={exam.code} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <code className="text-sm font-mono font-bold text-blue-600">{exam.code}</code>
              <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[exam.type]}`}>
                {exam.type}
              </span>
            </div>
            <p className="text-sm text-gray-800 mb-2">{exam.name}</p>
            <div className="flex flex-wrap gap-1">
              {exam.countries.map(c => (
                <span key={c} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {c === 'International' ? '🌍 Международный' : c}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link href="/explore" className="text-blue-600 hover:underline">
          ← Вернуться к поиску программ
        </Link>
      </div>
    </div>
  )
}