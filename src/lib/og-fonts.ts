export async function loadOgFonts() {
  const [interBold, newsreaderMedium] = await Promise.all([
    fetch(new URL('../../public/fonts/Inter-Bold.ttf', import.meta.url)).then(
      (response) => response.arrayBuffer()
    ),
    fetch(
      new URL('../../public/fonts/Newsreader-Medium.ttf', import.meta.url)
    ).then((response) => response.arrayBuffer())
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
