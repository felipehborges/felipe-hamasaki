import { H1 } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/site-config'
import { Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
      <H1 className="animate-fade-up">{siteConfig.name}</H1>

      <p className="animate-fade-up mt-4 max-w-[65ch] text-lg [animation-delay:80ms]">
        Full stack developer, frontend-focused — React, Next.js, TypeScript,
        Node.js. Four years building operational software for corporate
        intelligence and fraud prevention. Open to remote roles, with full
        overlap with US business hours.
      </p>

      <div className="animate-fade-up mt-6 flex max-w-[65ch] flex-col gap-4 text-muted-foreground [animation-delay:150ms]">
        <p>
          I work on the kind of platform people sit in front of for eight hours
          a day — live vehicle tracking, mapping, cross-source data matching —
          where being clear and reliable matters more than being novel.
        </p>
        <p>
          I started on the frontend and now work across the stack. I taught
          English for two years before moving into software, which is why I
          write and work in it at a professional level.
        </p>
      </div>

      <div className="animate-fade-up mt-8 flex flex-wrap items-center gap-4 [animation-delay:220ms]">
        <Button asChild>
          <Link href={siteConfig.resume.en} target="_blank">
            Download résumé
          </Link>
        </Button>
      </div>

      <div className="animate-fade-up mt-8 flex items-center gap-4 [animation-delay:280ms]">
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
