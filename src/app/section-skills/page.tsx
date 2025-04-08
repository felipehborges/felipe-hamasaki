'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { H1, P } from '@/components/typography'
import { motion } from 'motion/react'
import Image from 'next/image'

export default function SectionSkills() {
  return (
    <section
      id="skills"
      className="flex min-h-screen items-center justify-center overflow-hidden bg-background-page p-4"
    >
      <Card className="mx-4 w-full sm:w-5/6 md:w-2/3 lg:w-5/6 2xl:w-2/3">
        <CardHeader>
          <CardTitle>
            <H1 className="font-bold text-2xl">Skills</H1>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <P>Here are some of the technologies I am familiar with:</P>

          <div className="flex w-full flex-wrap justify-center gap-4 p-4">
            <motion.div
              className="m-4 w-fit self-center"
              viewport={{ once: true }}
              transition={{
                // delay: 0,
                type: 'spring',
                bounce: 0.5,
                duration: 1.5
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
              <Image
                src="/skills/logo-ts.png"
                alt="typescript"
                width={100}
                height={100}
                className="w-20"
              />
            </motion.div>

            <motion.div
              animate={{ rotate: 720 }}
              viewport={{ once: true }}
              transition={{
                // delay: 0.2,
                type: 'spring',
                bounce: 0.5,
                duration: 2
              }}
              initial={{
                opacity: 0,
                scale: 0
              }}
              whileInView={{
                opacity: 1,
                scale: 1
              }}
              className="m-4 w-fit self-center"
            >
              <Image
                src="/skills/logo-react.png"
                alt="react"
                width={100}
                height={100}
                className="w-20"
              />
            </motion.div>

            <motion.div
              animate={{ rotate: -360 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.4,
                duration: 1.5
              }}
              initial={{
                opacity: 0
                // scale: 0
              }}
              whileInView={{
                opacity: 1
                // scale: 1
              }}
              className="m-4 w-fit self-center"
            >
              <Image
                src="/skills/logo-nextjs.png"
                alt="nextjs"
                width={100}
                height={100}
                className="w-20"
              />
            </motion.div>

            <motion.div
              viewport={{ once: true }}
              transition={{
                delay: 0.6,
                duration: 1.5
              }}
              initial={{
                opacity: 0,
                translateX: -50
              }}
              whileInView={{
                opacity: 1,
                translateX: 0
              }}
              className="m-4 w-fit self-center"
            >
              <Image
                src="/skills/logo-tailwind.png"
                alt="tailwind"
                width={100}
                height={100}
                className="w-20"
              />
            </motion.div>

            <motion.div
              viewport={{ once: true }}
              transition={{
                delay: 0.8,
                type: 'spring',
                bounce: 0.5,
                duration: 1.5
              }}
              initial={{
                opacity: 0,
                scale: 2
              }}
              whileInView={{
                opacity: 1,
                scale: 1
              }}
              className="m-4 w-fit self-center"
            >
              <Image
                src="/skills/logo-js.png"
                alt="javascript"
                width={100}
                height={100}
                className="w-20"
              />
            </motion.div>

            <motion.div
              viewport={{ once: true }}
              transition={{
                delay: 1,
                duration: 1.5
              }}
              initial={{
                opacity: 0
              }}
              whileInView={{
                opacity: 1
              }}
              className="m-4 w-fit self-center"
            >
              <Image
                src="/skills/logo-nodejs.png"
                alt="nodejs"
                width={100}
                height={100}
                className="w-20"
              />
            </motion.div>

            <motion.div
              viewport={{ once: true }}
              transition={{
                delay: 1.2,
                type: 'spring',
                bounce: 0.5,
                duration: 1.5
              }}
              initial={{
                opacity: 0,
                translateY: 50
              }}
              whileInView={{
                opacity: 1,
                translateY: 0
              }}
              className="m-4 w-fit self-center"
            >
              <Image
                src="/skills/logo-git.png"
                alt="nodejs"
                width={100}
                height={100}
                className="w-20"
              />
            </motion.div>

            <motion.div
              viewport={{ once: true }}
              transition={{
                delay: 1.4,
                type: 'spring',
                bounce: 0.5,
                duration: 1.5
              }}
              initial={{
                opacity: 0,
                translateY: -50
              }}
              whileInView={{
                opacity: 1,
                translateY: 0
              }}
              className="m-4 w-fit self-center"
            >
              <Image
                src="/skills/logo-github.png"
                alt="nodejs"
                width={100}
                height={100}
                className="w-20"
              />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
