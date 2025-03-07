'use client'

import { motion, useAnimationControls } from 'motion/react'
import { useState } from 'react'

export default function MotionAnimationControls() {
  const controls = useAnimationControls()

  function handleClick() {
    controls.start('flip')
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <button
        className="bg-red-600 text-white rounded-lg border-none px-6 py-4 cursor-pointer"
        type="button"
        onClick={handleClick}
      >
        Click me!
      </button>

      <motion.div
        className="w-40 h-40 bg-black rounded-2xl"
        variants={{
          initial: {
            rotate: '0deg'
          },
          flip: {
            rotate: '360deg'
          }
        }}
        initial="initial"
        whileHover="flip"
        animate={controls}
      />
    </div>
  )
}
