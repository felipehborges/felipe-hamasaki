'use client'

import { type ReactNode, useEffect, useRef } from 'react'

const clamp = (value: number) => Math.max(0, Math.min(1, value))
const fade = (value: number) => {
  const progress = clamp(value)
  return progress * progress * (3 - 2 * progress)
}
const imageOffsets = [
  [-32, 0],
  [32, 0],
  [0, 28],
  [0, -28]
] as const

export function ProjectScroll({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const gallery = root.current
    if (!gallery) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const compact = window.matchMedia('(max-height: 650px)')
    const steps = Array.from(
      gallery.querySelectorAll<HTMLElement>('.minimal-project-step')
    )
    const frames = steps.map((step) =>
      step.querySelector<HTMLElement>('.minimal-project-frame')
    )
    const header = document.querySelector<HTMLElement>('.minimal-header')
    let animationFrame = 0
    let headerHeight = 60
    let stageHeight = 1

    function update() {
      animationFrame = 0
      // Measure the stationary wrappers, never the transformed artwork.
      const positions = steps.map((step) => step.getBoundingClientRect().top)
      for (const [index, frame] of frames.entries()) {
        if (!frame) continue
        const entering = reduced.matches
          ? 0
          : clamp((positions[index] - headerHeight) / stageHeight)
        const leaving = reduced.matches
          ? 0
          : clamp((headerHeight - positions[index]) / stageHeight)
        const stacked = gallery?.dataset.projectStack === 'true'
        const exiting = stacked && index < steps.length - 1 ? leaving : 0
        const [offsetX, offsetY] = imageOffsets[index % imageOffsets.length]
        frame.style.setProperty('--project-leave', String(leaving))
        // Compensate for the wrapper's travel so the text stays stationary.
        // Only the image receives a small directional offset.
        frame.style.setProperty(
          '--project-lift',
          `${stacked ? -entering * stageHeight : 0}px`
        )
        frame.style.setProperty(
          '--project-image-opacity',
          String(fade((1 - entering) / 0.75) * (1 - fade(exiting / 0.7)))
        )
        // Finish fading the old copy before introducing the next title.
        frame.style.setProperty(
          '--project-text-opacity',
          String(fade((0.5 - entering) / 0.5) * (1 - fade(exiting / 0.4)))
        )
        frame.style.setProperty('--project-image-x', `${offsetX * entering}px`)
        frame.style.setProperty('--project-image-y', `${offsetY * entering}px`)
        frame.style.pointerEvents =
          entering > 0.35 || exiting > 0.35 ? 'none' : ''
      }
    }

    function schedule() {
      if (!animationFrame) animationFrame = requestAnimationFrame(update)
    }

    function measure() {
      if (!gallery) return
      headerHeight = header?.getBoundingClientRect().height ?? 60
      stageHeight = Math.max(1, window.innerHeight - headerHeight)
      // Fall back to normal flow when text zoom or a short viewport needs more room.
      const fits = frames.every(
        (frame) => !frame || frame.offsetHeight + 64 <= stageHeight
      )
      gallery.dataset.projectStack = String(
        fits && !compact.matches && !reduced.matches
      )
      gallery.style.setProperty('--project-stage-height', `${stageHeight}px`)
      schedule()
    }

    function revealFocusedProject(event: FocusEvent) {
      if (
        !(event.target instanceof Element) ||
        !event.target.matches(':focus-visible')
      )
        return
      const step = event.target.closest<HTMLElement>('.minimal-project-step')
      if (!step) return
      const top = step.getBoundingClientRect().top
      // Keyboard users can revisit a card even after another card covers it.
      if (top < headerHeight - 4 || top > headerHeight + stageHeight / 2) {
        window.scrollTo({
          top: window.scrollY + top - headerHeight,
          behavior: 'instant'
        })
      }
    }

    const observer = new ResizeObserver(measure)
    for (const frame of frames) if (frame) observer.observe(frame)
    if (header) observer.observe(header)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', measure)
    reduced.addEventListener('change', measure)
    compact.addEventListener('change', measure)
    gallery.addEventListener('focusin', revealFocusedProject)
    measure()

    return () => {
      cancelAnimationFrame(animationFrame)
      for (const frame of frames) frame?.removeAttribute('style')
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', measure)
      reduced.removeEventListener('change', measure)
      compact.removeEventListener('change', measure)
      gallery.removeEventListener('focusin', revealFocusedProject)
    }
  }, [])

  return (
    <div className="minimal-projects" ref={root}>
      {children}
    </div>
  )
}
