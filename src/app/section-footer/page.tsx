'use client'

import { Button } from '@/components/ui/custom/button'
import { H1, P } from '@/components/ui/custom/typography'
import { Download } from 'lucide-react'

export default function SectionFooter() {
  return (
    <footer className="">
      <H1 className="font-bold text-2xl">FOOTER</H1>

      <P>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci nulla
        non ut, quas veritatis sequi eaque animi facilis enim similique placeat
        repellendus rerum? Consectetur sequi ipsum inventore alias odit eum.
      </P>

      <Button type="button">
        <Download />
        Download Resume
      </Button>
    </footer>
  )
}
