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
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 40)
      const geometry = new THREE.TorusKnotGeometry(
        1.2,
        0.38,
        style === 'terminal' ? 96 : 180,
        style === 'terminal' ? 12 : 28
      )
      const material = new THREE.MeshPhysicalMaterial({
        color:
          style === 'terminal'
            ? '#9cf6b0'
            : style === 'color'
              ? '#6a35f0'
              : '#c5c2d8',
        metalness: style === 'minimal' ? 0.92 : 0.25,
        roughness: style === 'minimal' ? 0.21 : 0.32,
        wireframe: style === 'terminal',
        clearcoat: 1
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.rotation.set(0.4, -0.4, -0.4)
      scene.add(mesh)
      const environment = new RoomEnvironment()
      const pmrem = new THREE.PMREMGenerator(renderer)
      const environmentMap = pmrem.fromScene(environment)
      scene.environment = environmentMap.texture
      environment.dispose()
      pmrem.dispose()
      const key = new THREE.DirectionalLight(0xffffff, 4)
      key.position.set(3, 4, 4)
      scene.add(key, new THREE.AmbientLight(0xffffff, 1.2))
      const fill = new THREE.PointLight(
        style === 'color' ? 0xffa958 : 0x927bff,
        16
      )
      fill.position.set(-3, -1, 3)
      scene.add(fill)
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
      let visible = true
      let lost = false
      let previous = 0
      let x = 0
      let y = 0
      let angle = -0.4
      function render() {
        if (!lost) renderer.render(scene, camera)
      }
      function resize() {
        if (!container) return
        const { width, height } = container.getBoundingClientRect()
        if (!width || !height) return
        renderer.setSize(width, height)
        camera.aspect = width / height
        camera.position.z = 7.8 / Math.min(camera.aspect, 1)
        camera.updateProjectionMatrix()
        render()
      }
      function pointer(event: PointerEvent) {
        if (reduced.matches || pausedRef.current || !container) return
        const rect = container.getBoundingClientRect()
        x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.6
        y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.4
      }
      function leave() {
        x = 0
        y = 0
      }
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
      container.addEventListener('pointermove', pointer)
      container.addEventListener('pointerleave', leave)
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
        angle += delta * 0.13
        mesh.rotation.y = angle + x
        mesh.rotation.x += (0.4 + y - mesh.rotation.x) * 0.05
        render()
      })
      dispose = () => {
        renderer.setAnimationLoop(null)
        observer.disconnect()
        intersection.disconnect()
        container.removeEventListener('pointermove', pointer)
        container.removeEventListener('pointerleave', leave)
        renderer.domElement.removeEventListener('webglcontextlost', contextLost)
        geometry.dispose()
        material.dispose()
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
        <span>FORM / FUNCTION</span>
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
