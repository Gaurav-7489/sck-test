'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1)
const smooth = (value: number) => value * value * (3 - 2 * value)

function scrollProgress() {
  if (typeof window === 'undefined') return 0
  const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
  return clamp01(window.scrollY / max)
}

function Aircraft() {
  const root = useRef<THREE.Group>(null)
  const glow = useRef<THREE.Mesh>(null)

  const windowPositions = useMemo(
    () => [-2.15, -1.62, -1.09, -0.56, -0.03, 0.5, 1.03, 1.56],
    [],
  )

  useFrame((state) => {
    if (!root.current) return
    const p = scrollProgress()
    const mouseX = state.pointer.x
    const mouseY = state.pointer.y

    // The aircraft is the hero object. Scroll changes the camera relationship;
    // pointer movement gives it a restrained physical response.
    const targetRotY = mouseX * 0.13 + Math.sin(p * Math.PI * 1.25) * 0.1
    const targetRotX = -0.02 + mouseY * 0.055 - smooth(clamp01((p - 0.38) / 0.28)) * 0.08
    root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, targetRotY, 0.035)
    root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, targetRotX, 0.035)
    root.current.rotation.z = THREE.MathUtils.lerp(root.current.rotation.z, Math.sin(state.clock.elapsedTime * 0.35) * 0.008, 0.025)

    const flight = Math.sin(p * Math.PI)
    root.current.position.x = THREE.MathUtils.lerp(root.current.position.x, mouseX * 0.28 + Math.sin(p * Math.PI * 2) * 0.22, 0.025)
    root.current.position.y = THREE.MathUtils.lerp(root.current.position.y, Math.sin(state.clock.elapsedTime * 0.55) * 0.045 + flight * 0.35, 0.03)
    root.current.position.z = THREE.MathUtils.lerp(root.current.position.z, -1.2 - p * 4.2, 0.025)

    const targetScale = 1.1 + smooth(clamp01((p - 0.04) / 0.48)) * 0.42
    root.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.025)

    if (glow.current) {
      const material = glow.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.14 + Math.sin(state.clock.elapsedTime * 2.5) * 0.045
    }
  })

  return (
    <group ref={root} position={[0, 0, -1.2]} scale={1.1}>
      {/* Fuselage: layered geometry gives a more believable aircraft silhouette without an external model. */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 1.02]}>
        <capsuleGeometry args={[0.72, 5.5, 10, 32]} />
        <meshPhysicalMaterial color="#151719" metalness={0.92} roughness={0.17} clearcoat={0.8} clearcoatRoughness={0.12} />
      </mesh>
      <mesh position={[-3.22, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.72, 1.8, 32]} />
        <meshPhysicalMaterial color="#0b0c0e" metalness={0.96} roughness={0.12} clearcoat={0.9} />
      </mesh>

      {/* Cockpit canopy */}
      <mesh position={[-2.48, 0.5, 0]} scale={[1.2, 0.72, 0.88]}>
        <sphereGeometry args={[0.66, 32, 18]} />
        <meshPhysicalMaterial color="#050607" metalness={0.55} roughness={0.06} transmission={0.08} clearcoat={1} />
      </mesh>
      <mesh position={[-2.66, 0.68, 0]} rotation={[0, 0, -0.22]}>
        <boxGeometry args={[0.055, 0.72, 1.1]} />
        <meshBasicMaterial color="#d9e0e4" transparent opacity={0.72} />
      </mesh>

      {/* Cabin windows */}
      {windowPositions.map((z) => (
        <mesh key={z} position={[z, 0.5, 0.67]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.18, 24]} />
          <meshPhysicalMaterial color="#b8c0c6" metalness={0.5} roughness={0.08} transparent opacity={0.88} />
        </mesh>
      ))}
      {windowPositions.map((z) => (
        <mesh key={`b-${z}`} position={[z, 0.5, -0.67]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.18, 24]} />
          <meshPhysicalMaterial color="#b8c0c6" metalness={0.5} roughness={0.08} transparent opacity={0.72} />
        </mesh>
      ))}

      {/* Main wings */}
      <mesh position={[-0.15, -0.08, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.12, 5.8, 1.22]} />
        <meshPhysicalMaterial color="#25282b" metalness={0.94} roughness={0.2} clearcoat={0.6} />
      </mesh>
      <mesh position={[-0.15, -0.08, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.1, 7.1, 0.34]} />
        <meshBasicMaterial color="#aeb6bc" transparent opacity={0.34} />
      </mesh>

      {/* Tail plane + vertical stabilizer */}
      <mesh position={[2.62, 0.12, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.09, 2.5, 0.62]} />
        <meshPhysicalMaterial color="#1d2023" metalness={0.92} roughness={0.2} />
      </mesh>
      <mesh position={[2.55, 0.86, 0]} rotation={[0, 0, -0.14]}>
        <boxGeometry args={[0.12, 1.8, 0.8]} />
        <meshPhysicalMaterial color="#0e1012" metalness={0.9} roughness={0.16} clearcoat={0.7} />
      </mesh>

      {/* Twin engines */}
      {[-1, 1].map((side) => (
        <group key={side} position={[1.62, -0.27, side * 1.18]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.48, 0.56, 1.7, 32]} />
            <meshPhysicalMaterial color="#111316" metalness={0.98} roughness={0.13} clearcoat={0.9} />
          </mesh>
          <mesh position={[0, 0, side * 0.86]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.42, 0.055, 12, 40]} />
            <meshBasicMaterial color="#e8edf0" transparent opacity={0.85} />
          </mesh>
          <mesh position={[0, 0, side * 0.89]} rotation={[Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.32, 32]} />
            <meshBasicMaterial color="#020304" />
          </mesh>
          <pointLight position={[0, 0, side * 0.94]} intensity={7} distance={3} color="#dfe9ef" />
        </group>
      ))}

      {/* Undercarriage suggestion */}
      {[-1, 1].map((side) => (
        <group key={`gear-${side}`} position={[-0.3, -0.92, side * 0.52]}>
          <mesh rotation={[0, 0, -0.2]}>
            <cylinderGeometry args={[0.035, 0.035, 0.62, 10]} />
            <meshBasicMaterial color="#c9cdd0" />
          </mesh>
          <mesh position={[0, -0.34, 0]}>
            <torusGeometry args={[0.14, 0.025, 8, 20]} />
            <meshBasicMaterial color="#d9dde0" />
          </mesh>
        </group>
      ))}

      {/* Thin brand/light accents */}
      <mesh ref={glow} position={[-0.2, -0.03, 0]} scale={[0.98, 0.02, 0.62]}>
        <sphereGeometry args={[3.3, 32, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.14} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  )
}

