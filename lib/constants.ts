// Application Constants

export const SITE_CONFIG = {
  name: 'Wloom Studio',
  tagline: 'S Námi Rozkvetete Online',
  description: 'Vytváříme moderní webové stránky, které přitahují zákazníky a pomáhají vašemu byznysu růst. Každý projekt je jako květ – vyrůstá z vašich potřeb a rozkvétá online.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@wloom.studio',
} as const

export const SAKURA_CONFIG = {
  particleCount: 200,
  fallSpeed: { min: 0.01, max: 0.03 },
  windStrength: 0.02,
  resetHeight: 20,
  minHeight: -5,
  color: '#FFB7C5',
  opacity: 0.8,
} as const

export const ANIMATION_CONFIG = {
  cardHover: {
    scale: 1.02,
    borderColor: 'rgba(255, 183, 197, 0.5)',
  },
  transition: {
    type: 'spring',
    stiffness: 300,
    damping: 20,
  },
} as const

export const TECH_STACK = [
  'Next.js 14',
  'React',
  'TypeScript',
  'Three.js',
  'React Three Fiber',
  'Framer Motion',
  'Tailwind CSS',
  'GLSL',
  'WebGL',
  'Node.js',
] as const

export const ROUTES = {
  home: '/',
  // Připrav pro budoucí stránky
  // projects: '/projects',
  // about: '/about',
  // contact: '/contact',
} as const
