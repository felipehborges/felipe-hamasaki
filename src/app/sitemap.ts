import { routing } from '@/i18n/routing'
import { absoluteLocalizedUrl, languageAlternates } from '@/i18n/urls'
import { getAllArticles, getAllWork, hasArticles, hasWork } from '@/lib/content'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of routing.locales) {
    entries.push(
      {
        url: absoluteLocalizedUrl('/', locale),
        alternates: { languages: languageAlternates('/') }
      },
      {
        url: absoluteLocalizedUrl('/about', locale),
        alternates: { languages: languageAlternates('/about') }
      }
    )

    if (await hasWork(locale)) {
      entries.push({
        url: absoluteLocalizedUrl('/work', locale),
        alternates: { languages: languageAlternates('/work') }
      })

      for (const entry of await getAllWork(locale)) {
        const pathname = `/work/${entry.slug}`
        entries.push({
          url: absoluteLocalizedUrl(pathname, locale),
          lastModified: new Date(entry.frontmatter.year, 0, 1),
          alternates: { languages: languageAlternates(pathname) }
        })
      }
    }

    if (await hasArticles(locale)) {
      entries.push({
        url: absoluteLocalizedUrl('/writing', locale),
        alternates: { languages: languageAlternates('/writing') }
      })

      for (const entry of await getAllArticles(locale)) {
        const pathname = `/writing/${entry.slug}`
        entries.push({
          url: absoluteLocalizedUrl(pathname, locale),
          lastModified: new Date(
            entry.frontmatter.updatedAt ?? entry.frontmatter.publishedAt
          ),
          alternates: { languages: languageAlternates(pathname) }
        })
      }
    }
  }

  return entries
}
