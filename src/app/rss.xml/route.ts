import { getAllArticles } from '@/lib/content'
import { siteConfig } from '@/lib/site-config'
import englishMessages from '../../../messages/en.json'

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export async function GET() {
  const articles = await getAllArticles()

  const items = articles
    .map(
      (article) => `
    <item>
      <title>${escapeXml(article.frontmatter.title)}</title>
      <link>${siteConfig.url}/writing/${article.slug}</link>
      <guid>${siteConfig.url}/writing/${article.slug}</guid>
      <pubDate>${new Date(article.frontmatter.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(article.frontmatter.summary)}</description>
    </item>`
    )
    .join('')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(englishMessages.Metadata.description)}</description>
    ${items}
  </channel>
</rss>`

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  })
}
