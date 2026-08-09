export const siteConfig = {
  name: 'Felipe Hamasaki',
  role: 'Full Stack Developer',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  description:
    'Full stack developer working in TypeScript, with 4+ years of professional experience. Open to any development role, remote, as a contractor.',
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
