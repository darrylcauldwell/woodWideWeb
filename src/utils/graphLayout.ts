import type { NetworkData } from '../types/network'

interface LayoutPosition {
  x: number
  y: number
  z: number
}

export function computeLayout(
  data: NetworkData
): Map<string, LayoutPosition> {
  const layout = new Map<string, LayoutPosition>()
  const plotScale = 1.0 // 1 unit = 1 meter

  for (const tree of data.trees) {
    // x,y from plot coordinates; z (depth underground) based on connectivity
    // Center the plot around origin
    const cx = (tree.x - data.metadata.plotSize[0] / 2) * plotScale
    const cy = (tree.y - data.metadata.plotSize[1] / 2) * plotScale
    // Underground depth: mother trees slightly deeper
    const depth = tree.isMotherTree ? -3.5 : -2.0 - Math.random() * 1.5

    layout.set(tree.id, { x: cx, y: depth, z: cy })
  }

  return layout
}

export function getAbovegroundPosition(
  underground: LayoutPosition
): LayoutPosition {
  return {
    x: underground.x,
    y: 0, // soil line is y=0
    z: underground.z,
  }
}

export function getTreeHeight(dbh: number): number {
  // Allometric scaling: height ~ dbh^0.6
  return 1.5 + (dbh / 120) * 6
}

export function getTreeRadius(dbh: number): number {
  return 0.05 + (dbh / 120) * 0.25
}

export function getCanopyRadius(dbh: number): number {
  return 0.5 + (dbh / 120) * 2.5
}
