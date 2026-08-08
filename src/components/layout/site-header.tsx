import { siteConfig } from '@/lib/site-config'
import Link from 'next/link'
import { NavLink } from './nav-link'
import { ThemeToggle } from './theme-toggle'

const navigationLinks = [{ href: '/about', label: 'About' }]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
        <Link href="/" className="font-serif text-lg tracking-tight">
          {siteConfig.name}
        </Link>

        <nav className="flex items-center gap-6">
          {navigationLinks.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}

          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
