'use client'

import { motion } from 'framer-motion'
import { X, ExternalLink, AlertCircle } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
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
  const iframeTimeoutRef = useRef<NodeJS.Timeout>()

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

  // Timeout pro iFrame loading (pokud se nenačte do 10s, ukáže fallback)
  useEffect(() => {
    if (project.allowIframe !== false && !iframeError) {
      iframeTimeoutRef.current = setTimeout(() => {
        if (isIframeLoading) {
          console.log(`iFrame timeout pro ${project.title} - zobrazuji fallback`)
          setIframeError(true)
        }
      }, 10000) // 10 sekund timeout
    }
    
    return () => {
      if (iframeTimeoutRef.current) {
        clearTimeout(iframeTimeoutRef.current)
      }
    }
  }, [project.allowIframe, project.title, isIframeLoading, iframeError])

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
                className="relative w-full bg-surface/50 rounded-2xl md:rounded-xl overflow-hidden border border-border/50 aspect-[9/16] md:aspect-[16/10]"
              >
                {/* Browser Mockup Header */}
                <div className="absolute top-0 left-0 right-0 h-8 md:h-10 bg-surface/90 border-b border-border/50 flex items-center px-2 md:px-4 gap-2 z-10">
                  <div className="flex gap-1.5 md:gap-2 flex-shrink-0">
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500/60" />
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500/60" />
                  </div>
                  <div className="flex-1 text-center overflow-hidden">
                    <span className="text-[10px] md:text-xs font-mono text-text-main/50 truncate block">{project.link}</span>
                  </div>
                </div>

                {/* iFrame nebo Fallback */}
                <div className="pt-8 md:pt-10 w-full h-full relative">
                  {!iframeError && project.allowIframe !== false ? (
                    <>
                      {isIframeLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-surface/50 z-20">
                          <div className="flex flex-col items-center gap-2 md:gap-3 px-4">
                            <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-accent-sakura/30 border-t-accent-sakura rounded-full animate-spin" />
                            <span className="text-xs md:text-sm text-text-main/60 text-center">Načítám živý náhled...</span>
                          </div>
                        </div>
                      )}
                      {!isIframeLoading && !iframeError && (
                        <div className="absolute top-10 md:top-12 right-1 md:right-2 z-20 bg-green-500/90 text-white text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-full flex items-center gap-1">
                          <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full animate-pulse" />
                          <span className="hidden sm:inline">Živý web</span>
                          <span className="sm:hidden">Live</span>
                        </div>
                      )}
                      <iframe
                        src={project.link}
                        className="w-full h-full"
                        sandbox="allow-scripts allow-same-origin allow-forms"
                        loading="lazy"
                        onLoad={() => {
                          setIsIframeLoading(false)
                          if (iframeTimeoutRef.current) {
                            clearTimeout(iframeTimeoutRef.current)
                          }
                          console.log(`✅ iFrame načten úspěšně: ${project.title}`)
                        }}
                        onError={() => {
                          console.log(`❌ iFrame error: ${project.title}`)
                          setIframeError(true)
                          if (iframeTimeoutRef.current) {
                            clearTimeout(iframeTimeoutRef.current)
                          }
                        }}
                        title={`Live preview - ${project.title}`}
                      />
                    </>
                  ) : (
                    // Fallback - Screenshot nebo zpráva
                    <div className="w-full h-full flex items-center justify-center bg-surface/30 relative">
                      {project.screenshot ? (
                        <>
                          <img 
                            src={project.screenshot} 
                            alt={project.title}
                            className="w-full h-full object-contain"
                          />
                          <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 bg-surface/95 backdrop-blur-sm border border-border/50 rounded-lg p-2 md:p-3">
                            <div className="flex items-start gap-1.5 md:gap-2">
                              <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-accent-sakura/70 flex-shrink-0 mt-0.5" />
                              <div className="min-w-0">
                                <p className="text-xs md:text-sm text-text-main/80 mb-1">
                                  Web blokuje živý náhled
                                </p>
                                <a 
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[10px] md:text-xs text-accent-sakura hover:underline"
                                >
                                  <span className="truncate">Otevřít v novém okně</span>
                                  <ExternalLink className="flex-shrink-0" size={10} />
                                </a>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="text-center p-4 md:p-8">
                          <AlertCircle className="w-8 h-8 md:w-12 md:h-12 text-accent-sakura/50 mx-auto mb-3 md:mb-4" />
                          <p className="text-sm md:text-base text-text-main/60 mb-3 md:mb-4">
                            Web blokuje vkládání do iFrame.
                          </p>
                          <a 
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm md:text-base text-accent-sakura hover:underline"
                          >
                            Otevřít v novém okně
                            <ExternalLink className="flex-shrink-0" size={16} />
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
