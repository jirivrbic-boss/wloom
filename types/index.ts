// Global Type Definitions

export interface Project {
  id: string
  title: string
  description: string
  tech: string
  link: string
  image?: string
  screenshot?: string
  github?: string
  featured?: boolean
  // Rozšířené informace pro detail
  story?: string
  requirements?: string[]
  technicalDetails?: string
  challenges?: string[]
  technologies?: string[]
  year?: string
  client?: string
  allowIframe?: boolean
}

export interface Service {
  icon: React.ComponentType<{ size?: number; className?: string }>
  title: string
  desc: string
  features?: string[]
}

export interface SocialLink {
  name: string
  url: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

export interface BentoCardProps {
  title?: string
  subtitle?: string
  children?: React.ReactNode
  className?: string
  span?: string
}

// 3D Types
export interface Particle {
  position: THREE.Vector3
  rotation: THREE.Euler
  speed: number
  windOffset: number
  rotationSpeed: THREE.Vector3
}

// Animation Variants
export type AnimationVariant = {
  hidden: Record<string, unknown>
  visible: Record<string, unknown>
}
