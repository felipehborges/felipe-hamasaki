import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none border-2 border-border font-bold text-sm uppercase tracking-wide outline-none transition-[transform,box-shadow,background-color] duration-fast hover:cursor-pointer hover:-translate-x-0.5 hover:-translate-y-0.5 focus-visible:ring-[3px] focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 active:translate-x-1 active:translate-y-1 active:shadow-none aria-invalid:border-destructive [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-[4px_4px_0_var(--brutal-ink)] hover:bg-primary/90',
        secondary:
          'bg-secondary text-secondary-foreground shadow-[4px_4px_0_var(--brutal-ink)] hover:bg-[var(--brutal-yellow)] hover:text-[var(--brutal-ink)]',
        outline:
          'bg-background shadow-[4px_4px_0_var(--brutal-ink)] hover:bg-[var(--brutal-blue)] hover:text-[var(--brutal-ink)]',
        link: 'h-auto border-0 p-0 text-primary shadow-none underline decoration-2 underline-offset-4 hover:translate-x-0 hover:translate-y-0',
        ghost: 'border-transparent shadow-none hover:border-border hover:bg-[var(--brutal-yellow)] hover:text-[var(--brutal-ink)]'
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 px-3 has-[>svg]:px-2.5',
        lg: 'h-11 px-6 has-[>svg]:px-4',
        icon: 'size-11'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
