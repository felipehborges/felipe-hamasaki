import { ContactSection } from '@/components/sections/contact-section'
import { ExperienceTimeline } from '@/components/sections/experience-timeline'
import { Hero } from '@/components/sections/hero'
import { SelectedWork } from '@/components/sections/selected-work'

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <ExperienceTimeline />
      <ContactSection />
    </>
  )
}
