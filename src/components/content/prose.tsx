import type { ReactNode } from 'react'

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-[68ch] flex-col gap-6 text-base leading-[1.7] [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:border [&_pre]:border-border [&_pre]:p-4 [&_pre]:text-sm">
      {children}
    </div>
  )
}
