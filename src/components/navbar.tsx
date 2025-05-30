'use client'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ContactMeDialog from './contact-me/contact-me-dialog'
import { Button } from './ui/button'
import { ButtonTheme } from './button-change-theme'

export default function Navbar(props: { className?: string }) {
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [navButtonClicked, setNavButtonClicked] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isContactMeDialogOpen, setIsContactMeDialogOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const navigationLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' }
  ]

  // Handler for navbar button clicks
  function handleNavButtonClick() {
    setShowNavbar(false)
    setNavButtonClicked(true)

    // Reset the clicked state after some time to restore normal scrolling behavior
    setTimeout(() => {
      setNavButtonClicked(false)
    }, 1000) // Adjust timeout as needed
  }

  // Function to handle screen size check
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768) // Adjust the breakpoint as needed
  }

  // Set up event listener for window resize
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    handleResize() // Check initial screen size
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Close drawer when switching to desktop view
  useEffect(() => {
    if (!isMobile && isDrawerOpen) setIsDrawerOpen(false)
  }, [isMobile, isDrawerOpen])

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

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 right-0 left-0 z-10',
          'transition-transform duration-300',
          `${showNavbar ? 'translate-y-0' : '-translate-y-full'}`,
          props.className
        )}
      >
        <section className="hidden w-full justify-between border-black border-b-4 bg-card-secondary p-4 sm:flex">
          <div className="mx-auto flex gap-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={handleNavButtonClick}
              >
                <Button
                  type="button"
                  variant="outline"
                  className="text-xs md:text-sm"
                >
                  {link.label}
                </Button>
              </Link>
            ))}

            <Button
              type="button"
              variant="link"
              className="text-xs md:text-sm"
              onClick={() => {
                setIsDrawerOpen(false)
                setIsContactMeDialogOpen(true)
              }}
            >
              Contact me
            </Button>
          </div>

          <ButtonTheme />
        </section>

        <Drawer
          direction="top"
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
        >
          <DrawerTrigger asChild>
            <Button
              className="absolute top-4 left-4 flex sm:hidden"
              size="icon"
            >
              <Menu />
            </Button>
          </DrawerTrigger>

          <DrawerContent className="border-black border-b-2 bg-card shadow-[4px_4px_0px_#000]">
            <DrawerHeader>
              <DrawerTitle className="text-xl">Enjoy!</DrawerTitle>

              <DrawerClose asChild className="absolute top-3 right-3">
                <Button variant="ghost" size="icon">
                  <X />
                </Button>
              </DrawerClose>
            </DrawerHeader>

            <div className="mb-2 flex flex-col gap-2 p-4">
              {navigationLinks.map((link) => (
                <DrawerClose key={link.label} asChild>
                  <Link href={link.href} onClick={handleNavButtonClick}>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full py-5"
                    >
                      {link.label}
                    </Button>
                  </Link>
                </DrawerClose>
              ))}

              <Button
                type="button"
                variant="default"
                className="w-full py-5"
                onClick={() => {
                  setIsDrawerOpen(false)
                  setIsContactMeDialogOpen(true)
                }}
              >
                Contact me
              </Button>
            </div>
          </DrawerContent>
        </Drawer>

        <ButtonTheme className="!bg-background absolute top-4 right-4 flex sm:hidden" />
      </nav>

      <ContactMeDialog
        open={isContactMeDialogOpen}
        onOpenChange={setIsContactMeDialogOpen}
      />
    </>
  )
}
