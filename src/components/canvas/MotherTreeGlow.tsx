import { useMemo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import type { ComputedNetwork } from '../../types/network'

interface Props {
  network: ComputedNetwork
}

export function MotherTreeGlow({ network }: Props) {
  const meshRef = useRef<THREE.InstancedMesh>(null)

  const motherTrees = useMemo(
    () => network.data.trees.filter((t) => t.isMotherTree),
    [network]
  )

  useEffect(() => {
    if (!meshRef.current || motherTrees.length === 0) return
    const dummy = new THREE.Object3D()

    motherTrees.forEach((tree, i) => {
      const pos = network.layout.get(tree.id)
      if (!pos) return

      const scale = 0.6 + (tree.connections / network.maxDegree) * 0.8
      dummy.position.set(pos.x, pos.y, pos.z)
      dummy.scale.setScalar(scale)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })

    meshRef.current.instanceMatrix.needsUpdate = true
  }, [motherTrees, network.layout, network.maxDegree])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const mat = meshRef.current.material as THREE.MeshBasicMaterial
    mat.opacity = 0.15 + Math.sin(clock.elapsedTime * 1.5) * 0.08
  })

  return motherTrees.length > 0 ? (
    <instancedMesh ref={meshRef} args={[undefined, undefined, motherTrees.length]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial
        color="#FFD700"
        transparent
        opacity={0.2}
        depthWrite={false}
        toneMapped={false}
      />
    </instancedMesh>
  ) : null
}
