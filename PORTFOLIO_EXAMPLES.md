# 🎨 Portfolio System - Příklady & Best Practices

## 📖 Případové studie

### 1. Minimální projekt (jen základní info)

```typescript
{
  id: 'simple-website',
  title: 'Jednoduchý Web',
  tech: 'Webová stránka',
  description: 'Základní prezentační web',
  link: 'https://example.com',
}
```

**Výsledek:**
- ✅ Zobrazí kartu s názvem a popisem
- ✅ Při kliknutí otevře detail
- ⚠️ Chybí story, requirements → zobrazí jen základní info

---

### 2. Plnohodnotný projekt (vše vyplněno)

```typescript
{
  id: 'full-featured',
  title: 'Komplexní E-shop',
  tech: 'E-commerce',
  description: 'Full-stack e-shop s admin panelem',
  link: 'https://shop.example.com',
  screenshot: '/screenshots/shop.png',
  allowIframe: true,
  year: '2025',
  client: 'Shop Inc.',
  
  story: 'Klient potřeboval modernizovat zastaralý e-shop...',
  
  requirements: [
    'Real-time inventory tracking',
    'Multi-currency support',
    'Advanced analytics dashboard',
  ],
  
  technicalDetails: 'Stack: Next.js + Node.js + PostgreSQL. Implementovali jsme mikroservisovou architekturu...',
  
  technologies: [
    'Next.js', 'React', 'Node.js', 'PostgreSQL', 
    'Redis', 'Stripe', 'Docker', 'Kubernetes'
  ],
  
  challenges: [
    'Scaling: Optimalizace pro 10k+ souběžných uživatelů',
    'Payment: Integrace 5 různých platebních bran',
    'Security: PCI DSS compliance',
  ],
}
```

**Výsledek:**
- ✅ Plně vyplněný detail
- ✅ Live preview v iFrame
- ✅ Všechny sekce zobrazeny
- ✅ Profesionální prezentace

---

### 3. Projekt s blokovaným iFrame

```typescript
{
  id: 'blocked-iframe',
  title: 'Bank Portal',
  tech: 'Finanční systém',
  description: 'Secure banking interface',
  link: 'https://bank.example.com',
  screenshot: '/screenshots/bank.png',
  allowIframe: false,  // ← Důležité!
  
  story: 'Bezpečnostní politika banky nepovoluje embedding...',
  // ... další info
}
```

**Výsledek:**
- ✅ Místo iFrame zobrazí screenshot
- ✅ "Otevřít v novém okně" CTA button
- ✅ Žádné console errors

---

## 🎯 Best Practices

### ✅ DO

#### 1. Unikátní ID
```typescript
// ✅ SPRÁVNĚ
{ id: 'bulldogo' }
{ id: 'uctarna' }
{ id: 'extroworld' }

// ❌ ŠPATNĚ
{ id: 'project' }  // Duplicita!
{ id: 'project' }  // Duplicita!
```

#### 2. Konzistentní délka popisů
```typescript
// ✅ SPRÁVNĚ - podobná délka pro vizuální konzistenci
description: 'Moderní účetní systém pro malé a střední firmy'
description: 'E-shop s real-time inventory a platební bránou'

// ⚠️ MŮŽE BÝT LEPŠÍ
description: 'Web'  // Moc krátký
description: 'Velmi dlouhý popis, který zabírá několik řádků a narušuje layout gridu protože je příliš dlouhý...'  // Moc dlouhý
```

#### 3. High-quality screenshoty
```typescript
// ✅ SPRÁVNĚ
screenshot: '/screenshots/bulldogo.png'  // 1200x800px, optimalizovaný

// ⚠️ OPTIMALIZUJ
screenshot: '/screenshots/bulldogo-original-5mb.png'  // 5MB!
```

#### 4. Strukturovaný obsah
```typescript
// ✅ SPRÁVNĚ
story: 'Klient XYZ potřeboval řešit problém A. Naším cílem bylo vytvořit B, které umožní C.'

// ❌ ŠPATNĚ
story: 'Udělali jsme web.'  // Moc obecné
```

---

### ❌ DON'T

#### 1. Duplicitní ID
```typescript
// ❌ NIKDY
const projects = [
  { id: 'proj1', title: 'A' },
  { id: 'proj1', title: 'B' },  // Animace nebude fungovat!
]
```

#### 2. Chybějící fallback
```typescript
// ❌ ŠPATNĚ - web blokuje iframe, ale nemáme screenshot
{
  link: 'https://blocked-site.com',
  allowIframe: true,  // Zkusí načíst, selže
  screenshot: undefined,  // Nemá fallback!
}

// ✅ SPRÁVNĚ
{
  link: 'https://blocked-site.com',
  allowIframe: false,
  screenshot: '/screenshots/fallback.png',  // Fallback ready
}
```

#### 3. Prázdné pole
```typescript
// ⚠️ ZBYTEČNÉ
requirements: [],  // Prázdné pole se stejně nezobrazí

// ✅ LEPŠÍ
requirements: undefined,  // Nebo vynechej property úplně
```

---

## 🎨 Styling Customization

### Změna barev

