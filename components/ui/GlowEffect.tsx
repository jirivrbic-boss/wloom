'use client'

interface GlowEffectProps {
  color?: string
  intensity?: number
  className?: string
}

export default function GlowEffect({ 
  color = '#FFB7C5', 
  intensity = 0.3,
  className = '' 
}: GlowEffectProps) {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        background: `radial-gradient(circle at center, ${color}${Math.floor(intensity * 255).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
      }}
    />
  )
}
