# 🌸 Portfolio Shared Element Transition - Demo Guide

## 🎬 Live Demo Workflow

Tento dokument tě provede **step-by-step** použitím nového portfolio systému.

---

## 📍 Krok 1: Navigace na stránku

1. Dev server běží na: `http://localhost:3000`
2. Otevři v prohlížeči
3. Scrolluj dolů do sekce **"Portfolio Projektů"**

**Co vidíš:**
- Grid layout se 6 kartami projektů
- Každá karta má:
  - Tech kategorii (nahoře)
  - Název projektu (bold)
  - Screenshot preview
  - Krátký popis
  - "Zobrazit detail" CTA

---

## 📍 Krok 2: Hover efekt

1. Najdi kartu **"Bulldogo.cz"**
2. Pohni myší nad kartu (hover)

**Co se stane:**
- ✨ Karta se lehce zvětší (`scale: 1.02`)
- ✨ Border změní barvu na sakura pink
- ✨ Jemný glow gradient se objeví
- ✨ "Zobrazit detail" arrow se posune doprava

**Technicky:**
```tsx
whileHover={{ 
  scale: 1.02,
  borderColor: 'rgba(255, 183, 197, 0.5)',
}}
```

---

## 📍 Krok 3: Kliknutí na kartu

1. Klikni na **"Bulldogo.cz"** kartu
2. Sleduj animaci!

**Co se děje (frame by frame):**

### Frame 1: Click triggered
```
selectedId změněno z null → "bulldogo"
```

### Frame 2-10: Expansion (spring animation)
```
Container:
  - Position: grid position → center screen
  - Size: card size → full-screen modal
  - Border radius: 1rem → 1rem (preserved)

Title:
  - Font size: text-xl → text-5xl
  - Tag: h3 → h1
  - Position: morphs with container

Screenshot:
  - Size: 160px height → full browser mockup
  - Position: morphs smoothly
```

### Frame 11: Fully Expanded
```
Modal je plně otevřený:
  - Backdrop blur viditelný
  - Scroll locked na body
  - Close button (X) visible
  - Content scrollable
```

**Fyzika:**
- Spring stiffness: 300 (rychlost)
- Spring damping: 30 (smooth ending)
- Duration: ~500-700ms (závislé na distance)

---

## 📍 Krok 4: Prozkoumání detailu

Modal obsahuje několik sekcí. Scrolluj dolů:

### 🎯 Header Section
- **Tech kategorie** (morphovaná z karty)
- **Rok** ("2024")
- **Název projektu** (morphovaný H1)
- **Klient** ("Bulldogo s.r.o.")
- **External link** (otevře web v novém okně)

### 🖥️ Live Preview Section
- **Browser mockup header**
  - 3 dot buttons (red, yellow, green)
  - URL bar s linkem
- **iFrame nebo Fallback**
  - Pro Bulldogo: Fallback (allowIframe: false)
  - Screenshot zobrazený
  - "Otevřít v novém okně" button

### 📖 Bio Sections

#### 1. Příběh projektu 🌸
```
"Bulldogo vzniklo z potřeby vytvořit transparentní 
platformu, kde se poskytovatelé služeb mohou prezentovat 
a zákazníci snadno najít to, co potřebují..."
```

#### 2. Požadavky klienta ✓
- Intuitivní rozhraní
- Pokročilé vyhledávání
- Responzivní design
- Rychlé načítání
- Systém hodnocení

#### 3. Technické zpracování
```
"Aplikace byla postavena s důrazem na výkon a 
škálovatelnost. Použili jsme React pro dynamické 
uživatelské rozhraní..."
```

**Technology badges:**
```
[Next.js] [React] [TypeScript] [PostgreSQL] 
[Redis] [Node.js] [Tailwind CSS]
```

#### 4. Výzvy a řešení
- Optimalizace full-text search
- Real-time notifikace
- Škálování databáze

---

## 📍 Krok 5: Zavření modalu

Zkus všechny 3 způsoby:

### Metoda 1: ESC klávesa
1. Stiskni `ESC` na klávesnici
2. Modal se zavře
3. Spring animace zpět do card view

### Metoda 2: X tlačítko
1. Najdi `X` vpravo nahoře
2. Klikni na něj
3. Modal se zavře

### Metoda 3: Backdrop click
1. Klikni kamkoliv mimo bílý modal
2. Na rozmazané tmavé pozadí
3. Modal se zavře

**Co se stane při zavření:**
```
1. selectedId → null
2. AnimatePresence detects removal
3. Exit animation (reverse spring)
4. Elements morph zpět do card pozic
5. Modal unmount
6. Body scroll unlock
```

---

## 📍 Krok 6: Zkus další projekty

### Projekt s Live Preview: Účtárna
1. Zavři aktuální modal
2. Klikni na **"Účtárna"** kartu
3. Tento projekt má `allowIframe: true`

**Co se liší:**
- ✅ iFrame se načte (loading spinner)
- ✅ Živý web uvnitř mockupu
- ✅ Můžeš interagovat s webem (omezené sandbox)

### Projekt s 3D tématikou: Extroworld
1. Klikni na **"Extroworld"**
2. Všimni si odlišného contentu
3. Technologie: Three.js, GSAP, WebGL

### E-shop projekt: Ráj mazlíčků
1. Klikni na **"Ráj mazlíčků"**
2. Nejnovější projekt (2025)
3. Kompletní e-shop stack

---

## 📍 Krok 7: Mobile Testing

1. Otevři Chrome DevTools (`F12`)
2. Klikni na **Toggle Device Toolbar** (Ctrl+Shift+M)
3. Vyber "iPhone 12 Pro" nebo podobné

