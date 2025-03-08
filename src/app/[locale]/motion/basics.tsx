'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'

export default function MotionBasics() {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <motion.button
        type="button"
        onClick={() => setIsVisible(!isVisible)}
        className="bg-blue-600 text-white rounded-lg border-none px-6 py-4 cursor-pointer"
        layout
      >
        Show/Hide
      </motion.button>

      <AnimatePresence mode="popLayout">
        {isVisible && (
          <motion.div
            initial={{
              rotate: '0deg',
              scale: 0,
              y: 0
            }}
            animate={{
              rotate: '180deg',
              scale: 1,
              y: [0, 150, -150, -150, 0]
            }}
            exit={{
              rotate: '0deg',
              scale: 0,
              y: 0
            }}
            transition={{
              duration: 1,
              ease: 'backInOut',
              times: [0, 0.25, 0.5, 0.85, 1]
            }}
            className="w-40 h-40 rounded-xl bg-black"
          >
            {/*  */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
