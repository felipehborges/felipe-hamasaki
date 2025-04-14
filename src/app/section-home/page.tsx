'use client'

import { H1, P } from '@/components/typography'
import { motion } from 'motion/react'
import Image from 'next/image'
import { useState } from 'react'

export default function SectionHome() {
  const [isHovered, setIsHovered] = useState(false)

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
        className="flex min-h-screen flex-col items-center justify-center gap-10 bg-background-page md:flex-row md:gap-6 xl:gap-20"
      >
        <div className="flex justify-end md:w-1/2">
          <Image
            alt="Hamasaki in Anime"
            src={isHovered ? '/me-anime-smile2.png' : '/me-anime-smile1.png'}
            width={500}
            height={500}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-60 transition-all duration-500 md:w-80 lg:w-96 xl:w-120"
          />
        </div>

        <div className="flex flex-col justify-start gap-4 md:w-1/2">
          <div className="flex flex-col text-center md:text-start">
            <H1>Greetings!</H1>

            <H1>
              I'm <span className="text-primary">Felipe Hamasaki</span>
            </H1>
          </div>

          <div className="flex flex-col px-10 text-center md:w-3/4 md:px-0 md:text-start">
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
