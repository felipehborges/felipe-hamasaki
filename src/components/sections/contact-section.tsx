import { Link } from '@/i18n/navigation'
import { siteConfig } from '@/lib/site-config'
import { useTranslations } from 'next-intl'

export function ContactSection() {
  const t = useTranslations('Home.contact')

  return (
    <section className="portfolio-contact portfolio-section" id="contact">
      <div className="portfolio-container portfolio-contact-inner">
        <span className="portfolio-kicker">{t('kicker')}</span>
        <h2>
          {t('titleLine1')}
          <br />
          <em>{t('titleLine2')}</em>
        </h2>

        <a className="portfolio-email" href={`mailto:${siteConfig.email}`}>
          {siteConfig.email} <span aria-hidden="true">↗</span>
        </a>

        <div className="portfolio-socials">
          <Link
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn <span aria-hidden="true">↗</span>
          </Link>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
