import { siteConfig } from '@/lib/site-config'
import Link from 'next/link'

const projects = [
  {
    number: '01',
    title: 'Intelligence platform for 24/7 operations',
    problem:
      'Analysts needed to connect vehicle tracking, mapping, advanced search, and sensitive records without losing context.',
    solution:
      'Built and modernised the React and Next.js interface while extending Node.js, Express, and MySQL services behind it.',
    result: '≈100 analysts · 24/7 use',
    stack: ['React', 'Next.js', 'Node.js', 'MySQL', 'REST'],
    context: 'https://www.odeen.com.br/'
  },
  {
    number: '02',
    title: 'Real-time telecom site monitoring',
    problem:
      'Security teams needed one live view of remote tower sites and the hardware protecting them.',
    solution:
      'Delivered video, smoke, access, and anti-theft signals through WebSocket and polling, integrated with in-house hardware.',
    result: '4 live signal types',
    stack: ['TypeScript', 'WebSocket', 'React', 'Node.js'],
    context: 'https://www.odeen.com.br/'
  },
  {
    number: '03',
    title: 'A design system teams actually reuse',
    problem:
      'Product interfaces were repeating the same decisions and drifting as the platform grew.',
    solution:
      'Built a private React component package and introduced shared tooling, naming, release, and documentation standards.',
    result: '≈50 reusable components',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Biome', 'pnpm'],
    context: siteConfig.links.github
  }
]

export function SelectedWork() {
  return (
    <section className="portfolio-container portfolio-section" id="work">
      <div className="portfolio-section-heading">
        <div>
          <span className="portfolio-kicker">SELECTED WORK</span>
          <h2>Proof, not promises.</h2>
        </div>
        <p>
          Production systems are private. These concise case studies show the
          problem, the implementation, and a result that can be discussed
          without pretending an NDA is a demo link.
        </p>
      </div>

      <div className="portfolio-project-grid">
        {projects.map((project) => (
          <article className="portfolio-project-card" key={project.number}>
            <div className="portfolio-project-top">
              <span>{project.number}</span>
              <Link
                href={project.context}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={'Context for ' + project.title}
              >
                Context <span aria-hidden="true">↗</span>
              </Link>
            </div>

            <h3>{project.title}</h3>

            <dl>
              <div>
                <dt>Problem</dt>
                <dd>{project.problem}</dd>
              </div>
              <div>
                <dt>Solution</dt>
                <dd>{project.solution}</dd>
              </div>
            </dl>

            <div className="portfolio-project-result">
              <span>RESULT</span>
              <strong>{project.result}</strong>
            </div>

            <div className="portfolio-tags">
              {project.stack.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
