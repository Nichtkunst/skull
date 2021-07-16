import * as THREE from 'three'
import { useState, useRef, Suspense, useMemo } from 'react'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { /*Reflector, */ CameraShake, OrbitControls, useTexture, Center } from '@react-three/drei'
import { KernelSize } from 'postprocessing'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
// current @react-three/drei's Reflector is messed up atm, needs a revert
import { Reflector } from './Reflector'

// asset
import Skull from './Skull'
import Triangle from './Triangle'
import Rig from './Rig'

function Ground(props) {
  const [floor, normal] = useTexture(['/SurfaceImperfections003_1K_var1.jpg', '/SurfaceImperfections003_1K_Normal.jpg'])
  return (
    <Reflector resolution={1024} args={[10, 10]} {...props}>
      {(Material, props) => (
        <Material
          color="#0101"
          metalness={0.85}
          roughnessMap={floor}
          normalMap={normal}
          normalScale={[2, 2]}
          {...props}
        />
      )}
    </Reflector>
  )
}

export default function App() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 18] }}>
      <color attach="background" args={['#010101']} />
      <fog attach="fog" args={['#d0d0d0', 5, 10]} />
      <ambientLight intensity={2} />
      <OrbitControls enableZoom enablePan={false} enableRotate={false} />
      <Suspense fallback={null}>
        <Rig>
          <Skull scale={0.009} position={[0, 0, -0.8]} />
          <Triangle color="#ff2060" scale={0.009} rotation={[0, 0, Math.PI / 3]} />
          <Triangle color="cyan" scale={0.009} position={[2, 0, -2]} rotation={[0, 0, Math.PI / 3]} />
          <Triangle color="orange" scale={0.009} position={[-2, 0, -2]} rotation={[0, 0, Math.PI / 3]} />
          <Triangle color="white" scale={0.009} position={[0, 2, -10]} rotation={[0, 0, Math.PI / 3]} />
          <Ground
            mirror={1}
            mixBlur={4.38}
            mixStrength={2}
            rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            blur={[88, 738]}
            position-y={-0.9}
          />
        </Rig>
        <EffectComposer multisampling={3}>
          <Bloom kernelSize={3} luminanceThreshold={0} luminanceSmoothing={0.1} intensity={0.1} />
          <Bloom kernelSize={KernelSize.HUGE} luminanceThreshold={0} luminanceSmoothing={0} intensity={0.5} />
        </EffectComposer>
      </Suspense>
      <CameraShake yawFrequency={0.1} pitchFrequency={0.2} rollFrequency={0.2} />
    </Canvas>
  )
}
