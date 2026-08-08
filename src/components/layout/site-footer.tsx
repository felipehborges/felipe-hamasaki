import { siteConfig } from '@/lib/site-config'
import { Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex flex-col gap-1">
          <p className="text-muted-foreground text-sm">
            {siteConfig.name} © {year}
          </p>
          <Link
            href={siteConfig.links.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground text-sm hover:text-foreground hover:underline"
          >
            View source
          </Link>
        </div>

        <nav className="flex items-center gap-4">
          <Link
            href="/about"
            className="text-muted-foreground text-sm hover:text-foreground"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-foreground"
          >
            <Github className="size-5" />
          </Link>

          <Link
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-foreground"
          >
            <Linkedin className="size-5" />
          </Link>

          <Link
            href={`mailto:${siteConfig.email}`}
            aria-label="Email"
            className="text-muted-foreground hover:text-foreground"
          >
            <Mail className="size-5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
