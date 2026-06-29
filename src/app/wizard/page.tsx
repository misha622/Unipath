'use client'

import { useState } from 'react'
import StepFinance from '@/components/wizard/StepFinance'
import StepSubject from '@/components/wizard/StepSubject'
import { programs, ProgramData } from '@/data/programs'

export default function WizardPage() {
  const [step, setStep] = useState(1)
  const [budget, setBudget] = useState(0)
  const [scholarshipOnly, setScholarshipOnly] = useState(false)
  const [subject, setSubject] = useState('')
  const [results, setResults] = useState<ProgramData[]>([])

  const handleFinanceNext = (val: number, scholarship: boolean) => {
    setBudget(val)
    setScholarshipOnly(scholarship)
    setStep(2)
  }

  const handleFinish = (subj: string) => {
    setSubject(subj)
    const filtered = programs.filter((p) => {
      let matches = true

      if (scholarshipOnly) {
        matches = matches && p.scholarship
      } else {
        matches = matches && p.costPerYear <= budget
      }

      if (subj) {
        matches = matches && p.program.toLowerCase().includes(subj.toLowerCase())
      }

      return matches
    })
    setResults(filtered)
    setStep(3)
  }

  if (step === 1) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <StepFinance onNext={handleFinanceNext} />
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <StepSubject onNext={handleFinish} />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Результаты подбора</h2>
      <p className="text-gray-600 mb-6">
        {scholarshipOnly ? '🎓 Только со стипендией' : budget === 0 ? '💰 Бесплатные программы' : `💰 Бюджет: $${budget.toLocaleString()}`} •
        📚 {subject || 'Все направления'}
      </p>

      {results.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-5xl mb-4">😕</p>
          <p className="text-gray-600 text-lg">Ничего не найдено. Попробуй изменить параметры.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {results.map((p) => {
            const daysLeft = Math.ceil(
              (new Date(p.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
            )

            return (
              <div
                key={p.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{p.program}</h3>
                    <p className="text-gray-600">{p.university} • {p.city}, {p.country}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    daysLeft <= 7 ? 'bg-red-100 text-red-700' :
                    daysLeft <= 30 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {daysLeft <= 0 ? 'Дедлайн прошёл' : `${daysLeft} дн.`}
                  </span>
                </div>

                <p className="text-gray-500 text-sm mb-3">{p.description}</p>

                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    💰 {p.costPerYear === 0 ? 'Бесплатно' : `${p.costPerYear.toLocaleString()} ${p.currency}/год`}
                  </span>
                  <span className="bg-gray-100 px-2 py-1 rounded">📚 IELTS {p.ielts}</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">📊 GPA {p.gpa}+</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">⏱ {p.duration}</span>
                  {p.scholarship && (
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">🎓 Стипендия</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}