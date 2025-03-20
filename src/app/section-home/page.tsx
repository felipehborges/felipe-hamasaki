'use client'

import { H1, P } from '@/components/ui/custom/typography'
import { motion } from 'motion/react'

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
        className="min-h-screen bg-background-page flex flex-col items-center justify-center gap-4 md:gap-10 px-10 sm:flex-row"
      >
        <div className="flex flex-col sm:w-1/2">
          <H1 className="text-center sm:text-end">Greetings!</H1>

          <H1 className="text-center sm:text-end">
            I'm <span className="text-primary">Felipe Hamasaki</span>
          </H1>
        </div>

        <div className="flex flex-col sm:w-1/2">
          <P className="text-justify lg:w-2/3 xl:w-1/2">
            I'm a Brazilian passionate software developer and a tech enthusiast.
            I love learning new things and sharing knowledge with others.
          </P>

          <P className="text-justify lg:w-2/3 xl:w-1/2">
            I'm currently working with React and Next.js, but I'm always open to
            new opportunities and challenges.
          </P>
        </div>
      </section>
    </motion.div>
  )
}
