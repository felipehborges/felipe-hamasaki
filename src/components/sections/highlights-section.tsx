import { Eyebrow } from '@/components/typography'
import { Reveal } from '@/components/ui/reveal'

const chips = [
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

export function HighlightsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 md:px-8 md:pb-32">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <Eyebrow>What stuck</Eyebrow>
          <blockquote className="mt-4 border-primary border-l-2 pl-6 font-serif text-2xl italic leading-snug">
            "The part of that job I liked most was the part nobody assigned
            me: building the reports."
          </blockquote>
        </Reveal>

        <Reveal delay={80}>
          <Eyebrow>Toolkit</Eyebrow>
          <div className="mt-4 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border px-3.5 py-1.5 text-muted-foreground text-sm"
              >
                {chip}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
