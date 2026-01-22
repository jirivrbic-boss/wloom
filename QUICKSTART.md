# ⚡ Quick Start Guide - WLOOM Studio

## 🏃‍♂️ 30 Second Setup

```bash
# 1. Instalace
npm install

# 2. Spuštění
npm run dev

# 3. Otevři prohlížeč
# http://localhost:3000
```

**Hotovo!** 🎉 Měl/a bys vidět padající sakura pozadí a Bento Grid layout.

---

## 🎯 První Kroky

### 1. Změň Obsah Hero Sekce

Otevři `app/page.tsx` a najdi:

```typescript
<h2 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
  WLOOM
  <br />
  <span className="text-gradient-sakura">STUDIO</span>
</h2>
```

Změň na své jméno/značku!

### 2. Přidej Své Projekty

Ve stejném souboru najdi `projects` array:

```typescript
const projects = [
  {
    title: 'Tvůj Projekt',
    tech: 'React, Three.js',
    description: 'Popis projektu...',
  },
  // Přidej další...
]
```

### 3. Uprav Kontaktní Email

V `lib/constants.ts`:

```typescript
export const SITE_CONFIG = {
  email: 'tvuj@email.cz', // Změň zde
}
```

### 4. Sociální Odkazy

V `app/page.tsx`, sekce header:

```typescript
<a href="https://github.com/tvuj-username" ... >
  <Github size={20} />
</a>
```

---

## 🎨 Customizace

### Barvy

`tailwind.config.ts`:

```typescript
colors: {
  'accent-sakura': '#FFB7C5', // Tvoje barva!
}
```

### Počet Částic

`lib/constants.ts`:

```typescript
export const SAKURA_CONFIG = {
  particleCount: 200, // Sniž pro lepší FPS
}
```

### Rychlost Padání

```typescript
fallSpeed: { min: 0.01, max: 0.03 }, // Zpomal/zrychli
```

---

## 📁 Kam Co Patří

```
├── app/page.tsx           → Hlavní obsah
├── components/ui/         → UI komponenty
├── components/3d/         → 3D scéna
├── lib/constants.ts       → Všechny konstanty
└── tailwind.config.ts     → Design tokens
```

---

## 🐛 Troubleshooting

### Bílá Obrazovka?
```bash
rm -rf .next
npm run dev
```

### 3D Nefunguje?
Zkontroluj konzoli (F12). WebGL musí být podporován.

### Pomalé?
Sniž `particleCount` v `lib/constants.ts`.

---

## 🚀 Deploy na Vercel

```bash
# 1. Push na GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin [url]
git push -u origin main

# 2. Jdi na vercel.com
# 3. Import repository
# 4. Deploy! (automatická konfigurace)
```

---

## 💡 Pro Tips

1. **Dev Tools**: `F12` → Console pro debug
2. **Hot Reload**: Změny se aplikují automaticky
3. **Type Safety**: TypeScript ti poradí v editoru
4. **Components**: Všechny jsou reusable
5. **Performance**: Chrome DevTools → Performance tab

---

## 📚 Další Dokumentace

- **Kompletní Features**: `FEATURES.md`
- **Instalace**: `INSTALL.md`
- **README**: `README.md`

---

**Happy Coding! 🌸**

Potřebuješ pomoc? Koukni do kódu - je plný komentářů!
