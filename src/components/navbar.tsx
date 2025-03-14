'use client'

import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { ButtonTheme } from './ui/button-change-theme'
import { Download } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Navbar(props: { className?: string }) {
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [navButtonClicked, setNavButtonClicked] = useState(false)

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY

      // If button was clicked, keep navbar hidden regardless of scroll direction
      if (navButtonClicked) {
        setShowNavbar(false)
        return
      }

      // Otherwise use normal scroll behavior
      currentScrollY > lastScrollY && currentScrollY > 100
        ? setShowNavbar(false)
        : setShowNavbar(true)

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY, navButtonClicked])

  // Handler for navbar button clicks
  function handleNavButtonClick() {
    setShowNavbar(false)
    setNavButtonClicked(true)

    // Reset the clicked state after some time to restore normal scrolling behavior
    setTimeout(() => {
      setNavButtonClicked(false)
    }, 1000) // Adjust timeout as needed
  }

  return (
    <nav
      className={cn(
        'lg:p-4 p-2 z-20',
        'bg-card-secondary border-b-4 border-black',
        'w-full flex justify-between items-center',
        'fixed left-0 top-0',
        'transition-transform duration-300',
        `${showNavbar ? 'translate-y-0' : '-translate-y-full'}`,
        props.className
      )}
    >
      <div className="flex gap-4 justify-center w-full">
        <Link onClick={handleNavButtonClick} href="#about">
          <Button type="button" variant="outline">
            About
          </Button>
        </Link>

        <Link onClick={handleNavButtonClick} href="#stacks">
          <Button type="button" variant="outline">
            Stacks
          </Button>
        </Link>

        <Link onClick={handleNavButtonClick} href="#experience">
          <Button type="button" variant="outline">
            Experience
          </Button>
        </Link>

        {/* Modal with form? */}
        <Button type="button" variant="link">
          Hire me
        </Button>
      </div>

      <div className="flex gap-4">
        <Button type="button">
          <Download />
          Download Resume
        </Button>
        <ButtonTheme />
      </div>
    </nav>
  )
}
