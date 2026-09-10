'use client'

import { Button } from '@/components/ui/button'
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

export type PortfolioStyle = 'terminal' | 'color' | 'minimal'
const styles: PortfolioStyle[] = ['terminal', 'color', 'minimal']
const StyleContext = createContext<{
  style: PortfolioStyle
  changeStyle: (style: PortfolioStyle) => void
}>({ style: 'minimal', changeStyle: () => {} })

export function PortfolioStyleProvider({ children }: { children: ReactNode }) {
  const [style, setStyle] = useState<PortfolioStyle>('minimal')
  useEffect(() => {
    try {
      const saved = localStorage.getItem('fh-portfolio-style')
      if (styles.includes(saved as PortfolioStyle)) {
        setStyle(saved as PortfolioStyle)
        document.documentElement.dataset.style = saved as PortfolioStyle
      }
    } catch {
      /* Storage is optional. */
    }
  }, [])
  function changeStyle(value: PortfolioStyle) {
    setStyle(value)
    document.documentElement.dataset.style = value
    try {
      localStorage.setItem('fh-portfolio-style', value)
    } catch {
      /* Optional preference. */
    }
  }
  return (
    <StyleContext.Provider value={{ style, changeStyle }}>
      {children}
    </StyleContext.Provider>
  )
}

export const usePortfolioStyle = () => useContext(StyleContext)

export function StyleSwitcher({
  labels
}: {
  labels: Record<PortfolioStyle, string> & { styleLabel: string }
}) {
  const { style, changeStyle } = usePortfolioStyle()
  return (
    <fieldset className="style-switcher" aria-label={labels.styleLabel}>
      {styles.map((value, index) => (
        <Button
          key={value}
          variant="ghost"
          size="sm"
          className="style-option"
          aria-pressed={style === value}
          onClick={() => changeStyle(value)}
        >
          <span className="style-number" aria-hidden="true">
            0{index + 1}
          </span>
          {labels[value]}
        </Button>
      ))}
    </fieldset>
  )
}
