import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { H1, P } from '@/components/ui/typography'

export default function SectionAbout() {
  return (
    <section className="pt-17 h-screen border-2 border-yellow-400">
      <H1 className="font-bold text-2xl">This is a title</H1>

      <P>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci nulla
        non ut, quas veritatis sequi eaque animi facilis enim similique placeat
        repellendus rerum? Consectetur sequi ipsum inventore alias odit eum.
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
  )
}
