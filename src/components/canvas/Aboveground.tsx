import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import type { ComputedNetwork } from '../../types/network'
import { getTreeHeight, getTreeRadius, getCanopyRadius } from '../../utils/graphLayout'

interface Props {
  network: ComputedNetwork
}

export function Aboveground({ network }: Props) {
  const trunkRef = useRef<THREE.InstancedMesh>(null)
  const canopyRef = useRef<THREE.InstancedMesh>(null)

  const trees = network.data.trees

  useEffect(() => {
    const dummy = new THREE.Object3D()
    const trunkColor = new THREE.Color('#8B6914')
    const canopyColor = new THREE.Color('#2D5016')
    const canopyLightColor = new THREE.Color('#4A7A28')

    if (!trunkRef.current || !canopyRef.current) return

    trees.forEach((tree, i) => {
      const pos = network.layout.get(tree.id)
      if (!pos) return

      const height = getTreeHeight(tree.dbh)
      const radius = getTreeRadius(tree.dbh)

      // Trunk
      dummy.position.set(pos.x, height / 2, pos.z)
      dummy.scale.set(radius, height, radius)
      dummy.updateMatrix()
      trunkRef.current!.setMatrixAt(i, dummy.matrix)
      trunkRef.current!.setColorAt(i, trunkColor)

      // Canopy
      const canopyR = getCanopyRadius(tree.dbh)
      dummy.position.set(pos.x, height * 0.75, pos.z)
      dummy.scale.set(canopyR, canopyR * 1.5, canopyR)
      dummy.updateMatrix()
      canopyRef.current!.setMatrixAt(i, dummy.matrix)
      canopyRef.current!.setColorAt(
        i,
        tree.isMotherTree ? canopyLightColor : canopyColor
      )
    })

    trunkRef.current.instanceMatrix.needsUpdate = true
    if (trunkRef.current.instanceColor) trunkRef.current.instanceColor.needsUpdate = true
    canopyRef.current.instanceMatrix.needsUpdate = true
    if (canopyRef.current.instanceColor) canopyRef.current.instanceColor.needsUpdate = true
  }, [trees, network.layout])

  return (
    <>
      <instancedMesh ref={trunkRef} args={[undefined, undefined, trees.length]}>
        <cylinderGeometry args={[1, 1, 1, 8]} />
        <meshStandardMaterial roughness={0.9} />
      </instancedMesh>
      <instancedMesh ref={canopyRef} args={[undefined, undefined, trees.length]}>
        <coneGeometry args={[1, 1, 8]} />
        <meshStandardMaterial roughness={0.8} />
      </instancedMesh>
    </>
  )
}
