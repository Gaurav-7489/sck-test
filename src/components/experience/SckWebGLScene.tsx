'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import { useRef } from 'react'
import * as THREE from 'three'

function Jet() {
  const jet = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!jet.current) return

    const t = state.clock.elapsedTime
    const x = state.pointer.x
    const y = state.pointer.y

    const maxScroll =
      Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)

    const s = Math.min(
      Math.max(window.scrollY / maxScroll, 0),
      1
    )

    jet.current.rotation.y = THREE.MathUtils.lerp(
      jet.current.rotation.y,
      -0.12 + x * 0.18 + s * 0.32,
      0.035
    )

    jet.current.rotation.x = THREE.MathUtils.lerp(
      jet.current.rotation.x,
      y * 0.08,
      0.035
    )

    jet.current.position.y =
      Math.sin(t * 0.55) * 0.08 + s * 0.35

    const targetScale = 1.15 + s * 0.28

    jet.current.scale.x = THREE.MathUtils.lerp(
      jet.current.scale.x,
      targetScale,
      0.03
    )

    jet.current.scale.y = THREE.MathUtils.lerp(
      jet.current.scale.y,
      targetScale,
      0.03
    )

    jet.current.scale.z = THREE.MathUtils.lerp(
      jet.current.scale.z,
      targetScale,
      0.03
    )
  })

  return (
    <group ref={jet} position={[0, 0.15, -7]} scale={1.15}>

      {/* MAIN FUSELAGE */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.48, 5.4, 8, 20]} />
        <meshStandardMaterial
          color="#34383d"
          metalness={0.88}
          roughness={0.2}
        />
      </mesh>

      {/* NOSE */}
      <mesh position={[-3.05, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.48, 1.55, 20]} />
        <meshStandardMaterial
          color="#24282c"
          metalness={0.92}
          roughness={0.16}
        />
      </mesh>

      {/* COCKPIT */}
      <mesh position={[-1.72, 0.32, 0]}>
        <sphereGeometry args={[0.55, 16, 10]} />
        <meshStandardMaterial
          color="#050607"
          metalness={0.65}
          roughness={0.08}
        />
      </mesh>

      {/* COCKPIT GLAZING STRIPE */}
      <mesh
        position={[-1.75, 0.48, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <boxGeometry args={[0.08, 0.95, 0.58]} />
        <meshStandardMaterial
          color="#7c8791"
          metalness={0.8}
          roughness={0.08}
        />
      </mesh>

      {/* MAIN WING LEFT */}
      <mesh
        position={[0, -0.02, -1.85]}
        rotation={[0, 0, 0.035]}
      >
        <boxGeometry args={[4.4, 0.075, 1.0]} />
        <meshStandardMaterial
          color="#444950"
          metalness={0.9}
          roughness={0.24}
        />
      </mesh>

      {/* MAIN WING RIGHT */}
      <mesh
        position={[0, -0.02, 1.85]}
        rotation={[0, 0, -0.035]}
      >
        <boxGeometry args={[4.4, 0.075, 1.0]} />
        <meshStandardMaterial
          color="#444950"
          metalness={0.9}
          roughness={0.24}
        />
      </mesh>

      {/* WING HIGHLIGHTS */}
      <mesh position={[-0.3, 0.035, -2.7]}>
        <boxGeometry args={[3.1, 0.025, 0.025]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.7}
        />
      </mesh>

      <mesh position={[-0.3, 0.035, 2.7]}>
        <boxGeometry args={[3.1, 0.025, 0.025]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* TAIL */}
      <mesh
        position={[2.25, 0.58, 0]}
        rotation={[0, 0, -0.12]}
      >
        <boxGeometry args={[1.25, 1.55, 0.12]} />
        <meshStandardMaterial
          color="#282c31"
          metalness={0.86}
          roughness={0.2}
        />
      </mesh>

      {/* HORIZONTAL TAIL */}
      <mesh position={[2.25, 0.05, -0.85]}>
        <boxGeometry args={[1.5, 0.06, 0.85]} />
        <meshStandardMaterial
          color="#393e44"
          metalness={0.86}
          roughness={0.23}
        />
      </mesh>

      <mesh position={[2.25, 0.05, 0.85]}>
        <boxGeometry args={[1.5, 0.06, 0.85]} />
        <meshStandardMaterial
          color="#393e44"
          metalness={0.86}
          roughness={0.23}
        />
      </mesh>

      {/* ENGINES */}
      {[-1, 1].map((side) => (
        <group key={side} position={[1.35, -0.18, side * 1.35]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.38, 0.48, 1.5, 24]} />
            <meshStandardMaterial
              color="#171a1e"
              metalness={0.96}
              roughness={0.16}
            />
          </mesh>

          <mesh position={[0, 0, side * 0.76]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.36, 0.055, 10, 32]} />
            <meshBasicMaterial
              color="#d8dde2"
              transparent
              opacity={0.75}
            />
          </mesh>

          <pointLight
            position={[0, 0, side * 0.82]}
            intensity={7}
            distance={4}
          />
        </group>
      ))}

      {/* NAVIGATION LIGHTS */}
      <pointLight position={[-2.8, 0, -0.5]} intensity={3} distance={4} />
      <pointLight position={[-2.8, 0, 0.5]} intensity={3} distance={4} />
    </group>
  )
}

