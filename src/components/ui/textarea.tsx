import type * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'field-sizing-content flex min-h-24 w-full rounded-none border-2 border-border bg-card px-3 py-2 text-base text-card-foreground outline-none shadow-[4px_4px_0_var(--brutal-ink)] transition-[transform,box-shadow] duration-fast placeholder:text-muted-foreground focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:ring-[3px] focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive md:text-sm',
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
