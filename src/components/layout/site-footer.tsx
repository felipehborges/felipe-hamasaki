import { siteConfig } from '@/lib/site-config'

export function SiteFooter() {
  return (
    <footer className="portfolio-footer">
      <div className="portfolio-container portfolio-footer-note">
        <span>São Paulo, Brazil · Working worldwide</span>
        <span>
          © {new Date().getFullYear()} {siteConfig.name}
        </span>
      </div>
    </footer>
  )
}
