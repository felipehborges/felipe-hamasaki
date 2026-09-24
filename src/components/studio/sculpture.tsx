'use client'

import { Button } from '@/components/ui/button'
import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { usePortfolioStyle } from './portfolio-style'

export function Sculpture({
  labels
}: { labels: { pause: string; play: string } }) {
  const host = useRef<HTMLDivElement>(null)
  const { style } = usePortfolioStyle()
  const [ready, setReady] = useState(false)
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)
  useEffect(() => {
    pausedRef.current = paused
  }, [paused])
  useEffect(() => {
    const container = host.current
    if (!container) return
    let cancelled = false
    let dispose = () => {}
    setReady(false)
    async function init() {
      const THREE = await import('three')
      const { RoomEnvironment } = await import(
        'three/addons/environments/RoomEnvironment.js'
      )
      if (cancelled || !container) return
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'low-power'
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
      renderer.setClearColor(0, 0)
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 0.85
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 40)
      const { createPortrait } = await import('./portrait-model')
      if (cancelled) {
        renderer.dispose()
        return
      }
      const portrait = createPortrait()
      const mesh = portrait.head
      scene.add(mesh)
      const environment = new RoomEnvironment()
      const pmrem = new THREE.PMREMGenerator(renderer)
      const environmentMap = pmrem.fromScene(environment)
      scene.environment = environmentMap.texture
      environment.dispose()
      pmrem.dispose()
      const key = new THREE.DirectionalLight(0xffeddc, 2.5)
      key.position.set(3, 4, 4)
      scene.add(key, new THREE.AmbientLight(0xffffff, 0.65))
      const fill = new THREE.PointLight(
        style === 'color' ? 0xffa958 : 0x927bff,
        5
      )
      fill.position.set(-3, -1, 3)
      scene.add(fill)
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
      let visible = true
      let lost = false
      let previous = 0
      let x = 0
      let y = 0
      const target = new THREE.Vector3()
      const localTarget = new THREE.Vector3()
      const raycaster = new THREE.Raycaster()
      const pointerPosition = new THREE.Vector2()
      const gazePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -3)
      function render() {
        if (!lost) renderer.render(scene, camera)
      }
      function resize() {
        if (!container) return
        const { width, height } = container.getBoundingClientRect()
        if (!width || !height) return
        renderer.setSize(width, height)
        camera.aspect = width / height
        camera.position.z = 6.5 / Math.min(camera.aspect, 1)
        camera.updateProjectionMatrix()
        render()
      }
      function pointer(event: PointerEvent) {
        if (reduced.matches || pausedRef.current || !container) return
        const rect = container.getBoundingClientRect()
        if (event.pointerType === 'touch') return
        pointerPosition.set(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          -((event.clientY - rect.top) / rect.height) * 2 + 1
        )
        raycaster.setFromCamera(pointerPosition, camera)
        if (raycaster.ray.intersectPlane(gazePlane, target)) {
          x = THREE.MathUtils.clamp(Math.atan2(target.x, 3) * 0.65, -0.6, 0.6)
          y = THREE.MathUtils.clamp(
            -Math.atan2(target.y, 3) * 0.65,
            -0.32,
            0.32
          )
        }
      }
      function leave() {
        if (pausedRef.current) return
        x = 0
        y = 0
        target.set(0, 0, 3)
      }
      target.set(0, 0, 3)
      function contextLost(event: Event) {
        event.preventDefault()
        lost = true
        setReady(false)
      }
      const observer = new ResizeObserver(resize)
      const intersection = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting
      })
      container.appendChild(renderer.domElement)
      observer.observe(container)
      intersection.observe(container)
      window.addEventListener('pointermove', pointer)
      document.documentElement.addEventListener('pointerleave', leave)
      window.addEventListener('blur', leave)
      renderer.domElement.addEventListener('webglcontextlost', contextLost)
      resize()
      setReady(true)
      renderer.setAnimationLoop((time) => {
        const delta = Math.min((time - previous) / 1000, 0.05)
        previous = time
        if (
          !visible ||
          document.hidden ||
          reduced.matches ||
          pausedRef.current ||
          lost
        )
          return
        const smoothing = 1 - Math.exp(-7 * delta)
        mesh.rotation.y += (x - mesh.rotation.y) * smoothing
        mesh.rotation.x += (y - mesh.rotation.x) * smoothing
        mesh.updateMatrixWorld(true)
        for (const eye of portrait.eyes) {
          localTarget.copy(target)
          eye.parent?.worldToLocal(localTarget)
          const eyeX = THREE.MathUtils.clamp(
            Math.atan2(localTarget.x, localTarget.z) * 0.06,
            -0.028,
            0.028
          )
          const eyeY = THREE.MathUtils.clamp(
            Math.atan2(localTarget.y, localTarget.z) * 0.035,
            -0.012,
            0.012
          )
          eye.position.x += (eyeX - eye.position.x) * smoothing
          eye.position.y += (eyeY - eye.position.y) * smoothing
        }
        render()
      })
      dispose = () => {
        renderer.setAnimationLoop(null)
        observer.disconnect()
        intersection.disconnect()
        window.removeEventListener('pointermove', pointer)
        document.documentElement.removeEventListener('pointerleave', leave)
        window.removeEventListener('blur', leave)
        renderer.domElement.removeEventListener('webglcontextlost', contextLost)
        portrait.dispose()
        environmentMap.dispose()
        renderer.dispose()
        renderer.domElement.remove()
      }
    }
    init().catch(() => {
      if (!cancelled) setReady(false)
    })
    return () => {
      cancelled = true
      dispose()
    }
  }, [style])
  return (
    <div className="sculpture">
      <div
        ref={host}
        className={`sculpture-canvas ${ready ? 'is-ready' : ''}`}
        aria-hidden="true"
      >
        {!ready && (
          <div className="sculpture-fallback">
            <span />
            <span />
            <span />
          </div>
        )}
      </div>
      <div className="sculpture-caption">
        <span>FELIPE / HELLO</span>
        {ready && (
          <Button
            variant="ghost"
            size="icon"
            className="motion-control"
            aria-label={paused ? labels.play : labels.pause}
            aria-pressed={paused}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </Button>
        )}
      </div>
    </div>
  )
}
