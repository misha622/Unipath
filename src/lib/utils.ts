export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Сколько дней до дедлайна
export function daysUntil(deadline: string): number {
  const now = new Date()
  const deadlineDate = new Date(deadline)
  const diff = deadlineDate.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

// Цвет дедлайна
export function deadlineColor(days: number): string {
  if (days < 0) return 'text-gray-400'
  if (days <= 7) return 'text-red-600 font-bold animate-pulse'
  if (days <= 30) return 'text-orange-500'
  return 'text-green-600'
}

// Слаг из названия
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}