function Runway() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.7, -9]}>
        <planeGeometry args={[80, 100]} />
        <meshStandardMaterial
          color="#070707"
          roughness={0.75}
          metalness={0.45}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.67, -9]}>
        <planeGeometry args={[0.035, 100]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.35}
        />
      </mesh>

      {Array.from({ length: 24 }).map((_, i) => (
        <group key={i}>
          <mesh position={[-3, -2.65, 7 - i * 4]}>
            <boxGeometry args={[0.025, 0.02, 0.8]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.25 - i * 0.006}
            />
          </mesh>

          <mesh position={[3, -2.65, 7 - i * 4]}>
            <boxGeometry args={[0.025, 0.02, 0.8]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.25 - i * 0.006}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Architecture() {
  return (
    <group>
      {[-10, -6, -2, 2, 6, 10].map((x) => (
        <mesh key={x} position={[x, 2, -19]}>
          <boxGeometry args={[0.025, 12, 0.025]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.12}
          />
        </mesh>
      ))}

      <mesh position={[0, 8, -19]}>
        <boxGeometry args={[22, 0.025, 0.025]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
        />
      </mesh>

      <mesh position={[0, -0.5, -24]}>
        <boxGeometry args={[40, 0.02, 0.02]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.13}
        />
      </mesh>
    </group>
  )
}

function OrbitalRings() {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!ref.current) return

    ref.current.rotation.z = state.clock.elapsedTime * 0.025
    ref.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.12) * 0.08
  })

  return (
    <group ref={ref} position={[0, 0, -11]}>
      <mesh rotation={[0.35, 0, 0]}>
        <torusGeometry args={[5.1, 0.018, 8, 160]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.2}
        />
      </mesh>

      <mesh rotation={[-0.7, 0.2, 0]}>
        <torusGeometry args={[6.8, 0.012, 8, 160]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.55} />

      <directionalLight
        position={[-8, 8, 8]}
        intensity={5}
      />

      <directionalLight
        position={[8, 3, -4]}
        intensity={3}
      />

      <pointLight
        position={[0, 3, -7]}
        intensity={35}
        distance={25}
        decay={2}
      />

      <spotLight
        position={[0, 9, 4]}
        intensity={45}
        distance={40}
        angle={0.5}
        penumbra={1}
      />
    </>
  )
}

function CameraRig() {
  const scroll = useRef(0)

  useFrame((state) => {
    const x = state.pointer.x
    const y = state.pointer.y

    const maxScroll =
      Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)

    const targetScroll =
      Math.min(Math.max(window.scrollY / maxScroll, 0), 1)

    scroll.current = THREE.MathUtils.lerp(
      scroll.current,
      targetScroll,
      0.045
    )

    const s = scroll.current

    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      x * 0.65 + Math.sin(s * Math.PI) * 0.45,
      0.025
    )

    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      0.45 + y * 0.35 + s * 0.45,
      0.025
    )

    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      8 - s * 2.2,
      0.025
    )

    state.camera.lookAt(
      0,
      0.15 + s * 0.25,
      -7 - s * 2
    )
  })

  return null
}

function Scene() {
  return (
    <>
      <fog attach="fog" args={['#020202', 8, 42]} />

      <Lights />

      <CameraRig />

      <Runway />

      <Architecture />

      <OrbitalRings />

      <Jet />

      <Sparkles
        count={180}
        scale={[22, 12, 40]}
        size={0.6}
        speed={0.08}
        opacity={0.25}
      />

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.65}
          luminanceThreshold={0.65}
          luminanceSmoothing={0.35}
          mipmapBlur
        />
        <Vignette
          darkness={0.75}
          eskil={false}
        />
      </EffectComposer>
    </>
  )
}

export default function SckWebGLScene() {
  return (
    <div
      className="sck-webgl"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <Canvas
        camera={{
          position: [0, 0.45, 8],
          fov: 38,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 1.35]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
