import { AboutSection } from '@/components/sections/about-section'
import { ContactSection } from '@/components/sections/contact-section'
import { ExperienceTimeline } from '@/components/sections/experience-timeline'
import { Hero } from '@/components/sections/hero'
import { SelectedWork } from '@/components/sections/selected-work'
import { StackSection } from '@/components/sections/stack-section'
import { routing } from '@/i18n/routing'
import { absoluteLocalizedUrl, languageAlternates } from '@/i18n/urls'
import { siteConfig } from '@/lib/site-config'
import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) return {}

  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    description: t('description'),
    alternates: {
      canonical: absoluteLocalizedUrl('/', locale),
      languages: languageAlternates('/')
    }
  }
}

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: t('role'),
    url: absoluteLocalizedUrl('/', locale as (typeof routing.locales)[number]),
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'São Paulo',
      addressCountry: 'BR'
    },
    knowsAbout: [
      'TypeScript',
      'JavaScript',
      'React',
      'Next.js',
      'Node.js',
      'Express',
      'MySQL',
      'REST APIs',
      'WebSocket'
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static, internally-defined JSON-LD, no user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Hero />
      <SelectedWork />
      <StackSection />
      <AboutSection />
      <ExperienceTimeline />
      <ContactSection />
    </>
  )
}
