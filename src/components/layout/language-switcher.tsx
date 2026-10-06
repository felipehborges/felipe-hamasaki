'use client'

import type { AppLocale } from '@/i18n/routing'
import { localizePath } from '@/i18n/urls'
import { useEffect } from 'react'

const scrollKey = 'locale-scroll-position'

function headerHeight() {
  return (
    document.querySelector('.minimal-header')?.getBoundingClientRect().height ??
    60
  )
}

export function LanguageSwitcher({
  label,
  locale
}: { label: string; locale: AppLocale }) {
  const nextLocale = locale === 'en' ? 'pt-BR' : 'en'
  const nextLabel = nextLocale === 'en' ? 'EN' : 'PT-BR'

  useEffect(() => {
    let cancelled = false
    let frame = 0
    const cancel = () => {
      cancelled = true
    }
    async function restore() {
      try {
        const saved = sessionStorage.getItem(scrollKey)
        if (!saved) return
        const position = JSON.parse(saved)
        if (
          position.path !== window.location.pathname + window.location.search ||
          Date.now() - position.time > 30_000 ||
          typeof position.id !== 'string' ||
          !Number.isFinite(position.progress)
        )
          return
        if (document.readyState !== 'complete') {
          await new Promise<void>((resolve) =>
            window.addEventListener('load', () => resolve(), { once: true })
          )
        }
        await document.fonts.ready
        // Let the project gallery measure its translated content before restoring.
        frame = requestAnimationFrame(() => {
          frame = requestAnimationFrame(() => {
            if (cancelled) return
            const block = document.getElementById(position.id)
            if (!block) return
            const bounds = block.getBoundingClientRect()
            window.scrollTo({
              top: Math.max(
                0,
                window.scrollY +
                  bounds.top -
                  headerHeight() +
                  bounds.height * position.progress
              ),
              behavior: 'instant'
            })
            sessionStorage.removeItem(scrollKey)
          })
        })
      } catch {
        // Storage may be unavailable; the destination anchor still works.
      }
    }
    window.addEventListener('wheel', cancel, { passive: true })
    window.addEventListener('touchstart', cancel, { passive: true })
    window.addEventListener('keydown', cancel)
    void restore()
    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      window.removeEventListener('wheel', cancel)
      window.removeEventListener('touchstart', cancel)
      window.removeEventListener('keydown', cancel)
    }
  }, [])

  function changeLocale() {
    const path = window.location.pathname
    const logicalPath =
      locale === 'pt-BR' ? path.replace(/^\/pt-br(?=\/|$)/i, '') || '/' : path
    document.cookie = `NEXT_LOCALE=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`
    const destination = `${localizePath(logicalPath, nextLocale)}${window.location.search}`
    const blocks = Array.from(
      document.querySelectorAll<HTMLElement>('[data-scroll-block][id]')
    )
    const block =
      blocks.findLast(
        (item) => item.getBoundingClientRect().top <= headerHeight() + 4
      ) ?? blocks[0]
    if (block) {
      const bounds = block.getBoundingClientRect()
      try {
        sessionStorage.setItem(
          scrollKey,
          JSON.stringify({
            path: destination,
            id: block.id,
            progress: Math.max(
              0,
              (headerHeight() - bounds.top) / Math.max(1, bounds.height)
            ),
            time: Date.now()
          })
        )
      } catch {
        // Keep navigation available when storage is disabled.
      }
    }
    window.location.assign(
      `${destination}${block ? `#${block.id}` : window.location.hash}`
    )
  }

  return (
    <button
      type="button"
      className="portfolio-language-switcher"
      onClick={changeLocale}
      aria-label={`${label}: ${nextLabel}`}
      title={nextLocale === 'en' ? 'Switch to English' : 'Mudar para português'}
    >
      {nextLabel}
    </button>
  )
}
