import Navbar from '@/components/navbar'
import ThreeScene from '@/components/three-scene'
import { Button } from '@/components/ui/button'
import { ButtonLang } from '@/components/ui/button-change-lang'
import { ButtonTheme } from '@/components/ui/button-change-theme'
import { H1, P } from '@/components/ui/typography'
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations()

  return (
    <div className="">
      <Navbar />

      <div className="text-lg p-10">
        <div className="flex gap-2">
          <Button className="mb-10">default</Button>
          <Button variant="destructive">destructive</Button>
          <Button variant="ghost">ghost</Button>
          <Button variant="link">link</Button>
          <Button variant="outline">outline</Button>
          <Button variant="secondary">secondary</Button>
        </div>

        <h1 className="font-bold text-2xl">This is a title</h1>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          nulla non ut, quas veritatis sequi eaque animi facilis enim similique
          placeat repellendus rerum? Consectetur sequi ipsum inventore alias
          odit eum.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, sint
          harum. Ad quidem illum, dolor exercitationem doloremque amet molestias
          culpa similique ipsa rem dignissimos minima sit? Tempore odit fugiat
          porro.
        </p>
      </div>

      {/* <ThreeScene /> */}
    </div>
  )
}
