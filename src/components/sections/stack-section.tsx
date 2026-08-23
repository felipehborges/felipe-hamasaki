const groups = [
  {
    title: 'Frontend',
    items: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Accessibility']
  },
  {
    title: 'Backend & data',
    items: ['Node.js', 'Express', 'MySQL', 'SQL', 'REST APIs', 'WebSocket']
  },
  {
    title: 'Delivery',
    items: ['pnpm', 'Biome', 'Git', 'CI/CD', 'Google Cloud']
  },
  {
    title: 'How I work',
    items: ['System design', 'Design systems', 'Technical writing', 'Mentoring']
  }
]

export function StackSection() {
  return (
    <section className="portfolio-stack-section" id="stack">
      <div className="portfolio-container portfolio-section">
        <div className="portfolio-section-heading">
          <div>
            <span className="portfolio-kicker">TOOLKIT</span>
            <h2>Right tool. Clear reason.</h2>
          </div>
          <p>
            Technologies I use in production, grouped by the job they do — no
            arbitrary percentage bars involved.
          </p>
        </div>

        <div className="portfolio-stack-grid">
          {groups.map((group) => (
            <div className="portfolio-stack-group" key={group.title}>
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
  )
}
