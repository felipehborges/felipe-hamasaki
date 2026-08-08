import { ContactSection } from '@/components/sections/contact-section'
import { ExperienceTimeline } from '@/components/sections/experience-timeline'
import { Hero } from '@/components/sections/hero'

export default function Home() {
  return (
    <>
      <Hero />
      <ExperienceTimeline />
      <ContactSection />
    </>
  )
}
