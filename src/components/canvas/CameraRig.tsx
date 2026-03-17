import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useAppStore } from '../../stores/appStore'
import { lerpV3, smoothstep } from '../../utils/easing'

// Scroll keyframes: [progress, position, lookAt]
const KEYFRAMES: [number, [number, number, number], [number, number, number]][] = [
  [0.0,  [0, 20, 35],    [0, 0, 0]],      // Above canopy — panoramic
  [0.2,  [0, 8, 20],     [0, 0, 0]],       // Descending toward trees
  [0.4,  [8, 0, 12],     [0, -2, 0]],      // At soil line
  [0.6,  [5, -3, 8],     [0, -3, 0]],      // Underground — network visible
  [0.8,  [2, -3, 4],     [0, -3, 0]],      // Close to mother tree
  [1.0,  [0, -2, 6],     [0, -2, 0]],      // Final — ready to explore
]

function getKeyframeAt(progress: number): {
  position: [number, number, number]
  lookAt: [number, number, number]
} {
  // Find surrounding keyframes
  let lower = KEYFRAMES[0]
  let upper = KEYFRAMES[KEYFRAMES.length - 1]

  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    if (progress >= KEYFRAMES[i][0] && progress <= KEYFRAMES[i + 1][0]) {
      lower = KEYFRAMES[i]
      upper = KEYFRAMES[i + 1]
      break
    }
  }

  const range = upper[0] - lower[0]
  const t = range > 0 ? smoothstep(0, 1, (progress - lower[0]) / range) : 0

  return {
    position: lerpV3(lower[1], upper[1], t),
    lookAt: lerpV3(lower[2], upper[2], t),
  }
}

export function CameraRig() {
  const mode = useAppStore((s) => s.mode)
  const scrollProgress = useAppStore((s) => s.scrollProgress)
  const setLastNarrativeCameraPos = useAppStore((s) => s.setLastNarrativeCameraPos)
  const controlsRef = useRef<any>(null)
  const { camera } = useThree()
  const lookAtTarget = useRef(new THREE.Vector3())

  useFrame(() => {
    if (mode !== 'narrative') return

    const { position, lookAt } = getKeyframeAt(scrollProgress)

    camera.position.lerp(
      new THREE.Vector3(...position),
      0.05
    )
    lookAtTarget.current.lerp(
      new THREE.Vector3(...lookAt),
      0.05
    )
    camera.lookAt(lookAtTarget.current)
    setLastNarrativeCameraPos([camera.position.x, camera.position.y, camera.position.z])
  })

  // Enable/disable orbit controls based on mode
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enabled = mode === 'interactive'
    }
  }, [mode])

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      minDistance={3}
      maxDistance={50}
      target={[0, -2, 0]}
      enabled={mode === 'interactive'}
    />
  )
}
