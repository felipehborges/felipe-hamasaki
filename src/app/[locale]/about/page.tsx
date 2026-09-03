import DownloadResumeButton from '@/components/download-resume-button'
import { ContactSection } from '@/components/sections/contact-section'
import { H1, H2, P } from '@/components/typography'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { routing } from '@/i18n/routing'
import { absoluteLocalizedUrl, languageAlternates } from '@/i18n/urls'
import type { Metadata } from 'next'
import { hasLocale, useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) return {}

  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('aboutTitle'),
    description: t('aboutDescription'),
    alternates: {
      canonical: absoluteLocalizedUrl('/about', locale),
      languages: languageAlternates('/about')
    }
  }
}

export default function AboutPage() {
  const t = useTranslations('About')
  const resume = useTranslations('Resume')
  const skillGroups = [
    {
      label: t('daily'),
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
      label: t('comfortable'),
      items: [
        'WebSocket',
        'Zustand',
        'React Query',
        t('componentLibraries'),
        t('featureArchitecture'),
        'Biome',
        'pnpm',
        'Agile / Scrum',
        'Jira'
      ]
    },
    {
      label: t('context'),
      items: [
        'Google Cloud Platform',
        'CI/CD',
        'JWT / OAuth',
        'Role-based access control',
        'LGPD'
      ]
    }
  ]

  return (
    <>
      <section className="portfolio-page portfolio-about-page mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
        <H1>{t('title')}</H1>

        <p className="mt-4 max-w-[65ch] text-lg">{t('intro')}</p>

        <div className="mt-12 grid gap-12 md:grid-cols-[2fr_1fr]">
          <div className="flex flex-col gap-6">
            <P>{t('story1')}</P>
            <P>{t('story2')}</P>
            <P>{t('story3')}</P>
            <P>{t('story4')}</P>
            <P>{t('story5')}</P>
          </div>

          <Card asChild className="portfolio-photo-card">
            <figure>
              <CardContent className="flex flex-col gap-3">
                <Image
                  src="/hamasaki/child.png"
                  alt={t('photoAlt')}
                  width={400}
                  height={400}
                  className="border-2 border-border"
                />
                <figcaption className="text-muted-foreground text-sm">
                  {t('photoCaption')}
                </figcaption>
              </CardContent>
            </figure>
          </Card>
        </div>

        <Separator className="mt-16" />
        <div className="mt-8">
          <H2>{t('howIWork')}</H2>

          <div className="mt-4 flex max-w-[65ch] flex-col gap-6">
            <P>{t('work1')}</P>
            <P>{t('work2')}</P>
            <P>{t('work3')}</P>
            <P>{t('work4')}</P>
          </div>
        </div>

        <Separator className="mt-16" />
        <div className="mt-8">
          <H2>{t('skills')}</H2>

          <p className="mt-4 max-w-[65ch] text-muted-foreground">
            {t('skillsIntro')}
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
                <dd className="flex max-w-[55ch] flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge variant="secondary" key={item}>
                      {item}
                    </Badge>
                  ))}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 max-w-[65ch] text-muted-foreground text-sm">
            {t('contextNote')}
          </p>
        </div>

        <Separator className="mt-16" />
        <div className="mt-8">
          <H2>{t('resume')}</H2>
          <div className="mt-4">
            <DownloadResumeButton
              labels={{
                download: resume('download'),
                selectLanguage: resume('selectLanguage'),
                english: resume('english'),
                portuguese: resume('portuguese'),
                close: resume('close')
              }}
            />
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
