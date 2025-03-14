import Navbar from '@/components/navbar'
import SectionFooter from './section-footer/page'
import SectionAbout from './section-about/page'
import SectionHome from './section-home/page'
import SectionStacks from './section-stacks/page'
import SectionExperience from './section-experience/page'

export default function Home() {
  return (
    <main className="h-screen">
      <Navbar />

      <SectionHome />
      <SectionAbout />
      <SectionStacks />
      <SectionExperience />
      <SectionFooter />
    </main>
  )
}
