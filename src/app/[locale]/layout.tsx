import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { routing } from '@/i18n/routing'
import { absoluteLocalizedUrl, languageAlternates } from '@/i18n/urls'
import { siteConfig } from '@/lib/site-config'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Inter, JetBrains_Mono, Newsreader } from 'next/font/google'
import { notFound } from 'next/navigation'
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) return {}

  const t = await getTranslations({ locale, namespace: 'Metadata' })
  const title = t('siteTitle')
  const description = t('description')
  const image = absoluteLocalizedUrl('/opengraph-image', locale)

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      template: `%s — ${siteConfig.name}`,
      default: title
    },
    description,
    alternates: {
      canonical: absoluteLocalizedUrl('/', locale),
      languages: languageAlternates('/'),
      types: {
        'application/rss+xml': '/rss.xml'
      }
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: t('socialDescription'),
      images: [image]
    },
    openGraph: {
      title,
      description: t('socialDescription'),
      type: 'website',
      url: absoluteLocalizedUrl('/', locale),
      locale,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    }
  }
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const t = await getTranslations({ locale, namespace: 'Layout' })

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="overflow-x-hidden antialiased">
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:rounded-md focus-visible:bg-primary focus-visible:px-4 focus-visible:py-2 focus-visible:text-primary-foreground"
        >
          {t('skipToContent')}
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
