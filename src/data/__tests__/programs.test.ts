import { programs } from '@/data/programs'

describe('programs data', () => {
  it('has at least 50 programs', () => {
    expect(programs.length).toBeGreaterThanOrEqual(50)
  })

  it('all programs have unique IDs', () => {
    const ids = programs.map(p => p.id)
    const unique = new Set(ids)
    expect(unique.size).toBe(programs.length)
  })

  it('all programs have valid degree', () => {
    const valid = ['Bachelor', 'Master', 'PhD']
    programs.forEach(p => {
      expect(valid).toContain(p.degree)
    })
  })

  it('all programs have valid IELTS range', () => {
    programs.forEach(p => {
      expect(p.ielts).toBeGreaterThanOrEqual(5.0)
      expect(p.ielts).toBeLessThanOrEqual(9.0)
    })
  })

  it('all programs have valid GPA range', () => {
    programs.forEach(p => {
      expect(p.gpa).toBeGreaterThanOrEqual(2.0)
      expect(p.gpa).toBeLessThanOrEqual(4.0)
    })
  })

  it('all deadlines are future dates', () => {
    const now = new Date('2026-06-29')
    programs.forEach(p => {
      expect(new Date(p.deadline).getTime()).toBeGreaterThan(now.getTime())
    })
  })

  it('all currencies are EUR', () => {
    programs.forEach(p => {
      expect(p.currency).toBe('EUR')
    })
  })

  it('has at least 8 free programs', () => {
    const free = programs.filter(p => p.costPerYear === 0)
    expect(free.length).toBeGreaterThanOrEqual(8)
  })

  it('has at least 42 programs with scholarships', () => {
    const withScholarship = programs.filter(p => p.scholarship)
    expect(withScholarship.length).toBeGreaterThanOrEqual(42)
  })

  it('covers at least 21 countries', () => {
    const countries = new Set(programs.map(p => p.country))
    expect(countries.size).toBeGreaterThanOrEqual(21)
  })
})