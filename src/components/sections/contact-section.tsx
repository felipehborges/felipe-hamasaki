import { siteConfig } from '@/lib/site-config'
import Link from 'next/link'

export function ContactSection() {
  return (
    <section className="portfolio-contact portfolio-section" id="contact">
      <div className="portfolio-container portfolio-contact-inner">
        <span className="portfolio-kicker">LET’S BUILD SOMETHING SOLID</span>
        <h2>
          Need an engineer who speaks
          <br />
          product <em>and</em> production?
        </h2>

        <a className="portfolio-email" href={'mailto:' + siteConfig.email}>
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
