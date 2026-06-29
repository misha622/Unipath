'use client'

import { useState } from 'react'
import StepFinance from '@/components/wizard/StepFinance'
import StepSubject from '@/components/wizard/StepSubject'

export default function WizardPage() {
  const [step, setStep] = useState(1)
  const [budget, setBudget] = useState(0)
  const [subject, setSubject] = useState('')

  if (step === 1) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <StepFinance onNext={(val: number) => { setBudget(val); setStep(2) }} />
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <StepSubject onNext={(val: string) => { setSubject(val); setStep(3) }} />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Твои параметры</h2>
      <p className="text-gray-600 mb-2">
        Бюджет: <span className="font-semibold">${budget.toLocaleString()}</span>
      </p>
      <p className="text-gray-600 mb-8">
        Направление: <span className="font-semibold">{subject}</span>
      </p>
      <p className="text-blue-600 text-lg">🔍 Здесь будут результаты поиска</p>
    </div>
  )
}