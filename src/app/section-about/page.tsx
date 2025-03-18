'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { P } from '@/components/ui/typography'
import { motion } from 'motion/react'
import Image from 'next/image'

export default function SectionAbout() {
  // const scrollRef = useRef(null)

  return (
    <section
      id="about"
      className="h-screen bg-background-page flex flex-col lg:flex-row justify-center items-center lg:gap-10"
    >
      <div className="p-4 lg:w-1/2 flex justify-center items-center lg:justify-end">
        <motion.div
          whileInView={{
            opacity: 1,
            translateY: 0,
            transition: { duration: 1 }
          }}
          initial={{
            opacity: 0,
            translateY: 100
          }}
          viewport={{ once: true, amount: 'all' }}
        >
          <Image
            alt="Hamasaki Child Picture"
            src="/oldme.png"
            width={400}
            height={400}
            className="xl:w-[500px] rounded-lg border-2 border-black shadow-[4px_4px_0px_#000]"
          />
        </motion.div>
      </div>

      <motion.div
        whileInView={{
          opacity: 1,
          translateX: 0,
          transition: { duration: 1 }
        }}
        initial={{
          opacity: 0,
          translateX: 100
        }}
        viewport={{ once: true, amount: 'some' }}
        className="p-4 lg:w-1/2 flex justify-center items-center lg:justify-start overflow-hidden"
      >
        <Card className="w-full sm:w-5/6 md:w-2/3 lg:w-5/6 2xl:w-2/3">
          <CardHeader>
            <CardTitle className="text-lg lg:text-2xl">About Me</CardTitle>
          </CardHeader>

          <CardContent className="px-8 text-sm xl:text-base text-justify">
            <div>
              <P className="leading-4 xl:leading-6">
                Born in December 1994, I was immersed in technology from a young
                age thanks to my father — a web designer and journalist — whose
                passion for computers naturally influenced my early interests.
              </P>

              <P className="leading-4 xl:leading-6">
                Although I was always drawn to games and PCs, my true calling in
                the tech industry only emerged later. I initially carved out a
                successful six-year career in Human Resources, a journey that
                honed my people skills and strategic thinking.
              </P>

              <P className="leading-4 xl:leading-6">
                At the onset of the pandemic, I discovered programming, and its
                creative and problem-solving aspects ignited a profound passion
                within me.
              </P>

              <P className="leading-4 xl:leading-6">
                Since then, I have dedicated myself to continuous learning and
                professional growth, eager to contribute innovative solutions
                and drive digital transformation.
              </P>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}
