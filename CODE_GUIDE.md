# 👨‍💻 Code Guide - WLOOM Studio

Komplexní průvodce pro vývojáře, kteří chtějí projekt rozšiřovat nebo customizovat.

---

## 📐 Architektura

### Component Pattern

```typescript
// ✅ SPRÁVNĚ - Client Component s props interface
'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MyComponentProps {
  title: string
  optional?: boolean
}

export default function MyComponent({ title, optional }: MyComponentProps) {
  return (
    <motion.div className={cn('base-class', optional && 'optional-class')}>
      {title}
    </motion.div>
  )
}
```

### Kdy použít 'use client'

```typescript
// ✅ POTŘEBUJEŠ 'use client' když:
- Používáš useState, useEffect, hooks
- Používáš event listeners (onClick, etc.)
- Používáš browser APIs (window, document)
- Používáš Framer Motion
- Používáš React Three Fiber

// ✅ NEPOTŘEBUJEŠ 'use client' když:
- Pure static content
- Server-side data fetching
- Metadata exports
- Layout s dětmi
```

---

## 🎨 Styling Patterns

### Tailwind Utility Pattern

```typescript
// ✅ SPRÁVNĚ - Použij cn() pro podmínkové třídy
import { cn } from '@/lib/utils'

const className = cn(
  'base-classes',
  isActive && 'active-classes',
  isPrimary ? 'primary-classes' : 'secondary-classes',
  customClassName
)
```

### Custom Utilities (globals.css)

```css
/* Přidej vlastní utility třídy */
@layer utilities {
  .my-custom-effect {
    /* CSS zde */
  }
}
```

### Glassmorphism Template

```typescript
<div className="glass-card border border-white/10 rounded-lg p-6">
  {/* Obsah */}
</div>

// Nebo custom:
<div 
  className="backdrop-blur-glass border border-white/10"
  style={{ background: 'rgba(20, 20, 20, 0.6)' }}
>
  {/* Obsah */}
</div>
```

---

## 🎭 Animation Patterns

### Framer Motion - Basic

```typescript
import { motion } from 'framer-motion'

// Fade in
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {children}
</motion.div>

// Hover effect
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 300 }}
>
  {children}
</motion.div>
```

### Stagger Children

```typescript
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

<motion.div variants={container} initial="hidden" animate="show">
  {items.map(item => (
    <motion.div key={item.id} variants={item}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

---

## 🎮 3D Patterns

### Přidání Nového 3D Objektu

```typescript
'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function My3DObject() {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state, delta) => {
    // Animace logika
    meshRef.current.rotation.x += delta
  })
  
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#FFB7C5" />
    </mesh>
  )
}

export default function MyScene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <My3DObject />
    </Canvas>
  )
}
```

### Optimalizace - InstancedMesh

```typescript
function Particles({ count = 100 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  
  useEffect(() => {
    const matrix = new THREE.Matrix4()
    for (let i = 0; i < count; i++) {
      matrix.setPosition(
        Math.random() * 10 - 5,
        Math.random() * 10 - 5,
        Math.random() * 10 - 5
      )
      meshRef.current.setMatrixAt(i, matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [count])
  
  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.1]} />
      <meshBasicMaterial color="#FFB7C5" />
    </instancedMesh>
  )
}
```

---

## 📦 Přidání Nové Stránky

### 1. Vytvoř složku v app/

```bash
mkdir app/projects
```

### 2. Vytvoř page.tsx

```typescript
// app/projects/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projekty | Wloom Studio',
  description: 'Naše kreativní projekty',
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen p-6">
      <h1 className="text-5xl font-bold text-gradient-sakura mb-8">
        Projekty
      </h1>
      {/* Obsah */}
    </main>
  )
}
```

### 3. Přidaj do konstant

```typescript
// lib/constants.ts
export const ROUTES = {
  home: '/',
  projects: '/projects', // ← Přidej
}
```

### 4. Přidaj do sitemap

```typescript
// app/sitemap.ts
{
  url: `${baseUrl}/projects`,
  lastModified: new Date(),
  changeFrequency: 'weekly',
  priority: 0.8,
}
```

---

## 🔧 Utility Patterns

### Přidání Nové Utility Funkce

```typescript
// lib/utils.ts