function Hangar() {
  const lines = useMemo(() => Array.from({ length: 20 }, (_, i) => i - 10), [])
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.6, -9]}>
        <planeGeometry args={[90, 120]} />
        <meshStandardMaterial color="#030405" roughness={0.82} metalness={0.32} />
      </mesh>

      {lines.map((i) => (
        <mesh key={`x-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[i * 1.5, -2.57, -13]}>
          <planeGeometry args={[0.008, 100]} />
          <meshBasicMaterial color="#d9dee1" transparent opacity={0.075} />
        </mesh>
      ))}
      {lines.map((i) => (
        <mesh key={`z-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.56, i * 2.5]}>
          <planeGeometry args={[90, 0.008]} />
          <meshBasicMaterial color="#d9dee1" transparent opacity={0.075} />
        </mesh>
      ))}

      {/* Architectural light bars */}
      {[-12, -8, -4, 0, 4, 8, 12].map((x) => (
        <mesh key={x} position={[x, 6.2, -19]}>
          <boxGeometry args={[0.018, 13, 0.018]} />
          <meshBasicMaterial color="#f3f5f6" transparent opacity={0.18} />
        </mesh>
      ))}
      <mesh position={[0, 10, -19]}>
        <boxGeometry args={[30, 0.018, 0.018]} />
        <meshBasicMaterial color="#f3f5f6" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

