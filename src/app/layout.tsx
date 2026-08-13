import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { ThemeProvider } from '@/components/theme-provider'
import '@/styles/globals.css'
import { GrainOverlay } from '@/components/ui/grain-overlay'
import { Toaster } from '@/components/ui/sonner'
import { siteConfig } from '@/lib/site-config'
import type { Metadata } from 'next'
import { Fraunces, JetBrains_Mono, Public_Sans } from 'next/font/google'
import type { ReactNode } from 'react'

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-public-sans',
  display: 'swap'
})

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['300', '500', '600'],
  variable: '--font-fraunces',
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
    default: 'Felipe Hamasaki — Full Stack Developer'
  },
  description: siteConfig.description,
  alternates: {
    types: {
      'application/rss+xml': '/rss.xml'
    }
  },
  twitter: {
    card: 'summary_large_image'
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
      className={`${publicSans.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      <body className="overflow-x-hidden antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <GrainOverlay />
          <a
            href="#main-content"
            className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:rounded-md focus-visible:bg-primary focus-visible:px-4 focus-visible:py-2 focus-visible:text-primary-foreground"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
