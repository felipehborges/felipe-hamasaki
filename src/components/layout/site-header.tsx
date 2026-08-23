import { siteConfig } from '@/lib/site-config'
import Link from 'next/link'

export function SiteHeader() {
  return (
    <header className="portfolio-header">
      <nav className="portfolio-container portfolio-nav" aria-label="Primary">
        <Link className="portfolio-wordmark" href="/#top" aria-label="Home">
          FH<span>.</span>
        </Link>
        <div className="portfolio-nav-links">
          <Link href="/#work">Work</Link>
          <Link href="/#about">About</Link>
          <Link href="/#experience">Experience</Link>
        </div>
        <a
          className="portfolio-nav-cta"
          href={'mailto:' + siteConfig.email + '?subject=Intro%20call'}
        >
          Let’s talk <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  )
}
