import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">
          UniPath
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
          <Link href="/wizard" className="hover:text-blue-600">Подбор</Link>
          <Link href="/explore" className="hover:text-blue-600">Все вузы</Link>
          <Link href="/exams" className="hover:text-blue-600">Экзамены</Link>
          <Link href="/universities" className="hover:text-blue-600">Вузы</Link>
        </nav>
        <Link
          href="/auth"
          className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Войти
        </Link>
      </div>
    </header>
  )
}