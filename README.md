```
██╗    ██╗██╗      ██████╗  ██████╗ ███╗   ███╗
██║    ██║██║     ██╔═══██╗██╔═══██╗████╗ ████║
██║ █╗ ██║██║     ██║   ██║██║   ██║██╔████╔██║
██║███╗██║██║     ██║   ██║██║   ██║██║╚██╔╝██║
╚███╔███╔╝███████╗╚██████╔╝╚██████╔╝██║ ╚═╝ ██║
 ╚══╝╚══╝ ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝     ╚═╝
       
🌸 S T U D I O  -  We Cultivate Digital Reality
```

# S Námi Rozkvetete Online 🌸

Portfolio web pro kreativní studio s 3D animacemi sakurových květů a moderním designem, který zaujme všechny generace.

## ✨ Funkce

- 🌸 **3D Sakura Animace** - 200 padajících okvětních lístků vytváří živé pozadí
- 📐 **Moderní Vzhled** - Elegantní mřížkový layout, který funguje všude
- 🌙 **Temný Design** - Šetrný k očím s průhlednými efekty
- ⚡ **Rychlé Načítání** - Optimalizováno pro maximální výkon
- 🎭 **Plynulé Animace** - Vše se hýbe hladce a přirozeně
- 💎 **Bezpečný Kód** - Vytvořeno s důrazem na kvalitu a bezpečnost
- 🎬 **Shared Element Transitions** - Portfolio s expandujícími kartami projektů

## 🆕 Nově Přidáno: Portfolio System

**Expanzivní karty projektů s plynulými transitions!**

- ✅ Klikací karty projektů v grid layoutu
- ✅ Full-screen detailní okno s biografií
- ✅ Live Preview v iFrame mockupu prohlížeče
- ✅ Spring animace (stiffness: 300, damping: 30)
- ✅ Multiple close options (ESC, X, backdrop)
- ✅ Scroll lock při otevřeném modalu
- ✅ 6 ukázkových projektů s detailními informacemi

**📚 Kompletní dokumentace:**
- 👉 **START_HERE.md** - Rychlý start
- 📖 **DOCS_INDEX.md** - Index všech dokumentů
- 🎬 **DEMO_GUIDE.md** - Visual walkthrough
- 📘 **SHARED_ELEMENT_QUICKSTART.md** - Quick reference
- 🏗️ **ARCHITECTURE.md** - Diagramy & flow

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Jazyk:** TypeScript
- **Styling:** Tailwind CSS
- **3D Engine:** React Three Fiber + Three.js
- **Animace:** Framer Motion (s layoutId)
- **Ikony:** Lucide React
- **Fonty:** Inter + JetBrains Mono

## 🚀 Instalace a spuštění

```bash
# Instalace závislostí
npm install

# Spuštění dev serveru
npm run dev

# Build pro produkci
npm run build

# Spuštění produkční verze
npm start
```

Otevři [http://localhost:3000](http://localhost:3000) v prohlížeči.

## 📁 Struktura projektu

```
wloom/
├── app/
│   ├── layout.tsx          # Root layout s fonty
│   ├── page.tsx            # Hlavní stránka s Bento Grid + Portfolio
│   └── globals.css         # Globální styly a utility třídy
├── components/
│   ├── 3d/
│   │   └── SakuraScene.tsx # Procedurální 3D scéna
│   └── ui/
│       ├── BentoCard.tsx   # Znovupoužitelná karta
│       ├── ProjectGrid.tsx # Portfolio grid wrapper (NOVÝ)
│       ├── ProjectCard.tsx # Collapsed project card (NOVÝ)
│       └── ExpandedProjectView.tsx # Expanded modal (NOVÝ)
├── lib/
│   ├── constants.ts        # Konfigurace (včetně animací)
│   ├── projects-data.ts    # 6 ukázkových projektů (NOVÝ)
│   └── utils.ts            # Utility funkce
├── types/
│   └── index.ts            # TypeScript interfaces
├── public/
│   └── screenshots/        # Project screenshots (NOVÝ)
├── tailwind.config.ts      # Tailwind konfigurace
├── tsconfig.json           # TypeScript konfigurace
└── 📚 Dokumentace (8 souborů)
    ├── START_HERE.md       # ← Začni zde!
    ├── DOCS_INDEX.md       # Index dokumentace
    ├── DEMO_GUIDE.md       # Visual walkthrough
    ├── SHARED_ELEMENT_QUICKSTART.md
    ├── PORTFOLIO_SYSTEM.md
    ├── ARCHITECTURE.md
    ├── PORTFOLIO_EXAMPLES.md
    └── IMPLEMENTATION_COMPLETE.md
```

## 🎨 Design System

### Barvy
- `bg-void`: #050505 - Hlavní pozadí
- `card-glass`: rgba(20, 20, 20, 0.6) - Glassmorphism karty
- `text-main`: #EDEDED - Hlavní text
- `accent-sakura`: #FFB7C5 - Accent barva

### Typografie
- **Sans:** Inter - Hlavní font pro text
- **Mono:** JetBrains Mono - Pro tagy, data, technické popisky

## 🌸 Klíčové komponenty

### SakuraScene
Procedurální 3D scéna s padajícími okvětními lístky:
- 200 instanceovaných částic pro optimální výkon
- Sinusový pohyb simulující vítr
- Automatický reset pozice pro nekonečnou smyčku
- `position: fixed` s `z-index: -1` - nepřekáží interakci

### BentoCard
Znovupoužitelná karta s interaktivními efekty:
- Glassmorphism background
- Hover scale + border glow efekt
- Responzivní grid span
- Framer Motion animace

### Portfolio System (NOVÝ 🎉)
Expanzivní systém pro portfolio projektů:

**ProjectGrid**
- State management (selectedId)
- AnimatePresence orchestration
- Grid layout wrapper

**ProjectCard**
- Collapsed state view
- Hover efekty s glow
- layoutId pro transitions

**ExpandedProjectView**
- Full-screen modal
- Live Preview iFrame s browser mockupem
- Biografické sekce (story, requirements, tech details, challenges)
- Multiple close options (ESC, X, backdrop)
- Scroll lock

**Klíčové features:**
- ✅ Shared Element Transitions pomocí layoutId
- ✅ Spring physics (stiffness: 300, damping: 30)
- ✅ FLIP technique automaticky
- ✅ iFrame preview s fallbackem
- ✅ Responsive design
- ✅ Custom scrollbar

## 📝 Poznámky

- **Glassmorphism:** Karty jsou průhledné, aby byla vidět Sakura v pozadí
- **Performance:** InstancedMesh místo jednotlivých mesh objektů
- **SEO:** Metadata v layout.tsx
- **Accessibility:** Semantic HTML a ARIA labels

## 🔧 Customizace

### Změna počtu částic
V `components/3d/SakuraScene.tsx`:
```typescript
const count = 200 // Změň na požadovaný počet
```

### Úprava barev
V `tailwind.config.ts`:
```typescript
colors: {
  'accent-sakura': '#FFB7C5', // Tvá barva
}
```

## 📦 Deployment

### Vercel (doporučeno)
```bash
vercel
```

### Jiné platformy
```bash
npm run build
# Deploy /out složku
```

## 📄 Licence

© 2026 WLOOM STUDIO - Cultivated with React Three Fiber & Next.js

---

**Made with 🌸 by Wloom Studio**
