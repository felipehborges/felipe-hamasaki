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

export default function Home() {
  const t = useTranslations()

  return (
    <div className="h-screen overflow-y-scroll scroll-smooth bg-background-page">
      <Navbar />

      <section className="pt-17 h-screen grid grid-cols-2 gap-10">
        <div className="flex flex-col justify-center items-end gap-2 ">
          <H1 className="">Greetings!</H1>
          <H1 className="">I'm Felipe Hamasaki</H1>
        </div>

        <div className="flex flex-col justify-center items-start ">
          <P className="md:w-2/3 lg:w-1/2">
            I'm a passionate software developer and a tech enthusiast. I love
            learning new things and sharing knowledge with others. I'm currently
            working with React and Next.js, but I'm always open to new
            opportunities and challenges.
          </P>
        </div>
      </section>

      <section className="pt-17 h-screen">
        <H1 className="font-bold text-2xl">This is a title</H1>

        <P>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          nulla non ut, quas veritatis sequi eaque animi facilis enim similique
          placeat repellendus rerum? Consectetur sequi ipsum inventore alias
          odit eum.
        </P>

        <div className="flex gap-4 mx-20 my-10">
          <Card>
            <CardHeader>
              <CardTitle>This is a card</CardTitle>
              <CardDescription>Card description</CardDescription>
            </CardHeader>

            <CardContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              nulla non ut, quas veritatis sequi eaque animi facilis enim
              similique placeat repellendus rerum? Consectetur sequi ipsum
              inventore alias odit eum.
            </CardContent>

            <CardFooter>
              <Button>Send</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>This is a card</CardTitle>
              <CardDescription>Card description</CardDescription>
            </CardHeader>

            <CardContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              nulla non ut, quas veritatis sequi eaque animi facilis enim
              similique placeat repellendus rerum? Consectetur sequi ipsum
              inventore alias odit eum.
            </CardContent>

            <CardFooter>
              <Button>Send</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>This is a card</CardTitle>
              <CardDescription>Card description</CardDescription>
            </CardHeader>

            <CardContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              nulla non ut, quas veritatis sequi eaque animi facilis enim
              similique placeat repellendus rerum? Consectetur sequi ipsum
              inventore alias odit eum.
            </CardContent>

            <CardFooter>
              <Button>Send</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section className="pt-17 h-screen">
        <H1 className="font-bold text-2xl">This is a title</H1>

        <P>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          nulla non ut, quas veritatis sequi eaque animi facilis enim similique
          placeat repellendus rerum? Consectetur sequi ipsum inventore alias
          odit eum.
        </P>

        <div className="flex gap-4 mx-20 my-10">
          <Card>
            <CardHeader>
              <CardTitle>This is a card</CardTitle>
              <CardDescription>Card description</CardDescription>
            </CardHeader>

            <CardContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              nulla non ut, quas veritatis sequi eaque animi facilis enim
              similique placeat repellendus rerum? Consectetur sequi ipsum
              inventore alias odit eum.
            </CardContent>

            <CardFooter>
              <Button>Send</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>This is a card</CardTitle>
              <CardDescription>Card description</CardDescription>
            </CardHeader>

            <CardContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              nulla non ut, quas veritatis sequi eaque animi facilis enim
              similique placeat repellendus rerum? Consectetur sequi ipsum
              inventore alias odit eum.
            </CardContent>

            <CardFooter>
              <Button>Send</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>This is a card</CardTitle>
              <CardDescription>Card description</CardDescription>
            </CardHeader>

            <CardContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              nulla non ut, quas veritatis sequi eaque animi facilis enim
              similique placeat repellendus rerum? Consectetur sequi ipsum
              inventore alias odit eum.
            </CardContent>

            <CardFooter>
              <Button>Send</Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  )
}