**Co se změní:**
- Grid: 3 columns → 1 column
- Modal: Max-width → 100% viewport
- Padding: Redukován pro malé obrazovky
- Browser mockup: Kompaktnější header

**Zkus:**
- Kliknutí na kartu (touch simulation)
- Scroll v modalu
- Zavření modalu

---

## 🎨 Krok 8: Inspect Animations

### Chrome DevTools Method

1. Otevři DevTools (`F12`)
2. Klikni na **Performance** tab
3. Klikni na ⚫ **Record**
4. Klikni na kartu projektu
5. Sleduj expanzi
6. Stop recording
7. Analyzuj timeline

**Co hledat:**
- 🟢 **Smooth 60fps** - zelená linka
- 🟡 **Layout shifts** - minimální
- 🟢 **GPU acceleration** - transform properties

### Framer Motion DevTools

1. V kódu dočasně přidej:
```tsx
// components/ui/ProjectCard.tsx
<motion.div
  layoutId={`project-container-${project.id}`}
  debug  // ← Přidej toto
>
```

2. Otevři console
3. Uvidíš animation debug info

---

## 🔧 Krok 9: Customize Animation

### Experiment 1: Rychlejší animace

1. Otevři: `lib/constants.ts`
2. Změň:
```typescript
expandTransition: {
  type: 'spring',
  stiffness: 400,  // ← Bylo: 300
  damping: 25,     // ← Bylo: 30
}
```
3. Refresh browser
4. Klikni na kartu
5. Animace je rychlejší a energičtější

### Experiment 2: Pomalejší, plynulejší

```typescript
expandTransition: {
  type: 'spring',
  stiffness: 200,  // ← Sníženo
  damping: 35,     // ← Zvýšeno
}
```
→ Animace je pomalejší a smooth

### Experiment 3: Bounce effect

```typescript
expandTransition: {
  type: 'spring',
  stiffness: 500,  // ← Velmi vysoké
  damping: 20,     // ← Nízké
}
```
→ Viditelný "bounce" na konci

---

## 🎯 Krok 10: Add Your Own Project

### Quick Add

1. Otevři: `lib/projects-data.ts`

2. Na konec pole přidej:
```typescript
{
  id: 'test-project',
  title: 'Testovací Projekt',
  tech: 'Demo',
  description: 'Můj vlastní projekt pro test',
  link: 'https://google.com',
  screenshot: '/screenshots/bulldogo.png',  // Reuse existing
  allowIframe: true,
  story: 'Tohle je můj testovací projekt!',
  requirements: ['Test requirement 1'],
  technicalDetails: 'Test tech details',
  technologies: ['React', 'Fun'],
},
```

3. Ulož soubor
4. Browser auto-refresh
5. Scrolluj dolů
6. Tvůj projekt je tam! 🎉

---

## 📊 Performance Metrics

### Expected Results

**Lighthouse Scores** (aproximace):
- Performance: 90-95
- Accessibility: 95-100
- Best Practices: 95-100
- SEO: 90-95

**Animation Performance:**
- FPS: 60fps (stable)
- Frame drops: < 5%
- Layout shifts: Minimal (FLIP technique)

**Load Times:**
- Initial load: < 2s
- Time to interactive: < 3s
- Modal open: ~500ms

---

## 🐛 Common Issues & Solutions

### Issue 1: Animace není plynulá

**Možné příčiny:**
- GPU není aktivovaná
- Příliš mnoho re-renderů
- Slow device

**Řešení:**
```tsx
// Přidej will-change CSS
className="will-change-transform"
```

### Issue 2: Modal se neotevírá

**Debug steps:**
1. Console (`F12`) - hledej errors
2. Zkontroluj `selectedId` state:
```tsx
console.log('Selected:', selectedId)
```
3. Verify `project.id` existuje

### Issue 3: iFrame se nezobrazí

**Normální!** Některé weby blokují embedding.

**Řešení:**
```typescript
allowIframe: false  // V project data
```

---

## ✅ Testing Checklist

Po každé změně otestuj:

- [ ] Karta se dá kliknout
- [ ] Hover efekt funguje
- [ ] Animace je smooth (60fps)
- [ ] Modal se otevře
- [ ] Content je scrollable
- [ ] ESC zavře modal
- [ ] X button zavře modal
- [ ] Backdrop zavře modal
- [ ] Scroll je locked při otevřeném modalu
- [ ] Scroll se unlock po zavření
- [ ] iFrame nebo fallback zobrazí
- [ ] Responsivní na mobile
- [ ] Všechny sekce se zobrazí

---

## 🎓 Advanced Demo

### Multi-Project Workflow

1. Otevři **Bulldogo** → Prozkoumej
2. Zavři pomocí **ESC**
3. Ihned otevři **Účtárna**
4. Sleduj plynulý transition
5. Zavři **backdrop click**
6. Otevři **Extroworld**
7. Zavři **X button**

**Všimni si:**
- Každý transition je smooth
- Žádné flash nebo glitch
- State je konzistentní
- Memory leaks: žádné

---

## 🎉 Demo Complete!

Gratulujeme! Prošel jsi celým workflow.

**Co jsi viděl:**
✅ Shared Element Transitions v akci  
✅ Spring physics animace  
✅ FLIP technique  
✅ State management  
✅ Multiple close options  
✅ Responsive design  
✅ Live Preview system  
✅ Biografické sekce  

**Next steps:**
1. Přečti `SHARED_ELEMENT_QUICKSTART.md`
2. Experimentuj s animačními parametry
3. Přidej vlastní projekty
4. Customizuj styling

---

**🌸 Užij si animace! - WLOOM STUDIO**
