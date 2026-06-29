'use client'

import { useState } from 'react'

interface StepSubjectProps {
  onNext: (subject: string) => void
}

const SUBJECTS = [
  'Computer Science',
  'Data Science & AI',
  'Engineering',
  'Business & Management',
  'Medicine',
  'Law',
  'Psychology',
  'Arts & Design',
]

export default function StepSubject({ onNext }: StepSubjectProps) {
  const [subject, setSubject] = useState('')

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Что хочешь изучать?</h2>
      <p className="text-gray-600 mb-8">Выбери направление</p>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {SUBJECTS.map((sub) => (
          <button
            key={sub}
            onClick={() => setSubject(sub)}
            className={`p-4 rounded-xl border-2 text-sm transition-all
              ${subject === sub ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 hover:border-gray-300'}`}
          >
            {sub}
          </button>
        ))}
      </div>

      <button
        onClick={() => onNext(subject)}
        disabled={!subject}
        className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Дальше →
      </button>
    </div>
  )
}