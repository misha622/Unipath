// Типы данных UniPath

export type Program = {
  id: string
  university_id: string
  title: string
  degree_level: 'Bachelor' | 'Master' | 'PhD'
  cost_per_year: {
    currency: string
    amount: number
  }
  language_req: {
    ielts?: number
    toefl?: number
    ielts_min_section?: number
  }
  gpa_req: number // например 4.0 из 5.0
  deadline: string // ISO дата "2027-03-01"
  visa_country: string
  scholarship_available: boolean
  data_freshness: 'verified_by_uni' | 'parsed_auto' | 'manual_entry'
  last_updated: string
  motivation_letter_required: boolean
  portfolio_required: boolean
}

export type University = {
  id: string
  slug: string
  name: string
  country: string
  city: string
  logo_url: string
  description_short: string
  description_full: string
  student_count: number
  international_student_percent: number
  website_url: string
  housing_available: boolean
  housing_cost_monthly: number // в USD
  cost_of_living_monthly: number // в USD
}

export type FilterState = {
  budget_max: number
  countries: string[]
  degree_level: string
  subject: string
  ielts_score: number
  toefl_score: number
  scholarship_only: boolean
}

export type WizardStep = 'budget' | 'subject' | 'language' | 'location' | 'results'

export type User = {
  id: string
  email: string
  saved_programs: string[] // program ids
}