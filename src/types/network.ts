import type { NutrientType } from '../utils/colors'

export interface TreeNode {
  id: string
  x: number          // position in plot (meters)
  y: number
  dbh: number         // diameter at breast height (cm)
  isMotherTree: boolean
  connections: number // degree centrality
  species: string
}

export interface FungalGenet {
  id: string
  species: string
  color: string
  treeIds: string[]
}

export interface NetworkEdge {
  id: string
  source: string      // tree id
  target: string      // tree id
  fungalGenetId: string
  nutrientType: NutrientType
  weight: number       // relative flow strength 0-1
}

export interface NetworkData {
  trees: TreeNode[]
  genets: FungalGenet[]
  edges: NetworkEdge[]
  metadata: {
    plotSize: [number, number]  // meters
    source: string
    year: number
  }
}

export interface ComputedNetwork {
  data: NetworkData
  layout: Map<string, { x: number; y: number; z: number }>
  motherTreeIds: Set<string>
  maxDegree: number
}
