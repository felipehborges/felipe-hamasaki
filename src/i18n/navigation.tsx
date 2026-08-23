import type { AppLocale } from '@/i18n/routing'
import { localizePath } from '@/i18n/urls'
import { useLocale } from 'next-intl'
import NextLink from 'next/link'
import type { ComponentProps } from 'react'

type LinkProps = ComponentProps<typeof NextLink>

export function Link({ href, ...props }: LinkProps) {
  const locale = useLocale() as AppLocale
  const localizedHref =
    typeof href === 'string' && href.startsWith('/')
      ? localizePath(href, locale)
      : href

  return <NextLink href={localizedHref} {...props} />
}
