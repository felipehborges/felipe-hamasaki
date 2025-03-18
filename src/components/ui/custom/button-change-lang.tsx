'use client'

import { Button } from '@/components/ui/button'
import { LanguagesIcon } from 'lucide-react'

export function ButtonLang() {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => console.log('change lang')}
    >
      <LanguagesIcon className="h-[1.2rem] w-[1.2rem] text-gradient" />
      <span className="sr-only">Toggle language</span>
    </Button>
  )
}
