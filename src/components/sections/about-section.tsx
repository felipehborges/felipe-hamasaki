export function AboutSection() {
  return (
    <section
      className="portfolio-container portfolio-section portfolio-about"
      id="about"
    >
      <div>
        <span className="portfolio-kicker">ABOUT</span>
        <h2>
          Clear software.
          <br />
          Candid teamwork.
        </h2>
      </div>

      <div className="portfolio-about-copy">
        <p>
          I’m a full stack engineer based in São Paulo. I build and modernise
          operational software for corporate intelligence and fraud prevention,
          where reliability matters because people use the product all day.
        </p>
        <p>
          I started on the frontend and now work across the stack. I like being
          close to product decisions, making trade-offs explicit, and improving
          the conventions that let a small team move without stepping on itself.
        </p>
        <p>
          Before software, I taught English and spent six years in HR. Payroll
          taught me that some bugs are personal; the classroom taught me to
          explain complicated things without hiding behind jargon.
        </p>
      </div>
    </section>
  )
}
