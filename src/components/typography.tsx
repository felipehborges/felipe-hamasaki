import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface TypographyProps {
  children: ReactNode
  className?: string
}

export function Eyebrow({ children, className }: TypographyProps) {
  return (
    <p
      className={cn(
        'font-mono text-[11px] text-muted-foreground/70 uppercase tracking-[0.15em]',
        className
      )}
    >
      {children}
    </p>
  )
}

export function H1({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        'text-balance font-serif text-display tracking-tight',
        className
      )}
    >
      {children}
    </h1>
  )
}

export function H2({ children, className }: TypographyProps) {
  return (
    <h2
      className={cn(
        'text-balance border-b font-serif text-h2 tracking-tight first:mt-0',
        className
      )}
    >
      {children}
    </h2>
  )
}

export function H3({ children, className }: TypographyProps) {
  return (
    <h3 className={cn('font-semibold text-h3 tracking-tight', className)}>
      {children}
    </h3>
  )
}

export function H4({ children, className }: TypographyProps) {
  return (
    <h4 className={cn('font-semibold text-base tracking-tight', className)}>
      {children}
    </h4>
  )
}

export function P({ children, className }: TypographyProps) {
  return (
    <p
      className={cn(
        'text-pretty text-base leading-normal [&:not(:first-child)]:mt-6',
        className
      )}
    >
      {children}
    </p>
  )
}

export function Blockquote({ children, className }: TypographyProps) {
  return (
    <blockquote className={cn('border-l-2 pl-6 text-lg italic', className)}>
      {children}
    </blockquote>
  )
}

export function InlineCode({ children, className }: TypographyProps) {
  return (
    <code
      className={cn(
        'rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-medium font-mono text-sm',
        className
      )}
    >
      {children}
    </code>
  )
}

export function Lead({ children, className }: TypographyProps) {
  return (
    <p className={cn('text-pretty text-lg text-muted-foreground', className)}>
      {children}
    </p>
  )
}

export function Large({ children, className }: TypographyProps) {
  return (
    <div className={cn('font-semibold text-lg', className)}>{children}</div>
  )
}

export function Small({ children, className }: TypographyProps) {
  return (
    <small className={cn('font-medium text-xs leading-none', className)}>
      {children}
    </small>
  )
}

export function Muted({ children, className }: TypographyProps) {
  return (
    <p className={cn('text-muted-foreground text-sm', className)}>{children}</p>
  )
}
