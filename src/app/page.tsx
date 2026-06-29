import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Найди свой идеальный <span className="text-blue-600">вуз</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          UniPath собирает актуальные требования, дедлайны и стоимость обучения
          в университетах всего мира. Данные обновляются каждый день.
        </p>

        <Link
          href="/explore"
          className="inline-block bg-blue-600 text-white px-10 py-5 rounded-xl text-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg"
        >
          🔍 Найти программу
        </Link>
      </div>
    </div>
  )
}