'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { H1, P } from '@/components/typography'
import { motion } from 'motion/react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import SkillLogo from '@/components/skill-logo'

export default function SectionSkills() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

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
            <SkillLogo
              imgAlt="javascript"
              imgSrc="/logos/logo-js.png"
              delay={0.1}
              tooltipContent="JavaScript"
            />

            <SkillLogo
              imgAlt="typescript"
              imgSrc="/logos/logo-ts.png"
              delay={0.25}
              tooltipContent="TypeScript"
            />

            <SkillLogo
              imgAlt="python"
              imgSrc="/logos/logo-python.png"
              delay={0.5}
              tooltipContent="Python"
            />

            <SkillLogo
              imgAlt="react"
              imgSrc="/logos/logo-react.png"
              delay={0.75}
              tooltipContent="React"
            />

            <SkillLogo
              imgAlt="nextjs"
              imgSrc="/logos/logo-nextjs.png"
              delay={1}
              tooltipContent="Next.js"
            />

            <SkillLogo
              imgAlt="tailwind"
              imgSrc="/logos/logo-tailwind.png"
              delay={1.25}
              tooltipContent="Tailwind CSS"
            />

            <SkillLogo
              imgAlt="git"
              imgSrc="/logos/logo-git.png"
              delay={1.5}
              tooltipContent="Git"
            />

            <SkillLogo
              imgAlt="github"
              imgSrc={
                theme === 'dark'
                  ? '/logos/logo-github-white.png'
                  : '/logos/logo-github-black.png'
              }
              delay={1.75}
              tooltipContent="GitHub"
            />

            <SkillLogo
              imgAlt="nodejs"
              imgSrc="/logos/logo-nodejs.png"
              delay={2}
              tooltipContent="Node.js"
            />

            <SkillLogo
              imgAlt="mysql"
              imgSrc="/logos/logo-mysql.png"
              delay={2.25}
              tooltipContent="MySQL"
            />

            <SkillLogo
              imgAlt="postgresql"
              imgSrc="/logos/logo-postgresql.png"
              delay={2.5}
              tooltipContent="PostgreSQL"
            />

            <SkillLogo
              imgAlt="nestjs"
              imgSrc="/logos/logo-nestjs.png"
              delay={2.75}
              tooltipContent="NestJS"
            />

            <SkillLogo
              imgAlt="prisma"
              imgSrc="/logos/logo-prisma.png"
              delay={3}
              tooltipContent="Prisma"
            />

            <SkillLogo
              imgAlt="fastify"
              imgSrc="/logos/logo-fastify.png"
              delay={3.25}
              tooltipContent="Fatisfy"
            />
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
