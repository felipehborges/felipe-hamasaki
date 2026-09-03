import type { ReactNode } from 'react'

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="portfolio-prose mx-auto flex max-w-[68ch] flex-col gap-6 text-base leading-[1.7] [&_pre]:overflow-x-auto [&_pre]:border-2 [&_pre]:border-border [&_pre]:bg-[#111] [&_pre]:p-5 [&_pre]:text-sm [&_pre]:shadow-[6px_6px_0_var(--brutal-ink)]">
      {children}
    </div>
  )
}
