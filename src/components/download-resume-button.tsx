'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { Download } from 'lucide-react'
import { Button } from './ui/button'

export default function DownloadResumeButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">
          <Download />
          Download Resume
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select resume language</DialogTitle>
        </DialogHeader>

        <div className="flex w-full items-center justify-center gap-4 py-4">
          <a href="/resume/eng-resume.pdf" download="eng-resume.pdf">
            <Button
              variant="secondary"
              size="lg"
              className="flex w-40 items-center text-base"
            >
              <Download />
              English
            </Button>
          </a>

          <a href="/resume/pt-resume.pdf" download="ptbr-resume.pdf">
            <Button variant="secondary" size="lg" className="w-40 text-base">
              <Download />
              Português
            </Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
