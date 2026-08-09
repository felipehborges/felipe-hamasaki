import fs from 'node:fs/promises'
import path from 'node:path'

export async function loadOgFonts() {
  const [interBold, newsreaderMedium] = await Promise.all([
    fs.readFile(path.join(process.cwd(), 'public/fonts/Inter-Bold.ttf')),
    fs.readFile(path.join(process.cwd(), 'public/fonts/Newsreader-Medium.ttf'))
  ])

  return [
    {
      name: 'Inter',
      data: interBold,
      weight: 700 as const,
      style: 'normal' as const
    },
    {
      name: 'Newsreader',
      data: newsreaderMedium,
      weight: 500 as const,
      style: 'normal' as const
    }
  ]
}
