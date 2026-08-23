import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import '@/styles/globals.css'
import { siteConfig } from '@/lib/site-config'
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Newsreader } from 'next/font/google'
import type { ReactNode } from 'react'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap'
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: false
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: '%s — Felipe Hamasaki',
    default: 'Felipe Hamasaki — Full Stack Engineer'
  },
  description: siteConfig.description,
  alternates: {
    types: {
      'application/rss+xml': '/rss.xml'
    }
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Felipe Hamasaki — Full Stack Engineer',
    description:
      'Operational software for intelligence, fraud prevention, and remote teams.',
    images: ['/og.png']
  },
  openGraph: {
    title: 'Felipe Hamasaki — Full Stack Engineer',
    description:
      'Operational software for intelligence, fraud prevention, and remote teams.',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Felipe Hamasaki — Full Stack Engineer'
      }
    ]
  }
}

export default async function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="overflow-x-hidden antialiased">
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:rounded-md focus-visible:bg-primary focus-visible:px-4 focus-visible:py-2 focus-visible:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
