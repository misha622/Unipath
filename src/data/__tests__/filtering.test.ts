import { programs } from '@/data/programs'

describe('filtering logic', () => {
  it('filters by search term', () => {
    const result = programs.filter(p =>
      p.university.toLowerCase().includes('munich') ||
      p.program.toLowerCase().includes('munich')
    )
    expect(result.length).toBeGreaterThan(0)
    result.forEach(p => {
      const match = p.university.toLowerCase().includes('munich') ||
                    p.program.toLowerCase().includes('munich')
      expect(match).toBe(true)
    })
  })

  it('filters by country', () => {
    const result = programs.filter(p => p.country === 'Germany')
    expect(result.length).toBeGreaterThan(0)
    result.forEach(p => {
      expect(p.country).toBe('Germany')
    })
  })

  it('filters by degree', () => {
    const result = programs.filter(p => p.degree === 'PhD')
    expect(result.length).toBeGreaterThan(0)
    result.forEach(p => {
      expect(p.degree).toBe('PhD')
    })
  })

  it('filters by max budget', () => {
    const result = programs.filter(p => p.costPerYear <= 5000)
    expect(result.length).toBeGreaterThan(0)
    result.forEach(p => {
      expect(p.costPerYear).toBeLessThanOrEqual(5000)
    })
  })

  it('filters scholarship only', () => {
    const result = programs.filter(p => p.scholarship)
    expect(result.length).toBeGreaterThan(0)
    result.forEach(p => {
      expect(p.scholarship).toBe(true)
    })
  })

  it('combines country and degree filters', () => {
    const result = programs.filter(p =>
      p.country === 'Netherlands' && p.degree === 'Master'
    )
    expect(result.length).toBeGreaterThan(0)
    result.forEach(p => {
      expect(p.country).toBe('Netherlands')
      expect(p.degree).toBe('Master')
    })
  })
})