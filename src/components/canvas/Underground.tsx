import type { ComputedNetwork } from '../../types/network'
import { NetworkNodes } from './NetworkNodes'
import { NetworkEdges } from './NetworkEdges'
import { NutrientParticles } from './NutrientParticles'
import { MotherTreeGlow } from './MotherTreeGlow'

interface Props {
  network: ComputedNetwork
}

export function Underground({ network }: Props) {
  return (
    <group>
      <NetworkEdges network={network} />
      <NetworkNodes network={network} />
      <NutrientParticles network={network} />
      <MotherTreeGlow network={network} />
    </group>
  )
}
