import { useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import type { ThreeEvent } from '@react-three/fiber'
import type { ComputedNetwork } from '../../types/network'
import { useAppStore } from '../../stores/appStore'

interface Props {
  network: ComputedNetwork
}

export function NetworkNodes({ network }: Props) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const setSelectedNodeId = useAppStore((s) => s.setSelectedNodeId)
  const mode = useAppStore((s) => s.mode)

  const trees = network.data.trees

  useEffect(() => {
    if (!meshRef.current) return
    const dummy = new THREE.Object3D()
    const defaultColor = new THREE.Color('#A08850')
    const motherColor = new THREE.Color('#FFB800')

    trees.forEach((tree, i) => {
      const pos = network.layout.get(tree.id)
      if (!pos) return

      const scale = tree.isMotherTree
        ? 0.25 + (tree.connections / network.maxDegree) * 0.3
        : 0.1 + (tree.connections / network.maxDegree) * 0.15

      dummy.position.set(pos.x, pos.y, pos.z)
      dummy.scale.setScalar(scale)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
      meshRef.current!.setColorAt(i, tree.isMotherTree ? motherColor : defaultColor)
    })

    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true
  }, [trees, network.layout, network.maxDegree])

  const handleClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      if (mode !== 'interactive') return
      e.stopPropagation()
      if (e.instanceId !== undefined && e.instanceId < trees.length) {
        setSelectedNodeId(trees[e.instanceId].id)
      }
    },
    [mode, trees, setSelectedNodeId]
  )

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, trees.length]}
      onClick={handleClick}
    >
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        emissive="#FFB800"
        emissiveIntensity={0.5}
        roughness={0.3}
        toneMapped={false}
      />
    </instancedMesh>
  )
}
