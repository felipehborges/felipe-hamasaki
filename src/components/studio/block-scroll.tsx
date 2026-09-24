'use client'

import { useEffect } from 'react'

// A wheel/trackpad burst is one gesture, including its momentum tail.
const GESTURE_IDLE_MS = 140
const TRANSITION_MS = 650
const PROJECT_TRANSITION_MS = 780

export function BlockScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let lastWheel = Number.NEGATIVE_INFINITY
    let targetPosition: number | null = null
    let animationFrame = 0
    let gestureUsed = false
    let accumulated = 0
    let lastDirection = 0
    let touchStart: { x: number; y: number } | null = null
    let touchDelta = 0
    let sectionAnimation: Animation | null = null
    let navigationRevision = 0

    function cancelSectionNavigation() {
      navigationRevision += 1
      sectionAnimation?.cancel()
      sectionAnimation = null
    }

    function onSectionClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      )
        return
      const link = event.target.closest<HTMLAnchorElement>(
        '.minimal-header a[href]'
      )
      if (!link || link.target === '_blank' || link.hasAttribute('download'))
        return
      const url = new URL(link.href)
      const current = new URL(window.location.href)
      if (
        url.origin !== current.origin ||
        url.pathname.replace(/\/$/, '') !==
          current.pathname.replace(/\/$/, '') ||
        url.search !== current.search ||
        !url.hash
      )
        return
      const target = document.getElementById(url.hash.slice(1))
      const content = document.querySelector<HTMLElement>(
        '.minimal-site > .minimal-container'
      )
      if (!target || !content) return
      event.preventDefault()
      const opacity = getComputedStyle(content).opacity
      cancelSectionNavigation()
      cancelAnimationFrame(animationFrame)
      animationFrame = 0
      targetPosition = null
      // Stop browser smoothing or a wheel animation before taking over.
      window.scrollTo({ top: window.scrollY, behavior: 'instant' })
      const revision = navigationRevision

      const arrive = () => {
        const headerHeight =
          document.querySelector('.minimal-header')?.getBoundingClientRect()
            .height ?? 60
        const destination =
          target.getBoundingClientRect().top + window.scrollY - headerHeight
        window.scrollTo({ top: Math.max(0, destination), behavior: 'instant' })
        if (window.location.hash !== url.hash) {
          window.history.pushState(window.history.state, '', url)
        }
        const tabIndex = target.getAttribute('tabindex')
        if (tabIndex === null) {
          target.setAttribute('tabindex', '-1')
          target.addEventListener(
            'blur',
            () => target.removeAttribute('tabindex'),
            { once: true }
          )
        }
        target.focus({ preventScroll: true })
      }

      if (reduced.matches) {
        arrive()
        return
      }

      // Hide the journey, then reveal the destination. Intermediate projects
      // never race past the viewer when a navigation link skips several blocks.
      const transition = async () => {
        try {
          sectionAnimation = content.animate([{ opacity }, { opacity: 0 }], {
            duration: 150,
            easing: 'ease-out',
            fill: 'forwards'
          })
          await sectionAnimation.finished
          if (revision !== navigationRevision) return
          arrive()
          // Let scroll-driven artwork and CSS timelines settle before revealing.
          await new Promise(requestAnimationFrame)
          await new Promise(requestAnimationFrame)
          if (revision !== navigationRevision) return
          sectionAnimation.cancel()
          sectionAnimation = content.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 240,
            easing: 'ease-in-out',
            fill: 'forwards'
          })
          await sectionAnimation.finished
        } catch {
          // A new click or scroll gesture cancels the previous navigation.
        } finally {
          if (revision === navigationRevision) {
            sectionAnimation?.cancel()
            sectionAnimation = null
          }
        }
      }
      void transition()
    }

    function isInteractive(target: EventTarget | null) {
      return (
        target instanceof Element &&
        Boolean(
          target.closest(
            'input, textarea, select, button, [contenteditable="true"], [role="dialog"], [data-native-scroll]'
          )
        )
      )
    }

    function move(direction: number) {
      cancelSectionNavigation()
      const now = performance.now()
      const headerHeight =
        document.querySelector('.minimal-header')?.getBoundingClientRect()
          .height ?? 60
      const pageHeight = window.innerHeight - headerHeight
      const max = document.documentElement.scrollHeight - window.innerHeight
      const positions = Array.from(
        document.querySelectorAll<HTMLElement>('[data-scroll-block]')
      ).map((block) =>
        Math.min(
          max,
          Math.max(
            0,
            block.getBoundingClientRect().top + window.scrollY - headerHeight
          )
        )
      )
      const current = window.scrollY
      // A new gesture advances from the pending destination, even mid-animation.
      const origin = targetPosition ?? current
      // Keep the bottom of the final block reachable on short screens or at zoom.
      if (max > (positions.at(-1) ?? 0) + 4) positions.push(max)
      const next =
        direction > 0
          ? positions.find((position) => position > origin + 4)
          : positions
              .slice()
              .reverse()
              .find((position) => position < origin - 4)
      if (next === undefined) return
      // Tall blocks remain readable at small heights or increased text zoom.
      const destination =
        Math.abs(next - origin) > pageHeight + 4
          ? origin + direction * pageHeight
          : next
      const gallery = document.querySelector('.minimal-projects')
      const galleryTop = gallery
        ? gallery.getBoundingClientRect().top + current - headerHeight
        : Number.POSITIVE_INFINITY
      const galleryEnd =
        galleryTop + (gallery?.getBoundingClientRect().height ?? 0)
      const duration =
        gallery &&
        origin >= galleryTop - 4 &&
        destination >= galleryTop - 4 &&
        destination < galleryEnd - 4
          ? PROJECT_TRANSITION_MS
          : TRANSITION_MS
      cancelAnimationFrame(animationFrame)
      if (reduced.matches) {
        animationFrame = 0
        targetPosition = null
        window.scrollTo({ top: destination, behavior: 'instant' })
        return
      }
      // Control the duration instead of relying on distance-dependent browser smoothing.
      targetPosition = destination
      function animate(time: number) {
        const progress = Math.min(1, (time - now) / duration)
        const eased =
          duration === PROJECT_TRANSITION_MS
            ? progress < 0.5
              ? 4 * progress ** 3
              : 1 - (-2 * progress + 2) ** 3 / 2
            : 1 - (1 - progress) ** 3
        window.scrollTo({
          top: current + (destination - current) * eased,
          behavior: 'instant'
        })
        if (progress < 1) animationFrame = requestAnimationFrame(animate)
        else {
          animationFrame = 0
          targetPosition = null
        }
      }
      animationFrame = requestAnimationFrame(animate)
    }

    function onWheel(event: WheelEvent) {
      if (
        event.ctrlKey ||
        event.metaKey ||
        isInteractive(event.target) ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
      )
        return
      if (!event.deltaY) return
      event.preventDefault()
      const now = performance.now()
      const direction = Math.sign(event.deltaY)
      if (now - lastWheel > GESTURE_IDLE_MS || direction !== lastDirection) {
        gestureUsed = false
        accumulated = 0
      }
      lastWheel = now
      lastDirection = direction
      if (gestureUsed) return
      accumulated +=
        event.deltaY *
        (event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? window.innerHeight
            : 1)
      if (Math.abs(accumulated) < 12) return
      gestureUsed = true
      move(Math.sign(accumulated))
    }

    function onKey(event: KeyboardEvent) {
      if (
        isInteractive(event.target) ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey
      )
        return
      const direction = ['ArrowDown', 'PageDown', ' '].includes(event.key)
        ? event.shiftKey
          ? -1
          : 1
        : ['ArrowUp', 'PageUp'].includes(event.key)
          ? -1
          : 0
      if (!direction) return
      event.preventDefault()
      if (!event.repeat) move(direction)
    }

    function onTouchStart(event: TouchEvent) {
      touchStart =
        event.touches.length === 1 && !isInteractive(event.target)
          ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
          : null
      touchDelta = 0
    }

    function onTouchMove(event: TouchEvent) {
      if (!touchStart || event.touches.length !== 1) {
        touchStart = null
        return
      }
      const touch = event.touches[0]
      const dy = touchStart.y - touch.clientY
      if (Math.abs(dy) <= Math.abs(touchStart.x - touch.clientX)) return
      event.preventDefault()
      touchDelta = dy
    }

    function onTouchEnd() {
      if (touchStart && Math.abs(touchDelta) > 40) move(Math.sign(touchDelta))
      touchStart = null
      touchDelta = 0
    }

    function onTouchCancel() {
      touchStart = null
      touchDelta = 0
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('click', onSectionClick)
    window.addEventListener('keydown', onKey)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd)
    window.addEventListener('touchcancel', onTouchCancel)
    return () => {
      cancelSectionNavigation()
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('click', onSectionClick)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchcancel', onTouchCancel)
    }
  }, [])

  return null
}
