import { H1 } from '@/components/typography'
import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 text-center md:px-8">
      <H1>Page not found</H1>

      <p className="mt-4 text-muted-foreground">
        The page you're looking for doesn't exist.
      </p>

      <div className="mt-8 flex justify-center gap-6">
        <Link href="/" className="text-sm hover:underline">
          Go home
        </Link>
        <Link href="/about" className="text-sm hover:underline">
          About
        </Link>
      </div>
    </section>
  )
}
