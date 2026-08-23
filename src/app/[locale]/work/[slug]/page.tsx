import { mdxComponents, mdxOptions } from '@/components/content/mdx-components'
import { Prose } from '@/components/content/prose'
import { ContactSection } from '@/components/sections/contact-section'
import { H1 } from '@/components/typography'
import { Link } from '@/i18n/navigation'
import { type AppLocale, routing } from '@/i18n/routing'
import { absoluteLocalizedUrl, languageAlternates } from '@/i18n/urls'
import { getAllWork, getWorkBySlug } from '@/lib/content'
import { siteConfig } from '@/lib/site-config'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const params = []

  for (const locale of routing.locales) {
    for (const entry of await getAllWork(locale)) {
      params.push({ locale, slug: entry.slug })
    }
  }

  return params
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: AppLocale; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const entry = await getWorkBySlug(slug, locale)

  if (!entry) return {}

  return {
    title: entry.frontmatter.title,
    description: entry.frontmatter.summary,
    alternates: {
      canonical: absoluteLocalizedUrl(`/work/${entry.slug}`, locale),
      languages: languageAlternates(`/work/${entry.slug}`)
    },
    robots: entry.frontmatter.draft
      ? { index: false, follow: false }
      : undefined
  }
}

export default async function WorkCaseStudyPage({
  params
}: {
  params: Promise<{ locale: AppLocale; slug: string }>
}) {
  const { locale, slug } = await params
  const entry = await getWorkBySlug(slug, locale)

  if (!entry) {
    notFound()
  }

  const [all, t] = await Promise.all([
    getAllWork(locale),
    getTranslations({ locale, namespace: 'Work' })
  ])
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
    url: absoluteLocalizedUrl(`/work/${entry.slug}`, locale),
    inLanguage: locale
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
              {t('repository')}
            </a>
          ) : null}
          {entry.frontmatter.demo ? (
            <a
              href={entry.frontmatter.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {t('liveDemo')}
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