```tsx
// components/ui/ProjectCard.tsx

// Původní sakura theme
className="text-accent-sakura"

// Vlastní barva
className="text-blue-500"
```

### Změna spring animace

```typescript
// lib/constants.ts

// Pomalejší, plynulejší
expandTransition: {
  type: 'spring',
  stiffness: 200,  // ← Snížení = pomalejší
  damping: 35,     // ← Zvýšení = více tlumení
}

// Rychlejší, energičtější
expandTransition: {
  type: 'spring',
  stiffness: 400,  // ← Zvýšení = rychlejší
  damping: 25,     // ← Snížení = méně tlumení
}
```

### Změna velikosti modalu

```tsx
// components/ui/ExpandedProjectView.tsx

// Původní
className="max-w-6xl"  // 1152px

// Menší
className="max-w-4xl"  // 896px

// Větší
className="max-w-7xl"  // 1280px

// Full width
className="max-w-full"
```

---

## 🔧 Advanced Use Cases

### 1. Filtrace podle kategorie

```tsx
function FilteredPortfolio() {
  const [filter, setFilter] = useState<string | null>(null)
  
  const filtered = filter
    ? PORTFOLIO_PROJECTS.filter(p => p.tech === filter)
    : PORTFOLIO_PROJECTS
  
  return (
    <>
      <div className="mb-6 flex gap-2">
        <button onClick={() => setFilter(null)}>Vše</button>
        <button onClick={() => setFilter('E-shop')}>E-shopy</button>
        <button onClick={() => setFilter('Webová aplikace')}>Aplikace</button>
      </div>
      
      <ProjectGrid projects={filtered} />
    </>
  )
}
```

### 2. Search

```tsx
function SearchablePortfolio() {
  const [search, setSearch] = useState('')
  
  const results = PORTFOLIO_PROJECTS.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  )
  
  return (
    <>
      <input
        type="text"
        placeholder="Hledat projekty..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full px-4 py-2 rounded-lg"
      />
      
      <ProjectGrid projects={results} />
    </>
  )
}
```

### 3. Lazy Loading s IntersectionObserver

```tsx
function LazyProjectGrid({ projects }: { projects: Project[] }) {
  const [visible, setVisible] = useState(6)  // Počáteční počet
  const loadMoreRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && visible < projects.length) {
          setVisible(prev => prev + 6)
        }
      },
      { threshold: 0.1 }
    )
    
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }
    
    return () => observer.disconnect()
  }, [visible, projects.length])
  
  return (
    <>
      <ProjectGrid projects={projects.slice(0, visible)} />
      <div ref={loadMoreRef} className="h-20" />
    </>
  )
}
```

---

## 🎭 Animační Varianty

### Fade + Scale (alternativa k spring)

```tsx
// ProjectCard.tsx - nahraď whileHover
whileHover={{ 
  scale: 1.05,
  opacity: 0.9,
}}
transition={{ duration: 0.2 }}
```

### Stagger Children

```tsx
// ProjectGrid.tsx - přidej stagger efekt
<motion.div
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1  // Karty se objeví postupně
      }
    }
  }}
  initial="hidden"
  animate="show"
>
  {projects.map((project) => (
    <motion.div
      key={project.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
    >
      <ProjectCard project={project} onClick={() => setSelectedId(project.id)} />
    </motion.div>
  ))}
</motion.div>
```

---

## 📊 Data Management

### Načítání z API

```typescript
// lib/api.ts
export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch('/api/projects')
  return res.json()
}

// app/portfolio/page.tsx
export default async function PortfolioPage() {
  const projects = await fetchProjects()
  return <ProjectGrid projects={projects} />
}
```

### CMS Integrace (Contentful)

```typescript
import { createClient } from 'contentful'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

export async function getProjects(): Promise<Project[]> {
  const entries = await client.getEntries({
    content_type: 'project'
  })
  
  return entries.items.map(item => ({
    id: item.sys.id,
    title: item.fields.title as string,
    tech: item.fields.tech as string,
    // ... mapuj další fields
  }))
}
```

---

## 🧪 Testing

### Visual Regression Test

```typescript
// __tests__/ProjectCard.test.tsx
import { render } from '@testing-library/react'
import ProjectCard from '@/components/ui/ProjectCard'

test('renders project card', () => {
  const project = {
    id: 'test',
    title: 'Test Project',
    tech: 'Web App',
    description: 'Test description',
    link: 'https://test.com',
  }
  
  const { getByText } = render(
    <ProjectCard project={project} onClick={() => {}} />
  )
  
  expect(getByText('Test Project')).toBeInTheDocument()
})
```

---

## 🚀 Deployment Checklist

- [ ] Všechny projekty mají unikátní ID
- [ ] Screenshoty jsou optimalizované (< 200KB)
- [ ] allowIframe je správně nastaveno
- [ ] Build prochází bez errors (`npm run build`)
- [ ] Responzivita testována na mobile
- [ ] Animace fungují hladce
- [ ] ESC/backdrop zavírání funguje
- [ ] Scroll lock funguje správně

---

**💡 Tip:** Začni s jednoduchými projekty a postupně přidávej detaily podle potřeby!
