import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { SoilLine } from './SoilLine'
import { Aboveground } from './Aboveground'
import { Underground } from './Underground'
import { CameraRig } from './CameraRig'
import type { ComputedNetwork } from '../../types/network'
import { useAppStore } from '../../stores/appStore'

interface Props {
  network: ComputedNetwork
}

function SceneContent({ network }: Props) {
  return (
    <>
      <CameraRig />

      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[10, 20, 10]} intensity={0.4} color="#FFE8CC" />
      <pointLight position={[0, -3, 0]} intensity={0.8} color="#FFD700" distance={20} />

      {/* Fog for depth */}
      <fog attach="fog" args={['#0A0806', 15, 55]} />

      <SoilLine />
      <Aboveground network={network} />
      <Underground network={network} />

      {/* Postprocessing */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          intensity={1.2}
          mipmapBlur
        />
      </EffectComposer>
    </>
  )
}

export function Scene({ network }: Props) {
  const isMobile = useAppStore((s) => s.isMobile)

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
    }}>
      <Canvas
        camera={{ position: [0, 20, 35], fov: 50, near: 0.1, far: 100 }}
        gl={{
          antialias: !isMobile,
          toneMapping: 3, // ACESFilmic
          toneMappingExposure: 1.2,
        }}
        dpr={isMobile ? 1 : [1, 2]}
      >
        <color attach="background" args={['#0A0806']} />
        <Suspense fallback={null}>
          <SceneContent network={network} />
        </Suspense>
      </Canvas>
    </div>
  )
}
