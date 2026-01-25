# 🌸 Shared Element Transition - Quick Start

## Co bylo implementováno

Kompletní systém pro **expandující portfolio karty** s plynulými Framer Motion transitions mezi collapsed a expanded stavy.

### 🎯 Klíčové Features

✅ **Shared Element Transitions** - Plynulé přechody mezi kartou a detailním oknem  
✅ **Live Preview** - iFrame s mockupem prohlížeče a fallback řešením  
✅ **Biografické detaily** - Příběh, požadavky, technické zpracování, výzvy  
✅ **Scroll Lock** - Zamykání scrollu při otevřeném modalu  
✅ **Multiple close options** - ESC klávesa, X tlačítko, backdrop click  
✅ **Responsive design** - Optimalizováno pro mobile i desktop  
✅ **TypeScript** - Plně typovaný kód  
✅ **Custom scrollbar** - Stylovaný scrollbar v sakura barvách  

---

## 📁 Vytvořené soubory

### Komponenty
```
components/ui/
├── ProjectCard.tsx           # Collapsed state karty
├── ExpandedProjectView.tsx   # Expanded full-screen modal
└── ProjectGrid.tsx           # Wrapper s state managementem
```

### Data & Types
```
lib/
└── projects-data.ts          # 6 ukázkových projektů s detaily

types/
└── index.ts                  # Rozšířený Project interface
```

### Assets
```
public/screenshots/
├── bulldogo.png
├── uctarna.png
├── extroworld.png
├── podlahy.png
├── ejdry.png
└── rajmazlicku.png
```

### Dokumentace
```
PORTFOLIO_SYSTEM.md           # Kompletní technická dokumentace
SHARED_ELEMENT_QUICKSTART.md  # Tento soubor
```

---

## 🚀 Jak to funguje

### 1. State Management

```tsx
// ProjectGrid.tsx
const [selectedId, setSelectedId] = useState<string | null>(null)
```

- Kliknutí na kartu → nastaví `selectedId`
- Zavření → `selectedId = null`

### 2. Shared Elements

Každý element, který se má animovat, má **shodné `layoutId`**:

```tsx
// V ProjectCard.tsx (collapsed)
<motion.div layoutId={`project-container-${project.id}`}>
  <motion.h3 layoutId={`project-title-${project.id}`}>
    {project.title}
  </motion.h3>
</motion.div>

// V ExpandedProjectView.tsx (expanded) 
<motion.div layoutId={`project-container-${project.id}`}>
  <motion.h1 layoutId={`project-title-${project.id}`}>
    {project.title}
  </motion.h1>
</motion.div>
```

### 3. Spring Animace

```tsx
// lib/constants.ts
expandTransition: {
  type: 'spring',
  stiffness: 300,  // Rychlost pružiny
  damping: 30,     // Útlum pro smooth ending
}
```

---

## 🎨 Použití

### Základní integrace (již implementováno)

```tsx
import { ProjectGrid } from '@/components/ui'
import { PORTFOLIO_PROJECTS } from '@/lib/projects-data'

<ProjectGrid projects={PORTFOLIO_PROJECTS} />
```

### Přidání nového projektu

1. Otevři `lib/projects-data.ts`
2. Přidej nový projekt do pole:

```typescript
{
  id: 'nove-portfolio',              // UNIKÁTNÍ ID!
  title: 'Nové Portfolio',
  tech: 'Web App',
  description: 'Krátký popis projektu',
  link: 'https://example.com',
  screenshot: '/screenshots/nove.png',
  allowIframe: true,                 // true = zobrazí live preview
  year: '2025',
  client: 'Klient XYZ',
  
  // Detailní informace
  story: 'Příběh jak projekt vznikl...',
  requirements: [
    'Požadavek 1',
    'Požadavek 2',
  ],
  technicalDetails: 'Technické zpracování...',
  technologies: ['Next.js', 'React', 'TypeScript'],
  challenges: [
    'Výzva 1',
    'Výzva 2',
  ],
}
```

3. Přidej screenshot do `public/screenshots/`

---

## 🎬 Animační Flow

