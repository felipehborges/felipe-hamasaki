export const siteConfig = {
  name: 'Felipe Hamasaki',
  role: 'Full Stack Engineer',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  description:
    'Full stack engineer building dependable operational software for corporate intelligence, tracking, and fraud prevention. Open to remote roles.',
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
