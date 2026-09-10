import { siteConfig } from '@/lib/site-config'
import { useLocale, useTranslations } from 'next-intl'

export function ContactSection() {
  const t = useTranslations('Portfolio')
  const locale = useLocale()
  return (
    <section className="folio-contact folio-container" id="contact">
      <div className="section-heading">
        <h2>{t('contact')}</h2>
        <span>03</span>
      </div>
      <a className="contact-title" href={`mailto:${siteConfig.email}`}>
        {t('letsTalk')} <span aria-hidden="true">↗</span>
      </a>
      <div className="contact-bottom">
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        <div className="contact-links">
          <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a
            href={
              locale === 'pt-BR' ? siteConfig.resume.pt : siteConfig.resume.en
            }
            target="_blank"
            rel="noreferrer"
          >
            {t('resume')} ↓
          </a>
        </div>
      </div>
    </section>
  )
}
