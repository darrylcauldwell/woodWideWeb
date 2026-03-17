import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { ComputedNetwork, NetworkEdge } from '../types/network'
import { useAppStore } from '../stores/appStore'
import { NUTRIENT_COLORS_THREE, type NutrientType } from '../utils/colors'

const MAX_PARTICLES = 2000

interface Particle {
  edgeIndex: number
  progress: number // 0-1 along edge
  speed: number
  nutrientType: NutrientType
}

export function useNutrientFlow(network: ComputedNetwork | null) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const particlesRef = useRef<Particle[]>([])
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const colorArr = useRef(new Float32Array(MAX_PARTICLES * 3))

  const nutrientFilters = useAppStore((s) => s.nutrientFilters)
  const particleSpeed = useAppStore((s) => s.particleSpeed)
  const isMobile = useAppStore((s) => s.isMobile)

  const activeParticleCount = isMobile ? 400 : MAX_PARTICLES

  // Build edge lookup for positions
  const edgeData = useMemo(() => {
    if (!network) return []
    return network.data.edges.map((edge: NetworkEdge) => {
      const srcPos = network.layout.get(edge.source)
      const tgtPos = network.layout.get(edge.target)
      if (!srcPos || !tgtPos) return null

      // Bezier control point (arched underground)
      const midX = (srcPos.x + tgtPos.x) / 2
      const midY = Math.min(srcPos.y, tgtPos.y) - 1.5
      const midZ = (srcPos.z + tgtPos.z) / 2

      return {
        src: new THREE.Vector3(srcPos.x, srcPos.y, srcPos.z),
        ctrl: new THREE.Vector3(midX, midY, midZ),
        tgt: new THREE.Vector3(tgtPos.x, tgtPos.y, tgtPos.z),
        nutrientType: edge.nutrientType,
      }
    }).filter(Boolean) as {
      src: THREE.Vector3
      ctrl: THREE.Vector3
      tgt: THREE.Vector3
      nutrientType: NutrientType
    }[]
  }, [network])

  // Initialize particles
  useMemo(() => {
    if (edgeData.length === 0) return
    const particles: Particle[] = []
    for (let i = 0; i < activeParticleCount; i++) {
      particles.push({
        edgeIndex: Math.floor(Math.random() * edgeData.length),
        progress: Math.random(),
        speed: 0.15 + Math.random() * 0.3,
        nutrientType: edgeData[Math.floor(Math.random() * edgeData.length)].nutrientType,
      })
    }
    particlesRef.current = particles
  }, [edgeData, activeParticleCount])

  useFrame((_, delta) => {
    const mesh = meshRef.current
    if (!mesh || edgeData.length === 0) return

    const particles = particlesRef.current
    const colors = colorArr.current

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]
      const edge = edgeData[p.edgeIndex]

      // Check filter
      if (!nutrientFilters[p.nutrientType]) {
        dummy.position.set(0, -100, 0) // hide
        dummy.scale.setScalar(0)
        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)
        continue
      }

      // Advance
      p.progress += p.speed * particleSpeed * delta
      if (p.progress >= 1) {
        p.progress = 0
        p.edgeIndex = Math.floor(Math.random() * edgeData.length)
        p.nutrientType = edgeData[p.edgeIndex].nutrientType
      }

      // Quadratic bezier position
      const t = p.progress
      const t1 = 1 - t
      const x = t1 * t1 * edge.src.x + 2 * t1 * t * edge.ctrl.x + t * t * edge.tgt.x
      const y = t1 * t1 * edge.src.y + 2 * t1 * t * edge.ctrl.y + t * t * edge.tgt.y
      const z = t1 * t1 * edge.src.z + 2 * t1 * t * edge.ctrl.z + t * t * edge.tgt.z

      dummy.position.set(x, y, z)
      const scale = 0.04 + Math.sin(p.progress * Math.PI) * 0.03
      dummy.scale.setScalar(scale)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)

      // Color
      const color = NUTRIENT_COLORS_THREE[p.nutrientType]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true
    }
  })

  return { meshRef, particleCount: activeParticleCount, colorArr }
}
