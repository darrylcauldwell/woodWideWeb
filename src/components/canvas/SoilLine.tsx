import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

export function SoilLine() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial
      mat.opacity = 0.3 + Math.sin(clock.elapsedTime * 0.5) * 0.05
    }
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[60, 60]} />
      <meshStandardMaterial
        color="#3D3020"
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}
