import * as THREE from 'three'

/** A true voxel portrait: all visible geometry is made from cuboids. */
export function createPortrait() {
  const head = new THREE.Group()
  const eyes: THREE.Group[] = []
  const unit = 0.08
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const colors = {
    skin: '#bd8968',
    light: '#c99472',
    shade: '#ae795c',
    hair: '#242020',
    hairLight: '#302a28',
    hairDark: '#1d1b1c',
    frame: '#192129',
    white: '#eee5d8',
    iris: '#403029',
    pupil: '#161a20',
    lip: '#9b6052',
    smile: '#70483e',
    ear: '#a96e58',
    silver: '#bfc7ce'
  }
  type Color = keyof typeof colors
  const materials = Object.fromEntries(
    Object.entries(colors).map(([key, color]) => [
      key,
      new THREE.MeshStandardMaterial({
        color,
        roughness: key === 'silver' ? 0.4 : 1,
        metalness: key === 'silver' ? 0.5 : 0
      })
    ])
  ) as Record<Color, THREE.MeshStandardMaterial>
  const batches = new Map<Color, { position: number[]; scale: number[] }[]>()
  function block(
    color: Color,
    x: number,
    y: number,
    z: number,
    sx = unit,
    sy = unit,
    sz = unit,
    parent?: THREE.Group
  ) {
    if (parent) {
      const cube = new THREE.Mesh(geometry, materials[color])
      cube.position.set(x, y, z)
      cube.scale.set(sx, sy, sz)
      parent.add(cube)
    } else {
      const list = batches.get(color) ?? []
      list.push({ position: [x, y, z], scale: [sx, sy, sz] })
      batches.set(color, list)
    }
  }
  // Quantized silhouette: broad temples, gently tapered jaw, short textured top.
  function occupied(x: number, y: number, z: number) {
    if (y < -12 || y > 14) return false
    const width = y < -9 ? 5 : y < -6 ? 7 : y < -3 ? 8 : y > 12 ? 7 : 9
    const depth = y < -9 ? 4 : y < -6 ? 5 : 7
    return (Math.abs(x) / width) ** 4 + (Math.abs(z) / depth) ** 4 <= 1
  }
  for (let y = -12; y <= 14; y++)
    for (let x = -9; x <= 9; x++)
      for (let z = -7; z <= 7; z++) {
        if (!occupied(x, y, z)) continue
        if (
          [
            [1, 0, 0],
            [-1, 0, 0],
            [0, 1, 0],
            [0, -1, 0],
            [0, 0, 1],
            [0, 0, -1]
          ].every(([dx, dy, dz]) => occupied(x + dx, y + dy, z + dz))
        )
          continue
        const seed = Math.abs((x * 73 + y * 37 + z * 19) % 17)
        const hairline =
          z >= 4 ? 9 + (Math.abs(x) > 6 ? -1 : 0) : Math.abs(x) >= 8 ? 3 : 1
        const isHair = y >= hairline
        const color: Color = isHair
          ? seed < 3
            ? 'hairLight'
            : seed > 14
              ? 'hairDark'
              : 'hair'
          : seed === 0
            ? 'light'
            : seed === 1
              ? 'shade'
              : 'skin'
        block(color, x * unit, y * unit, z * unit)
      }
  // Irregular, connected pixels along the crown; never spherical curls.
  for (let x = -7; x <= 7; x++)
    for (let z = -5; z <= 5; z++) {
      if (Math.abs(x) + Math.abs(z) > 10) continue
      const height = 14 + ((x * x + z * z + x * 3 + 29) % 3 === 0 ? 1 : 0)
      block(
        (x + z) % 3 === 0 ? 'hairLight' : 'hair',
        x * unit,
        height * unit,
        z * unit
      )
    }
  for (const side of [-1, 1]) {
    block('skin', side * 0.79, -0.08, 0.01, 0.16, 0.32, 0.24)
    block('ear', side * 0.83, -0.04, 0.145, 0.08, 0.16, 0.025)
    block('skin', side * 0.81, -0.2, 0.04, 0.12, 0.08, 0.18)
    const eye = new THREE.Group()
    eye.position.set(side * 0.32, 0.24, 0.616)
    head.add(eye)
    block('white', 0, 0, 0, 0.24, 0.105, 0.04, eye)
    const gaze = new THREE.Group()
    eye.add(gaze)
    block('iris', 0, 0, 0.03, 0.085, 0.095, 0.025, gaze)
    block('pupil', 0, 0, 0.046, 0.045, 0.065, 0.012, gaze)
    block('white', -0.017, 0.023, 0.055, 0.023, 0.023, 0.008, gaze)
    eyes.push(gaze)
    block('hair', side * 0.32, 0.43, 0.612, 0.24, 0.045, 0.04)
    block('hair', side * 0.44, 0.4, 0.61, 0.06, 0.04, 0.04)
    // Round glasses drawn as a stepped pixel ring.
    const mask = [
      '..###..',
      '.#...#.',
      '#.....#',
      '#.....#',
      '#.....#',
      '.#...#.',
      '..###..'
    ]
    for (let row = 0; row < 7; row++)
      for (let col = 0; col < 7; col++)
        if (mask[row][col] === '#') {
          block(
            'frame',
            side * 0.32 + (col - 3) * 0.075,
            0.24 + (3 - row) * 0.075,
            0.718,
            0.075,
            0.075,
            0.055
          )
        }
    block('frame', side * 0.67, 0.31, 0.4, 0.055, 0.055, 0.63)
    block('frame', side * 0.615, 0.31, 0.705, 0.12, 0.055, 0.055)
  }
  block('frame', 0, 0.29, 0.725, 0.14, 0.055, 0.055)
  // Stepped bridge and tip, with modest projection.
  block('skin', 0, 0.095, 0.625, 0.105, 0.25, 0.12)
  block('light', 0, -0.065, 0.705, 0.16, 0.12, 0.16)
  block('skin', 0, -0.13, 0.665, 0.24, 0.08, 0.14)
  const moustache = ['.#...#.', '#######', '#.....#']
  for (let r = 0; r < moustache.length; r++)
    for (let c = 0; c < 7; c++)
      if (moustache[r][c] === '#') {
        block(
          'hair',
          (c - 3) * 0.064,
          -0.245 - r * 0.045,
          0.627,
          0.064,
          0.045,
          0.048
        )
      }
  // A restrained pixel smile: raised corners, short closed mouth.
  block('smile', 0, -0.43, 0.617, 0.24, 0.026, 0.028)
  block('smile', -0.15, -0.405, 0.617, 0.06, 0.026, 0.028)
  block('smile', 0.15, -0.405, 0.617, 0.06, 0.026, 0.028)
  block('lip', 0, -0.465, 0.616, 0.18, 0.035, 0.027)
  // Pixel hoops and the small stud visible in the reference photographs.
  for (const x of [-0.82, -0.75]) {
    for (const [dx, dy] of [
      [-1, 0],
      [1, 0],
      [-1, -1],
      [1, -1],
      [0, -2]
    ])
      block(
        'silver',
        x + dx * 0.023,
        -0.24 + dy * 0.026,
        0.13,
        0.024,
        0.026,
        0.025
      )
  }
  block('silver', 0.83, -0.225, 0.17, 0.035, 0.035, 0.035)
  const instances: THREE.InstancedMesh[] = []
  const transform = new THREE.Object3D()
  for (const [color, cubes] of batches) {
    const batch = new THREE.InstancedMesh(
      geometry,
      materials[color],
      cubes.length
    )
    cubes.forEach((cube, i) => {
      transform.position.set(...(cube.position as [number, number, number]))
      transform.scale.set(...(cube.scale as [number, number, number]))
      transform.updateMatrix()
      batch.setMatrixAt(i, transform.matrix)
    })
    batch.instanceMatrix.needsUpdate = true
    batch.computeBoundingSphere()
    head.add(batch)
    instances.push(batch)
  }
  return {
    head,
    eyes,
    dispose() {
      for (const batch of instances) batch.dispose()
      geometry.dispose()
      for (const mat of Object.values(materials)) mat.dispose()
    }
  }
}
