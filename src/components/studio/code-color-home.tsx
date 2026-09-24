import { LocalTime } from '@/components/studio/local-time'
import { siteConfig } from '@/lib/site-config'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const projectKeys = ['four', 'five'] as const
const experienceKeys = ['fullstack', 'frontend', 'junior'] as const
const projects = {
  four: {
    image: '/projects/medivi-shop.png',
    demo: 'https://medivi-shop.vercel.app',
    source: 'https://github.com/felipehborges/medivi-shop',
    tools: 'Next.js · React · TypeScript · Tailwind CSS'
  },
  five: {
    image: '/projects/psico-gabriela.png',
    demo: null,
    source: 'https://github.com/felipehborges/psico-gabriela',
    tools: 'Next.js · React · TypeScript · Tailwind CSS'
  }
} as const

export function CodeColorHome() {
  const home = useTranslations('Home')
  const portfolio = useTranslations('Portfolio')
  const headlineAccent = portfolio('headlineAccent').replace(/[.!?]+$/, '')

  return (
    <div className="minimal-site">
      <div className="minimal-container">
        <section className="minimal-hero" id="top">
          <h1>
            Felipe Hamasaki — {portfolio('headline')} {headlineAccent}
            <span className="minimal-period">.</span>
            <span className="minimal-caret" aria-hidden="true" />
          </h1>
          <p>{portfolio('intro')}</p>
          <div className="minimal-links">
            <a className="minimal-email" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email} <span aria-hidden="true">↗</span>
            </a>
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </section>

        <section className="minimal-section" id="work">
          <div className="minimal-label">{home('work.kicker')}</div>
          <div className="minimal-projects">
            {projectKeys.map((key) => (
              <article className="minimal-project" key={key}>
                <a
                  className="minimal-project-visual"
                  href={projects[key].demo ?? projects[key].source}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${home(projects[key].demo ? 'work.demo' : 'work.source')}: ${home(`work.projects.${key}.title`)}`}
                >
                  <Image
                    src={projects[key].image}
                    alt={home(`work.projects.${key}.imageAlt`)}
                    width={1440}
                    height={900}
                    sizes="(max-width: 800px) 100vw, 760px"
                  />
                </a>
                <div className="minimal-project-copy">
                  <h2>{home(`work.projects.${key}.title`)}</h2>
                  <p>{home(`work.projects.${key}.solution`)}</p>
                </div>
                <p className="minimal-project-tools">{projects[key].tools}</p>
                <div className="minimal-project-links">
                  {projects[key].demo && (
                    <a
                      className="minimal-project-source"
                      href={projects[key].demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {home('work.demo')} <span aria-hidden="true">↗</span>
                    </a>
                  )}
                  <a
                    className="minimal-project-source"
                    href={projects[key].source}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {home('work.source')} <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="minimal-section" id="about">
          <div className="minimal-label">{home('about.kicker')}</div>
          <p className="minimal-about-copy">{home('about.paragraph1')}</p>
          <div className="minimal-experience">
            {experienceKeys.map((key) => (
              <article key={key}>
                <strong>{home(`experience.entries.${key}.role`)}</strong>
                <span>{home(`experience.entries.${key}.company`)}</span>
                <time>{home(`experience.entries.${key}.period`)}</time>
              </article>
            ))}
          </div>
        </section>

        <footer className="minimal-inline-footer">
          <span>© {new Date().getFullYear()} Felipe Hamasaki</span>
          <span className="minimal-location">
            <i /> São Paulo <LocalTime />
          </span>
        </footer>
      </div>
    </div>
  )
}
