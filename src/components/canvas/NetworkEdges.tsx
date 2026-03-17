import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import type { ComputedNetwork } from '../../types/network'
import { NUTRIENT_COLORS_THREE, type NutrientType } from '../../utils/colors'
import { useAppStore } from '../../stores/appStore'

interface Props {
  network: ComputedNetwork
}

const POINTS_PER_EDGE = 20

export function NetworkEdges({ network }: Props) {
  const lineRef = useRef<THREE.LineSegments>(null)
  const nutrientFilters = useAppStore((s) => s.nutrientFilters)

  const { geometry, nutrientTypes } = useMemo(() => {
    const edges = network.data.edges
    const segmentsPerEdge = POINTS_PER_EDGE - 1
    const totalSegments = edges.length * segmentsPerEdge
    const positions = new Float32Array(totalSegments * 6) // 2 points * 3 coords per segment
    const colors = new Float32Array(totalSegments * 6)
    const types: NutrientType[] = []

    let offset = 0
    for (const edge of edges) {
      const srcPos = network.layout.get(edge.source)
      const tgtPos = network.layout.get(edge.target)
      if (!srcPos || !tgtPos) continue

      const src = new THREE.Vector3(srcPos.x, srcPos.y, srcPos.z)
      const tgt = new THREE.Vector3(tgtPos.x, tgtPos.y, tgtPos.z)
      const mid = new THREE.Vector3(
        (src.x + tgt.x) / 2,
        Math.min(src.y, tgt.y) - 1.5,
        (src.z + tgt.z) / 2
      )

      const curve = new THREE.QuadraticBezierCurve3(src, mid, tgt)
      const points = curve.getPoints(POINTS_PER_EDGE - 1)
      const color = NUTRIENT_COLORS_THREE[edge.nutrientType]

      for (let j = 0; j < points.length - 1; j++) {
        const i6 = offset * 6
        positions[i6] = points[j].x
        positions[i6 + 1] = points[j].y
        positions[i6 + 2] = points[j].z
        positions[i6 + 3] = points[j + 1].x
        positions[i6 + 4] = points[j + 1].y
        positions[i6 + 5] = points[j + 1].z

        const alpha = 0.3 + edge.weight * 0.5
        colors[i6] = color.r * alpha
        colors[i6 + 1] = color.g * alpha
        colors[i6 + 2] = color.b * alpha
        colors[i6 + 3] = color.r * alpha
        colors[i6 + 4] = color.g * alpha
        colors[i6 + 5] = color.b * alpha

        offset++
      }
      types.push(edge.nutrientType)
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    return { geometry: geo, nutrientTypes: types }
  }, [network])

  // Pulsing animation
  useFrame(({ clock }) => {
    if (!lineRef.current) return
    const mat = lineRef.current.material as THREE.LineBasicMaterial
    mat.opacity = 0.5 + Math.sin(clock.elapsedTime * 0.8) * 0.15
  })

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </lineSegments>
  )
}
