'use client'

import { H1 } from '@/components/ui/custom/typography'
import { Hammer } from 'lucide-react'

export default function SectionProjects() {
  return (
    <section
      id="projects"
      className="min-h-screen bg-background-page flex flex-col items-center justify-center"
    >
      <header className="flex items-center justify-center py-8">
        <H1>Projects</H1>
      </header>

      <div className="flex items-center gap-2">
        <Hammer className="size-5" />
        <p>Still in progress...</p>
      </div>
    </section>
  )
}