/**
 * Clamp number mezi min a max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Format číslo s tisícovými oddělovači
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('cs-CZ').format(num)
}
```

### Přidání Nové Konstanty

```typescript
// lib/constants.ts

export const MY_CONFIG = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  itemsPerPage: 12,
  animationDuration: 300,
} as const

// Použití:
import { MY_CONFIG } from '@/lib/constants'
console.log(MY_CONFIG.apiUrl)
```

---

## 🎯 Data Fetching Patterns

### Server Component (Recommended)

```typescript
// app/projects/page.tsx

async function getProjects() {
  const res = await fetch('https://api.example.com/projects', {
    next: { revalidate: 3600 } // Cache 1 hodinu
  })
  return res.json()
}

export default async function ProjectsPage() {
  const projects = await getProjects()
  
  return (
    <div>
      {projects.map(project => (
        <div key={project.id}>{project.title}</div>
      ))}
    </div>
  )
}
```

### Client Component (Interactive)

```typescript
'use client'

import { useState, useEffect } from 'react'

export default function InteractiveProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data)
        setLoading(false)
      })
  }, [])
  
  if (loading) return <LoadingSpinner />
  
  return (
    <div>
      {projects.map(project => (
        <div key={project.id}>{project.title}</div>
      ))}
    </div>
  )
}
```

---

## 🎨 Vytvoření Nové UI Komponenty

### Template

```typescript
// components/ui/MyComponent.tsx
'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MyComponentProps {
  title: string
  description?: string
  variant?: 'primary' | 'secondary'
  className?: string
  children?: React.ReactNode
}

export default function MyComponent({
  title,
  description,
  variant = 'primary',
  className,
  children
}: MyComponentProps) {
  return (
    <motion.div
      className={cn(
        'base-styles',
        variant === 'primary' && 'primary-styles',
        variant === 'secondary' && 'secondary-styles',
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h3 className="text-2xl font-bold">{title}</h3>
      {description && <p className="text-text-main/70">{description}</p>}
      {children}
    </motion.div>
  )
}
```

### Přidej do barrel export

```typescript
// components/ui/index.ts
export { default as MyComponent } from './MyComponent'
```

### Použití

```typescript
import { MyComponent } from '@/components/ui'

<MyComponent 
  title="Nadpis" 
  description="Popisek"
  variant="primary"
  className="mb-4"
>
  <p>Další obsah</p>
</MyComponent>
```

---

## 🔍 Type Patterns

### Vytvoření Nového Type

```typescript
// types/index.ts

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  publishedAt: Date
  author: Author
  tags: string[]
}

export interface Author {
  name: string
  avatar?: string
  bio?: string
}

// Type guards
export function isBlogPost(obj: any): obj is BlogPost {
  return (
    typeof obj === 'object' &&
    'id' in obj &&
    'title' in obj &&
    'slug' in obj
  )
}
```

---

## 🎨 Tailwind Customizace

### Přidání Custom Barvy

```typescript
// tailwind.config.ts
colors: {
  'my-blue': '#1E40AF',
  'my-gradient-start': '#FFB7C5',
  'my-gradient-end': '#FF8FA3',
}
```

### Přidání Custom Animace

```typescript
// tailwind.config.ts
animation: {
  'spin-slow': 'spin 3s linear infinite',
  'bounce-slow': 'bounce 2s infinite',
}

keyframes: {
  // Vlastní keyframes
  wiggle: {
    '0%, 100%': { transform: 'rotate(-3deg)' },
    '50%': { transform: 'rotate(3deg)' },
  }
}
```

---

## 🚀 Performance Tips

### 1. Lazy Loading

```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false // Disable SSR pokud nepotřebuješ
})
```

### 2. Image Optimization

```typescript
import Image from 'next/image'

<Image
  src="/project.jpg"
  alt="Project"
  width={800}
  height={600}
  priority // Pro above-the-fold images
  placeholder="blur" // Blur effect při načítání
/>
```

### 3. Memoization

```typescript
import { useMemo, useCallback } from 'react'

// Expensive calculation
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b)
}, [a, b])

// Callback stabilization
const handleClick = useCallback(() => {
  doSomething(id)
}, [id])
```

---

## 🐛 Debugging Tips

### React DevTools

```bash
# Instaluj browser extension
# Chrome: React Developer Tools
# Firefox: React Developer Tools
```

### Console Logging

```typescript
// ✅ SPRÁVNĚ - Strukturované logování
console.log('[MyComponent] Data:', { data, loading, error })

// ❌ ŠPATNĚ - Nejasné logy
console.log(data)
```

### TypeScript Debugging

```typescript
// Zjisti typ proměnné
type MyType = typeof myVariable

// Assertni typ
const value = unknownValue as MyExpectedType

// Type guard
if (isBlogPost(data)) {
  // TypeScript ví, že data je BlogPost
  console.log(data.title)
}
```

---

## 📝 Best Practices

### ✅ DO

```typescript
// Používej TypeScript pro vše
interface Props { ... }

// Používej konstanty místo magic numbers
const ITEMS_PER_PAGE = 12

// Používaj barrel exports
export { MyComponent } from './MyComponent'

// Používej cn() pro class merge
className={cn('base', conditional && 'extra')}

// Komentuj komplex logiku
// Calculate particle position based on time offset
const x = Math.sin(time + offset) * radius
```

### ❌ DON'T

```typescript
// Nepoužívej any
const data: any = fetchData() // ❌

// Nepoužívaj inline styles pokud to není nutné
<div style={{ color: 'red' }}> // ❌ Use Tailwind

// Nevkládej velké objekty do state
const [huge] = useState(megaObject) // ❌ Use useMemo

// Neignoruj TypeScript chyby
// @ts-ignore // ❌ Fix the actual issue
```

---

## 🔐 Environment Variables

### Přidání Nové Proměnné

```bash
# .env.local (create this file)
NEXT_PUBLIC_API_URL=http://localhost:3001
DATABASE_URL=postgres://...
API_SECRET_KEY=secret123
```

### Použití

```typescript
// Public (dostupné v browseru)
const apiUrl = process.env.NEXT_PUBLIC_API_URL

// Private (pouze server-side)
const secret = process.env.API_SECRET_KEY
```

---

## 🧪 Testing Pattern (Připraveno)

### Instalace Testing Tools

```bash
npm install -D @testing-library/react @testing-library/jest-dom jest
```

### Test Template

```typescript
// __tests__/BentoCard.test.tsx
import { render, screen } from '@testing-library/react'
import BentoCard from '@/components/ui/BentoCard'

describe('BentoCard', () => {
  it('renders title correctly', () => {
    render(<BentoCard title="Test Title" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })
})
```

---

## 📚 Užitečné Linky

- [Next.js Docs](https://nextjs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Happy Coding! 🌸**

Pro otázky nebo problémy, viz ostatní dokumentace nebo konzultuj kód - je plný příkladů!
