import * as THREE from 'three'
import { useState, useRef, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
// current @react-three/drei's Reflector is messed up atm, needs a revert
import { Reflector } from './Reflector'

function Triangle({ color, ...props }) {
  const ref = useRef()
  const [r] = useState(() => Math.random() * 100000)
  useFrame((_) => (ref.current.position.y = -1.75 + Math.sin(_.clock.elapsedTime + r) / 10))
  const { paths: [path] } = useLoader(SVGLoader, '/triangle.svg') // prettier-ignore
  const geom = useMemo(() => SVGLoader.pointsToStroke(path.subPaths[0].getPoints(), path.userData.style), [])
  return (
    <group ref={ref}>
      <mesh geometry={geom} {...props}>
        <meshBasicMaterial color={color} toneMapped />
      </mesh>
    </group>
  )
}

export default Triangle
