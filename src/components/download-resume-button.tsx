'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { siteConfig } from '@/lib/site-config'
import { DialogTrigger } from '@radix-ui/react-dialog'
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

        <div className="flex w-full items-center justify-center gap-4 py-4">
          <a href={siteConfig.resume.en} download="eng-resume.pdf">
            <Button
              variant="secondary"
              size="lg"
              className="flex w-40 items-center text-base"
            >
              <Download />
              {labels.english}
            </Button>
          </a>

          <a href={siteConfig.resume.pt} download="ptbr-resume.pdf">
            <Button variant="secondary" size="lg" className="w-40 text-base">
              <Download />
              {labels.portuguese}
            </Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
