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

export default function SectionExperience() {
  return (
    <section
      id="experience"
      className="h-screen grid grid-cols-2 gap-10 border-2 border-orange-400"
    >
      <H1 className="font-bold text-2xl">Experience</H1>

      <P>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci nulla
        non ut, quas veritatis sequi eaque animi facilis enim similique placeat
        repellendus rerum? Consectetur sequi ipsum inventore alias odit eum.
      </P>
    </section>
  )
}
