'use client'

import { siteConfig } from '@/lib/site-config'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '../ui/dialog'
import ContactMeForm from './contact-me-form'

interface ContactMeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ContactMeDialog(props: ContactMeDialogProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const logoStyle = ''

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      {/* <DialogTrigger asChild></DialogTrigger> */}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact me</DialogTitle>
          <DialogDescription>
            You can reach me through any of the platforms below. I look forward
            to hearing from you!
          </DialogDescription>
        </DialogHeader>

        <div className="grid- grid grid-cols-2 gap-2">
          <Button asChild variant="outline" size="lg">
            <Link
              href={`mailto:${siteConfig.email}`}
              target="_blank"
              className="flex items-center"
            >
              <Image
                src="/logos/logo-gmail.png"
                alt="Gmail Logo"
                width={25}
                height={25}
                className={logoStyle}
              />
              Email
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link
              href="https://wa.me/+5511976120038"
              target="_blank"
              className="flex items-center"
            >
              <Image
                src="/logos/logo-whatsapp.png"
                alt="WhatsApp Logo"
                width={25}
                height={25}
                className={logoStyle}
              />
              WhatsApp
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              className="flex items-center"
            >
              <Image
                src={
                  theme === 'dark'
                    ? '/logos/logo-github-white.png'
                    : '/logos/logo-github-black.png'
                }
                alt="GitHub Logo"
                width={25}
                height={25}
                className={logoStyle}
              />
              GitHub
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              className="flex items-center"
            >
              <Image
                src="/logos/logo-linkedin.png"
                alt="LinkedIn Logo"
                width={25}
                height={25}
                className={logoStyle}
              />
              LinkedIn
            </Link>
          </Button>
        </div>

        {/* <ContactMeForm /> */}
      </DialogContent>
    </Dialog>
  )
}
