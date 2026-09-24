'use client'
import { type ReactNode, useEffect, useRef, useState } from 'react'

export function ScrollCanvas({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = root.current
    if (!node) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    function update() {
      frame = 0
      if (!node) return
      const height = window.innerHeight
      for (const section of node.querySelectorAll<HTMLElement>(
        '[data-scroll]'
      )) {
        const rect = section.getBoundingClientRect()
        const progress = Math.max(
          -1,
          Math.min(1, (height / 2 - rect.top - rect.height / 2) / height)
        )
        section.style.setProperty(
          '--progress',
          reduced.matches ? '0' : String(progress)
        )
      }
    }
    function tick() {
      if (!frame) frame = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', tick, { passive: true })
    window.addEventListener('resize', tick)
    reduced.addEventListener('change', tick)
    update()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', tick)
      window.removeEventListener('resize', tick)
      reduced.removeEventListener('change', tick)
    }
  }, [])
  return (
    <div className="cc" ref={root}>
      {children}
    </div>
  )
}

type TerminalLabels = {
  label: string
  run: string
  ready: string
  help: string
  unknown: string
  clear: string
  who: string
  hire: string
  placeholder: string
}
export function PortfolioTerminal({ labels }: { labels: TerminalLabels }) {
  const [command, setCommand] = useState('')
  const [output, setOutput] = useState(labels.ready)
  function run(value: string) {
    const input = value.trim().toLowerCase()
    if (input === 'whoami') setOutput(labels.who)
    else if (input === 'help') setOutput(labels.help)
    else if (input === 'clear') setOutput(labels.clear)
    else if (input === 'sudo hire') setOutput(labels.hire)
    else if (input === 'stack')
      setOutput(
        'TypeScript · React · Next.js · Tailwind CSS\nNode.js · Express · MySQL · REST · WebSocket\nGit · Biome · pnpm'
      )
    else if (input === 'work' || input === 'contact') {
      document.getElementById(input)?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth'
      })
      setOutput(`✓ ${input}`)
    } else setOutput(labels.unknown)
    setCommand('')
  }
  return (
    <div className="cc-inspector" aria-label={labels.label}>
      <div className="cc-panel-head">
        <span aria-hidden="true">● ● ●</span>
        <span>felipe@portfolio:~</span>
      </div>
      <div className="cc-inspector-body">
        <p className="studio-terminal-intro">$ whoami</p>
        <p className="studio-terminal-name">
          Felipe Hamasaki<span>_</span>
        </p>
        <p className="studio-terminal-role">Full Stack Engineer / TypeScript</p>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            run(command)
          }}
        >
          <label htmlFor="portfolio-command">
            <span aria-hidden="true">~ $</span>
            <span className="sr-only">{labels.label}</span>
          </label>
          <input
            id="portfolio-command"
            value={command}
            onChange={(event) => setCommand(event.target.value)}
            placeholder={labels.placeholder}
            autoComplete="off"
            spellCheck={false}
          />
          <button type="submit" aria-label={labels.run}>
            ↵
          </button>
        </form>
        <output className="cc-output">{output}</output>
        <div className="cc-shortcuts">
          {['help', 'whoami', 'stack'].map((item) => (
            <button type="button" key={item} onClick={() => run(item)}>
              {item} ↗
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function FlipProof({
  labels
}: {
  labels: {
    flip: string
    back: string
    heading: string
    caption: string
    note: string
  }
}) {
  const [flipped, setFlipped] = useState(false)
  return (
    <div className="studio-proof">
      <div className="cc-flip-scene">
        <div className={`cc-flip ${flipped ? 'cc-flipped' : ''}`}>
          <div
            className="cc-face cc-face-front studio-proof-front"
            aria-hidden={flipped}
            inert={flipped}
          >
            <span className="studio-proof-label">{labels.heading}</span>
            <strong>
              ≈50<span>React</span>
            </strong>
            <p>{labels.caption}</p>
            <div className="studio-proof-pieces" aria-hidden="true">
              <span>Button ↗</span>
              <span>Input_</span>
              <span>Dialog ×</span>
              <span>Table ▦</span>
            </div>
          </div>
          <div
            className="cc-face cc-face-back"
            aria-hidden={!flipped}
            inert={!flipped}
          >
            <span>COMPONENTS / SHARED LANGUAGE</span>
            <pre>
              {
                'type Interface = {\n  components: "React";\n  language: "TypeScript";\n  styling: "Tailwind CSS";\n  conventions: [\n    "Biome",\n    "pnpm",\n    "documentation"\n  ];\n};'
              }
            </pre>
            <small>{labels.note}</small>
          </div>
        </div>
      </div>
      <button
        className="cc-hard-button"
        type="button"
        onClick={() => setFlipped((value) => !value)}
        aria-pressed={flipped}
      >
        {flipped ? labels.back : labels.flip}
        <span aria-hidden="true">↻</span>
      </button>
    </div>
  )
}
