import Navbar from '@/components/navbar'
import ThreeScene from '@/components/three-scene'
import { Button } from '@/components/ui/button'
import { ButtonLang } from '@/components/ui/button-change-lang'
import { ButtonTheme } from '@/components/ui/button-change-theme'
import { H1, H2, P, InlineCode } from '@/components/ui/typography'
import { useTranslations } from 'next-intl'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import SectionHome from './section-home/page'
import SectionHistory from './section-history/page'
import SectionFooter from './section-footer/page'
import MotionBasics from './motion/basics'
import MotionGestures from './motion/gestures'
import MotionAnimationControls from './motion/animation-controls'

export default function Home() {
  const t = useTranslations()

  return (
    <div
      className="h-screen overflow-y-scroll bg-background-page"
      // scroll-smooth
    >
      <Navbar />

      <div className="h-screen flex justify-center items-center gap-4">
        {/* <MotionBasics /> */}
        <MotionAnimationControls />
      </div>

      <SectionHome />
      <SectionHistory />
      <SectionFooter />
    </div>
  )
}
