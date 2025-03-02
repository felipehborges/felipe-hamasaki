'use client'

import { Button } from '@/components/ui/shadcn/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/shadcn/dropdown-menu'
import { Languages, LanguagesIcon, Moon, Sun } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function ButtonLang() {
  const t = useTranslations('components')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {/* <Languages className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-gradient-to-r from-green-400 to-yellow-400" />
          <Languages className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-gradient-to-r from-green-400 to-yellow-400" /> */}
          {/* <Languages className="text-gradient" /> */}
          <LanguagesIcon className="h-[1.2rem] w-[1.2rem] text-gradient" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t('button-change-lang.title')}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
        // onClick={() => setTheme('light')}
        >
          {t('button-change-lang.pt')}
        </DropdownMenuItem>

        <DropdownMenuItem
        // onClick={() => setTheme('dark')}
        >
          {t('button-change-lang.en')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
