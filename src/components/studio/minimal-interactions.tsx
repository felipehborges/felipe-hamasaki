'use client'

import {
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useState
} from 'react'

export function TiltCard({
  children,
  label
}: {
  children: ReactNode
  label: string
}) {
  function tilt(event: ReactPointerEvent<HTMLDivElement>) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const element = event.currentTarget
    const rect = element.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    element.style.transform = `perspective(900px) rotateX(${-y * 2}deg) rotateY(${x * 2}deg) translateY(-2px)`
    element.style.boxShadow = '0 16px 34px -24px rgba(22,24,29,.35)'
  }

  function reset(event: ReactPointerEvent<HTMLDivElement>) {
    event.currentTarget.style.transform = ''
    event.currentTarget.style.boxShadow = ''
  }

  return (
    <div
      className="minimal-project-visual"
      onPointerMove={tilt}
      onPointerLeave={reset}
      aria-label={label}
    >
      <div>{children}</div>
    </div>
  )
}

export function Playground({
  labels
}: {
  labels: {
    magnetic: string
    pull: string
    springSwitch: string
    elasticTabs: string
    design: string
    build: string
    ship: string
  }
}) {
  const [enabled, setEnabled] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  function attract(event: ReactPointerEvent<HTMLDivElement>) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const button = event.currentTarget.querySelector<HTMLElement>('button')
    if (!button) return
    const rect = button.getBoundingClientRect()
    const x = (event.clientX - (rect.left + rect.width / 2)) * 0.26
    const y = (event.clientY - (rect.top + rect.height / 2)) * 0.3
    button.style.transform = `translate(${x}px, ${y}px)`
  }

  function release(event: ReactPointerEvent<HTMLDivElement>) {
    const button = event.currentTarget.querySelector<HTMLElement>('button')
    if (button) button.style.transform = ''
  }

  const tabs = [labels.design, labels.build, labels.ship]

  return (
    <div className="minimal-playground">
      <div className="minimal-play-card">
        <span>{labels.magnetic}</span>
        <div onPointerMove={attract} onPointerLeave={release}>
          <button className="minimal-magnetic" type="button">
            {labels.pull}
          </button>
        </div>
      </div>
      <div className="minimal-play-card">
        <span>{labels.springSwitch}</span>
        <div>
          <button
            className={`minimal-switch ${enabled ? 'is-enabled' : ''}`}
            type="button"
            role="switch"
            aria-checked={enabled}
            onClick={() => setEnabled((value) => !value)}
          >
            <i />
          </button>
        </div>
      </div>
      <div className="minimal-play-card">
        <span>{labels.elasticTabs}</span>
        <div>
          <div className="minimal-tabs">
            <i
              style={{
                transform: `translateX(calc(${activeTab * 100}% + ${activeTab * 2}px))`
              }}
            />
            {tabs.map((tab, index) => (
              <button
                className={activeTab === index ? 'is-active' : ''}
                key={tab}
                type="button"
                onClick={() => setActiveTab(index)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function LocalTime() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat('pt-BR', {
          timeZone: 'America/Sao_Paulo',
          hour: '2-digit',
          minute: '2-digit'
        }).format(new Date())
      )
    }
    update()
    const timer = window.setInterval(update, 20_000)
    return () => window.clearInterval(timer)
  }, [])

  return <span>{time}</span>
}
