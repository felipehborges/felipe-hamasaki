'use client'

import { H1, P } from '@/components/ui/custom/typography'

export default function SectionStacks() {
  return (
    <section
      id="stacks"
      className="min-h-screen bg-background-page grid grid-cols-2 gap-10"
    >
      <H1 className="font-bold text-2xl">Stacks</H1>

      <P>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci nulla
        non ut, quas veritatis sequi eaque animi facilis enim similique placeat
        repellendus rerum? Consectetur sequi ipsum inventore alias odit eum.
      </P>
    </section>
  )
}
