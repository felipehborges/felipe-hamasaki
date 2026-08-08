import { H2 } from '@/components/typography'
import Link from 'next/link'

interface ExperienceEntry {
  title: string
  company: string
  companyUrl?: string
  period: string
  location: string
}

const experience: ExperienceEntry[] = [
  {
    title: 'Mid-Level Full Stack Developer',
    company: 'ODEEN — Intelligence for Security',
    companyUrl: 'https://www.odeen.com.br/',
    period: '2025 — Present',
    location: 'Mogi das Cruzes, SP'
  },
  {
    title: 'Mid-Level Front-End Developer',
    company: 'ODEEN — Intelligence for Security',
    companyUrl: 'https://www.odeen.com.br/',
    period: '2023 — 2025',
    location: 'Mogi das Cruzes, SP'
  },
  {
    title: 'Junior Front-End Developer',
    company: 'ODEEN — Intelligence for Security',
    companyUrl: 'https://www.odeen.com.br/',
    period: '2022 — 2023',
    location: 'Mogi das Cruzes, SP'
  },
  {
    title: 'Human Resources Analyst',
    company: 'Tower International (Autokiniton)',
    companyUrl: 'https://www.autokiniton.com/',
    period: '2015 — 2021',
    location: 'Arujá, SP'
  },
  {
    title: 'English Teacher',
    company: 'Skill Idiomas',
    companyUrl: 'https://www.linkedin.com/company/skill-idiomas',
    period: '2012 — 2014',
    location: 'Arujá, SP'
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

            {/* TODO(content): one to three lines on what was built and its impact.
                See 05-estrategia-conteudo.md, briefing bloco 2. */}
            <p className="mt-2 max-w-[65ch] text-muted-foreground text-sm italic">
              TODO(content): what was built and what changed in this role.
            </p>
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
