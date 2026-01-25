# 🌸 Portfolio Shared Element Transition System

## Přehled

Robustní systém pro zobrazení portfolia projektů s plynulými **Shared Element Transitions** mezi collapsed (karta) a expanded (detailní okno) stavem. Postavený na React, Framer Motion a Tailwind CSS.

---

## 🏗️ Architektura

### Komponentová struktura

```
components/ui/
├── ProjectGrid.tsx          # Wrapper - spravuje state a AnimatePresence
├── ProjectCard.tsx          # Collapsed state - náhled v gridu
└── ExpandedProjectView.tsx  # Expanded state - full-screen modal s detailem
```

### Data Layer

```
lib/
└── projects-data.ts         # Centralizovaná data projektů

types/
└── index.ts                 # TypeScript typy pro Project interface
```

---

## 🎨 Klíčové Komponenty

### 1. ProjectGrid

**Odpovědnost:**
- State management pro `selectedId`
- Orchestrace Shared Element Transition
- AnimatePresence pro plynulé vstupy/výstupy

**Props:**
```typescript
interface ProjectGridProps {
  projects: Project[]
}
```

**Použití:**
```tsx
import { ProjectGrid } from '@/components/ui'
import { PORTFOLIO_PROJECTS } from '@/lib/projects-data'

<ProjectGrid projects={PORTFOLIO_PROJECTS} />
```

---

### 2. ProjectCard

**Odpovědnost:**
- Zobrazení náhledu projektu v grid layoutu
- `layoutId` pro Shared Element Transition
- Hover efekty a interakce

**Klíčové prvky s layoutId:**
- `project-container-${id}` - container karty
- `project-title-${id}` - nadpis projektu
- `project-tech-${id}` - tech kategorie
- `project-image-${id}` - screenshot/obrázek

**Props:**
```typescript
interface ProjectCardProps {
  project: Project
  onClick: () => void
}
```

---

### 3. ExpandedProjectView

**Odpovědnost:**
- Full-screen modal s detailními informacemi
- Live Preview v iFrame s mockupem prohlížeče
- Scroll lock na body
- Zavírání pomocí ESC, tlačítka nebo kliknutí na backdrop

**Sekce:**
- **Live Preview** - iFrame v browser mockupu s fallbackem
- **Příběh projektu** - Geneze a kontext
- **Požadavky klienta** - Seznam specifikací
- **Technické zpracování** - Detailní rozbor technologií
- **Výzvy a řešení** - Implementační challenges

**Props:**
```typescript
interface ExpandedProjectViewProps {
  project: Project
  onClose: () => void
}
```

---

## 🎬 Animační Systém

### Konfigurace

```typescript
// lib/constants.ts
export const ANIMATION_CONFIG = {
  expandTransition: {
    type: 'spring',
    stiffness: 300,  // Organický pocit
    damping: 30,      // Smooth ending
  },
}
```

### Jak to funguje

1. **Kliknutí na kartu** → State `selectedId` se nastaví
2. **layoutId matching** → Framer Motion najde shodné layoutId
3. **FLIP technika** → Vypočítá start/end pozice
4. **Spring animace** → Plynulá transformace mezi stavy
5. **AnimatePresence** → Smooth exit při zavření

---

## 📊 Datová Struktura

### Project Interface

```typescript
export interface Project {
  id: string                    // Unikátní identifikátor
  title: string                 // Název projektu
  tech: string                  // Kategorie (Webová aplikace, E-shop, atd.)
  description: string           // Krátký popis
  link: string                  // URL živého webu
  screenshot?: string           // Path ke screenshotu
  allowIframe?: boolean         // Povolení vkládání do iFrame
  year?: string                 // Rok realizace
  client?: string               // Název klienta
  
  // Detailní informace
  story?: string                // Příběh projektu
  requirements?: string[]       // Seznam požadavků
  technicalDetails?: string     // Technický popis
  challenges?: string[]         // Výzvy při implementaci
  technologies?: string[]       // Použité technologie
}
```

### Příklad dat

```typescript
{
  id: 'bulldogo',
  title: 'Bulldogo.cz',
  tech: 'Webová aplikace',
  description: 'Platforma pro inzerci služeb',
  link: 'https://bulldogo.cz',
  screenshot: '/screenshots/bulldogo.png',
  allowIframe: false,
  year: '2024',
  client: 'Bulldogo s.r.o.',
  story: 'Bulldogo vzniklo z potřeby...',
  requirements: [
    'Intuitivní rozhraní',
    'Pokročilé vyhledávání',
  ],
  technicalDetails: 'Aplikace byla postavena...',
  technologies: ['Next.js', 'React', 'PostgreSQL'],
  challenges: [
    'Optimalizace full-text search',
    'Real-time notifikace',
  ],
}
```

---

## 🎯 UX Features

