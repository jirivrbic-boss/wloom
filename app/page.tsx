'use client'

import SakuraScene from '@/components/3d/SakuraScene'
import BentoCard from '@/components/ui/BentoCard'
import ProjectGrid from '@/components/ui/ProjectGrid'
import { Mail, Code2, Box, Palette, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { PORTFOLIO_PROJECTS } from '@/lib/projects-data'

export default function Home() {

  const services = [
    { icon: Code2, title: 'Webové Stránky', desc: 'Moderní weby, které zaujmou' },
    { icon: Box, title: '3D Zážitky', desc: 'Interaktivní prostorové animace' },
    { icon: Palette, title: 'Grafický Design', desc: 'Vizuální identita značky' },
    { icon: Share2, title: 'Správa Sociálních Sítí', desc: 'Content & community management' },
  ]

  const stack = [
    'Moderní technologie', 'Rychlé načítání', 'Bezpečnost', 
    '3D animace', 'Responzivní design', 'SEO optimalizace',
    'Mobilní zařízení', 'Google Analytics', 'Hosting',
    'Správa sociálních sítí', 'Tvorba obsahu'
  ]

  return (
    <>
      {/* 3D Sakura pozadí */}
      <SakuraScene />

      {/* Hlavní obsah */}
      <main className="min-h-screen relative z-10">
        {/* Header */}
        <header className="p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-gradient-sakura">WLOOM</h1>
            <p className="text-xs font-mono text-text-main/60">v1.0.0</p>
          </motion.div>
        </header>

        {/* Bento Grid */}
        <div className="container mx-auto p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(200px,auto)]">
            
            {/* Hero Section - Span 2x2 */}
            <BentoCard 
              span="md:col-span-2 md:row-span-2"
              className="flex flex-col justify-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <h2 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
                  WLOOM
                  <br />
                  <span className="text-gradient-sakura">STUDIO</span>
                </h2>
                <p className="text-lg md:text-xl text-text-main/80 mb-6 max-w-md">
                  <strong>S námi rozkvetete online.</strong> Vytváříme moderní webové stránky, 
                  které přitahují zákazníky a pomáhají vašemu byznysu růst.
                </p>
                <p className="text-base text-text-main/70 mb-4 max-w-md">
                  Spojujeme nejnovější technologie s krásnými vizuály. Každý projekt 
                  je jako květ – vyrůstá z vašich potřeb a rozkvétá online.
                </p>
                <p className="font-mono text-sm text-accent-sakura/70">
                  🌸 Pěstujeme digitální realitu
                </p>
              </motion.div>
            </BentoCard>

            {/* About - Span 1x2 */}
            <BentoCard 
              subtitle="naše výhody"
              title="Co Nabízíme"
              span="md:col-span-1 md:row-span-2"
            >
              <div className="space-y-2">
                {stack.map((tech, i) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                    className="text-sm font-mono text-text-main/70 hover:text-accent-sakura transition-colors cursor-default"
                  >
                    ✓ {tech}
                  </motion.div>
                ))}
              </div>
            </BentoCard>

            {/* Contact - Span 1x1 */}
            <BentoCard 
              subtitle="kontakt"
              title="Napište nám"
              span="md:col-span-1 md:row-span-1"
            >
              <p className="text-sm text-text-main/70 mb-3">
                Chcete rozkvést online? Kontaktujte nás.
              </p>
              <a 
                href="mailto:info@wloom.eu"
                className="flex items-center gap-2 text-accent-sakura hover:text-accent-sakura/80 transition-colors group"
              >
                <Mail size={24} />
                <span className="text-sm group-hover:underline">
                  info@wloom.eu
                </span>
              </a>
            </BentoCard>

            {/* Services Section Header */}
            <div className="md:col-span-3 lg:col-span-4 mt-8 mb-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <p className="text-sm font-mono text-accent-sakura/70 mb-2 tracking-wider uppercase">
                  co děláme
                </p>
                <h3 className="text-3xl md:text-4xl font-bold text-text-main mb-2">
                  Naše Služby
                </h3>
                <p className="text-text-main/60 max-w-2xl">
                  Pomůžeme vašemu byznysu rozkvést online pomocí moderních technologií
                </p>
              </motion.div>
            </div>

            {/* Services Grid - 3x Cards */}
            {services.map((service, i) => (
              <BentoCard
                key={service.title}
                subtitle={`služba ${i + 1}`}
                span="md:col-span-1 md:row-span-1"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                  className="flex flex-col items-start gap-3"
                >
                  <service.icon size={32} className="text-accent-sakura" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">{service.title}</h4>
                    <p className="text-sm text-text-main/70">{service.desc}</p>
                  </div>
                </motion.div>
              </BentoCard>
            ))}

            {/* Portfolio Section Header */}
            <div className="md:col-span-3 lg:col-span-4 mt-12 mb-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <p className="text-sm font-mono text-accent-sakura/70 mb-2 tracking-wider uppercase">
                  naše práce
                </p>
                <h3 className="text-3xl md:text-4xl font-bold text-text-main mb-2">
                  Portfolio Projektů
                </h3>
                <p className="text-text-main/60 max-w-2xl mb-6">
                  Projekty, které s námi rozkvetly – klikněte na kartu pro detail
                </p>
              </motion.div>
            </div>

            {/* Portfolio Grid - Shared Element Transition */}
            <div className="md:col-span-3 lg:col-span-4">
              <ProjectGrid projects={PORTFOLIO_PROJECTS} />
            </div>

          </div>
        </div>

        {/* Footer */}
        <footer className="p-6 text-center">
          <p className="text-sm text-text-main/60 mb-2">
            Rozkvetněte s námi online 🌸
          </p>
          <p className="text-xs text-text-main/40">
            © 2026 WLOOM STUDIO — Pěstujeme digitální realitu s láskou a nejnovějšími technologiemi
          </p>
        </footer>
      </main>
    </>
  )
}
