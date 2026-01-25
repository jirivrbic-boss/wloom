# 🔧 Fix: Live Preview iFrame

## Problém
Live náhled se nezobrazoval u žádného projektu.

## Příčina
1. Většina projektů měla `allowIframe: false` v datech
2. Chybějící timeout pro detekci selhání načítání
3. iFrame `onLoad` event se někdy nespustil

## Řešení

### 1. Aktualizace dat projektů
**Soubor:** `lib/projects-data.ts`

Změnil jsem `allowIframe: false` → `allowIframe: true` pro všechny projekty:
- Bulldogo.cz ✅
- Ejdry.cz ✅
- Ostatní projekty už měly `true` ✅

### 2. Vylepšení iFrame handlingu
**Soubor:** `components/ui/ExpandedProjectView.tsx`

**Přidáno:**
- ✅ **Timeout mechanismus** - Pokud se iFrame nenačte do 10 sekund, automaticky zobrazí fallback
- ✅ **Lepší error handling** - onLoad a onError správně čistí timeout
- ✅ **Console logging** - Pro debugging (vidíš v konzoli, co se děje)
- ✅ **Vizuální indikátor** - Zelené "Živý web" tlačítko, když se iFrame načte úspěšně
- ✅ **Vylepšený fallback** - Screenshot + informační panel s odkazem

### 3. Nová UX Features

**Když se iFrame načte úspěšně:**
```
┌─────────────────────────┐
│ ⚪🟢🟡  url              │  Browser mockup
│                         │
│   [iFrame obsah]        │  ← Živý web
│                         │
│          🟢 Živý web    │  ← Indikátor
└─────────────────────────┘
```

**Když iFrame selže (X-Frame-Options):**
```
┌─────────────────────────┐
│ ⚪🟢🟡  url              │  Browser mockup
│                         │
│   [Screenshot]          │  ← Fallback obrázek
│                         │
│ ⚠️ Web blokuje náhled   │  ← Info panel
│   Otevřít v novém okně →│
└─────────────────────────┘
```

---

## Jak to teď funguje

### Scénář 1: Web povoluje embedding (např. Účtárna)
1. Otevřeš projekt
2. Loading spinner (10s max)
3. ✅ iFrame se načte
4. Zelený indikátor "Živý web" se zobrazí
5. Můžeš interagovat s živým webem

### Scénář 2: Web blokuje embedding (např. Bulldogo)
1. Otevřeš projekt
2. Loading spinner
3. iFrame selže nebo timeout (10s)
4. ❌ Automaticky přepne na fallback
5. Screenshot + info panel se zobrazí
6. Můžeš kliknout "Otevřít v novém okně"

---

## Testing

### V Console (F12) uvidíš:
```
✅ iFrame načten úspěšně: Účtárna
❌ iFrame error: Bulldogo.cz
⏱️ iFrame timeout pro Ejdry.cz - zobrazuji fallback
```

### Vizuálně:
- **Loading:** Spinner "Načítám živý náhled..."
- **Success:** Zelené "🟢 Živý web" v rohu
- **Error:** Screenshot + info panel dole

---

## Které weby fungují?

Záleží na `X-Frame-Options` hlavičce:

**✅ Očekává se funkční:**
- Účtárna (`allowIframe: true`)
- Extroworld (`allowIframe: true`)
- Podlahy Katalog (`allowIframe: true`)
- Ráj mazlíčků (`allowIframe: true`)

**❌ Mohou blokovat:**
- Bulldogo.cz (záleží na serveru)
- Ejdry.cz (záleží na serveru)

**Pro všechny projekty ale funguje fallback se screenshotem!**

---

## Pro vývojáře

### Chceš zakázat iFrame pro konkrétní projekt?
```typescript
// lib/projects-data.ts
{
  id: 'muj-projekt',
  allowIframe: false,  // ← Vždy použije screenshot
  screenshot: '/screenshots/muj-projekt.png',
}
```

### Chceš změnit timeout?
```typescript
// components/ui/ExpandedProjectView.tsx
setTimeout(() => {
  // ...
}, 10000) // ← Změň na jiný čas v ms
```

---

## Hotovo! 🎉

Nyní refresh browser a zkus otevřít různé projekty:
1. **Účtárna** - měla by zobrazit živý web
2. **Bulldogo** - fallback se screenshotem
3. Všechny mají funkční zobrazení!
