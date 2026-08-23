import { ContactSection } from '@/components/sections/contact-section'
import { AboutSection } from '@/components/sections/about-section'
import { ExperienceTimeline } from '@/components/sections/experience-timeline'
import { Hero } from '@/components/sections/hero'
import { SelectedWork } from '@/components/sections/selected-work'
import { StackSection } from '@/components/sections/stack-section'
import { siteConfig } from '@/lib/site-config'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  description: siteConfig.description,
  alternates: {
    canonical: '/'
  }
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  jobTitle: siteConfig.role,
  url: siteConfig.url,
  sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
  knowsAbout: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Node.js']
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static, internally-defined JSON-LD, no user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Hero />
      <SelectedWork />
      <StackSection />
      <AboutSection />
      <ExperienceTimeline />
      <ContactSection />
    </>
  )
}
