'use client'

import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { ButtonTheme } from './ui/button-change-theme'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Navbar(props: { className?: string }) {
  return (
    <nav
      className={cn(
        'lg:p-6 p-2 z-20',
        'bg-card-secondary border-b-4 border-black',
        'w-full flex justify-between items-center',
        'fixed left-0 top-0',
        props.className
      )}
    >
      <div className="ml-4">
        <Button className="mr-4">Default</Button>
        <Button className="mr-4" variant="destructive">
          Destructive
        </Button>
        <Button className="mr-4" variant="ghost">
          Ghost
        </Button>
        <Button className="mr-4" variant="outline">
          Outline
        </Button>
        <Button className="mr-4" variant="link">
          Link
        </Button>
        <Button className="mr-4" variant="secondary">
          Secondary
        </Button>
      </div>

      <ButtonTheme />
    </nav>
  )
}
