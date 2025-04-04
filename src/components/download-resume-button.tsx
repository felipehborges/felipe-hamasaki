'use client'

import { Download } from 'lucide-react'
import { Button } from './ui/button'

export default function DownloadResumeButton() {
  return (
    <a href="/resume/eng-resume.pdf" download="resume.pdf">
      <Button type="button">
        <Download />
        Download Resume
      </Button>
    </a>
  )
}
