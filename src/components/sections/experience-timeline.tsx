const experience = [
  {
    period: 'MAR 2025 — NOW',
    role: 'Full Stack Developer',
    company: 'ODEEN — Intelligence for Security',
    impact:
      'Building intelligence and fraud-prevention products used around the clock by roughly 100 analysts.'
  },
  {
    period: 'MAY 2023 — FEB 2025',
    role: 'Front End Developer',
    company: 'ODEEN — Intelligence for Security',
    impact:
      'Created a private library of around 50 React components and the standards used by a five-person team.'
  },
  {
    period: 'JAN 2022 — APR 2023',
    role: 'Junior Front End Developer',
    company: 'ODEEN — Intelligence for Security',
    impact:
      'Built responsive operator interfaces with React, TypeScript, and Tailwind CSS.'
  },
  {
    period: '2015 — 2021',
    role: 'HR Analyst & Intern',
    company: 'Autokiniton',
    impact:
      'Ran payroll and reporting in an American manufacturer while studying programming for a career change.'
  },
  {
    period: '2013 — 2014',
    role: 'English Teacher',
    company: 'Skill Idiomas',
    impact:
      'Taught beginner-to-intermediate English — the less obvious origin of my C2 communication skills.'
  }
]

export function ExperienceTimeline() {
  return (
    <section className="portfolio-experience" id="experience">
      <div className="portfolio-container portfolio-section">
        <div className="portfolio-section-heading portfolio-section-heading-compact">
          <div>
            <span className="portfolio-kicker">EXPERIENCE</span>
            <h2>Built in production.</h2>
          </div>
        </div>

        <div className="portfolio-timeline">
          {experience.map((entry) => (
            <article
              className="portfolio-timeline-row"
              key={entry.period + entry.role}
            >
              <time>{entry.period}</time>
              <div>
                <h3>{entry.role}</h3>
                <span>{entry.company}</span>
              </div>
              <p>{entry.impact}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
