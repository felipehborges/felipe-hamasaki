import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import Image from 'next/image'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

interface SkillLogoProps {
  imgSrc: string
  imgAlt: string
  imgClassName?: string
  //   type?: 'inertia' | 'keyframes' | 'spring' | 'tween'
  delay?: number
  duration?: number
  tooltipContent: string
}

export default function SkillLogo(props: SkillLogoProps) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <motion.div
          viewport={{ once: true }}
          transition={{
            // type: props.type || null,
            delay: props.delay || 0,
            duration: props.duration || 0.5
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
            src={props.imgSrc}
            alt={props.imgAlt}
            width={100}
            height={100}
            className={cn(props.imgClassName, 'w-20')}
          />
        </motion.div>
      </TooltipTrigger>

      <TooltipContent>{props.tooltipContent}</TooltipContent>
    </Tooltip>
  )
}
