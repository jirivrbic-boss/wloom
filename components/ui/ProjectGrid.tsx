'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { Project } from '@/types'
import ProjectCard from './ProjectCard'
import ExpandedProjectView from './ExpandedProjectView'

interface ProjectGridProps {
  projects: Project[]
}

/**
 * ProjectGrid - Wrapper pro seznam projektů
 * Spravuje state pro vybraný projekt a orchestruje Shared Element Transition.
 * AnimatePresence umožňuje plynulé animace vstupu/výstupu.
 */
export default function ProjectGrid({ projects }: ProjectGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // Najdi vybraný projekt
  const selectedProject = projects.find(p => p.id === selectedId)

  return (
    <>
      {/* Grid Layout - Collapsed State */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => setSelectedId(project.id)}
          />
        ))}
      </div>

      {/* Expanded State - Full-screen Modal */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <ExpandedProjectView
            project={selectedProject}
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