### Responzivita

- **Mobile (< 768px):** Modal 100% šířky a výšky
- **Desktop:** Max-width pro čitelnost textu

### Interakce

- ✅ Zavření tlačítkem X
- ✅ Zavření kliknutím na backdrop
- ✅ Zavření klávesou ESC
- ✅ Scroll lock při otevřeném modalu
- ✅ Hover efekty na kartách

### Live Preview

- iFrame v mockupu prohlížeče
- `sandbox="allow-scripts allow-same-origin allow-forms"`
- `loading="lazy"` pro performance
- Fallback při blokování iFrame
- Loading spinner během načítání

---

## 🔧 Implementační Detaily

### Scroll Lock

```typescript
useEffect(() => {
  document.body.style.overflow = 'hidden'
  return () => {
    document.body.style.overflow = 'unset'
  }
}, [])
```

### ESC Key Handling

```typescript
useEffect(() => {
  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }
  window.addEventListener('keydown', handleEsc)
  return () => window.removeEventListener('keydown', handleEsc)
}, [onClose])
```

### iFrame Error Handling

```typescript
const [iframeError, setIframeError] = useState(false)

<iframe
  onLoad={() => setIsIframeLoading(false)}
  onError={() => setIframeError(true)}
/>
```

---

## 🎨 Styling

### Custom Scrollbar

```css
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 183, 197, 0.3);
  border-radius: 4px;
}
```

### Glow Effect

```tsx
<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
  <div className="absolute inset-0 bg-gradient-to-br from-accent-sakura/10" />
</div>
```

---

## 📱 Použití

### 1. Základní integrace

```tsx
import { ProjectGrid } from '@/components/ui'
import { PORTFOLIO_PROJECTS } from '@/lib/projects-data'

export default function PortfolioPage() {
  return (
    <div className="container mx-auto p-6">
      <h1>Naše projekty</h1>
      <ProjectGrid projects={PORTFOLIO_PROJECTS} />
    </div>
  )
}
```

### 2. Vlastní data

```tsx
const customProjects: Project[] = [
  {
    id: 'my-project',
    title: 'Můj Projekt',
    tech: 'Web App',
    description: 'Krátký popis',
    link: 'https://example.com',
    story: 'Příběh projektu...',
  },
]

<ProjectGrid projects={customProjects} />
```

---

## 🚀 Performance

### Optimalizace

- ✅ Lazy loading iFrames
- ✅ AnimatePresence pro smooth transitions
- ✅ Conditional rendering expanded view
- ✅ Spring animace místo CSS transitions (lepší performance)
- ✅ Click outside optimization pomocí stopPropagation

---

## 🎓 Vzdělávací Poznámky

### Proč layoutId?

`layoutId` je klíčový prop Framer Motion, který říká: "Tento element a jiný element se stejným layoutId jsou stejná věc v různých stavech." Motion pak automaticky vypočítá FLIP animaci.

### FLIP Technika

**F**irst → **L**ast → **I**nvert → **P**lay

1. Zaznamenej pozici elementu před změnou (First)
2. Zaznamenej pozici po změně (Last)
3. Invertuj transform, aby element vypadal jako First (Invert)
4. Animuj zpět do Last pozice (Play)

### Spring vs. Tween

**Spring** (náš výběr):
- Organický, přírodní pocit
- Simuluje fyziku pružiny
- Parametry: stiffness, damping

**Tween** (alternativa):
- Lineární nebo eased interpolace
- Parametry: duration, ease

---

## 🐛 Troubleshooting

### Problem: Animace "skáče"

**Řešení:** Ujisti se, že všechny elementy se stejným layoutId mají konzistentní strukturu DOM.

### Problem: iFrame se nenačítá

**Řešení:** Některé weby blokují embedding. Nastav `allowIframe: false` a použij fallback screenshot.

### Problem: Scroll nefunguje v modalu

**Řešení:** Zkontroluj `max-h-[90vh]` a `overflow-y-auto` na správném wrapperu.

---

## 🌟 Best Practices

1. **Vždy používej unikátní ID** pro projekty
2. **Sdílej layoutId** mezi collapsed a expanded stavy
3. **Optimalizuj obrázky** - screenshot by měl být ve vysoké kvalitě
4. **Testuj na mobilech** - shared element transitions mají různé chování
5. **Poskytni fallback** pro iFrame blokování
6. **Piš sémantický HTML** - správné heading hierarchy (H1 → H2 → H3)

---

## 📚 Další Zdroje

- [Framer Motion layoutId](https://www.framer.com/motion/layout-animations/)
- [FLIP Animations Explained](https://aerotwist.com/blog/flip-your-animations/)
- [React Three Fiber Integration](https://docs.pmnd.rs/react-three-fiber)

---

**Vytvořeno s 🌸 v WLOOM STUDIO**
