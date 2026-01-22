'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { SAKURA_CONFIG } from '@/lib/constants'

// Komponenta pro instanceované padající okvětní lístky
function SakuraPetals() {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const count = SAKURA_CONFIG.particleCount
  
  // Inicializace pozic a rychlostí částic
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 30,
          Math.random() * 20 + 5,
          (Math.random() - 0.5) * 15
        ),
        rotation: new THREE.Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ),
        speed: Math.random() * (SAKURA_CONFIG.fallSpeed.max - SAKURA_CONFIG.fallSpeed.min) + SAKURA_CONFIG.fallSpeed.min,
        windOffset: Math.random() * Math.PI * 2,
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05
        ),
      })
    }
    return temp
  }, [])

  // Animační smyčka
  useFrame((state) => {
    if (!meshRef.current) return
    
    const time = state.clock.getElapsedTime()
    const matrix = new THREE.Matrix4()
    
    particles.forEach((particle, i) => {
      // Padání dolů
      particle.position.y -= particle.speed
      
      // Sinusový pohyb do stran (vítr)
      const windX = Math.sin(time + particle.windOffset) * SAKURA_CONFIG.windStrength
      particle.position.x += windX
      
      // Reset pozice nahoře když spadne dolu
      if (particle.position.y < SAKURA_CONFIG.minHeight) {
        particle.position.y = SAKURA_CONFIG.resetHeight
        particle.position.x = (Math.random() - 0.5) * 30
      }
      
      // Rotace
      particle.rotation.x += particle.rotationSpeed.x
      particle.rotation.y += particle.rotationSpeed.y
      particle.rotation.z += particle.rotationSpeed.z
      
      // Aplikace transformace
      matrix.makeRotationFromEuler(particle.rotation)
      matrix.setPosition(particle.position)
      meshRef.current.setMatrixAt(i, matrix)
    })
    
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {/* Jednoduchá geometrie okvětního lístku */}
      <planeGeometry args={[0.3, 0.5]} />
      <meshBasicMaterial 
        color={SAKURA_CONFIG.color} 
        side={THREE.DoubleSide}
        transparent
        opacity={SAKURA_CONFIG.opacity}
      />
    </instancedMesh>
  )
}

// Hlavní Canvas komponenta
export default function SakuraScene() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <SakuraPetals />
      </Canvas>
    </div>
  )
}
