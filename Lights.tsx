import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

function Lights() {
  const groupL = useRef()
  const groupR = useRef()
  const front = useRef()

  useFrame(({ clock, mouse }) => {
    groupL.current.rotation.y = lerp(groupL.current.rotation.y, -mouse.x * (Math.PI / 2), 0.1)
    groupR.current.rotation.y = lerp(groupR.current.rotation.y, mouse.x * (Math.PI / 2), 0.1)
    front.current.position.x = lerp(front.current.position.x, mouse.x * 12, 0.4)
    front.current.position.y = lerp(front.current.position.y, 7 + mouse.y * 4, 0.4)
  })

  return (
    <>
      <group ref={groupL}>
        <pointLight position={[0, 5, -1]} distance={8} intensity={10} />
      </group>
      <group ref={groupR}>
        <pointLight position={[0, 7, -9]} distance={15} intensity={10} />
      </group>
      <spotLight
        castShadow
        ref={front}
        penumbra={1}
        angle={Math.PI / 3}
        position={[0, 0, 8]}
        distance={11}
        intensity={8}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </>
  )
}
