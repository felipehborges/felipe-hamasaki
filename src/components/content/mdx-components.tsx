import { cn } from '@/lib/utils'
import type { MDXRemoteProps } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import type { ComponentProps } from 'react'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import type { PluggableList } from 'unified'

const remarkPlugins: PluggableList = [remarkGfm]

const rehypePlugins: PluggableList = [
  rehypeSlug,
  [rehypeAutolinkHeadings, { behavior: 'wrap' }],
  [
    rehypePrettyCode,
    {
      theme: { light: 'github-light', dark: 'github-dark-default' },
      keepBackground: false
    }
  ]
]

export const mdxOptions = { remarkPlugins, rehypePlugins }

function isExternal(href: string) {
  return /^https?:\/\//.test(href)
}

export const mdxComponents: MDXRemoteProps['components'] = {
  h2: ({ className, ...props }: ComponentProps<'h2'>) => (
    <h2
      className={cn(
        'mt-4 border-b font-serif text-h2 tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: ComponentProps<'h3'>) => (
    <h3
      className={cn('mt-2 font-semibold text-h3 tracking-tight', className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: ComponentProps<'p'>) => (
    <p className={cn('text-pretty', className)} {...props} />
  ),
  a: ({ href, className, ...props }: ComponentProps<'a'>) => {
    const external = href ? isExternal(href) : false
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={cn('underline underline-offset-2', className)}
        {...props}
      />
    )
  },
  img: ({ src, alt }: ComponentProps<'img'>) => {
    if (typeof src !== 'string') return null
    return (
      <span className="relative block aspect-video w-full overflow-hidden rounded-md border border-border">
        <Image
          src={src}
          alt={alt ?? ''}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 68ch, 100vw"
        />
      </span>
    )
  }
}
