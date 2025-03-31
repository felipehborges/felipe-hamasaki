'use client'

import { H1, P } from '@/components/ui/custom/typography'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'

export default function SectionStacks() {
  return (
    <section id="stacks" className="min-h-screen bg-zinc-600 ">
      {/* bg-background-page */}
      <H1 className="font-bold text-2xl">Stacks</H1>

      <div className="w-full flex flex-col gap-4">
        <motion.div
          className="w-fit"
          viewport={{ once: true }}
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
          <Image
            src="/stacks/logo-ts.png"
            alt="typescript"
            width={100}
            height={100}
            className="w-20"
          />
        </motion.div>

        <motion.div
          animate={{ rotate: 720 }}
          transition={{
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
          className="w-fit"
        >
          <Image
            src="/stacks/logo-react.png"
            alt="react"
            width={100}
            height={100}
            className="w-20"
          />
        </motion.div>

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1 }}
          initial={{
            opacity: 0
            // scale: 0
          }}
          whileInView={{
            opacity: 1
            // scale: 1
          }}
          className="w-fit"
        >
          <Image
            src="/stacks/logo-nextjs.png"
            alt="nextjs"
            width={100}
            height={100}
            className="w-20"
          />
        </motion.div>

        <motion.div
          transition={{ duration: 1 }}
          initial={{
            opacity: 0,
            translateX: -50
          }}
          whileInView={{
            opacity: 1,
            translateX: 0
          }}
          className="w-fit"
        >
          <Image
            src="/stacks/logo-tailwind.png"
            alt="tailwind"
            width={100}
            height={100}
            className="w-20"
          />
        </motion.div>

        <motion.div
          transition={{
            type: 'spring',
            bounce: 0.5,
            duration: 1
          }}
          initial={{
            opacity: 0,
            scale: 2
          }}
          whileInView={{
            opacity: 1,
            scale: 1
          }}
          className="w-fit"
        >
          <Image
            src="/stacks/logo-js.png"
            alt="javascript"
            width={100}
            height={100}
            className="w-20"
          />
        </motion.div>

        <motion.div
          transition={{
            duration: 1
          }}
          initial={{
            opacity: 0
          }}
          whileInView={{
            opacity: 1
          }}
          className="w-fit"
        >
          <Image
            src="/stacks/logo-nodejs.png"
            alt="nodejs"
            width={100}
            height={100}
            className="w-20"
          />
        </motion.div>

        <motion.div
          transition={{
            type: 'spring',
            bounce: 0.5,
            duration: 1
          }}
          initial={{
            opacity: 0,
            translateY: 50
          }}
          whileInView={{
            opacity: 1,
            translateY: 0
          }}
          className="w-fit"
        >
          <Image
            src="/stacks/logo-git.png"
            alt="nodejs"
            width={100}
            height={100}
            className="w-20"
          />
        </motion.div>

        <motion.div
          transition={{
            type: 'spring',
            bounce: 0.5,
            duration: 1
          }}
          initial={{
            opacity: 0,
            translateY: -50
          }}
          whileInView={{
            opacity: 1,
            translateY: 0
          }}
          className="w-fit"
        >
          <Image
            src="/stacks/logo-github.png"
            alt="nodejs"
            width={100}
            height={100}
            className="w-20"
          />
        </motion.div>
      </div>
    </section>
  )
}
