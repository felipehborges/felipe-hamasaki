'use client'

import { sendContact } from '@/actions/send-contact'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { AppLocale } from '@/i18n/routing'
import { type ContactFormValues, createContactFormSchema } from '@/lib/schemas'
import { siteConfig } from '@/lib/site-config'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface ContactFormLabels {
  name: string
  email: string
  message: string
  company: string
  send: string
  sending: string
  success: string
  rateLimit: string
  failure: string
  nameRequired: string
  emailInvalid: string
  messageShort: string
}

export function ContactForm({
  locale,
  labels
}: {
  locale: AppLocale
  labels: ContactFormLabels
}) {
  const [isPending, startTransition] = useTransition()
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(
      createContactFormSchema({
        nameRequired: labels.nameRequired,
        emailInvalid: labels.emailInvalid,
        messageShort: labels.messageShort
      })
    )
  })

  function onSubmit(values: ContactFormValues) {
    startTransition(async () => {
      const result = await sendContact(values, locale)

      if (result.ok) {
        setStatus('success')
        setErrorMessage('')
        reset()
        toast.success(labels.success)
        return
      }

      const message =
        result.error === 'rate_limit'
          ? labels.rateLimit
          : labels.failure.replace('{email}', siteConfig.email)

      setStatus('error')
      setErrorMessage(message)
      toast.error(message)
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-busy={isPending}
      className="mt-10 flex max-w-[65ch] flex-col gap-4"
    >
      <FieldGroup className="grid gap-4 sm:grid-cols-2">
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="contact-name">{labels.name}</FieldLabel>
          <Input
            id="contact-name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            {...register('name')}
          />
          <FieldError id="contact-name-error" errors={[errors.name]} />
        </Field>

        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="contact-email">{labels.email}</FieldLabel>
          <Input
            id="contact-email"
            type="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            {...register('email')}
          />
          <FieldError id="contact-email-error" errors={[errors.email]} />
        </Field>
      </FieldGroup>

      <Field data-invalid={!!errors.message}>
        <FieldLabel htmlFor="contact-message">{labels.message}</FieldLabel>
        <Textarea
          id="contact-message"
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={
            errors.message ? 'contact-message-error' : undefined
          }
          {...register('message')}
        />
        <FieldError id="contact-message-error" errors={[errors.message]} />
      </Field>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-company">{labels.company}</label>
        <input
          id="contact-company"
          tabIndex={-1}
          autoComplete="off"
          {...register('company')}
        />
      </div>

      <Field>
        <Button type="submit" disabled={isPending}>
          {isPending ? labels.sending : labels.send}
        </Button>

        {status !== 'idle' ? (
          <Alert variant={status === 'error' ? 'destructive' : 'default'}>
            <AlertDescription>
              <output aria-live="polite">
                {status === 'error' ? errorMessage : labels.success}
              </output>
            </AlertDescription>
          </Alert>
        ) : null}
      </Field>
    </form>
  )
}
