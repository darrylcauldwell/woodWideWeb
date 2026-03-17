import { Section1_WhatLiesBeneath } from './Section1_WhatLiesBeneath'
import { Section2_ScaleIsInsane } from './Section2_ScaleIsInsane'
import { Section3_UndergroundEconomy } from './Section3_UndergroundEconomy'
import { Section4_MotherTrees } from './Section4_MotherTrees'
import { Section5_TransitionCTA } from './Section5_TransitionCTA'

export function ScrollNarrative() {
  return (
    <div style={{
      position: 'relative',
      zIndex: 1,
      pointerEvents: 'none',
    }}>
      <div style={{ pointerEvents: 'auto' }}>
        <Section1_WhatLiesBeneath />
        <Section2_ScaleIsInsane />
        <Section3_UndergroundEconomy />
        <Section4_MotherTrees />
        <Section5_TransitionCTA />
      </div>
    </div>
  )
}
