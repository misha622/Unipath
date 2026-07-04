'use client'
export const translations = {
  ru: {
    site: { title: 'UniPath — Найди свой университет', description: 'Глобальный навигатор по университетам мира. 23 898 вузов из 252 стран.' },
    nav: { search: '🔍 Поиск вузов', exams: '📋 Экзамены', compare: '⚖️ Сравнить' },
    home: { badge: '🎓 23 898 вузов из 252 стран', title: 'Найди свой идеальный университет', desc: 'Актуальные требования, дедлайны и стоимость обучения в университетах всего мира. Данные обновляются каждый день.', cta: 'Найти университет', secondary: 'Смотреть экзамены' },
    universities: { title: '🏛️ Университеты мира', subtitle: '23 898 вузов из 252 стран', search: 'Поиск университета или города...', reset: 'Сбросить всё', country: 'Страна', type: 'Тип', language: 'Язык', founded: 'Год основания', allCountries: 'Все страны', allTypes: 'Все типы', allLanguages: 'Все языки', private: 'Частный', public: 'Гос.', foundedLabel: 'Осн.', students: '👥', site: '🌐 Сайт', wiki: '📖 Wiki', compare: '⚖️ Сравнить', back: '← На главную', found: 'вузов найдено', page: 'Стр.', of: 'из', noResults: 'Нет вузов, подходящих под фильтры.', loading: 'Загрузка...', prev: '← Назад', next: 'Вперёд →' },
    uni: { location: '📍 Расположение', info: '🏛️ Информация', links: '🔗 Ссылки', founded: 'Основан', type: 'Тип', students: 'Студентов', accreditation: 'Аккредитация', description: '📝 Описание', history: '📜 История', languages: '🗣 Языки', faculties: '📚 Факультеты', contacts: '📞 Контакты', email: 'Email:', phone: 'Телефон:', back: '← Назад к поиску' },
    compare: { title: '⚖️ Сравнение вузов', empty: 'Выберите вузы для сравнения на странице поиска', param: 'Параметр', country: 'Страна', city: 'Город', type: 'Тип', founded: 'Год основания', languages: 'Языки', faculties: 'Факультетов', students: 'Студентов', accreditation: 'Аккредитация', site: 'Сайт', wiki: 'Wikipedia', description: 'Описание', history: 'История', back: '← Добавить ещё вузы', go: '🌐 Перейти', yes: '✅ Есть', no: '❌ Нет', notFound: 'Не найдено' },
    footer: { tagline: 'Глобальный навигатор по университетам мира.', nav: 'Навигация', data: 'Данные', stats: '23 898 вузов • 252 страны • WHED/IAU', updated: 'Обновлено: июль 2026', copyright: 'UniPath — некоммерческий образовательный проект' },
  },
  en: {
    site: { title: 'UniPath — Find Your University', description: 'Global university navigator. 23,898 universities from 252 countries.' },
    nav: { search: '🔍 Search', exams: '📋 Exams', compare: '⚖️ Compare' },
    home: { badge: '🎓 23,898 universities from 252 countries', title: 'Find your ideal university', desc: 'Up-to-date requirements, deadlines and tuition fees at universities worldwide. Data updated daily.', cta: 'Find a university', secondary: 'Browse exams' },
    universities: { title: '🏛️ Universities of the World', subtitle: '23,898 universities from 252 countries', search: 'Search university or city...', reset: 'Reset all', country: 'Country', type: 'Type', language: 'Language', founded: 'Year founded', allCountries: 'All countries', allTypes: 'All types', allLanguages: 'All languages', private: 'Private', public: 'Public', foundedLabel: 'Est.', students: '👥', site: '🌐 Website', wiki: '📖 Wiki', compare: '⚖️ Compare', back: '← Home', found: 'universities found', page: 'Page', of: 'of', noResults: 'No universities match the filters.', loading: 'Loading...', prev: '← Previous', next: 'Next →' },
    uni: { location: '📍 Location', info: '🏛️ Information', links: '🔗 Links', founded: 'Founded', type: 'Type', students: 'Students', accreditation: 'Accreditation', description: '📝 Description', history: '📜 History', languages: '🗣 Languages', faculties: '📚 Faculties', contacts: '📞 Contacts', email: 'Email:', phone: 'Phone:', back: '← Back to search' },
    compare: { title: '⚖️ Compare Universities', empty: 'Select universities to compare on the search page', param: 'Parameter', country: 'Country', city: 'City', type: 'Type', founded: 'Year founded', languages: 'Languages', faculties: 'Faculties', students: 'Students', accreditation: 'Accreditation', site: 'Website', wiki: 'Wikipedia', description: 'Description', history: 'History', back: '← Add more universities', go: '🌐 Visit', yes: '✅ Yes', no: '❌ No', notFound: 'Not found' },
    footer: { tagline: 'Global university navigator.', nav: 'Navigation', data: 'Data', stats: '23,898 universities • 252 countries • WHED/IAU', updated: 'Updated: July 2026', copyright: 'UniPath — non-profit educational project' },
  }
}

export type Lang = 'ru' | 'en'
export type TranslationDict = typeof translations.ru