function Particles() {
  const ref = useRef<THREE.Points>(null)
  const count = 900
  const positions = useMemo(() => {
    const data = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      data[i * 3] = (Math.random() - 0.5) * 34
      data[i * 3 + 1] = (Math.random() - 0.5) * 18
      data[i * 3 + 2] = -Math.random() * 48 + 6
    }
    return data
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.008
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.01
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#dfe5e8" size={0.022} transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

function Rings() {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = state.clock.elapsedTime * 0.035
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.12
  })

  return (
    <group ref={ref} position={[0, 0.4, -10]}>
      {[4.6, 6.3, 8.1].map((radius, i) => (
        <mesh key={radius} rotation={[0.4 + i * 0.12, i * 0.2, i * 0.25]}>
          <torusGeometry args={[radius, i === 0 ? 0.018 : 0.009, 8, 180]} />
          <meshBasicMaterial color="#eef2f3" transparent opacity={0.16 - i * 0.035} />
        </mesh>
      ))}
    </group>
  )
}

function Camera() {
  const { camera } = useThree()
  const progress = useRef(0)

  useFrame((state) => {
    const p = scrollProgress()
    progress.current = THREE.MathUtils.lerp(progress.current, p, 0.045)
    const s = progress.current
    const x = state.pointer.x
    const y = state.pointer.y

    // Six cinematic camera beats mapped across the homepage.
    const hero = smooth(clamp01(s / 0.16))
    const aircraft = smooth(clamp01((s - 0.14) / 0.2))
    const atelier = smooth(clamp01((s - 0.34) / 0.2))
    const projects = smooth(clamp01((s - 0.55) / 0.2))
    const end = smooth(clamp01((s - 0.76) / 0.24))

    const targetX = THREE.MathUtils.lerp(
      THREE.MathUtils.lerp(0.55, -1.4, aircraft),
      THREE.MathUtils.lerp(-1.4, 1.6, atelier),
      atelier,
    )
    const targetY = 0.55 + y * 0.18 + aircraft * 0.65 - atelier * 0.55 + projects * 0.25
    const targetZ = 8.6 - hero * 1.8 - aircraft * 2.2 + atelier * 1.4 - projects * 1.1 - end * 1.8

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX + x * 0.55, 0.025)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.025)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.025)

    const lookX = THREE.MathUtils.lerp(0, -0.7, aircraft) + Math.sin(s * Math.PI * 2) * 0.55
    const lookY = THREE.MathUtils.lerp(0.15, 0.55, atelier) + end * 0.5
    const lookZ = -2.2 - s * 5.2
    camera.lookAt(lookX, lookY, lookZ)
  })

  return null
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#020304']} />
      <fog attach="fog" args={['#020304', 9, 44]} />
      <ambientLight intensity={0.3} />
      <hemisphereLight intensity={0.5} color="#d9e1e5" groundColor="#030303" />
      <directionalLight position={[-8, 10, 6]} intensity={5.5} color="#e8eef2" />
      <directionalLight position={[8, 4, -8]} intensity={3.2} color="#8d9ba5" />
      <spotLight position={[0, 11, 5]} angle={0.48} penumbra={1} intensity={45} distance={42} color="#eef4f7" />
      <pointLight position={[0, 1, -6]} intensity={20} distance={24} color="#d9e6ed" />
      <Camera />
      <Hangar />
      <Rings />
      <Particles />
      <Aircraft />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.7} luminanceThreshold={0.72} luminanceSmoothing={0.35} mipmapBlur />
        <Vignette darkness={0.62} eskil={false} />
      </EffectComposer>
    </>
  )
}

export default function SckWebGLScene() {
  return (
    <div className="sck-webgl" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.55, 8.6], fov: 38, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
