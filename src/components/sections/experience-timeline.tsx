'use client'

import { Eyebrow, H2 } from '@/components/typography'
import { Reveal } from '@/components/ui/reveal'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface ExperienceEntry {
  title: string
  company: string
  companyUrl?: string
  period: string
  location: string
  context?: string
  body?: string[]
}

const experience: ExperienceEntry[] = [
  {
    title: 'Full Stack Developer',
    company: 'ODEEN — Intelligence for Security',
    companyUrl: 'https://www.odeen.com.br/',
    period: 'Mar 2025 — Present',
    location: 'Mogi das Cruzes, SP',
    context:
      "Corporate intelligence and investigation group. Fraud prevention and asset recovery for insurers, vehicle protection, telecom and energy clients — 24/7 operations, sensitive personal data under Brazil's LGPD.",
    body: [
      'I work across the stack on SCI², the core intelligence platform — live vehicle tracking, mapping, advanced search and cross-source data matching, used around the clock by roughly 100 analysts — and on SGRLock, a client-facing fraud-screening service. React and Next.js on one side; Node.js, Express and MySQL with hand-written SQL on the other.',
      'I helped ship a real-time security monitoring product for telecom tower sites: live video streaming, smoke detection, door locks and anti-theft sensors, delivered over WebSocket and polling and integrated with hardware built in-house. It won the company new contracts with Brazil’s largest mobile operators.',
      'I integrate the platform with public records databases, vehicle telemetry providers, insurers, payment gateways and messaging channels, and expose REST APIs consumed directly by corporate clients.',
      "I'm driving an incremental migration to a feature-based architecture, to cut coupling as the platform grows."
    ]
  },
  {
    title: 'Front End Developer',
    company: 'ODEEN — Intelligence for Security',
    companyUrl: 'https://www.odeen.com.br/',
    period: 'May 2023 — Feb 2025',
    location: 'Mogi das Cruzes, SP',
    body: [
      'I built and maintained an internal library of around 50 React components, published as a private npm package and reused across the company’s products.',
      'I introduced the engineering standards our five-person team still works by: moved linting from ESLint to Biome, standardised on pnpm, and defined release-based branching, naming and documentation conventions. There was pushback at first; the standards stuck.',
      'I led implementation of new features and interface components, and mentored a junior developer through onboarding.'
    ]
  },
  {
    title: 'Junior Front End Developer',
    company: 'ODEEN — Intelligence for Security',
    companyUrl: 'https://www.odeen.com.br/',
    period: 'Jan 2022 — Apr 2023',
    location: 'Mogi das Cruzes, SP',
    context: 'Where I started on the platform I still work on today.',
    body: [
      'I built responsive interfaces with React, TypeScript and Tailwind CSS, and maintained the operator tools the team uses daily.'
    ]
  },
  {
    title: 'Personnel Administration Analyst',
    company: 'Autokiniton (formerly Tower International)',
    companyUrl: 'https://www.autokiniton.com/',
    period: 'Mar 2017 — Mar 2021',
    location: 'Arujá, SP',
    context: 'American automotive manufacturing multinational.',
    body: [
      'Payroll, time-and-attendance systems, onboarding and offboarding, and management reporting. I built the reporting and data cross-referencing in Excel, and used English regularly with the US organisation. I started studying programming during this period.'
    ]
  },
  {
    title: 'Human Resources Intern',
    company: 'Autokiniton (formerly Tower International)',
    companyUrl: 'https://www.autokiniton.com/',
    period: 'Apr 2015 — Mar 2017',
    location: 'Arujá, SP'
  },
  {
    title: 'English Teacher',
    company: 'Skill Idiomas',
    companyUrl: 'https://www.linkedin.com/company/skill-idiomas',
    period: 'Jan 2013 — Dec 2014',
    location: 'Arujá, SP',
    body: [
      'Taught English from beginner to intermediate level. This is where the C2 proficiency comes from.'
    ]
  }
]

export function ExperienceTimeline() {
  const railRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const el = railRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const progressed = vh * 0.7 - rect.top
      const pct = Math.max(0, Math.min(100, (progressed / rect.height) * 100))
      setProgress(pct)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
      <Eyebrow>Career</Eyebrow>
      <H2 className="mt-2">Experience</H2>

      <div className="mt-10 grid grid-cols-[20px_1fr] gap-x-8">
        <div
          ref={railRef}
          className="relative w-px justify-self-center bg-border"
        >
          <div
            className="absolute top-0 left-0 w-px bg-primary transition-[height] duration-100 ease-linear"
            style={{ height: `${progress}%` }}
          />
        </div>

        <ol className="flex flex-col gap-16">
          {experience.map((entry, index) => (
            <Reveal key={`${entry.company}-${entry.period}`} delay={index * 40}>
              <li className="exp-item relative -my-3 -mr-3 py-3 pr-3">
                <span className="exp-dot absolute top-1.5 left-[-41px] size-2.5 rounded-full bg-primary" />

                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-semibold text-h3 tracking-tight">
                    {entry.title}
                  </h3>
                  <span className="font-mono text-muted-foreground text-xs uppercase tracking-wide">
                    {entry.period}
                  </span>
                </div>

                <p className="mt-1 text-muted-foreground text-sm">
                  {entry.companyUrl ? (
                    <Link
                      href={entry.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground hover:underline"
                    >
                      {entry.company}
                    </Link>
                  ) : (
                    entry.company
                  )}{' '}
                  · {entry.location}
                </p>

                {entry.context ? (
                  <p className="mt-3 max-w-[65ch] font-serif text-sm italic">
                    {entry.context}
                  </p>
                ) : null}

                {entry.body?.map((line) => (
                  <p
                    key={line}
                    className="mt-2 max-w-[65ch] text-muted-foreground text-sm"
                  >
                    {line}
                  </p>
                ))}
              </li>
            </Reveal>
          ))}
        </ol>
      </div>

      <p className="mt-10">
        <Link href="/about" className="link-sweep text-sm">
          Read the full story →
        </Link>
      </p>
    </section>
  )
}
