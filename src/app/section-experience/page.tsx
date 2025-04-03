'use client'

import DownloadResumeButton from '@/components/download-resume-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/custom/card'
import { H1 } from '@/components/ui/custom/typography'
import { Building2, MapPin } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'

export default function SectionExperience() {
  return (
    <section id="experience" className="min-h-screen bg-background-page">
      <header className="flex items-center justify-center py-8">
        <H1>Experience</H1>
      </header>

      <div className="flex flex-col items-center">
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
          <Card className="my-2 w-[30rem] flex flex-col items-center">
            <CardHeader className="flex flex-col items-center">
              <CardTitle>Mid-Level Front-End Developer</CardTitle>
              <CardDescription>2023 - Present (1.5 years)</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col items-center jc gap-1">
              <p className="flex items-center gap-2">
                <Building2 className="size-5" />

                <Link
                  href="https://www.odeen.com.br/"
                  target="_blank"
                  className="hover:underline"
                >
                  ODEEN - Intelligence for Security
                </Link>
              </p>

              <p className="flex items-center gap-2">
                <MapPin className="size-5" />
                Mogi das Cruzes, São Paulo - Brazil
              </p>
            </CardContent>
          </Card>
        </motion.div>

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
          <Card className="my-2 w-[30rem] flex flex-col items-center">
            <CardHeader className="flex flex-col items-center">
              <CardTitle>Junior Front-End Developer</CardTitle>
              <CardDescription>2022 - 2023 (2 years)</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col items-center jc gap-1">
              <p className="flex items-center gap-2">
                <Building2 className="size-5" />

                <Link
                  href="https://www.odeen.com.br/"
                  target="_blank"
                  className="hover:underline"
                >
                  ODEEN - Intelligence for Security
                </Link>
              </p>

              <p className="flex items-center gap-2">
                <MapPin className="size-5" />
                Mogi das Cruzes, São Paulo - Brazil
              </p>
            </CardContent>
          </Card>
        </motion.div>

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
          <Card className="my-2 w-[30rem] flex flex-col items-center">
            <CardHeader className="flex flex-col items-center">
              <CardTitle>Human Resources Analyst</CardTitle>
              <CardDescription>2015 - 2021 (6 years)</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col items-center jc gap-1">
              <p className="flex items-center gap-2">
                <Building2 className="size-5" />

                <Link
                  href="https://www.autokiniton.com/"
                  target="_blank"
                  className="hover:underline"
                >
                  Tower International (Acquired by Autokiniton)
                </Link>
              </p>

              <p className="flex items-center gap-2">
                <MapPin className="size-5" />
                Arujá, São Paulo - Brazil
              </p>
            </CardContent>
          </Card>
        </motion.div>

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
          <Card className="my-2 w-[30rem] flex flex-col items-center">
            <CardHeader className="flex flex-col items-center">
              <CardTitle>English Teacher</CardTitle>
              <CardDescription>2012 - 2014 (2 years)</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col items-center jc gap-1">
              <p className="flex items-center gap-2">
                <Building2 className="size-5" />
                Skill Idiomas (Closed)
              </p>

              <p className="flex items-center gap-2">
                <MapPin className="size-5" />
                Arujá, São Paulo - Brazil
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="flex items-center justify-center mt-4">
        <DownloadResumeButton />
      </div>
    </section>
  )
}
