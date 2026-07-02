import { universities } from '@/data/universities-whed'
import type { Univ } from '@/data/universities-whed'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return []
}

export default function UniPage({ params }: Props) {
  const slug = decodeURIComponent(params.slug)
  const uni = universities.find(u => u.n === slug || u.i === slug)

  if (!uni) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Хлебные крошки */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-brand-600">Главная</Link>
        <span>/</span>
        <Link href="/universities" className="hover:text-brand-600">Университеты</Link>
        <span>/</span>
        <Link href={`/universities?country=${encodeURIComponent(uni.c)}`} className="hover:text-brand-600">{uni.c}</Link>
        <span>/</span>
        <span className="text-gray-900">{uni.n}</span>
      </div>

      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{uni.n}</h1>
        {uni.a && <p className="text-lg text-gray-500">{uni.a}</p>}
      </div>

      {/* Основная информация */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">📍 Расположение</h3>
          <p className="text-gray-900 font-medium">{uni.c}</p>
          {uni.t && <p className="text-gray-600">{uni.t}{uni.r ? `, ${uni.r}` : ''}</p>}
          {uni.s && <p className="text-gray-500 text-sm mt-1">{uni.s}</p>}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">🏛️ Общая информация</h3>
          <div className="space-y-2">
            {uni.f && (
              <div className="flex justify-between">
                <span className="text-gray-500">Год основания</span>
                <span className="font-medium">{uni.f}</span>
              </div>
            )}
            {uni.d && (
              <div className="flex justify-between">
                <span className="text-gray-500">Тип</span>
                <span className={`font-medium ${uni.d === 'Private' ? 'text-purple-600' : 'text-green-600'}`}>
                  {uni.d === 'Private' ? 'Частный' : 'Государственный'}
                </span>
              </div>
            )}
            {uni.y && (
              <div className="flex justify-between">
                <span className="text-gray-500">Статус</span>
                <span className="font-medium">{uni.y}</span>
              </div>
            )}
            {uni.o && (
              <div className="flex justify-between">
                <span className="text-gray-500">Учебный год</span>
                <span className="font-medium">{uni.o}</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">🔗 Ссылки</h3>
          {uni.w ? (
            <a href={uni.w} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline break-all text-sm">
              🌐 {uni.w.replace('https://', '').replace('www.', '')}
            </a>
          ) : (
            <p className="text-gray-400 text-sm">Нет данных</p>
          )}
          {uni.x && (
            <a href={uni.x} target="_blank" rel="noopener noreferrer" className="block mt-2 text-brand-600 hover:underline text-sm">
              📋 WHED Profile
            </a>
          )}
        </div>
      </div>

      {/* Языки */}
      {uni.l && uni.l.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">🗣 Языки обучения</h2>
          <div className="flex flex-wrap gap-2">
            {uni.l.map((lang: string) => (
              <span key={lang} className="bg-brand-50 text-brand-700 px-3 py-1.5 rounded-full text-sm font-medium">
                {lang}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Факультеты */}
      {uni.u && uni.u.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">📚 Факультеты и направления</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {uni.u.map((fac: any, i: number) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{fac.name}</h3>
                {fac.fields && fac.fields.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {fac.fields.map((field: string) => (
                      <span key={field} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {field}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Контакты */}
      {(uni.e || uni.p) && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">📞 Контакты</h2>
          <div className="space-y-2">
            {uni.e && (
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Email:</span>
                <a href={`mailto:${uni.e}`} className="text-brand-600 hover:underline">{uni.e}</a>
              </div>
            )}
            {uni.p && (
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Телефон:</span>
                <span className="font-medium">{uni.p}</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="text-center">
        <Link href="/universities" className="text-brand-600 hover:underline">
          ← Назад к поиску вузов
        </Link>
      </div>
    </div>
  )
}