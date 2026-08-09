import { mdxComponents, mdxOptions } from '@/components/content/mdx-components'
import { Prose } from '@/components/content/prose'
import { ContactSection } from '@/components/sections/contact-section'
import { H1 } from '@/components/typography'
import { getAllWork, getWorkBySlug } from '@/lib/content'
import { siteConfig } from '@/lib/site-config'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const work = await getAllWork()
  return work.map((entry) => ({ slug: entry.slug }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const entry = await getWorkBySlug(slug)

  if (!entry) return {}

  return {
    title: entry.frontmatter.title,
    description: entry.frontmatter.summary,
    alternates: {
      canonical: `/work/${entry.slug}`
    },
    robots: entry.frontmatter.draft
      ? { index: false, follow: false }
      : undefined
  }
}

export default async function WorkCaseStudyPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = await getWorkBySlug(slug)

  if (!entry) {
    notFound()
  }

  const all = await getAllWork()
  const index = all.findIndex((item) => item.slug === slug)
  const previous = all[index + 1]
  const next = all[index - 1]

  const creativeWorkJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: entry.frontmatter.title,
    description: entry.frontmatter.summary,
    creator: { '@type': 'Person', name: siteConfig.name },
    dateCreated: `${entry.frontmatter.year}`,
    keywords: entry.frontmatter.stack.join(', '),
    url: `${siteConfig.url}/work/${entry.slug}`
  }

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static, internally-defined JSON-LD, no user input
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(creativeWorkJsonLd)
        }}
      />
      <article className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
        <H1>{entry.frontmatter.title}</H1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
          <span>{entry.frontmatter.year}</span>
          <span>{entry.frontmatter.role}</span>
          <span className="font-mono text-xs">
            {entry.frontmatter.stack.join(' · ')}
          </span>
          {entry.frontmatter.repo ? (
            <a
              href={entry.frontmatter.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Repository
            </a>
          ) : null}
          {entry.frontmatter.demo ? (
            <a
              href={entry.frontmatter.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Live demo
            </a>
          ) : null}
        </div>

        <p className="mt-6 max-w-[65ch] text-lg text-muted-foreground">
          {entry.frontmatter.summary}
        </p>

        <div className="mt-12">
          <Prose>
            <MDXRemote
              source={entry.content}
              components={mdxComponents}
              options={{ mdxOptions }}
            />
          </Prose>
        </div>

        <nav className="mt-16 flex items-center justify-between gap-4 border-t pt-6 text-sm">
          {previous ? (
            <Link href={`/work/${previous.slug}`} className="hover:underline">
              ← {previous.frontmatter.title}
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link href={`/work/${next.slug}`} className="hover:underline">
              {next.frontmatter.title} →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>

      <ContactSection />
    </>
  )
}
