import { H1 } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/routing'
import { hasWork } from '@/lib/content'
import { getLocale, getTranslations } from 'next-intl/server'

export default async function NotFound() {
  const locale = (await getLocale()) as AppLocale
  const [showWork, t] = await Promise.all([
    hasWork(locale),
    getTranslations({ locale, namespace: 'NotFound' })
  ])

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 text-center md:px-8">
      <H1>{t('title')}</H1>

      <p className="mt-4 text-muted-foreground">{t('message')}</p>

      <div className="mt-8 flex justify-center gap-6">
        <Button asChild variant="outline">
          <Link href="/">{t('home')}</Link>
        </Button>
        {showWork ? (
          <Button asChild>
            <Link href="/work">{t('work')}</Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href="/about">{t('about')}</Link>
          </Button>
        )}
      </div>
    </section>
  )
}
