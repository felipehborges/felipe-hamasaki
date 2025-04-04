'use client'

import DownloadResumeButton from '@/components/download-resume-button'
import { P } from '@/components/ui/custom/typography'

export default function SectionFooter() {
  return (
    <footer className="p-10 flex flex-col justify-center items-center">
      <div className="mb-4">
        <P>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          nulla non ut, quas veritatis sequi eaque animi facilis enim similique
          placeat repellendus rerum? Consectetur sequi ipsum inventore alias
          odit eum.
        </P>
      </div>

      <DownloadResumeButton />
    </footer>
  )
}
