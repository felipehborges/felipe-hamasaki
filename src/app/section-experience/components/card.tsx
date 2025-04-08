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
      <Card className="flex w-[28rem] flex-col items-center gap-6 px-2 sm:px-4 md:w-185 md:flex-row md:gap-4 lg:w-220 lg:gap-6 lg:px-6">
        <Image
          src={props.imageUrl}
          alt="Hamasaki in Anime"
          width={1000}
          height={1000}
          className="w-100 rounded-lg border-2 border-black"
        />

        <div>
          <CardHeader className="flex flex-col items-center md:items-start md:p-0">
            <CardTitle className="text-xl lg:text-2xl">
              {props.jobTitle}
            </CardTitle>

            <CardDescription className="lg:text-base">
              {props.jobPeriod}
            </CardDescription>
          </CardHeader>

          <CardContent className="mt-4 flex flex-col items-center gap-2 md:items-start md:p-0 md:text-xs">
            <div className="flex items-center gap-2">
              <Building2 className="size-4 lg:size-5" />

              <Link
                href={props.companyUrl}
                target="_blank"
                className="text-sm hover:underline lg:text-base"
              >
                {props.company}
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="size-4 lg:size-5" />

              <p className="text-sm lg:text-base">{props.location}</p>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )
}
