import { siteConfig } from '@/lib/site-config'
import { useLocale, useTranslations } from 'next-intl'

export function ContactSection() {
  const t = useTranslations('Studio')
  const hero = useTranslations('Home.hero')
  const locale = useLocale()
  const resume =
    locale === 'pt-BR' ? siteConfig.resume.pt : siteConfig.resume.en
  return (
    <div className="cc">
      <section className="studio-contact" id="contact" data-scroll>
        <div className="cc-inner">
          <div className="cc-meta">
            <span>{t('contactSide')}</span>
            <span>UTC−3 / C2 ENGLISH</span>
          </div>
          <h2>
            {t('contactLine')}
            <br />
            <em>{t('contactEmphasis')}</em>
          </h2>
          <p>{t('contactNote')}</p>
          <div className="studio-contact-actions">
            <a className="studio-email" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email} <span aria-hidden="true">↗</span>
            </a>
            <a
              className="cc-hard-button"
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              {hero('resume')} <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="studio-socials">
            <div>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
            </div>
            <a href="#main-content">{t('top')} ↑</a>
          </div>
        </div>
        <div className="studio-signoff">{t('humor')}</div>
      </section>
    </div>
  )
}
