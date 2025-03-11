import Navbar from '@/components/navbar'
import { useTranslations } from 'next-intl'
import SectionFooter from './section-footer/page'
import SectionAbout from './section-about/page'
import SectionHome from './section-home/page'
import SectionStacks from './section-stacks/page'

export default function Home() {
  const t = useTranslations()

  return (
    <div
      className="h-screen overflow-y-scroll bg-background-page"
      // scroll-smooth
    >
      <Navbar />

      <SectionHome />
      <SectionAbout />
      <SectionStacks />
      <SectionFooter />
    </div>
  )
}
