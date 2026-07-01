export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-sm">U</span>
            <span className="text-lg font-bold text-white">UniPath</span>
          </div>
          <p className="text-sm">Глобальный навигатор по университетам мира. {new Date().getFullYear() > 2026 ? '2026–' + new Date().getFullYear() : '2026'}</p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Навигация</h4>
          <div className="flex flex-col gap-2 text-sm">
            <a href="/universities" className="hover:text-white transition-colors">Поиск вузов</a>
            <a href="/exams" className="hover:text-white transition-colors">Экзамены</a>
            <a href="/compare" className="hover:text-white transition-colors">Сравнение</a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Данные</h4>
          <p className="text-sm">23 898 вузов • 252 страны • WHED/IAU</p>
          <p className="text-sm mt-1">Обновлено: июль 2026</p>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center py-4 text-xs">
        UniPath — некоммерческий образовательный проект
      </div>
    </footer>
  )
}