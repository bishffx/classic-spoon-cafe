import { useEffect, useRef, useState, type MutableRefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { MathUtils, type Group } from 'three'
import { useReducedMotion } from 'framer-motion'
import { safeMedia } from '../lib/media'

function CoffeeSet({
  tilt,
  reduced,
}: {
  tilt: MutableRefObject<number>
  reduced: boolean
}) {
  const { pointer } = useThree()
  const outer = useRef<Group>(null)
  const spin = useRef<Group>(null)

  useFrame((state, delta) => {
    if (reduced) return
    const targetRX = pointer.y * 0.16
    const targetRY = pointer.x * 0.3
    const r = outer.current
    if (r) {
      r.rotation.x = MathUtils.damp(r.rotation.x, targetRX, 3, delta)
      r.rotation.y = MathUtils.damp(r.rotation.y, targetRY, 3, delta)
      tilt.current = targetRY
    }
    if (spin.current) {
      spin.current.rotation.y += delta * 0.12
    }
  })

  return (
    <group ref={outer} position={[0, -0.12, 0]}>
      <group ref={spin}>
        {/* Saucer */}
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[1.15, 1.15, 0.05, 64]} />
          <meshStandardMaterial color="#f1e2c6" roughness={0.35} metalness={0.06} />
        </mesh>
        <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.62, 1.1, 48]} />
          <meshStandardMaterial color="#e4cfa9" roughness={0.45} />
        </mesh>

        {/* Spoon */}
        <group position={[0.62, 0.07, 0.35]} rotation={[0, -0.5, -0.3]}>
          <mesh scale={[1, 0.15, 0.42]}>
            <sphereGeometry args={[0.22, 24, 24]} />
            <meshStandardMaterial color="#9aa4a6" metalness={0.85} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.06, -0.45]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.025, 0.032, 0.62, 16]} />
            <meshStandardMaterial color="#aab3b5" metalness={0.85} roughness={0.2} />
          </mesh>
        </group>

        {/* Cup body */}
        <mesh position={[0, 0.38, 0]} castShadow>
          <cylinderGeometry args={[0.52, 0.4, 0.68, 64]} />
          <meshStandardMaterial color="#f5e9d2" roughness={0.32} metalness={0.04} />
        </mesh>

        {/* Cup handle */}
        <mesh position={[0.5, 0.3, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
          <torusGeometry args={[0.17, 0.05, 16, 48]} />
          <meshStandardMaterial color="#f5e9d2" roughness={0.32} metalness={0.04} />
        </mesh>

        {/* Coffee surface */}
        <mesh position={[0, 0.725, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.485, 64]} />
          <meshStandardMaterial color="#3a2014" roughness={0.8} metalness={0.05} />
        </mesh>

        {/* Rim highlight */}
        <mesh position={[0, 0.725, 0]}>
          <torusGeometry args={[0.5, 0.018, 12, 64]} />
          <meshStandardMaterial color="#fff5e1" roughness={0.2} />
        </mesh>
      </group>
    </group>
  )
}

export default function CoffeeCup3D({ className }: { className?: string }) {
  const [ready, setReady] = useState(false)
  const reduced = useReducedMotion()
  const tilt = useRef(0)

  useEffect(() => {
    // Only render the 3D scene on desktop-sized screens with WebGL available.
    setReady(
      safeMedia('(min-width: 768px)').matches &&
        typeof WebGLRenderingContext !== 'undefined',
    )
  }, [])

  if (!ready) return null

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0.4, 3.1], fov: 38 }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 3]} intensity={1.6} castShadow />
        <pointLight position={[-3, 1, 2]} intensity={0.6} color="#ffb87a" />
        <Float speed={reduced ? 0 : 1.4} rotationIntensity={reduced ? 0 : 0.25} floatIntensity={reduced ? 0 : 0.5}>
          <CoffeeSet tilt={tilt} reduced={!!reduced} />
        </Float>
      </Canvas>
    </div>
  )
}