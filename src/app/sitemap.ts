import { getAllArticles, getAllWork, hasArticles, hasWork } from '@/lib/content'
import { siteConfig } from '@/lib/site-config'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    { url: siteConfig.url },
    { url: `${siteConfig.url}/about` }
  ]

  if (await hasWork()) {
    entries.push({ url: `${siteConfig.url}/work` })

    for (const entry of await getAllWork()) {
      entries.push({
        url: `${siteConfig.url}/work/${entry.slug}`,
        lastModified: new Date(entry.frontmatter.year, 0, 1)
      })
    }
  }

  if (await hasArticles()) {
    entries.push({ url: `${siteConfig.url}/writing` })

    for (const entry of await getAllArticles()) {
      entries.push({
        url: `${siteConfig.url}/writing/${entry.slug}`,
        lastModified: new Date(
          entry.frontmatter.updatedAt ?? entry.frontmatter.publishedAt
        )
      })
    }
  }

  return entries
}
