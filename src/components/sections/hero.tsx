import { siteConfig } from '@/lib/site-config'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="portfolio-container portfolio-hero" id="top">
      <div className="portfolio-hero-copy">
        <div className="portfolio-eyebrow">
          <span className="portfolio-status-dot" />
          OPEN TO REMOTE ROLES
        </div>

        <h1>
          I build operational software people can rely on for{' '}
          <em>eight hours straight.</em>
        </h1>

        <p className="portfolio-hero-lede">
          I’m Felipe Hamasaki, a full stack engineer in Brazil. I turn complex
          intelligence, tracking, and fraud-prevention workflows into clear,
          dependable products.
        </p>

        <div className="portfolio-hero-actions">
          <a
            className="portfolio-button portfolio-button-primary"
            href={'mailto:' + siteConfig.email + '?subject=Intro%20call'}
          >
            Book a call <span aria-hidden="true">↗</span>
          </a>
          <Link
            className="portfolio-button portfolio-button-secondary"
            href={siteConfig.resume.en}
            target="_blank"
          >
            PDF resume <span aria-hidden="true">↓</span>
          </Link>
        </div>

        <div className="portfolio-remote-facts" aria-label="Remote work details">
          <div>
            <span>TIME ZONE</span>
            <strong>GMT−3 · US business hours</strong>
          </div>
          <div>
            <span>ENGLISH</span>
            <strong>C2 · Professional fluency</strong>
          </div>
          <div>
            <span>STATUS</span>
            <strong>Open to remote roles</strong>
          </div>
        </div>
      </div>

      <div className="portfolio-hero-art" aria-hidden="true">
        <div className="portfolio-orbit portfolio-orbit-one" />
        <div className="portfolio-orbit portfolio-orbit-two" />
        <div className="portfolio-code-card">
          <div className="portfolio-code-dots">
            <i />
            <i />
            <i />
          </div>
          <code>
            <span>felipe</span>@são-paulo:~$
          </code>
          <p>
            making complex
            <br />
            work feel clear
          </p>
          <small>// built for the whole shift</small>
        </div>
        <div className="portfolio-metric-chip">
          <b>24/7</b>
          <span>OPERATIONS</span>
        </div>
      </div>
    </section>
  )
}
