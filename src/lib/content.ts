import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { cache } from 'react'
import readingTime from 'reading-time'

import {
  type ArticleFrontmatter,
  type WorkFrontmatter,
  articleFrontmatterSchema,
  workFrontmatterSchema
} from '@/lib/schemas'

const WORK_DIR = path.join(process.cwd(), 'content', 'work')
const WRITING_DIR = path.join(process.cwd(), 'content', 'writing')

export interface WorkEntry {
  slug: string
  frontmatter: WorkFrontmatter
  content: string
}

export interface ArticleEntry {
  slug: string
  frontmatter: ArticleFrontmatter
  content: string
  readingTime: string
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

export const getAllWork = cache(async (): Promise<WorkEntry[]> => {
  const entries = readMdxFiles(WORK_DIR).map(({ slug, raw }) => {
    const { data, content } = matter(raw)
    const parsed = workFrontmatterSchema.safeParse(data)

    if (!parsed.success) {
      throw new Error(
        `Invalid frontmatter in content/work/${slug}.mdx: ${parsed.error.message}`
      )
    }

    return { slug, frontmatter: parsed.data, content }
  })

  return entries
    .filter((entry) => isVisible(entry.frontmatter.draft))
    .sort((a, b) => b.frontmatter.year - a.frontmatter.year)
})

export const getFeaturedWork = cache(async (): Promise<WorkEntry[]> => {
  const all = await getAllWork()

  return all
    .filter((entry) => entry.frontmatter.featured)
    .sort(
      (a, b) =>
        (a.frontmatter.order ?? Number.POSITIVE_INFINITY) -
        (b.frontmatter.order ?? Number.POSITIVE_INFINITY)
    )
})

export const getWorkBySlug = cache(
  async (slug: string): Promise<WorkEntry | null> => {
    const all = await getAllWork()
    return all.find((entry) => entry.slug === slug) ?? null
  }
)

export const hasWork = cache(async (): Promise<boolean> => {
  const all = await getAllWork()
  return all.length > 0
})

export const getAllArticles = cache(async (): Promise<ArticleEntry[]> => {
  const entries = readMdxFiles(WRITING_DIR).map(({ slug, raw }) => {
    const { data, content } = matter(raw)
    const parsed = articleFrontmatterSchema.safeParse(data)

    if (!parsed.success) {
      throw new Error(
        `Invalid frontmatter in content/writing/${slug}.mdx: ${parsed.error.message}`
      )
    }

    return {
      slug,
      frontmatter: parsed.data,
      content,
      readingTime: readingTime(content).text
    }
  })

  return entries
    .filter((entry) => isVisible(entry.frontmatter.draft))
    .sort((a, b) =>
      a.frontmatter.publishedAt < b.frontmatter.publishedAt ? 1 : -1
    )
})

export const getArticleBySlug = cache(
  async (slug: string): Promise<ArticleEntry | null> => {
    const all = await getAllArticles()
    return all.find((entry) => entry.slug === slug) ?? null
  }
)

export const hasArticles = cache(async (): Promise<boolean> => {
  const all = await getAllArticles()
  return all.length > 0
})
