'use client'

import { H1, P } from '@/components/ui/custom/typography'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'

export default function SectionStacks() {
  return (
    <section id="stacks" className="min-h-screen bg-zinc-600 ">
      {/* bg-background-page */}
      <H1 className="font-bold text-2xl">Stacks</H1>

      <div className="">
        <motion.div
          viewport={{ once: true, amount: 'all' }}
          initial={{
            opacity: 0,
            rotate: '0deg'

            // scale: 0
            // y: 0
          }}
          whileInView={{
            opacity: 1,
            rotate: '360deg'
            // scale: 1
            // y: [0, 150, -150, -150, 0]
          }}
          variants={{
            onscreen: {
              y: 50,
              rotate: -10,
              transition: {
                type: 'spring',
                bounce: 0.4,
                duration: 0.8
              }
            }
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

        <motion.div>
          <Image
            src="/stacks/logo-react.png"
            alt="react"
            width={100}
            height={100}
            className="w-20"
          />
        </motion.div>

        <motion.div>
          <Image
            src="/stacks/logo-nextjs.png"
            alt="nextjs"
            width={100}
            height={100}
            className="w-20"
          />
        </motion.div>

        <motion.div>
          <Image
            src="/stacks/logo-tailwind.png"
            alt="tailwind"
            width={100}
            height={100}
            className="w-20"
          />
        </motion.div>

        <motion.div>
          <Image
            src="/stacks/logo-js.png"
            alt="javascript"
            width={100}
            height={100}
            className="w-20"
          />
        </motion.div>

        <motion.div>
          <Image
            src="/stacks/logo-nodejs.png"
            alt="nodejs"
            width={100}
            height={100}
            className="w-20"
          />
        </motion.div>

        <motion.div>
          <Image
            src="/stacks/logo-git.png"
            alt="nodejs"
            width={100}
            height={100}
            className="w-20"
          />
        </motion.div>

        <motion.div>
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
