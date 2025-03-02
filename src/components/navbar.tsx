'use client'

import { ButtonTheme } from './ui/button-change-theme'

export default function Navbar() {
  return (
    <div className="flex justify-between items-center bg-secondary p-4">
      <p>This is the navbar</p>

      <ButtonTheme />
    </div>
  )
}
