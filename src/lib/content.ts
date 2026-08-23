import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { cache } from 'react'
import readingTime from 'reading-time'

import type { AppLocale } from '@/i18n/routing'
import {
  type ArticleFrontmatter,
  type WorkFrontmatter,
  articleFrontmatterSchema,
  workFrontmatterSchema
} from '@/lib/schemas'

export interface WorkEntry {
  slug: string
  frontmatter: WorkFrontmatter
  content: string
}

export interface ArticleEntry {
  slug: string
  frontmatter: ArticleFrontmatter
  content: string
  readingTimeMinutes: number
}

function getContentDir(type: 'work' | 'writing', locale: AppLocale) {
  const localized = path.join(process.cwd(), 'content', locale, type)
  const legacyEnglish = path.join(process.cwd(), 'content', type)

  if (locale === 'en' && !fs.existsSync(localized)) return legacyEnglish
  return localized
}

function readMdxFiles(dir: string) {
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ''),
      raw: fs.readFileSync(path.join(dir, file), 'utf8')
    }))
}

function isVisible(draft: boolean) {
  return process.env.NODE_ENV !== 'production' || !draft
}

export const getAllWork = cache(
  async (locale: AppLocale = 'en'): Promise<WorkEntry[]> => {
    const entries = readMdxFiles(getContentDir('work', locale)).map(
      ({ slug, raw }) => {
        const { data, content } = matter(raw)
        const parsed = workFrontmatterSchema.safeParse(data)

        if (!parsed.success) {
          throw new Error(
            `Invalid frontmatter in content/${locale}/work/${slug}.mdx: ${parsed.error.message}`
          )
        }

        return { slug, frontmatter: parsed.data, content }
      }
    )

    return entries
      .filter((entry) => isVisible(entry.frontmatter.draft))
      .sort((a, b) => b.frontmatter.year - a.frontmatter.year)
  }
)

export const getFeaturedWork = cache(async (locale: AppLocale = 'en') => {
  const all = await getAllWork(locale)

  return all
    .filter((entry) => entry.frontmatter.featured)
    .sort(
      (a, b) =>
        (a.frontmatter.order ?? Number.POSITIVE_INFINITY) -
        (b.frontmatter.order ?? Number.POSITIVE_INFINITY)
    )
})

export const getWorkBySlug = cache(
  async (slug: string, locale: AppLocale = 'en'): Promise<WorkEntry | null> => {
    const all = await getAllWork(locale)
    return all.find((entry) => entry.slug === slug) ?? null
  }
)

export const hasWork = cache(async (locale: AppLocale = 'en') => {
  const all = await getAllWork(locale)
  return all.length > 0
})

export const getAllArticles = cache(
  async (locale: AppLocale = 'en'): Promise<ArticleEntry[]> => {
    const entries = readMdxFiles(getContentDir('writing', locale)).map(
      ({ slug, raw }) => {
        const { data, content } = matter(raw)
        const parsed = articleFrontmatterSchema.safeParse(data)

        if (!parsed.success) {
          throw new Error(
            `Invalid frontmatter in content/${locale}/writing/${slug}.mdx: ${parsed.error.message}`
          )
        }

        return {
          slug,
          frontmatter: parsed.data,
          content,
          readingTimeMinutes: Math.max(
            1,
            Math.ceil(readingTime(content).minutes)
          )
        }
      }
    )

    return entries
      .filter((entry) => isVisible(entry.frontmatter.draft))
      .sort((a, b) =>
        a.frontmatter.publishedAt < b.frontmatter.publishedAt ? 1 : -1
      )
  }
)

export const getArticleBySlug = cache(
  async (
    slug: string,
    locale: AppLocale = 'en'
  ): Promise<ArticleEntry | null> => {
    const all = await getAllArticles(locale)
    return all.find((entry) => entry.slug === slug) ?? null
  }
)

export const hasArticles = cache(async (locale: AppLocale = 'en') => {
  const all = await getAllArticles(locale)
  return all.length > 0
})
