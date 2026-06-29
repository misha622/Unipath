'use client'

import { useState } from 'react'

interface StepFinanceProps {
  onNext: (budget: number, scholarshipOnly: boolean) => void
}

export default function StepFinance({ onNext }: StepFinanceProps) {
  const [budget, setBudget] = useState(10000)
  const [scholarshipOnly, setScholarshipOnly] = useState(false)

  const presets = [0, 5000, 10000, 20000, 50000]

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Какой у тебя бюджет?</h2>
      <p className="text-gray-600 mb-8">Укажи сумму на год (включая проживание)</p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {presets.map((val) => (
          <button
            key={val}
            onClick={() => { setBudget(val); setScholarshipOnly(false) }}
            className={`p-4 rounded-xl border-2 font-medium transition-all
              ${budget === val && !scholarshipOnly ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 hover:border-gray-300'}`}
          >
            {val === 0 ? 'Бесплатно' : `$${val.toLocaleString()}`}
          </button>
        ))}
      </div>

      <button
        onClick={() => setScholarshipOnly(!scholarshipOnly)}
        className={`px-6 py-3 rounded-xl border-2 font-medium transition-all mb-8
          ${scholarshipOnly ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 hover:border-gray-300'}`}
      >
        🎓 Ищу стипендию
      </button>

      <p className="text-2xl font-bold text-blue-600 mb-8">
        {scholarshipOnly ? 'Только со стипендией' : budget === 0 ? 'Бесплатные программы' : `$${budget.toLocaleString()}`}
      </p>

      <button
        onClick={() => onNext(budget, scholarshipOnly)}
        className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700"
      >
        Дальше →
      </button>
    </div>
  )
}