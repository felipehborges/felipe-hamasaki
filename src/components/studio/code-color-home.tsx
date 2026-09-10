import { ContactSection } from '@/components/sections/contact-section'
import { PrismaHero } from '@/components/ui/prisma-hero'
import { useTranslations } from 'next-intl'

export function CodeColorHome() {
  const t = useTranslations('Portfolio')
  return (
    <div className="folio">
      <div id="top">
        <PrismaHero />
      </div>
      <section className="folio-work folio-container" id="work">
        <div className="section-heading">
          <h2>{t('projects')}</h2>
          <span>01</span>
        </div>
        <div className="project-placeholder">
          <div className="project-mark" aria-hidden="true">
            ↗
          </div>
          <div>
            <h3>{t('inProgress')}</h3>
            <p>{t('projectNote')}</p>
          </div>
          <span className="project-index" aria-hidden="true">
            (—)
          </span>
        </div>
      </section>
      <section className="folio-about folio-container" id="about">
        <div className="section-heading">
          <h2>{t('about')}</h2>
          <span>02</span>
        </div>
        <div className="about-copy">
          <p>{t('bio')}</p>
          <span>{t('personal')}</span>
        </div>
      </section>
      <ContactSection />
    </div>
  )
}
