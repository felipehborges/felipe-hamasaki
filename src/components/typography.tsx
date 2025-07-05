'use client'

import { cn } from '@/lib/utils'
import { Domine } from 'next/font/google'
import type { ReactNode } from 'react'

interface TypographyProps {
  children: ReactNode
  className?: string
}

const domine = Domine({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export function H1({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        `scroll-m-20 font-extrabold text-3xl tracking-tight md:text-4xl xl:text-5xl ${domine.className}`,
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
        'scroll-m-20 border-b pb-2 font-semibold text-3xl tracking-tight first:mt-0',
        className
      )}
    >
      {children}
    </h2>
  )
}

export function H3({ children, className }: TypographyProps) {
  return (
    <h3
      className={cn(
        'scroll-m-20 font-semibold text-2xl tracking-tight',
        className
      )}
    >
      {children}
    </h3>
  )
}

export function H4({ children, className }: TypographyProps) {
  return (
    <h4
      className={cn(
        'scroll-m-20 font-semibold text-xl tracking-tight',
        className
      )}
    >
      {children}
    </h4>
  )
}

export function P({ children, className }: TypographyProps) {
  return (
    <p className={cn('leading-6 [&:not(:first-child)]:mt-6', className)}>
      {children}
    </p>
  )
}

export function Blockquote({ children, className }: TypographyProps) {
  return (
    <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)}>
      {children}
    </blockquote>
  )
}

export function InlineCode({ children, className }: TypographyProps) {
  return (
    <code
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold text-sm',
        className
      )}
    >
      {children}
    </code>
  )
}

export function Lead({ children, className }: TypographyProps) {
  return (
    <p className={cn('text-muted-foreground text-xl', className)}>{children}</p>
  )
}

export function Large({ children, className }: TypographyProps) {
  return (
    <div className={cn('font-semibold text-lg', className)}>{children}</div>
  )
}

export function Small({ children, className }: TypographyProps) {
  return (
    <small className={cn('font-medium text-sm leading-none', className)}>
      {children}
    </small>
  )
}

export function Muted({ children, className }: TypographyProps) {
  return (
    <p className={cn('text-muted-foreground text-sm', className)}>{children}</p>
  )
}
