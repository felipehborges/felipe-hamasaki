import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Building2, MapPin } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

interface ExperienceCardProps {
  jobTitle: string
  jobPeriod: string
  company: string
  location: string
  imageUrl: string
  companyUrl: string
}

export default function ExperienceCard(props: ExperienceCardProps) {
  return (
    <motion.div
      viewport={{ once: true, amount: 'all' }}
      transition={{
        type: 'spring',
        bounce: 0.5,
        duration: 1
      }}
      initial={{
        opacity: 0,
        scale: 0
      }}
      whileInView={{
        opacity: 1,
        scale: 1
      }}
    >
      <Card className="w-[28rem] sm:w-full flex flex-col items-center">
        <CardHeader className="flex flex-col items-center">
          <CardTitle>{props.jobTitle}</CardTitle>
          <CardDescription>{props.jobPeriod}</CardDescription>
        </CardHeader>

        <CardContent className="">
          <Image
            src={props.imageUrl}
            alt="Hamasaki in Anime"
            width={500}
            height={500}
            className="rounded-lg border-black border-2"
          />

          <div className="flex flex-col items-center gap-2 mt-4">
            <p className="flex items-center gap-2">
              <Building2 className="size-5" />

              <Link
                href={props.companyUrl}
                target="_blank"
                className="hover:underline"
              >
                {props.company}
              </Link>
            </p>

            <p className="flex items-center gap-2">
              <MapPin className="size-5" />
              {props.location}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
