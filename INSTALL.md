# 🚀 Instalační průvodce WLOOM Studio

## Prerekvizity

Ujisti se, že máš nainstalované:
- **Node.js** 18.17 nebo novější ([stáhnout](https://nodejs.org/))
- **npm** nebo **yarn** nebo **pnpm**

Ověř instalaci:
```bash
node --version  # Mělo by být v18.17+
npm --version   # Jakákoliv nedávná verze
```

## Krok za krokem

### 1. Instalace závislostí

V terminálu v kořenové složce projektu spusť:

```bash
npm install
```

Toto nainstaluje všechny potřebné balíčky:
- Next.js 14
- React 18
- React Three Fiber
- Three.js
- Framer Motion
- Tailwind CSS
- TypeScript
- A další...

**Očekávaná doba:** 1-3 minuty (závisí na rychlosti připojení)

### 2. Spuštění vývojového serveru

```bash
npm run dev
```

Server se spustí na `http://localhost:3000`

**Co uvidíš v terminálu:**
```
   ▲ Next.js 14.1.0
   - Local:        http://localhost:3000
   - Network:      http://192.168.x.x:3000

 ✓ Ready in 2.3s
```

### 3. Otevři v prohlížeči

Otevři [http://localhost:3000](http://localhost:3000)

**Co bys měl/a vidět:**
- 🌸 Padající růžové okvětní lístky Sakury v pozadí
- 📐 Bento Grid layout s kartami
- ✨ Hover efekty na kartách (scale + glow)
- 🌙 Dark mode estetika

## 🔧 Možné problémy a řešení

### ❌ Chyba: "Cannot find module '@react-three/fiber'"

**Řešení:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### ❌ Port 3000 je obsazený

**Řešení:**
```bash
# Spusť na jiném portu
npm run dev -- -p 3001
```

### ❌ TypeScript chyby

**Řešení:**
```bash
# Restart TypeScript serveru v editoru
# Nebo smaž .next složku
rm -rf .next
npm run dev
```

### ❌ Bílá obrazovka / JavaScript chyby

**Zkontroluj konzoli prohlížeče:**
- Otevři DevTools (F12)
- Koukni na záložku Console
- Vyhledej červené chyby

**Nejčastější řešení:**
```bash
# Vyčisti cache a rebuil
rm -rf .next
npm run dev
```

## 📦 Build pro produkci

### Lokální build
```bash
npm run build
npm start
```

### Deploy na Vercel (doporučeno)

1. Nahraj projekt na GitHub
2. Jdi na [vercel.com](https://vercel.com)
3. Klikni "New Project"
4. Importuj GitHub repository
5. Vercel automaticky detekuje Next.js a nakonfiguruje build

**Automatická konfigurace:**
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

## ⚡ Performance tips

### Vývojový režim
- První load může být pomalejší (kompilace)
- Hot Module Replacement pro rychlé změny
- React DevTools pro debugging

### Produkční režim
- Optimalizované bundle size
- Server-side rendering
- Automatické code splitting
- Image optimization

## 🎨 Customizace

### Změna barev
Uprav `tailwind.config.ts`:
```typescript
colors: {
  'accent-sakura': '#FFB7C5', // Tvoje barva
}
```

### Změna fontů
Uprav `app/layout.tsx`:
```typescript
const inter = Inter({ subsets: ['latin'] })
```

### Přidání vlastního obsahu
Uprav `app/page.tsx` - změň texty, přidej projekty, atd.

## 📚 Další kroky

1. **Prozkoumej kód** - Začni v `app/page.tsx`
2. **Experimentuj s 3D** - Otevři `components/3d/SakuraScene.tsx`
3. **Přidej vlastní projekty** - Rozšiř `projects` array
4. **Customizuj design** - Tailwind utility třídy v komponentách

## 🆘 Potřebuješ pomoc?

- 📖 [Next.js Docs](https://nextjs.org/docs)
- 🎨 [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- 💨 [Tailwind CSS](https://tailwindcss.com/docs)
- 🎭 [Framer Motion](https://www.framer.com/motion/)

---

**Užij si programování! 🌸**
