import { LocalTime } from '@/components/studio/local-time'
import { siteConfig } from '@/lib/site-config'
import { useTranslations } from 'next-intl'

const projectKeys = [
  // 'one',
  // 'two',
  // 'three',
  'four'
] as const
const experienceKeys = ['fullstack', 'frontend', 'junior'] as const
const projectTools = {
  one: 'TypeScript · React · Next.js · Node',
  two: 'React · WebSocket · Real time',
  three: 'TypeScript · React · UI · Docs',
  four: 'Next.js · TypeScript · PostgreSQL · Drizzle'
} as const

export function CodeColorHome() {
  const home = useTranslations('Home')
  const portfolio = useTranslations('Portfolio')
  const design = useTranslations('Design')
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
                <div className="minimal-project-visual">
                  <span>{home(`work.projects.${key}.result`)}</span>
                </div>
                <div className="minimal-project-copy">
                  <h2>{home(`work.projects.${key}.title`)}</h2>
                  <p>{home(`work.projects.${key}.solution`)}</p>
                </div>
                <p className="minimal-project-tools">{projectTools[key]}</p>
                {key === 'four' && (
                  <a
                    className="minimal-project-source"
                    href="https://github.com/felipehborges/medivi-shop"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {design('source')} <span aria-hidden="true">↗</span>
                  </a>
                )}
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
