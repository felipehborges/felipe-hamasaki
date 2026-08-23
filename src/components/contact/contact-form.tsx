'use client'

import { sendContact } from '@/actions/send-contact'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { type ContactFormValues, contactFormSchema } from '@/lib/schemas'
import { siteConfig } from '@/lib/site-config'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export function ContactForm() {
  const [isPending, startTransition] = useTransition()
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema)
  })

  function onSubmit(values: ContactFormValues) {
    startTransition(async () => {
      const result = await sendContact(values)

      if (result.ok) {
        setStatus('success')
        setErrorMessage('')
        reset()
        toast.success("Message sent — I'll get back to you soon.")
        return
      }

      const message =
        result.error === 'rate_limit'
          ? 'Too many messages sent recently. Try again later, or email me directly.'
          : `Something went wrong. Email me directly at ${siteConfig.email} instead.`

      setStatus('error')
      setErrorMessage(message)
      toast.error(message)
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="mt-10 flex max-w-[65ch] flex-col gap-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="contact-name">Name</Label>
          <Input
            id="contact-name"
            aria-invalid={!!errors.name}
            {...register('name')}
          />
          {errors.name ? (
            <p className="text-destructive text-sm">{errors.name.message}</p>
          ) : null}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            type="email"
            aria-invalid={!!errors.email}
            {...register('email')}
          />
          {errors.email ? (
            <p className="text-destructive text-sm">{errors.email.message}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          rows={5}
          aria-invalid={!!errors.message}
          {...register('message')}
        />
        {errors.message ? (
          <p className="text-destructive text-sm">{errors.message.message}</p>
        ) : null}
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          tabIndex={-1}
          autoComplete="off"
          {...register('company')}
        />
      </div>

      <div>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Sending…' : 'Send message'}
        </Button>

        <output aria-live="polite" className="mt-2 block text-sm">
          {status === 'error' ? (
            <span className="text-destructive">{errorMessage}</span>
          ) : null}
          {status === 'success' ? (
            <span className="text-muted-foreground">
              Message sent — I'll get back to you soon.
            </span>
          ) : null}
        </output>
      </div>
    </form>
  )
}
