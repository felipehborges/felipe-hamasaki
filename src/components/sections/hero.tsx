import { H1 } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/site-config'
import { Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
      <H1>{siteConfig.name}</H1>

      <p className="mt-4 max-w-[65ch] text-lg text-muted-foreground">
        Full stack developer working in TypeScript. 4+ years of professional
        experience. Open to any development role, remote, as a contractor.
      </p>

      <div className="mt-6 flex max-w-[65ch] flex-col gap-4 text-muted-foreground">
        <p>
          I'm ready to take on any kind of development work — front-end,
          back-end, or full stack.
        </p>
        <p>
          Open to relocating if a role requires it, and to any timezone or
          salary range.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Button asChild>
          <Link href={siteConfig.resume.en} target="_blank">
            Download résumé
          </Link>
        </Button>
      </div>

      <div className="mt-8 flex items-center gap-4">
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
    </section>
  )
}
