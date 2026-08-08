import { H2 } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { siteConfig } from '@/lib/site-config'
import { Github, Linkedin } from 'lucide-react'
import Link from 'next/link'

export function ContactSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
      <H2>Get in touch</H2>

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

      <form className="mt-10 flex max-w-[65ch] flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="contact-name">Name</Label>
            <Input id="contact-name" name="name" disabled />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="contact-email">Email</Label>
            <Input id="contact-email" name="email" type="email" disabled />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="contact-message">Message</Label>
          <Textarea id="contact-message" name="message" rows={5} disabled />
        </div>

        <div>
          <Button type="submit" disabled>
            Send message
          </Button>
          <p className="mt-2 text-muted-foreground text-sm">
            The contact form isn't wired up yet — email me directly instead.
          </p>
        </div>
      </form>
    </section>
  )
}
