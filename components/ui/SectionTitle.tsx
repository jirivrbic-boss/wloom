'use client'

import { motion } from 'framer-motion'

interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
}

export default function SectionTitle({ 
  title, 
  subtitle, 
  align = 'left' 
}: SectionTitleProps) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align]

  return (
    <motion.div
      className={`mb-8 ${alignClass}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {subtitle && (
        <p className="text-sm font-mono text-accent-sakura/70 mb-2 tracking-wider uppercase">
          &lt;{subtitle}&gt;
        </p>
      )}
      <h2 className="text-4xl md:text-5xl font-bold text-gradient-sakura">
        {title}
      </h2>
    </motion.div>
  )
}
