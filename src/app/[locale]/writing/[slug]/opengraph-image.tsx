import type { AppLocale } from '@/i18n/routing'
import { getArticleBySlug } from '@/lib/content'
import { loadOgFonts } from '@/lib/og-fonts'
import { getTranslations } from 'next-intl/server'
import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({
  params
}: {
  params: Promise<{ locale: AppLocale; slug: string }>
}) {
  const { locale, slug } = await params
  const [entry, fonts, t] = await Promise.all([
    getArticleBySlug(slug, locale),
    loadOgFonts(),
    getTranslations({ locale, namespace: 'OpenGraph' })
  ])

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 80,
        backgroundColor: '#0d0c0b',
        color: '#f2f0ed'
      }}
    >
      <div
        style={{
          fontFamily: 'Inter',
          fontWeight: 700,
          fontSize: 24,
          color: '#e8b04b',
          textTransform: 'uppercase',
          letterSpacing: 2
        }}
      >
        {t('writing')}
        {entry ? ` — ${entry.frontmatter.publishedAt}` : ''}
      </div>
      <div
        style={{
          fontFamily: 'Newsreader',
          fontSize: 60,
          fontWeight: 500,
          marginTop: 24,
          maxWidth: 900
        }}
      >
        {entry?.frontmatter.title ?? t('writing')}
      </div>
    </div>,
    { ...size, fonts }
  )
}
