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
          jobPeriod="2012 - 2014"
          company="Skill Idiomas"
          location="Arujá, São Paulo - Brazil"
          imageUrl="/hamasaki/exp-teacher.png"
          companyUrl="https://www.linkedin.com/company/skill-idiomas?originalSubdomain=br"
        />

        <ExperienceCard
          jobTitle="Human Resources Analyst"
          jobPeriod="2015 - 2021"
          company="Tower International (Autokiniton)"
          location="Arujá, São Paulo - Brazil"
          imageUrl="/hamasaki/exp-hr.png"
          companyUrl="https://www.autokiniton.com/"
        />

        <ExperienceCard
          jobTitle="Junior Front-End Developer"
          jobPeriod="2022 - 2023"
          company="ODEEN - Intelligence for Security"
          location="Mogi das Cruzes, São Paulo - Brazil"
          imageUrl="/hamasaki/exp-dev1.png"
          companyUrl="https://www.odeen.com.br/"
        />

        <ExperienceCard
          jobTitle="Mid-Level Front-End Developer"
          jobPeriod="2023 - 2025"
          company="ODEEN - Intelligence for Security"
          location="Mogi das Cruzes, São Paulo - Brazil"
          imageUrl="/hamasaki/exp-dev2.png"
          companyUrl="https://www.odeen.com.br/"
        />

        <ExperienceCard
          jobTitle="Mid-Level Full Stack Developer"
          jobPeriod="2025 - Present"
          company="ODEEN - Intelligence for Security"
          location="Mogi das Cruzes, São Paulo - Brazil"
          imageUrl="/hamasaki/exp-dev3.png"
          companyUrl="https://www.odeen.com.br/"
        />
      </div>
    </section>
  )
}
