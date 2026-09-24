import * as THREE from 'three'
import type { PortfolioStyle } from './portfolio-style'

/** Beveled code brackets paired with a diagonal, paint-tipped studio brush. */
export function createCodeDesignModel(style: PortfolioStyle) {
  const model = new THREE.Group()
  const geometries = new Set<THREE.BufferGeometry>()
  const materials = new Set<THREE.Material>()
  const terminal = style === 'terminal'

  function surface(color: string, metalness = 0.15, roughness = 0.3) {
    const material = new THREE.MeshStandardMaterial({
      color: terminal ? '#9cf6b0' : color,
      metalness,
      roughness,
      wireframe: terminal
    })
    materials.add(material)
    return material
  }

  const violet = surface('#6332ce', 0.28)
  const lilac = surface('#b99ae8', 0.22)
  const yellow = surface('#f1ae3d', 0.1, 0.35)
  const silver = surface('#d3d5dd', 0.85, 0.22)
  const bristles = surface('#30262e', 0, 0.85)
  const paint = surface('#8450ef', 0.08, 0.2)

  function mesh(
    geometry: THREE.BufferGeometry,
    material: THREE.Material,
    parent: THREE.Group = model
  ) {
    geometries.add(geometry)
    const item = new THREE.Mesh(geometry, material)
    parent.add(item)
    return item
  }

  function glyph(points: [number, number][], material: THREE.Material) {
    const shape = new THREE.Shape()
    points.forEach(([x, y], index) => {
      if (index === 0) shape.moveTo(x, y)
      else shape.lineTo(x, y)
    })
    shape.closePath()
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.25,
      bevelEnabled: true,
      bevelThickness: 0.055,
      bevelSize: 0.055,
      bevelSegments: 3,
      steps: 1,
      curveSegments: 8
    })
    geometry.translate(0, 0.28, -0.125)
    return mesh(geometry, material)
  }

  const left: [number, number][] = [
    [-0.71, 0.72],
    [-1.5, 0.08],
    [-1.5, -0.08],
    [-0.71, -0.72],
    [-0.54, -0.49],
    [-1.16, 0],
    [-0.54, 0.49]
  ]
  glyph(left, violet)
  glyph(left.map(([x, y]) => [-x, y] as [number, number]).reverse(), violet)
  glyph(
    [
      [-0.38, -0.83],
      [-0.13, -0.83],
      [0.38, 0.83],
      [0.13, 0.83]
    ],
    lilac
  )

  const brush = new THREE.Group()
  brush.position.set(0.2, -1.05, 0.42)
  brush.rotation.z = -0.95
  model.add(brush)

  function turned(profile: [number, number][], material: THREE.Material) {
    return mesh(
      new THREE.LatheGeometry(
        profile.map(([radius, height]) => new THREE.Vector2(radius, height)),
        terminal ? 12 : 32
      ),
      material,
      brush
    )
  }

  // A tapered lacquer handle, a metal ferrule and shaped bristles.
  turned(
    [
      [0, -1.15],
      [0.045, -1.12],
      [0.074, -0.96],
      [0.105, -0.55],
      [0.14, -0.04],
      [0.14, 0.12],
      [0, 0.12]
    ],
    yellow
  )
  turned(
    [
      [0, 0.08],
      [0.15, 0.08],
      [0.155, 0.13],
      [0.155, 0.46],
      [0.14, 0.5],
      [0, 0.5]
    ],
    silver
  )
  for (const height of [0.13, 0.42]) {
    const ring = mesh(
      new THREE.TorusGeometry(0.155, 0.012, 6, 32),
      silver,
      brush
    )
    ring.rotation.x = Math.PI / 2
    ring.position.y = height
  }
  const tuft = turned(
    [
      [0, 0.47],
      [0.14, 0.47],
      [0.175, 0.61],
      [0.165, 0.73],
      [0.115, 0.9],
      [0.055, 1.02],
      [0, 1.11]
    ],
    bristles
  )
  tuft.scale.z = 0.7
  const tip = turned(
    [
      [0, 0.82],
      [0.14, 0.82],
      [0.117, 0.91],
      [0.058, 1.03],
      [0, 1.12]
    ],
    paint
  )
  tip.scale.z = 0.71

  return {
    model,
    dispose() {
      for (const geometry of geometries) geometry.dispose()
      for (const material of materials) material.dispose()
    }
  }
}
