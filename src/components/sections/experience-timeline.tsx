import { H2 } from '@/components/typography'
import Link from 'next/link'

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
    period: 'Jan 2012 — Dec 2014',
    location: 'Arujá, SP',
    body: [
      'Taught English from beginner to intermediate level. This is where the C2 proficiency comes from.'
    ]
  }
]

export function ExperienceTimeline() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
      <H2>Experience</H2>

      <ol className="mt-8 flex flex-col gap-12">
        {experience.map((entry) => (
          <li key={`${entry.company}-${entry.period}`}>
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
              <p className="mt-3 max-w-[65ch] text-sm italic">
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
        ))}
      </ol>

      <p className="mt-8">
        <Link href="/about" className="text-sm hover:underline">
          Read the full story →
        </Link>
      </p>
    </section>
  )
}
