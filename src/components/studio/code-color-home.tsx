import { ContactSection } from '@/components/sections/contact-section'
import { Sculpture } from '@/components/studio/sculpture'
import { useTranslations } from 'next-intl'

export function CodeColorHome() {
  const t = useTranslations('Portfolio')
  return (
    <div className="folio">
      <section className="folio-hero folio-container" id="top">
        <div className="hero-topline">
          <span>FELIPE HAMASAKI</span>
          <span>{t('availability')}</span>
        </div>
        <div className="hero-composition">
          <div className="hero-copy">
            <p className="hero-role">{t('role')}</p>
            <h1>
              {t('headline')}
              <br />
              <em>{t('headlineAccent')}</em>
              <span className="terminal-caret" aria-hidden="true">
                _
              </span>
            </h1>
            <p className="hero-description">{t('intro')}</p>
            <a href="#work" className="folio-link">
              {t('seeWork')} <span aria-hidden="true">↘</span>
            </a>
          </div>
          <Sculpture labels={{ pause: t('pause'), play: t('play') }} />
        </div>
        <div className="hero-baseline">
          <span>React · TypeScript · Next.js</span>
          <span>
            São Paulo, BR <span aria-hidden="true">↗</span>
          </span>
        </div>
      </section>
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
