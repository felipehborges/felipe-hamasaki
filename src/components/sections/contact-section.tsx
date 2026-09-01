import { Link } from '@/i18n/navigation'
import { siteConfig } from '@/lib/site-config'
import { ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function ContactSection() {
  const t = useTranslations('Home.contact')

  return (
    <section className="portfolio-contact portfolio-section" id="contact">
      <div className="portfolio-container portfolio-contact-inner">
        <Badge variant="ghost" className="portfolio-kicker p-0">
          {t('kicker')}
        </Badge>
        <h2>
          {t('titleLine1')}
          <br />
          <em>{t('titleLine2')}</em>
        </h2>

        <Button asChild variant="link" className="portfolio-email h-auto p-0">
          <a href={`mailto:${siteConfig.email}`}>
            {siteConfig.email} <ArrowUpRight aria-hidden="true" />
          </a>
        </Button>

        <div className="portfolio-socials">
          <Button asChild variant="ghost">
            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
