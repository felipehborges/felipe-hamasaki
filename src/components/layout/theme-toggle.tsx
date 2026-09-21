'use client'

import { Sun, Terminal } from 'lucide-react'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'fh-theme'

type Theme = 'light' | 'terminal'

export function ThemeToggle({
  lightLabel,
  terminalLabel
}: {
  lightLabel: string
  terminalLabel: string
}) {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    setTheme(
      document.documentElement.dataset.theme === 'terminal'
        ? 'terminal'
        : 'light'
    )
  }, [])

  function toggleTheme() {
    const nextTheme = theme === 'terminal' ? 'light' : 'terminal'
    document.documentElement.dataset.theme = nextTheme
    localStorage.setItem(STORAGE_KEY, nextTheme)
    setTheme(nextTheme)
  }

  const isTerminal = theme === 'terminal'
  const label = isTerminal ? lightLabel : terminalLabel

  return (
    <button
      type="button"
      className="minimal-theme-toggle"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      aria-pressed={isTerminal}
    >
      {isTerminal ? <Sun aria-hidden="true" /> : <Terminal aria-hidden="true" />}
    </button>
  )
}
