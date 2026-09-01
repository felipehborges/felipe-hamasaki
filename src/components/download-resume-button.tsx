'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { siteConfig } from '@/lib/site-config'
import { Download } from 'lucide-react'
import { Button } from './ui/button'

interface ResumeLabels {
  download: string
  selectLanguage: string
  english: string
  portuguese: string
  close: string
}

export default function DownloadResumeButton({
  labels
}: {
  labels: ResumeLabels
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">
          <Download />
          {labels.download}
        </Button>
      </DialogTrigger>

      <DialogContent closeLabel={labels.close} aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{labels.selectLanguage}</DialogTitle>
        </DialogHeader>

        <div className="flex w-full flex-wrap items-center justify-center gap-4 py-4">
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="w-40 text-base"
          >
            <a href={siteConfig.resume.en} download="eng-resume.pdf">
              <Download />
              {labels.english}
            </a>
          </Button>

          <Button
            asChild
            variant="secondary"
            size="lg"
            className="w-40 text-base"
          >
            <a href={siteConfig.resume.pt} download="ptbr-resume.pdf">
              <Download />
              {labels.portuguese}
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
