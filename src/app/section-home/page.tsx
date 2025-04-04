'use client'

import { H1, P } from '@/components/ui/custom/typography'
import { motion } from 'motion/react'
import Image from 'next/image'

export default function SectionHome() {
  return (
    <motion.div
      style={{ height: '100vh' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <section
        id="home"
        className="min-h-screen bg-background-page flex flex-col items-center justify-center gap-10 md:gap-6 xl:gap-20 md:flex-row"
      >
        <div className="md:w-1/2 flex justify-end">
          {/* TODO: Hover: Face animations */}
          <Image
            alt="Hamasaki in Anime"
            src="/me-anime.png"
            width={1000}
            height={1000}
            className="rounded-full border-black border-2 w-80 lg:w-96 xl:w-120"
          />
        </div>

        <div className="flex flex-col justify-start gap-4 md:w-1/2">
          <div className="flex flex-col text-center md:text-start">
            <H1>Greetings!</H1>

            <H1>
              I'm <span className="text-primary">Felipe Hamasaki</span>
            </H1>
          </div>

          <div className="flex flex-col text-center px-20 md:px-0 md:text-start md:w-3/4">
            <P>
              I'm a Brazilian passionate software developer and a tech
              enthusiast. I love learning new things and sharing knowledge with
              others.
            </P>

            <P>
              I'm currently working with React and Next.js, but I'm always open
              to new opportunities and challenges.
            </P>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
