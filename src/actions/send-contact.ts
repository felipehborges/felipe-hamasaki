'use server'

import { routing } from '@/i18n/routing'
import { contactFormSchema } from '@/lib/schemas'
import { hasLocale } from 'next-intl'
import { headers } from 'next/headers'
import { Resend } from 'resend'

type ContactResult =
  | { ok: true }
  | { ok: false; error: 'validation' | 'rate_limit' | 'send_failed' }

const RATE_LIMIT = 3
const RATE_WINDOW_MS = 60 * 60 * 1000

const attempts = new Map<string, number[]>()

function isRateLimited(ip: string) {
  const now = Date.now()
  const recent = (attempts.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_WINDOW_MS
  )
  attempts.set(ip, recent)
  return recent.length >= RATE_LIMIT
}

function recordAttempt(ip: string) {
  const recent = attempts.get(ip) ?? []
  recent.push(Date.now())
  attempts.set(ip, recent)
}

export async function sendContact(
  data: unknown,
  requestedLocale: unknown
): Promise<ContactResult> {
  const parsed = contactFormSchema.safeParse(data)
  const locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale

  if (!parsed.success) {
    return { ok: false, error: 'validation' }
  }

  // Honeypot: a bot filled a field real visitors never see. Pretend success
  // without sending anything, so the bot doesn't learn it was detected.
  if (parsed.data.company) {
    return { ok: true }
  }

  const headersList = await headers()
  const ip =
    headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

  if (isRateLimited(ip)) {
    return { ok: false, error: 'rate_limit' }
  }

  recordAttempt(ip)

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? '',
      to: process.env.CONTACT_TO_EMAIL ?? '',
      replyTo: parsed.data.email,
      subject: `[${locale}] New portfolio message from ${parsed.data.name}`,
      text: `From: ${parsed.data.name} <${parsed.data.email}>\n\n${parsed.data.message}`
    })

    if (error) {
      return { ok: false, error: 'send_failed' }
    }

    return { ok: true }
  } catch {
    return { ok: false, error: 'send_failed' }
  }
}
