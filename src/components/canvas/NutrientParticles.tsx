import { useEffect } from 'react'
import * as THREE from 'three'
import type { ComputedNetwork } from '../../types/network'
import { useNutrientFlow } from '../../hooks/useNutrientFlow'

interface Props {
  network: ComputedNetwork
}

export function NutrientParticles({ network }: Props) {
  const { meshRef, particleCount, colorArr } = useNutrientFlow(network)

  useEffect(() => {
    if (meshRef.current) {
      const mesh = meshRef.current
      mesh.instanceColor = new THREE.InstancedBufferAttribute(
        colorArr.current,
        3
      )
    }
  }, [meshRef, colorArr])

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particleCount]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  )
}
