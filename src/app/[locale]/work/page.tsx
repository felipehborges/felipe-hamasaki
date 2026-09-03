import { H1 } from '@/components/typography'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Link } from '@/i18n/navigation'
import { type AppLocale, routing } from '@/i18n/routing'
import { absoluteLocalizedUrl, languageAlternates } from '@/i18n/urls'
import { getAllWork, hasWork } from '@/lib/content'
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
    title: t('workTitle'),
    description: t('workDescription'),
    alternates: {
      canonical: absoluteLocalizedUrl('/work', locale),
      languages: languageAlternates('/work')
    }
  }
}

export default async function WorkPage({
  params
}: {
  params: Promise<{ locale: AppLocale }>
}) {
  const { locale } = await params

  if (!(await hasWork(locale))) {
    notFound()
  }

  const [work, t] = await Promise.all([
    getAllWork(locale),
    getTranslations({ locale, namespace: 'Work' })
  ])

  return (
    <section className="portfolio-page portfolio-list-page mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
      <H1>{t('title')}</H1>

      <p className="mt-4 max-w-[65ch] text-muted-foreground">{t('intro')}</p>

      <ol className="mt-12 flex flex-col gap-10">
        {work.map((entry) => (
          <li key={entry.slug}>
            <Card
              asChild
              className="portfolio-list-card transition-colors hover:border-primary/50"
            >
              <Link
                href={`/work/${entry.slug}`}
                className="group flex flex-col gap-3 p-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <h2 className="font-semibold text-h3 tracking-tight group-hover:underline">
                    {entry.frontmatter.title}
                  </h2>
                  <div className="flex items-center gap-2">
                    {entry.frontmatter.draft ? (
                      <Badge variant="secondary">{t('draft')}</Badge>
                    ) : null}
                    <Badge variant="outline">{entry.frontmatter.year}</Badge>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm">
                  {entry.frontmatter.summary}
                </p>

                <div className="flex flex-wrap gap-2">
                  {entry.frontmatter.stack.map((technology) => (
                    <Badge variant="secondary" key={technology}>
                      {technology}
                    </Badge>
                  ))}
                </div>
              </Link>
            </Card>
          </li>
        ))}
      </ol>
    </section>
  )
}
