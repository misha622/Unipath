import { programs } from '@/data/programs'
import { EXAMS_BY_COUNTRY, ALL_COUNTRIES, ALL_FIELDS, ALL_LANGUAGES, EU_COUNTRIES, ASIA_COUNTRIES, AMER_COUNTRIES } from '@/data/exams'
import Link from 'next/link'

const DEGREES = ['All', 'Bachelor', 'Master', 'PhD', 'MBA', 'LLM', 'Diploma', 'Certificate']
const DURATIONS = ['All', '1', '1.5', '2', '3', '4', '5', '6']

const BUDGETS = [
  { label: 'Любая', value: Infinity },
  { label: 'Бесплатно', value: 0 },
  { label: 'До €5,000', value: 5000 },
  { label: 'До €10,000', value: 10000 },
  { label: 'До €20,000', value: 20000 },
  { label: 'До €50,000', value: 50000 },
]

interface Props {
  searchParams: { [key: string]: string | undefined }
}

export default function ExplorePage({ searchParams }: Props) {
  const search = searchParams.search || ''
  const country = searchParams.country || 'All'
  const degree = searchParams.degree || 'All'
  const field = searchParams.field || 'All'
  const language = searchParams.language || 'All'
  const duration = searchParams.duration || 'All'
  const maxBudget = Number(searchParams.maxBudget) || Infinity
  const minIelts = Number(searchParams.minIelts) || 0
  const maxIelts = Number(searchParams.maxIelts) || 9
  const minGpa = Number(searchParams.minGpa) || 0
  const scholarshipOnly = searchParams.scholarship === '1'
  const chipFree = searchParams.chipFree === '1'
  const chipEnglish = searchParams.chipEnglish === '1'
  const chipEU = searchParams.chipEU === '1'
  const chipAsia = searchParams.chipAsia === '1'
  const chipAmer = searchParams.chipAmer === '1'
  const chipDeadline = searchParams.chipDeadline === '1'
  const sort = searchParams.sort || 'relevance'

  const now = new Date()
  const sixMonthsFromNow = new Date()
  sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6)

  let filtered = programs.filter(p => {
    if (search && !p.university.toLowerCase().includes(search.toLowerCase())
        && !p.program.toLowerCase().includes(search.toLowerCase())) return false
    if (country !== 'All' && p.country !== country) return false
    if (degree !== 'All' && p.degree !== degree) return false
    if (field !== 'All' && p.field !== field) return false
    if (language !== 'All' && p.language !== language) return false
    if (duration !== 'All' && p.duration !== duration) return false

    if (chipFree) { if (p.costPerYear !== 0) return false }
    else if (scholarshipOnly) { if (!p.scholarship) return false }
    else { if (p.costPerYear > maxBudget) return false }

    if (scholarshipOnly && !p.scholarship) return false
    if (chipEnglish && p.language !== 'English') return false
    if (chipEU && !EU_COUNTRIES.includes(p.country)) return false
    if (chipAsia && !ASIA_COUNTRIES.includes(p.country)) return false
    if (chipAmer && !AMER_COUNTRIES.includes(p.country)) return false
    if (chipDeadline) {
      const d = new Date(p.deadline)
      if (d < now || d > sixMonthsFromNow) return false
    }

    if (minIelts > 0 && p.ielts < minIelts) return false
    if (p.ielts > maxIelts) return false
    if (minGpa > 0 && p.gpa < minGpa) return false

    return true
  })

  // Сортировка
  if (sort === 'costAsc') filtered.sort((a, b) => a.costPerYear - b.costPerYear)
  else if (sort === 'costDesc') filtered.sort((a, b) => b.costPerYear - a.costPerYear)
  else if (sort === 'deadline') filtered.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
  else if (sort === 'ieltsAsc') filtered.sort((a, b) => a.ielts - b.ielts)
  else if (sort === 'alpha') filtered.sort((a, b) => a.university.localeCompare(b.university))

  const countryExams = country !== 'All' ? EXAMS_BY_COUNTRY[country] || [] : []
  const internationalExams = EXAMS_BY_COUNTRY['International'] || []

  const chips = [
    { key: 'chipFree', label: 'Бесплатно', active: chipFree },
    { key: 'scholarship', label: '🎓 Стипендия', active: scholarshipOnly },
    { key: 'chipEnglish', label: 'На английском', active: chipEnglish },
    { key: 'chipEU', label: 'Европа', active: chipEU },
    { key: 'chipAsia', label: 'Азия', active: chipAsia },
    { key: 'chipAmer', label: 'Америка', active: chipAmer },
    { key: 'chipDeadline', label: 'Дедлайн < 6 мес.', active: chipDeadline },
  ]

  const toggleChipUrl = (key: string, current: boolean) => {
    const params = new URLSearchParams(searchParams as Record<string, string>)
    if (key === 'scholarship') {
      if (current) params.delete('scholarship')
      else { params.set('scholarship', '1'); params.delete('chipFree') }
    } else if (key === 'chipFree') {
      if (current) params.delete('chipFree')
      else { params.set('chipFree', '1'); params.delete('scholarship') }
    } else {
      if (current) params.delete(key)
      else params.set(key, '1')
    }
    const qs = params.toString()
    return `/explore${qs ? `?${qs}` : ''}`
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">UniPath — расширенный поиск университетских программ</h1>

      {/* Поиск + Сброс */}
      <form method="GET" action="/explore" className="flex gap-3 mb-5">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
          <input
            type="text"
            name="search"
            placeholder="Поиск университета или программы..."
            defaultValue={search}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        <a href="/explore" className="px-5 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center">
          Сбросить всё
        </a>
      </form>

      {/* Фильтры */}
      <form method="GET" action="/explore" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Страна</label>
          <select name="country" defaultValue={country} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
            <option value="All">Все страны</option>
            {ALL_COUNTRIES.filter(c => c !== 'International').map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Степень</label>
          <select name="degree" defaultValue={degree} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
            {DEGREES.map(d => (
              <option key={d} value={d}>{d === 'All' ? 'Все степени' : d}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Область</label>
          <select name="field" defaultValue={field} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
            <option value="All">Все области</option>
            {ALL_FIELDS.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Язык обучения</label>
          <select name="language" defaultValue={language} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
            <option value="All">Любой</option>
            {ALL_LANGUAGES.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Длительность</label>
          <select name="duration" defaultValue={duration} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
            <option value="All">Любая</option>
            {DURATIONS.filter(d => d !== 'All').map(d => (
              <option key={d} value={d}>{d} {d === '1' || d === '1.5' ? 'год' : d === '6' ? 'лет' : 'года'}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Макс. стоимость / год (EUR)</label>
          <select name="maxBudget" defaultValue={maxBudget} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
            {BUDGETS.map(b => (
              <option key={b.value} value={b.value}>{b.label}</option>
            ))}
          </select>
        </div>
      </form>

      {/* Ползунки */}
      <form method="GET" action="/explore" className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Мин. IELTS</label>
          <div className="flex items-center gap-3">
            <input type="range" name="minIelts" min="0" max="9" step="0.5" defaultValue={minIelts} className="flex-1" />
            <span className="text-sm font-medium w-10 text-right">{minIelts === 0 ? 'Любой' : minIelts.toFixed(1)}</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Макс. IELTS</label>
          <div className="flex items-center gap-3">
            <input type="range" name="maxIelts" min="4" max="9" step="0.5" defaultValue={maxIelts} className="flex-1" />
            <span className="text-sm font-medium w-10 text-right">{maxIelts.toFixed(1)}</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Мин. GPA (4.0)</label>
          <div className="flex items-center gap-3">
            <input type="range" name="minGpa" min="0" max="4" step="0.1" defaultValue={minGpa} className="flex-1" />
            <span className="text-sm font-medium w-10 text-right">{minGpa === 0 ? 'Любой' : minGpa.toFixed(1)}</span>
          </div>
        </div>
      </form>

      {/* Чипсы */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs font-semibold text-gray-500 uppercase mr-2">Быстро:</span>
        {chips.map(chip => (
          <a
            key={chip.key}
            href={toggleChipUrl(chip.key, chip.active)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all
              ${chip.active
                ? 'bg-blue-50 border-blue-600 text-blue-600 shadow-sm'
                : 'bg-white border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600'
              }`}
          >
            {chip.label}
          </a>
        ))}
        <button type="submit" className="ml-auto bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          Применить
        </button>
      </div>

      {/* Экзамены */}
      {country !== 'All' && (
        <div className="bg-blue-50 rounded-xl p-3 mb-4">
          <p className="text-sm font-semibold text-blue-900 mb-1">📋 Вступительные экзамены для {country}:</p>
          <div className="flex flex-wrap gap-1.5">
            {internationalExams.map(exam => (
              <span key={exam.code} className="bg-white text-blue-700 px-2.5 py-0.5 rounded-full text-xs border border-blue-200">
                🌐 {exam.label}
              </span>
            ))}
            {countryExams.filter(e => !internationalExams.find(ie => ie.code === e.code)).map(exam => (
              <span key={exam.code} className="bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
                {exam.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Мета */}
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
        <span className="text-sm text-gray-600"><strong>{filtered.length}</strong> программ найдено</span>
        <select name="sort" defaultValue={sort} className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-sm">
          <option value="relevance">Сортировка: по соответствию</option>
          <option value="costAsc">Стоимость: сначала низкая</option>
          <option value="costDesc">Стоимость: сначала высокая</option>
          <option value="deadline">Дедлайн: сначала ближайший</option>
          <option value="ieltsAsc">IELTS: сначала низкий</option>
          <option value="alpha">Университет А–Я</option>
        </select>
      </div>

      {/* Карточки */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-4xl mb-3">😕</p>
          <p>Нет программ, подходящих под фильтры. Попробуйте расширить поиск.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(p => {
            const daysLeft = Math.ceil((new Date(p.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
            const degreeColors: Record<string, string> = {
              Bachelor: 'bg-green-100 text-green-700',
              Master: 'bg-blue-100 text-blue-700',
              PhD: 'bg-purple-100 text-purple-700',
              MBA: 'bg-orange-100 text-orange-700',
              LLM: 'bg-teal-100 text-teal-700',
              Diploma: 'bg-gray-100 text-gray-700',
              Certificate: 'bg-gray-100 text-gray-700',
            }

            return (
              <div key={p.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-semibold text-gray-900 leading-tight">{p.university}</h3>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${degreeColors[p.degree] || 'bg-gray-100 text-gray-600'}`}>
                    {p.degree}
                  </span>
                </div>
                <p className="text-sm text-gray-700 font-medium mb-1">
                  <Link href={`/uni/${p.id}`} className="hover:text-blue-600">{p.program}</Link>
                </p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 mb-2">
                  <span>📍 {p.city}, {p.country}</span>
                  <span>⏱ {p.duration}</span>
                  <span>🗣 {p.language}</span>
                </div>
                <div className="flex gap-3 text-xs text-gray-500 mb-3">
                  <span>IELTS <strong className="text-gray-700">{p.ielts}</strong></span>
                  <span>GPA <strong className="text-gray-700">{p.gpa}</strong></span>
                </div>
                <div className="mt-auto flex justify-between items-center pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold ${p.costPerYear === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                      {p.costPerYear === 0 ? 'Бесплатно' : `€${p.costPerYear.toLocaleString()}/год`}
                    </span>
                    {p.scholarship && (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">Стипендия</span>
                    )}
                  </div>
                  <span className={`text-xs ${
                    daysLeft <= 7 ? 'text-red-600 font-semibold' :
                    daysLeft <= 60 ? 'text-orange-500' :
                    daysLeft <= 180 ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    📅 {daysLeft <= 0 ? 'Закрыт' : `${daysLeft} дн.`}
                  </span>
                </div>
                <div className="mt-2">
                  <Link
                    href={`/compare?ids=${p.id}`}
                    className="text-xs text-gray-400 hover:text-blue-600"
                  >
                    ⚖️ Сравнить
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}