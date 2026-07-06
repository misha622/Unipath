'use client'

import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark'
    setDark(isDark)
    if (isDark) document.documentElement.classList.add('dark')
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button onClick={toggle} className="px-2 py-1 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
      {dark ? '☀️' : '🌙'}
    </button>
  )
}