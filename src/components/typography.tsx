import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface TypographyProps {
  children: ReactNode
  className?: string
}

export function H1({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        'text-balance font-black font-sans text-display uppercase leading-[.95] tracking-[-.06em]',
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
        'text-balance border-border border-b-4 pb-3 font-black font-sans text-h2 uppercase tracking-[-.04em] first:mt-0',
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
    <blockquote
      className={cn(
        'border-primary border-l-8 bg-[var(--brutal-yellow)] p-6 font-bold text-[var(--brutal-ink)] text-lg not-italic shadow-[4px_4px_0_var(--brutal-ink)]',
        className
      )}
    >
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
