import { z } from 'zod'

export const workFrontmatterSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1).max(200),
  role: z.string().min(1),
  year: z.number().int().min(2020).max(2100),
  stack: z.array(z.string()).min(1),
  repo: z.string().url().optional(),
  demo: z.string().url().optional(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(true),
  order: z.number().int().optional()
})

export const articleFrontmatterSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1).max(200),
  publishedAt: z.string().date(),
  updatedAt: z.string().date().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(true)
})

export type WorkFrontmatter = z.infer<typeof workFrontmatterSchema>
export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>

interface ContactValidationMessages {
  nameRequired: string
  emailInvalid: string
  messageShort: string
}

export function createContactFormSchema(messages: ContactValidationMessages) {
  return z.object({
    name: z.string().min(1, messages.nameRequired).max(100),
    email: z.string().email(messages.emailInvalid),
    message: z.string().min(10, messages.messageShort).max(5000),
    // Honeypot — real visitors never see or fill this field.
    company: z.string().optional()
  })
}

export const contactFormSchema = createContactFormSchema({
  nameRequired: 'name_required',
  emailInvalid: 'email_invalid',
  messageShort: 'message_too_short'
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
