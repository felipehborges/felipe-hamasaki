import { H2 } from '@/components/typography'
import { getAllWork, getFeaturedWork } from '@/lib/content'
import Link from 'next/link'

export async function SelectedWork() {
  const featured = await getFeaturedWork()

  if (featured.length === 0) {
    return null
  }

  const all = await getAllWork()
  const hasMore = all.length > featured.length

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
      <H2>Selected work</H2>

      <ol className="mt-8 flex flex-col gap-10">
        {featured.map((entry) => (
          <li key={entry.slug}>
            <Link
              href={`/work/${entry.slug}`}
              className="group flex flex-col gap-1"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h3 className="font-semibold text-h3 tracking-tight group-hover:underline">
                  {entry.frontmatter.title}
                </h3>
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

      {hasMore ? (
        <p className="mt-8">
          <Link href="/work" className="text-sm hover:underline">
            All work →
          </Link>
        </p>
      ) : null}
    </section>
  )
}
