// Единый источник правды для всего проекта
// Совместим с src/data/programs.ts

export interface ProgramData {
  id: string
  university: string
  country: string
  city: string
  program: string
  degree: 'Bachelor' | 'Master' | 'PhD'
  costPerYear: number
  currency: string
  ielts: number
  gpa: number
  deadline: string // ISO date "2027-03-15"
  scholarship: boolean
  duration: string
  description: string
}

export type FilterState = {
  search: string
  country: string
  degree: string
  maxBudget: number
  scholarshipOnly: boolean
}

export type SortOption = 'deadline' | 'cost' | 'university'