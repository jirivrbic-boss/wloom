'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { ANIMATION_CONFIG } from '@/lib/constants'

interface BentoCardProps {
  title?: string
  subtitle?: string
  children?: ReactNode
  className?: string
  span?: string
}

export default function BentoCard({ 
  title, 
  subtitle, 
  children, 
  className = '',
  span = ''
}: BentoCardProps) {
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden border border-white/10 rounded-lg glass-card p-6 transition-all duration-300',
        span,
        className
      )}
      whileHover={ANIMATION_CONFIG.cardHover}
      transition={ANIMATION_CONFIG.transition}
    >
      {/* Glow efekt při hoveru */}
      <motion.div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle at center, rgba(255, 183, 197, 0.05) 0%, transparent 70%)',
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
      
      {/* Obsah */}
      <div className="relative z-10">
        {subtitle && (
          <p className="text-xs font-mono text-accent-sakura/70 mb-2 tracking-wider uppercase">
            {subtitle}
          </p>
        )}
        
        {title && (
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-text-main">
            {title}
          </h3>
        )}
        
        {children}
      </div>
    </motion.div>
  )
}
