import DownloadResumeButton from '@/components/download-resume-button'
import { ContactSection } from '@/components/sections/contact-section'
import { H1, H2, P } from '@/components/typography'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Full stack developer working on corporate intelligence platforms. Six years in HR before moving into software, and two years teaching English before that.',
  alternates: {
    canonical: '/about'
  }
}

const skillGroups = [
  {
    label: 'Working daily',
    items: [
      'TypeScript',
      'JavaScript',
      'React',
      'Next.js',
      'Node.js',
      'Express',
      'MySQL',
      'SQL',
      'REST APIs',
      'Tailwind CSS',
      'Git'
    ]
  },
  {
    label: 'Comfortable',
    items: [
      'WebSocket',
      'Zustand',
      'React Query',
      'Design systems',
      'Web accessibility',
      'Jest',
      'Vitest',
      'Biome',
      'pnpm',
      'Agile / Scrum',
      'Jira'
    ]
  },
  {
    label: 'Work alongside',
    items: [
      'Google Cloud Platform',
      'CI/CD pipelines',
      'JWT / OAuth',
      'Role-based access control',
      'LGPD compliance'
    ]
  }
]

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
        <H1>About</H1>

        <p className="mt-4 max-w-[65ch] text-lg">
          I build and modernise operational software for corporate intelligence
          and fraud prevention. I got here through human resources and an
          English classroom, which turns out to matter more than it sounds.
        </p>

        <div className="mt-12 grid gap-12 md:grid-cols-[2fr_1fr]">
          <div className="flex flex-col gap-6">
            <P>
              I was born in December 1994 and grew up around computers, mostly
              because of my father — a web designer and journalist. I was always
              drawn to games and PCs, but it took me a long time to consider
              building software as work rather than a hobby.
            </P>

            <P>
              So I did something else first. I taught English for two years,
              then spent six years in human resources at an American automotive
              multinational — starting as an intern and ending as a personnel
              administration analyst, running payroll, time-and-attendance
              systems and management reporting.
            </P>

            <P>
              The part of that job I liked most was the part nobody assigned me:
              building the reports. I spent years cross-referencing data in
              Excel, working out what a number actually meant and how to present
              it so that someone else could act on it. Around 2020 I started
              studying programming in the evenings — Python and JavaScript first
              — with the specific intent of changing careers.
            </P>

            <P>
              I joined ODEEN in January 2022 as a junior frontend developer and
              I'm still on the same platform today, now working across the
              stack. I finished a degree in Systems Analysis and Development
              alongside the job.
            </P>

            <P>
              The HR years are the least obvious thing on my CV and the part I'd
              defend hardest. Six years of payroll teaches you that some
              mistakes are not recoverable, that the person on the other end of
              a bad interface is having a worse day than you are, and that
              nobody reads documentation you didn't make easy to read. I build
              operator tools now. It's the same job with different inputs.
            </P>
          </div>

          <figure className="flex flex-col gap-2">
            <Image
              src="/hamasaki/child.png"
              alt="A childhood photo of Felipe Hamasaki"
              width={400}
              height={400}
              className="rounded-md border border-border"
            />
            <figcaption className="text-muted-foreground text-sm">
              Around the time computers became interesting.
            </figcaption>
          </figure>
        </div>

        <div className="mt-16">
          <H2>How I work</H2>

          <div className="mt-4 flex max-w-[65ch] flex-col gap-6">
            <P>
              I care about conventions more than most people find reasonable. On
              my current team I moved us from ESLint to Biome, standardised on
              pnpm, and set up release-based branching with naming and
              documentation rules. None of that was assigned to me, and the
              first reaction was resistance. I think it was worth the argument:
              conventions are what let five people touch the same codebase
              without negotiating every decision twice.
            </P>

            <P>
              I like being in the room when technical decisions get made, and I
              push for the ones I believe in. I'm also fine losing that argument
              — the alternative is a team where nobody says anything until
              something breaks.
            </P>

            <P>
              I use AI tooling heavily and I'm direct about it. It's changed how
              much I can take on, and I'd rather work somewhere that treats that
              as normal.
            </P>

            <P>
              I work in English every day and have done since long before this
              career. That's the part I'd point to if you're hiring remotely and
              wondering whether the communication will be a problem.
            </P>
          </div>
        </div>

        <div className="mt-16">
          <H2>Skills</H2>

          <p className="mt-4 max-w-[65ch] text-muted-foreground">
            Grouped by how deeply I actually use them, not by how many I can
            name.
          </p>

          <dl className="mt-8 flex flex-col gap-6">
            {skillGroups.map((group) => (
              <div
                key={group.label}
                className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6"
              >
                <dt className="font-mono text-muted-foreground text-xs uppercase tracking-wide sm:pt-1">
                  {group.label}
                </dt>
                <dd className="max-w-[55ch]">{group.items.join(' · ')}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 max-w-[65ch] text-muted-foreground text-sm">
            "Work alongside" means exactly that: our platform runs on this and I
            work within it every day, but infrastructure and auth are owned by
            other people on the team. I didn't build them.
          </p>
        </div>

        <div className="mt-16">
          <H2>Resume</H2>
          <div className="mt-4">
            <DownloadResumeButton />
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
