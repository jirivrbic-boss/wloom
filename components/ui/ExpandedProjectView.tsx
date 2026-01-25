'use client'

import { motion } from 'framer-motion'
import { X, ExternalLink, AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import type { Project } from '@/types'
import { ANIMATION_CONFIG } from '@/lib/constants'

interface ExpandedProjectViewProps {
  project: Project
  onClose: () => void
}

/**
 * ExpandedProjectView - Expanded state projektu
 * Full-screen modal s detailními informacemi a live preview v iFrame.
 * Sdílí layoutId s ProjectCard pro plynulý přechod.
 */
export default function ExpandedProjectView({ project, onClose }: ExpandedProjectViewProps) {
  const [iframeError, setIframeError] = useState(false)
  const [isIframeLoading, setIsIframeLoading] = useState(true)

  // Scroll lock při otevření
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Zavření pomocí ESC klávesy
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
    >
      {/* Backdrop - kliknutím se zavře */}
      <motion.div 
        className="absolute inset-0 bg-background/80 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal Container - Shared Element */}
      <motion.div
        layoutId={`project-container-${project.id}`}
        className="relative bg-surface/95 backdrop-blur-md rounded-2xl border border-border/50 w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        transition={ANIMATION_CONFIG.expandTransition}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-surface/80 hover:bg-surface border border-border/50 text-text-main hover:text-accent-sakura transition-colors"
          aria-label="Zavřít detail projektu"
        >
          <X size={24} />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
          <div className="p-6 md:p-8">
            {/* Header Section */}
            <div className="mb-8">
              <motion.p 
                layoutId={`project-tech-${project.id}`}
                className="text-sm font-mono text-accent-sakura/70 mb-3 tracking-wider uppercase"
              >
                {project.tech} {project.year && `• ${project.year}`}
              </motion.p>

              <motion.h1 
                layoutId={`project-title-${project.id}`}
                className="text-4xl md:text-5xl font-bold text-text-main mb-4 leading-tight"
              >
                {project.title}
              </motion.h1>

              {project.client && (
                <p className="text-text-main/60 text-lg mb-4">
                  Klient: <span className="text-text-main font-medium">{project.client}</span>
                </p>
              )}

              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent-sakura hover:text-accent-sakura/80 transition-colors"
              >
                <ExternalLink size={20} />
                <span>Otevřít živý web</span>
              </a>
            </div>

            {/* Live Preview Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-text-main mb-4">
                Live Preview
              </h2>
              
              <motion.div
                layoutId={`project-image-${project.id}`}
                className="relative w-full bg-surface/50 rounded-xl overflow-hidden border border-border/50"
                style={{ aspectRatio: '16/10' }}
              >
                {/* Browser Mockup Header */}
                <div className="absolute top-0 left-0 right-0 h-10 bg-surface/90 border-b border-border/50 flex items-center px-4 gap-2 z-10">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-xs font-mono text-text-main/50">{project.link}</span>
                  </div>
                </div>

                {/* iFrame nebo Fallback */}
                <div className="pt-10 w-full h-full">
                  {!iframeError && project.allowIframe !== false ? (
                    <>
                      {isIframeLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-surface/50">
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-8 h-8 border-2 border-accent-sakura/30 border-t-accent-sakura rounded-full animate-spin" />
                            <span className="text-sm text-text-main/60">Načítám náhled...</span>
                          </div>
                        </div>
                      )}
                      <iframe
                        src={project.link}
                        className="w-full h-full"
                        sandbox="allow-scripts allow-same-origin allow-forms"
                        loading="lazy"
                        onLoad={() => setIsIframeLoading(false)}
                        onError={() => setIframeError(true)}
                        title={`Live preview - ${project.title}`}
                      />
                    </>
                  ) : (
                    // Fallback - Screenshot nebo zpráva
                    <div className="w-full h-full flex items-center justify-center bg-surface/30">
                      {project.screenshot ? (
                        <img 
                          src={project.screenshot} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-8">
                          <AlertCircle className="w-12 h-12 text-accent-sakura/50 mx-auto mb-4" />
                          <p className="text-text-main/60">
                            Tento web blokuje vkládání do iFrame.
                          </p>
                          <a 
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-4 text-accent-sakura hover:underline"
                          >
                            Otevřít v novém okně
                            <ExternalLink size={16} />
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Project Bio Section */}
            <div className="space-y-8">
              {/* The Story */}
              {project.story && (
                <section>
                  <h2 className="text-2xl font-bold text-text-main mb-4 flex items-center gap-2">
                    <span className="text-accent-sakura">🌸</span>
                    Příběh projektu
                  </h2>
                  <p className="text-text-main/80 leading-relaxed text-lg">
                    {project.story}
                  </p>
                </section>
              )}

              {/* Requirements */}
              {project.requirements && project.requirements.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-text-main mb-4">
                    Požadavky klienta
                  </h2>
                  <ul className="space-y-3">
                    {project.requirements.map((req, index) => (
                      <li 
                        key={index}
                        className="flex items-start gap-3 text-text-main/80"
                      >
                        <span className="text-accent-sakura font-bold mt-1">✓</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Technical Details */}
              {project.technicalDetails && (
                <section>
                  <h2 className="text-2xl font-bold text-text-main mb-4">
                    Technické zpracování
                  </h2>
                  <p className="text-text-main/80 leading-relaxed mb-4">
                    {project.technicalDetails}
                  </p>
                  
                  {/* Technologies Used */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.technologies.map((tech) => (
                        <span 
                          key={tech}
                          className="px-3 py-1 text-sm font-mono bg-accent-sakura/10 text-accent-sakura rounded-full border border-accent-sakura/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Challenges */}
              {project.challenges && project.challenges.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-text-main mb-4">
                    Výzvy a řešení
                  </h2>
                  <div className="space-y-4">
                    {project.challenges.map((challenge, index) => (
                      <div 
                        key={index}
                        className="p-4 bg-surface/30 rounded-lg border border-border/30"
                      >
                        <p className="text-text-main/80">{challenge}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 183, 197, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 183, 197, 0.5);
        }
      `}</style>
    </motion.div>
  )
}
