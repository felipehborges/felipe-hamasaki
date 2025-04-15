'use client'

import DownloadResumeButton from '@/components/download-resume-button'
import ExperienceCard from '@/app/section-experience/components/card'
import { H1 } from '@/components/typography'

export default function SectionExperience() {
  return (
    <section id="experience" className="min-h-screen bg-background-page">
      <header className="flex items-center justify-center py-8">
        <H1>Experience</H1>
      </header>

      <div className="mb-8 flex items-center justify-center">
        <DownloadResumeButton />
      </div>

      <div className="flex flex-col items-center gap-8">
        <ExperienceCard
          jobTitle="English Teacher"
          jobPeriod="2012 - 2014 (2 years)"
          company="Skill Idiomas"
          location="Arujá, São Paulo - Brazil"
          imageUrl="/hamasaki/anime-teacher.png"
          companyUrl="https://www.linkedin.com/company/skill-idiomas?originalSubdomain=br"
        />

        <ExperienceCard
          jobTitle="Human Resources Analyst"
          jobPeriod="2015 - 2021 (6 years)"
          company="Tower International (Autokiniton)"
          location="Arujá, São Paulo - Brazil"
          imageUrl="/hamasaki/anime-hr.png"
          companyUrl="https://www.autokiniton.com/"
        />

        <ExperienceCard
          jobTitle="Junior Front-End Developer"
          jobPeriod="2022 - 2023 (2 years)"
          company="ODEEN - Intelligence for Security"
          location="Mogi das Cruzes, São Paulo - Brazil"
          imageUrl="/hamasaki/anime-jr-dev.png"
          companyUrl="https://www.odeen.com.br/"
        />

        <ExperienceCard
          jobTitle="Mid-Level Front-End Developer"
          jobPeriod="2023 - Present (1.5 years)"
          company="ODEEN - Intelligence for Security"
          location="Mogi das Cruzes, São Paulo - Brazil"
          imageUrl="/hamasaki/anime-mid-dev.png"
          companyUrl="https://www.odeen.com.br/"
        />
      </div>
    </section>
  )
}
