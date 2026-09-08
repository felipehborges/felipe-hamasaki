import { ContactSection } from '@/components/sections/contact-section'
import {
  FlipProof,
  PortfolioTerminal,
  ScrollCanvas
} from '@/components/studio/interactions'
import { Link } from '@/i18n/navigation'
import { siteConfig } from '@/lib/site-config'
import { useLocale, useTranslations } from 'next-intl'

export function CodeColorHome() {
  const t = useTranslations('Studio')
  const hero = useTranslations('Home.hero')
  const work = useTranslations('Home.work')
  const about = useTranslations('Home.about')
  const stack = useTranslations('Home.stack')
  const experience = useTranslations('Home.experience')
  const locale = useLocale()
  const groups = [
    {
      title: stack('frontend'),
      items: [
        'TypeScript',
        'React',
        'Next.js',
        'Tailwind CSS',
        'Zustand',
        'React Query'
      ]
    },
    {
      title: stack('backend'),
      items: ['Node.js', 'Express', 'MySQL', 'SQL', 'REST APIs', 'WebSocket']
    },
    {
      title: stack('engineering'),
      items: [
        'Git',
        'Biome',
        'pnpm',
        stack('componentArchitecture'),
        stack('featureArchitecture')
      ]
    },
    {
      title: stack('collaboration'),
      items: [
        stack('integrations'),
        stack('technicalWriting'),
        'Agile / Scrum',
        stack('aiDevelopment')
      ]
    }
  ]
  const career = [
    'fullstack',
    'frontend',
    'junior',
    'hrAnalyst',
    'hrIntern',
    'teacher'
  ] as const
  const resume =
    locale === 'pt-BR' ? siteConfig.resume.pt : siteConfig.resume.en
  const projects = [
    {
      id: 'one',
      stack: 'React / Next.js / Node.js / MySQL',
      context: 'https://www.odeen.com.br/'
    },
    {
      id: 'two',
      stack: 'TypeScript / WebSocket / React / Node.js',
      context: 'https://www.odeen.com.br/'
    },
    {
      id: 'three',
      stack: 'React / TypeScript / Tailwind CSS / Biome',
      context: siteConfig.links.github
    }
  ] as const
  return (
    <ScrollCanvas>
      <section className="cc-terminal cc-intro" id="top" data-scroll>
        <div className="cc-inner">
          <div className="cc-meta">
            <span>{t('codeSide')}</span>
            <span className="studio-available">
              <i />
              {hero('status')}
            </span>
          </div>
          <div className="cc-intro-grid">
            <div>
              <p className="cc-prompt">felipe@são-paulo:~$ whoami</p>
              <h1>
                Felipe
                <br />
                <em>
                  Hamasaki<span className="cc-caret">_</span>
                </em>
              </h1>
              <p className="studio-hero-thesis">
                {t('heroLine')}
                <br />
                {t('heroEmphasis')}
              </p>
              <p className="cc-copy">{hero('lede')}</p>
              <div className="studio-hero-actions">
                <a href="#work" className="cc-text-link">
                  {t('scroll')} <span aria-hidden="true">↓</span>
                </a>
                <a
                  href={resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="studio-resume"
                >
                  {hero('resume')} ↗
                </a>
              </div>
            </div>
            <div className="cc-code-space">
              <div className="cc-wire-grid" aria-hidden="true" />
              <div className="cc-code-panel">
                <div className="cc-panel-head">
                  <span aria-hidden="true">● ● ●</span>
                  <span>felipe.config.ts</span>
                </div>
                <pre>
                  <span className="cc-dim">{`${t('fileComment')}\n\n`}</span>
                  <span className="cc-lime">{'const '}</span>
                  {'felipe = {\n  role: '}
                  <b>{'"Full Stack"'}</b>
                  {',\n  language: '}
                  <b>{'"TypeScript"'}</b>
                  {',\n  timezone: '}
                  <b>{'"UTC−3"'}</b>
                  {',\n  english: '}
                  <b>{'"C2"'}</b>
                  {',\n  exploring: [\n    '}
                  <b>{'"UI", "motion"'}</b>
                  {',\n    '}
                  <b>{'"design engineering"'}</b>
                  {'\n  ]\n};'}
                </pre>
                <div className="cc-code-foot">
                  <span>✓ {t('codeStatus')}</span>
                  <span>24/7</span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="studio-remote-facts"
            aria-label={hero('remoteDetails')}
          >
            <div>
              <span>{hero('timeZoneLabel')}</span>
              <strong>{hero('timeZoneValue')}</strong>
            </div>
            <div>
              <span>{hero('englishLabel')}</span>
              <strong>{hero('englishValue')}</strong>
            </div>
            <div>
              <span>{hero('statusLabel')}</span>
              <strong>{hero('statusValue')}</strong>
            </div>
          </div>
        </div>
      </section>
      <section className="cc-neo cc-yellow studio-work" id="work" data-scroll>
        <div className="cc-ticker" aria-hidden="true">
          <div>{`${t('tape')} ✳ `.repeat(4)}</div>
        </div>
        <div className="cc-inner">
          <div className="cc-meta">
            <span>{t('workSide')}</span>
            <span>ODEEN / 2022 →</span>
          </div>
          <div className="studio-work-heading">
            <div>
              <h2>
                {t('workLine')}
                <br />
                <em>{t('workEmphasis')}</em>
              </h2>
              <p>{t('workNote')}</p>
            </div>
            <FlipProof
              labels={{
                flip: t('flip'),
                back: t('flipBack'),
                heading: t('proofLabel'),
                caption: t('proofCaption'),
                note: t('proofCodeNote')
              }}
            />
          </div>
          <div className="studio-projects">
            {projects.map((project, index) => (
              <article className="studio-project" key={project.id}>
                <div className="studio-project-top">
                  <span>0{index + 1}</span>
                  <a
                    href={project.context}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={work('contextFor', {
                      title: work(`projects.${project.id}.title`)
                    })}
                  >
                    {work('context')} ↗
                  </a>
                </div>
                <h3>{work(`projects.${project.id}.title`)}</h3>
                <div className="studio-result">
                  <span>{work('result')}</span>
                  <strong>{work(`projects.${project.id}.result`)}</strong>
                </div>
                <p>{work(`projects.${project.id}.problem`)}</p>
                <details>
                  <summary>
                    {t('details')}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <div>
                    <h4>{work('solution')}</h4>
                    <p>{work(`projects.${project.id}.solution`)}</p>
                  </div>
                </details>
                <span className="studio-project-stack">{project.stack}</span>
              </article>
            ))}
          </div>
          <div className="cc-neo-foot">
            <span>UI / TYPESCRIPT / FULL STACK</span>
            <a href="#stack">{t('stackSide')} ↓</a>
          </div>
        </div>
      </section>
      <section className="cc-terminal studio-stack" id="stack" data-scroll>
        <div className="cc-inner">
          <div className="cc-meta">
            <span>{t('stackSide')}</span>
            <span>TYPE-SAFE / PEOPLE-FIRST</span>
          </div>
          <div className="cc-process-grid">
            <div className="cc-process-heading">
              <p className="cc-prompt">~/toolbox $ inspect</p>
              <h2>
                {t('stackLine')}
                <br />
                <em>{t('stackEmphasis')}</em>
              </h2>
              <p className="cc-copy">{t('stackNote')}</p>
            </div>
            <PortfolioTerminal
              labels={{
                label: t('terminalLabel'),
                run: t('commandRun'),
                ready: t('commandReady'),
                help: t('commandHelp'),
                unknown: t('commandUnknown'),
                clear: t('commandClear'),
                who: t('commandWho'),
                hire: t('commandHire'),
                placeholder: t('commandPlaceholder')
              }}
            />
          </div>
          <div className="studio-tools">
            {groups.map((group) => (
              <div key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="cc-neo cc-pink studio-about" id="about" data-scroll>
        <div className="cc-ticker cc-ticker-pink" aria-hidden="true">
          <div>
            PEOPLE. PRODUCT. CODE. ✳ PEOPLE. PRODUCT. CODE. ✳ PEOPLE. PRODUCT.
            CODE. ✳
          </div>
        </div>
        <div className="cc-inner">
          <div className="cc-meta">
            <span>{t('aboutSide')}</span>
            <span>FELIPE / HUMAN.README</span>
          </div>
          <div className="studio-about-grid">
            <div>
              <h2>
                {t('aboutLine')}
                <br />
                <em>{t('aboutEmphasis')}</em>
              </h2>
              <p className="studio-about-note">{t('aboutNote')}</p>
              <p>{about('paragraph3')}</p>
              <p>{about('paragraph2')}</p>
              <p className="studio-about-evolution">{t('evolution')}</p>
              <Link href="/about" className="cc-hard-button">
                {t('fullStory')} <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div
              className="cc-stack-space"
              aria-label="Code / Interface / People"
            >
              <div className="cc-stack-card cc-stack-back">
                <span>01 / FULL STACK</span>
                <strong>&lt;/&gt;</strong>
                <small>{t('cardCode')}</small>
              </div>
              <div className="cc-stack-card cc-stack-mid">
                <span>02 / FRONTEND</span>
                <strong>Aa</strong>
                <small>{t('cardDesign')}</small>
              </div>
              <div className="cc-stack-card cc-stack-front">
                <span>03 / PEOPLE</span>
                <strong>C2 ↗</strong>
                <small>{t('cardPeople')}</small>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="cc-terminal studio-experience"
        id="experience"
        data-scroll
      >
        <div className="cc-inner">
          <div className="cc-meta">
            <span>{t('careerSide')}</span>
            <span>git log --oneline</span>
          </div>
          <div className="studio-experience-heading">
            <h2>
              {t('careerLine')}
              <br />
              <em>{t('careerEmphasis')}</em>
            </h2>
            <p>{t('careerNote')}</p>
          </div>
          <div className="studio-timeline">
            {career.map((entry) => (
              <article key={entry}>
                <time>{experience(`entries.${entry}.period`)}</time>
                <div>
                  <h3>{experience(`entries.${entry}.role`)}</h3>
                  <span>{experience(`entries.${entry}.company`)}</span>
                </div>
                <p>{experience(`entries.${entry}.impact`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ContactSection />
    </ScrollCanvas>
  )
}
