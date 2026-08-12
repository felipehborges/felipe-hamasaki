export const siteConfig = {
  name: 'Felipe Hamasaki',
  role: 'Full Stack Developer',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  description:
    'Full stack developer, frontend-focused — React, Next.js, TypeScript, Node.js. 4 years building corporate intelligence and anti-fraud platforms. Open to remote.',
  email: 'felipehama@gmail.com',
  location: 'São Paulo, Brazil',
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
