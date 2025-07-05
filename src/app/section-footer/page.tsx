'use client'

import DownloadResumeButton from '@/components/download-resume-button'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function SectionFooter() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const navigationLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' }
  ]

  const logoStyle =
    'size-6 mx-2 hover:scale-110 transition-transform duration-300 ease-in-out'

  return (
    <footer className="flex flex-col items-center justify-center py-10">
      <div className="mb-4 flex items-center">
        <Link href="https://github.com/felipehborges " target="_blank">
          <Image
            src={
              theme === 'dark'
                ? '/logos/logo-github-white.png'
                : '/logos/logo-github-black.png'
            }
            alt="GitHub Logo"
            width={50}
            height={50}
            className={logoStyle}
          />
        </Link>

        <Link href="https://www.linkedin.com/in/felipehborges/" target="_blank">
          <Image
            src="/logos/logo-linkedin.png"
            alt="LinkedIn Logo"
            width={50}
            height={50}
            className={logoStyle}
          />
        </Link>

        <Link href="mailto:felipehama@gmail.com" target="_blank">
          <Image
            src="/logos/logo-gmail.png"
            alt="Gmail Logo"
            width={50}
            height={50}
            className={logoStyle}
          />
        </Link>

        <Link href="https://wa.me/+5511976120038" target="_blank">
          <Image
            src="/logos/logo-whatsapp.png"
            alt="WhatsApp Logo"
            width={50}
            height={50}
            className={logoStyle}
          />
        </Link>
      </div>

      <div className="mb-4">
        {navigationLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            // onClick={handleNavButtonClick}
          >
            <Button
              type="button"
              variant="ghost"
              className="text-xs md:text-sm"
            >
              {link.label}
            </Button>
          </Link>
        ))}
      </div>

      {/* <p className="text-xs text-center text-muted-foreground mb-6">
        © 2024 Felipe Borges. All rights reserved.
      </p> */}

      <DownloadResumeButton />
    </footer>
  )
}
