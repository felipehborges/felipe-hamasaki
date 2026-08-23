import { H1 } from '@/components/typography'
import { getAllWork, hasWork } from '@/lib/content'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Case studies on real projects I have built — the problem I was solving, the constraints, the decisions I made, and what changed as a result.',
  alternates: {
    canonical: '/work'
  }
}

export default async function WorkPage() {
  if (!(await hasWork())) {
    notFound()
  }

  const work = await getAllWork()

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
      <H1>Work</H1>

      <p className="mt-4 max-w-[65ch] text-muted-foreground">
        Case studies from recent projects.
      </p>

      <ol className="mt-12 flex flex-col gap-10">
        {work.map((entry) => (
          <li key={entry.slug}>
            <Link
              href={`/work/${entry.slug}`}
              className="group flex flex-col gap-1"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h2 className="font-semibold text-h3 tracking-tight group-hover:underline">
                  {entry.frontmatter.title}
                  {entry.frontmatter.draft ? (
                    <span className="ml-2 font-mono text-muted-foreground text-xs uppercase">
                      Draft
                    </span>
                  ) : null}
                </h2>
                <span className="font-mono text-muted-foreground text-xs">
                  {entry.frontmatter.year}
                </span>
              </div>

              <p className="text-muted-foreground text-sm">
                {entry.frontmatter.summary}
              </p>

              <p className="font-mono text-muted-foreground text-xs">
                {entry.frontmatter.stack.join(' · ')}
              </p>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  )
}
