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

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Jazyk:** TypeScript
- **Styling:** Tailwind CSS
- **3D Engine:** React Three Fiber + Three.js
- **Animace:** Framer Motion
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
│   ├── page.tsx            # Hlavní stránka s Bento Grid
│   └── globals.css         # Globální styly a utility třídy
├── components/
│   ├── 3d/
│   │   └── SakuraScene.tsx # Procedurální 3D scéna
│   └── ui/
│       └── BentoCard.tsx   # Znovupoužitelná karta
├── tailwind.config.ts      # Tailwind konfigurace
└── tsconfig.json          # TypeScript konfigurace
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
