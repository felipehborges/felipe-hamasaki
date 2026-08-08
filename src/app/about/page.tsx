import DownloadResumeButton from '@/components/download-resume-button'
import { ContactSection } from '@/components/sections/contact-section'
import { H1, H2, P } from '@/components/typography'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About'
}

const skills = [
  'TypeScript',
  'JavaScript',
  'React',
  'Next.js',
  'Node.js',
  'NestJS',
  'Fastify',
  'Prisma',
  'PostgreSQL',
  'MySQL',
  'Tailwind CSS',
  'Python',
  'Git'
]

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
        <H1>About</H1>

        {/* TODO(content): opening line. See 05-estrategia-conteudo.md, briefing bloco 4. */}
        <p className="mt-4 max-w-[65ch] text-lg text-muted-foreground">
          TODO(content): opening line for the about page.
        </p>

        <div className="mt-12 grid gap-12 md:grid-cols-[2fr_1fr]">
          <div className="flex flex-col gap-6">
            <P>
              Born in December 1994, I was immersed in technology from a young
              age thanks to my father — a web designer and journalist — whose
              passion for computers naturally influenced my early interests.
            </P>

            <P>
              Although I was always drawn to games and PCs, my true calling in
              the tech industry only emerged later. I initially carved out a
              six-year career in Human Resources, a journey that honed my people
              skills and strategic thinking.
            </P>

            <P>
              At the onset of the pandemic, I discovered programming, and its
              creative and problem-solving aspects ignited a profound passion
              within me.
            </P>

            <P>
              Since then, I have dedicated myself to continuous learning and
              professional growth.
            </P>

            {/* TODO(content): expand this narrative. See 05-estrategia-conteudo.md, briefing bloco 4. */}
            <P className="text-muted-foreground italic">
              TODO(content): expand this narrative with briefing bloco 4.
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
              A childhood photo.
            </figcaption>
          </figure>
        </div>

        <div className="mt-16">
          <H2>How I work</H2>

          {/* TODO(content): method, communication style, what you value in a team.
              See 05-estrategia-conteudo.md, briefing bloco 4. */}
          <p className="mt-4 max-w-[65ch] text-muted-foreground italic">
            TODO(content): how I work — briefing bloco 4.
          </p>
        </div>

        <div className="mt-16">
          <H2>Skills</H2>

          {/* TODO(content): group by depth (working daily / comfortable / familiar).
              See 02-arquitetura-informacao.md — depth is a self-assessment only the
              project owner can make honestly. */}
          <p className="mt-2 max-w-[65ch] text-muted-foreground text-sm italic">
            TODO(content): group these by depth (working daily / comfortable /
            familiar).
          </p>

          <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-1 font-mono text-muted-foreground text-sm">
            {skills.map((skill, index) => (
              <li key={skill}>
                {skill}
                {index < skills.length - 1 ? ' ·' : ''}
              </li>
            ))}
          </ul>
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
