export const siteConfig = {
  name: 'Felipe Hamasaki',
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    'https://felipe-hamasaki.fehamasaki.chatgpt.site',
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
