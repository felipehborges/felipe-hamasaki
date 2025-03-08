'use client'

import { motion, MotionConfig } from 'motion/react'
import { useState } from 'react'

export default function MotionGestures() {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <MotionConfig
        transition={{
          duration: 0.125,
          ease: 'easeInOut'
        }}
      >
        <motion.button
          className="bg-blue-600 text-white rounded-lg border-none px-6 py-4 cursor-pointer"
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9, rotate: '2.5deg' }}
        >
          Click me!
        </motion.button>

        <motion.button
          className="bg-red-600 text-white rounded-lg border-none px-6 py-4 cursor-pointer"
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9, rotate: '2.5deg' }}
        >
          Click me!
        </motion.button>
      </MotionConfig>
    </div>
  )
}
