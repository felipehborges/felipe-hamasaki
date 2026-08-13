import { ContactForm } from '@/components/contact/contact-form'
import { Eyebrow, H2 } from '@/components/typography'
import { siteConfig } from '@/lib/site-config'
import { Github, Linkedin } from 'lucide-react'
import Link from 'next/link'

export function ContactSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
      <Eyebrow>Contact</Eyebrow>
      <H2 className="mt-2">Get in touch</H2>

      <p className="mt-4 max-w-[65ch] text-muted-foreground">
        The fastest way to reach me is by email.
      </p>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-lg hover:underline"
        >
          {siteConfig.email}
        </a>

        <div className="flex items-center gap-4">
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
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-foreground"
          >
            <Github className="size-5" />
          </Link>
        </div>
      </div>

      <ContactForm />
    </section>
  )
}
