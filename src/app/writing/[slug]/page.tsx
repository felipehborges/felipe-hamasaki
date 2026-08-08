import { mdxComponents, mdxOptions } from '@/components/content/mdx-components'
import { Prose } from '@/components/content/prose'
import { ContactSection } from '@/components/sections/contact-section'
import { H1 } from '@/components/typography'
import { getAllArticles, getArticleBySlug } from '@/lib/content'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((entry) => ({ slug: entry.slug }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const entry = await getArticleBySlug(slug)

  if (!entry) return {}

  return {
    title: entry.frontmatter.title,
    description: entry.frontmatter.summary
  }
}

export default async function ArticlePage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = await getArticleBySlug(slug)

  if (!entry) {
    notFound()
  }

  const all = await getAllArticles()
  const index = all.findIndex((item) => item.slug === slug)
  const previous = all[index + 1]
  const next = all[index - 1]

  return (
    <>
      <article className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
        <H1>{entry.frontmatter.title}</H1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
          <span>{entry.frontmatter.publishedAt}</span>
          <span>{entry.readingTime}</span>
        </div>

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
            <Link
              href={`/writing/${previous.slug}`}
              className="hover:underline"
            >
              ← {previous.frontmatter.title}
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link href={`/writing/${next.slug}`} className="hover:underline">
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
