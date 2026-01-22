'use client'

import { motion } from 'framer-motion'

interface TechBadgeProps {
  name: string
  delay?: number
}

export default function TechBadge({ name, delay = 0 }: TechBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.05 }}
      className="inline-flex items-center px-3 py-1 rounded-full bg-accent-sakura/10 border border-accent-sakura/30 text-accent-sakura text-sm font-mono hover:bg-accent-sakura/20 transition-colors cursor-default"
    >
      {name}
    </motion.span>
  )
}
