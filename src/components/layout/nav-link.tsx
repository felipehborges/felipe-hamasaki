'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

export function NavLink({
  href,
  children
}: {
  href: string
  children: ReactNode
}) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        'hover:text-foreground',
        isActive ? 'text-foreground' : 'text-muted-foreground'
      )}
    >
      <Link href={href} aria-current={isActive ? 'page' : undefined}>
        {children}
      </Link>
    </Button>
  )
}
import { Button } from '@/components/ui/button'
