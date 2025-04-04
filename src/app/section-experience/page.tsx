'use client'

import DownloadResumeButton from '@/components/download-resume-button'
import ExperienceCard from '@/components/ui/custom/experience-card'
import { H1 } from '@/components/ui/custom/typography'

export default function SectionExperience() {
  return (
    <section id="experience" className="min-h-screen bg-background-page">
      <header className="flex items-center justify-center py-8">
        <H1>Experience</H1>
      </header>

      <div className="flex items-center justify-center mb-8">
        <DownloadResumeButton />
      </div>

      <div className="flex flex-col items-center gap-4">
        <ExperienceCard
          jobTitle="Mid-Level Front-End Developer"
          jobPeriod="2023 - Present (1.5 years)"
          company="ODEEN - Intelligence for Security"
          location="Mogi das Cruzes, São Paulo - Brazil"
          imageUrl="/me-anime-mid.png"
          companyUrl="https://www.odeen.com.br/"
        />

        <ExperienceCard
          jobTitle="Junior Front-End Developer"
          jobPeriod="2022 - 2023 (2 years)"
          company="ODEEN - Intelligence for Security"
          location="Mogi das Cruzes, São Paulo - Brazil"
          imageUrl="/me-anime-jr.png"
          companyUrl="https://www.odeen.com.br/"
        />

        <ExperienceCard
          jobTitle="Human Resources Analyst"
          jobPeriod="2015 - 2021 (6 years)"
          company="Tower International (Acquired by Autokiniton)"
          location="Arujá, São Paulo - Brazil"
          imageUrl="/me-anime-hr.png"
          companyUrl="https://www.autokiniton.com/"
        />

        <ExperienceCard
          jobTitle="English Teacher"
          jobPeriod="2012 - 2014 (2 years)"
          company="Skill Idiomas (Closed)"
          location="Arujá, São Paulo - Brazil"
          imageUrl="/me-anime-teacher.png"
          companyUrl="https://www.linkedin.com/company/skill-idiomas?originalSubdomain=br"
        />
      </div>
    </section>
  )
}
