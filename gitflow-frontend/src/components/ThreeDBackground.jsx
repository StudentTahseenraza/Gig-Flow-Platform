import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Float, MeshWobbleMaterial } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function FloatingCube({ position, color, speed }) {
  const meshRef = useRef()

  useEffect(() => {
    const animate = () => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.01 * speed
        meshRef.current.rotation.y += 0.01 * speed
      }
      requestAnimationFrame(animate)
    }
    animate()
  }, [speed])

  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1, 1, 1]} />
        <MeshWobbleMaterial
          color={color}
          speed={1}
          factor={0.6}
        />
      </mesh>
    </Float>
  )
}

function ParticleField() {
  const particlesRef = useRef()
  const count = 1000

  useEffect(() => {
    const particles = particlesRef.current
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 50
      positions[i + 1] = (Math.random() - 0.5) * 50
      positions[i + 2] = (Math.random() - 0.5) * 50

      colors[i] = Math.random() * 0.5 + 0.5 // R
      colors[i + 1] = Math.random() * 0.5 + 0.5 // G
      colors[i + 2] = Math.random() * 0.5 + 0.5 // B
    }

    particles.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particles.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  }, [])

  return (
    <points ref={particlesRef}>
      <bufferGeometry />
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export default function ThreeDBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#b967ff" />
        
        <FloatingCube position={[-5, 2, 0]} color="#00f3ff" speed={0.5} />
        <FloatingCube position={[5, -2, 0]} color="#b967ff" speed={0.7} />
        <FloatingCube position={[0, 5, -5]} color="#ff00ff" speed={0.9} />
        
        <ParticleField />
        <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Animated grid overlay */}
      <div className="absolute inset-0 bg-cyber-grid bg-[length:50px_50px] opacity-10" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-dark/50 to-cyber-dark" />
    </div>
  )
}