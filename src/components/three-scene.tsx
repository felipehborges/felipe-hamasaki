'use client'

import type React from 'react'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      const renderer = new THREE.WebGLRenderer()
      const geometry = new THREE.BoxGeometry()
      const material = new THREE.MeshBasicMaterial({ color: 0x00ffff })
      const cube = new THREE.Mesh(geometry, material)
      // const xaraba = new THREE.

      const controls = new OrbitControls(camera, renderer.domElement)

      const renderScene = () => {
        // cube.rotation.x += 0.01
        // cube.rotation.y += 0.01
        renderer.render(scene, camera)
        requestAnimationFrame(renderScene)

        controls.keys = {
          LEFT: 'ArrowLeft',
          UP: 'ArrowUp',
          RIGHT: 'ArrowRight',
          BOTTOM: 'ArrowDown'
        }

        controls.update()
      }

      const handleResize = () => {
        const width = window.innerWidth
        const height = window.innerHeight

        camera.aspect = width / height
        camera.updateProjectionMatrix()

        renderer.setSize(width, height)
      }

      renderer.setSize(window.innerWidth, window.innerHeight)

      scene.add(cube)

      containerRef.current?.appendChild(renderer.domElement)

      camera.position.z = 5

      renderScene()

      renderer.render(scene, camera)

      window.addEventListener('resize', handleResize)

      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <div ref={containerRef} />
}