```
1. USER klikne na ProjectCard
   ↓
2. onClick() nastaví selectedId
   ↓
3. AnimatePresence detekuje změnu
   ↓
4. Framer Motion najde shodné layoutId
   ↓
5. FLIP technika vypočítá transformaci
   ↓
6. Spring animace = plynulý přechod
   ↓
7. ExpandedProjectView se zobrazí
   ↓
8. Scroll na body = locked
```

**Zavření:**
```
1. USER zavře (ESC/X/backdrop)
   ↓
2. onClose() nastaví selectedId = null
   ↓
3. AnimatePresence trigger exit
   ↓
4. Zpětná spring animace
   ↓
5. Scroll unlock
```

---

## 📱 Responzivita

### Mobile (< 768px)
- Modal zabírá 100% viewport
- Padding redukován
- Browser mockup kompaktnější

### Desktop
- Modal max-width: 6xl (1152px)
- Komfortní padding
- Čitelná šířka textu

---

## 🎯 Live Preview System

### iFrame s fallbackem

```tsx
{!iframeError && project.allowIframe !== false ? (
  <iframe
    src={project.link}
    sandbox="allow-scripts allow-same-origin allow-forms"
    loading="lazy"
    onError={() => setIframeError(true)}
  />
) : (
  // Fallback - screenshot nebo zpráva
  <img src={project.screenshot} />
)}
```

### Kdy použít `allowIframe: false`?

Některé weby blokují embedding (`X-Frame-Options: DENY`). Pokud víš, že web blokuje iFrame, nastav `allowIframe: false` a poskytni screenshot.

---

## 🐛 Debugging

### Animace nefunguje
- ✅ Zkontroluj, že `layoutId` je **identické** v obou stavech
- ✅ Ujisti se, že project má **unikátní `id`**

### iFrame se nenačítá
- ✅ Zkontroluj `allowIframe` property
- ✅ Otevři console - některé weby blokují embedding
- ✅ Poskytni fallback screenshot

### Scroll není locked
- ✅ Zkontroluj, že `useEffect` v `ExpandedProjectView` běží
- ✅ Console: `document.body.style.overflow` by mělo být `'hidden'`

---

## 🎓 Proč Spring místo CSS?

### CSS Transition
```css
transition: all 0.3s ease-in-out;
```
- ❌ Omezené options (duration, easing)
- ❌ Nepřirozený pocit
- ❌ Těžké kombinovat position + size změny

### Framer Motion Spring
```tsx
transition={{ type: 'spring', stiffness: 300, damping: 30 }}
```
- ✅ Fyzikální simulace pružiny
- ✅ Organický, přirozený pocit
- ✅ Automatická FLIP optimalizace
- ✅ Lepší handling position + size changes

---

## 🚦 Next Steps

### Možná rozšíření

1. **Filtrace projektů** - podle tech kategorie
2. **Search** - vyhledávání v projektech
3. **Pagination** - pro velké množství projektů
4. **Related projects** - doporučené projekty
5. **Share buttons** - sdílení na sociální sítě
6. **Gallery lightbox** - více screenshotů projektu
7. **Video preview** - místo iFrame

### Performance optimalizace

1. **Image optimization** - Next.js Image komponenta
2. **Lazy load** - data pouze pro viditelné karty
3. **Virtual scrolling** - pro stovky projektů
4. **Prefetch** - přednahrání dat při hoveru

---

## 📚 Zdroje

- [Framer Motion Docs](https://www.framer.com/motion/)
- [layoutId Documentation](https://www.framer.com/motion/layout-animations/)
- [FLIP Technique](https://aerotwist.com/blog/flip-your-animations/)

---

## ✅ Checklist

- [x] TypeScript typy pro Project
- [x] ProjectCard komponenta
- [x] ExpandedProjectView komponenta
- [x] ProjectGrid wrapper
- [x] State management
- [x] AnimatePresence integrace
- [x] Scroll lock
- [x] ESC key handler
- [x] Backdrop close
- [x] Live Preview iFrame
- [x] Fallback handling
- [x] Browser mockup
- [x] Responzivní layout
- [x] Custom scrollbar
- [x] 6 ukázkových projektů
- [x] Screenshot placeholders
- [x] Kompletní dokumentace
- [x] Build test

---

**🎉 Systém je připraven k použití!**

Spusť dev server:
```bash
npm run dev
```

Otevři: `http://localhost:3000`

Klikni na jakoukoliv kartu projektu a užij si plynulou animaci! 🌸
