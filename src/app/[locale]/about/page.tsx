import { ContactSection } from '@/components/sections/contact-section'
import { routing } from '@/i18n/routing'
import { absoluteLocalizedUrl, languageAlternates } from '@/i18n/urls'
import type { Metadata } from 'next'
import { hasLocale, useTranslations } from 'next-intl'
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
    title: t('aboutTitle'),
    description: t('aboutDescription'),
    alternates: {
      canonical: absoluteLocalizedUrl('/about', locale),
      languages: languageAlternates('/about')
    }
  }
}
export default function AboutPage() {
  const t = useTranslations('Portfolio')
  return (
    <div className="folio">
      <section className="folio-container folio-about-page">
        <p className="hero-role">FELIPE HAMASAKI</p>
        <h1>{t('about')}</h1>
        <div className="about-copy">
          <p>{t('bio')}</p>
          <span>{t('personal')}</span>
        </div>
      </section>
      <ContactSection />
    </div>
  )
}
