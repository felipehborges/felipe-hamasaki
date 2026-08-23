import { siteConfig } from '@/lib/site-config'
import { useTranslations } from 'next-intl'

export function SiteFooter() {
  const t = useTranslations('Footer')

  return (
    <footer className="portfolio-footer">
      <div className="portfolio-container portfolio-footer-note">
        <span>{t('location')}</span>
        <span>
          © {new Date().getFullYear()} {siteConfig.name}
        </span>
      </div>
    </footer>
  )
}
