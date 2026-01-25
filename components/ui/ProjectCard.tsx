'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/types'
import { ANIMATION_CONFIG } from '@/lib/constants'

interface ProjectCardProps {
  project: Project
  onClick: () => void
}

/**
 * ProjectCard - Collapsed state karty projektu
 * Komponenta zobrazuje náhled projektu v grid layoutu.
 * Využívá layoutId pro plynulý přechod do expanded stavu.
 */
export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.div
      layoutId={`project-container-${project.id}`}
      onClick={onClick}
      className="relative bg-surface/30 backdrop-blur-sm rounded-2xl border border-border/50 p-6 cursor-pointer group overflow-hidden"
      whileHover={{ 
        scale: 1.02,
        borderColor: 'rgba(255, 183, 197, 0.5)',
      }}
      transition={ANIMATION_CONFIG.transition}
    >
      {/* Glow efekt při hoveru */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-sakura/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10">
        {/* Subtitle - Tech kategorie */}
        <motion.p 
          layoutId={`project-tech-${project.id}`}
          className="text-xs font-mono text-accent-sakura/70 mb-2 tracking-wider uppercase"
        >
          {project.tech}
        </motion.p>

        {/* Title - Název projektu */}
        <motion.h3 
          layoutId={`project-title-${project.id}`}
          className="text-xl font-bold text-text-main mb-3"
        >
          {project.title}
        </motion.h3>

        {/* Screenshot/Image Preview */}
        {project.screenshot && (
          <motion.div
            layoutId={`project-image-${project.id}`}
            className="w-full h-40 mb-4 rounded-lg overflow-hidden bg-surface/50"
          >
            <img 
              src={project.screenshot} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Description */}
        <motion.p 
          className="text-sm text-text-main/70 mb-4 line-clamp-2"
        >
          {project.description}
        </motion.p>

        {/* CTA */}
        <div className="flex items-center gap-1 text-accent-sakura text-sm group-hover:gap-2 transition-all">
          <span>Zobrazit detail</span>
          <ArrowUpRight size={16} />
        </div>
      </div>
    </motion.div>
  )
}
