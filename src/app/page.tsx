import Navbar from '@/components/navbar'
import SectionAbout from './section-about/page'
import SectionExperience from './section-experience/page'
import SectionFooter from './section-footer/page'
import SectionHome from './section-home/page'
import SectionProjects from './section-projects/page'
import SectionSkills from './section-skills/page'

export default function Home() {
  return (
    <main className="h-screen">
      <Navbar />

      <SectionHome />
      <SectionAbout />
      <SectionSkills />
      <SectionExperience />
      <SectionProjects />
      <SectionFooter />
    </main>
  )
}
