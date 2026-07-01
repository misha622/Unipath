import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 text-brand-700 text-sm font-medium mb-8">
          🎓 23 898 вузов из 252 стран
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
          Найди свой идеальный <span className="text-brand-600">университет</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
          Актуальные требования, дедлайны и стоимость обучения в университетах всего мира.
          Данные обновляются каждый день.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/universities"
            className="inline-flex items-center justify-center gap-2 bg-brand-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-brand-700 transition-all shadow-lg shadow-brand-200 hover:shadow-xl hover:shadow-brand-300"
          >
            <span className="text-xl">🔍</span> Найти университет
          </Link>
          <Link
            href="/exams"
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-gray-200 hover:border-brand-300 hover:text-brand-700 transition-all"
          >
            <span className="text-xl">📋</span> Смотреть экзамены
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          <span>🇩🇪 Германия</span>
          <span>🇺🇸 США</span>
          <span>🇬🇧 Великобритания</span>
          <span>🇨🇦 Канада</span>
          <span>🇦🇺 Австралия</span>
          <span>🇯🇵 Япония</span>
        </div>
      </div>
    </div>
  )
}