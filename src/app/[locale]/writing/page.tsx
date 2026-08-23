import { H1 } from '@/components/typography'
import { Link } from '@/i18n/navigation'
import { type AppLocale, routing } from '@/i18n/routing'
import { absoluteLocalizedUrl, languageAlternates } from '@/i18n/urls'
import { getAllArticles, hasArticles } from '@/lib/content'
import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) return {}

  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('writingTitle'),
    description: t('writingDescription'),
    alternates: {
      canonical: absoluteLocalizedUrl('/writing', locale),
      languages: languageAlternates('/writing')
    }
  }
}

export default async function WritingPage({
  params
}: {
  params: Promise<{ locale: AppLocale }>
}) {
  const { locale } = await params

  if (!(await hasArticles(locale))) {
    notFound()
  }

  const [articles, t] = await Promise.all([
    getAllArticles(locale),
    getTranslations({ locale, namespace: 'Writing' })
  ])

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
      <H1>{t('title')}</H1>

      <p className="mt-4 max-w-[65ch] text-muted-foreground">{t('intro')}</p>

      <ol className="mt-12 flex flex-col gap-10">
        {articles.map((entry) => (
          <li key={entry.slug}>
            <Link
              href={`/writing/${entry.slug}`}
              className="group flex flex-col gap-1"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h2 className="font-semibold text-h3 tracking-tight group-hover:underline">
                  {entry.frontmatter.title}
                  {entry.frontmatter.draft ? (
                    <span className="ml-2 font-mono text-muted-foreground text-xs uppercase">
                      {t('draft')}
                    </span>
                  ) : null}
                </h2>
                <span className="font-mono text-muted-foreground text-xs">
                  {entry.frontmatter.publishedAt}
                </span>
              </div>

              <p className="text-muted-foreground text-sm">
                {entry.frontmatter.summary}
              </p>

              <p className="font-mono text-muted-foreground text-xs">
                {t('readingTime', { minutes: entry.readingTimeMinutes })}
              </p>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  )
}
