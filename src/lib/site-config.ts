const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()

export const siteConfig = {
  name: 'Felipe Hamasaki',
  url: configuredSiteUrl || 'https://hamasaki.dev',
  email: 'felipehama@gmail.com',
  links: {
    github: 'https://github.com/felipehborges',
    linkedin: 'https://www.linkedin.com/in/felipehborges/',
    repo: 'https://github.com/felipehborges/felipe-hamasaki'
  },
  resume: {
    en: '/resume/eng-resume.pdf',
    pt: '/resume/pt-resume.pdf'
  }
} as const
