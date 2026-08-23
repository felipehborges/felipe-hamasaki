import { loadOgFonts } from '@/lib/og-fonts'
import { siteConfig } from '@/lib/site-config'
import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const fonts = await loadOgFonts()

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
      <div style={{ fontFamily: 'Newsreader', fontSize: 72, fontWeight: 500 }}>
        {siteConfig.name}
      </div>
      <div
        style={{
          fontFamily: 'Inter',
          fontSize: 32,
          color: '#a39e96',
          marginTop: 24
        }}
      >
        {siteConfig.role}
      </div>
      <div
        style={{
          fontFamily: 'Inter',
          fontWeight: 700,
          fontSize: 24,
          color: '#e8b04b',
          marginTop: 48
        }}
      >
        {siteConfig.url.replace(/^https?:\/\//, '')}
      </div>
    </div>,
    { ...size, fonts }
  )
}
