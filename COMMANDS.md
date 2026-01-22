# ⚡ Quick Commands Reference

Všechny důležité příkazy na jednom místě.

---

## 🚀 Development

```bash
# Instalace dependencies
npm install

# Spuštění dev serveru
npm run dev

# Build pro produkci
npm run build

# Spuštění produkce lokálně
npm start

# Lint kódu
npm run lint
```

---

## 🔧 Management

```bash
# Update dependencies
npm update

# Check outdated packages
npm outdated

# Install new package
npm install package-name

# Install new dev dependency
npm install -D package-name

# Clean install (pokud něco nefunguje)
rm -rf node_modules package-lock.json
npm install
```

---

## 🏗️ Build & Clean

```bash
# Vyčisti build cache
rm -rf .next

# Vyčisti vše a reinstaluj
rm -rf .next node_modules package-lock.json
npm install

# Build s výstupem
npm run build -- --debug
```

---

## 🐳 Docker

```bash
# Build image
docker build -t wloom-studio .

# Run container
docker run -p 3000:3000 wloom-studio

# Docker Compose
docker-compose up -d
docker-compose down
docker-compose logs -f
```

---

## 📦 Deployment

### Vercel

```bash
# Instaluj CLI
npm i -g vercel

# Login
vercel login

# Deploy preview
vercel

# Deploy production
vercel --prod
```

### Netlify

```bash
# Instaluj CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy production
netlify deploy --prod
```

---

## 🔍 Testing & Quality

```bash
# TypeScript type check
npx tsc --noEmit

# Lint
npm run lint

# Lighthouse audit
npx lighthouse http://localhost:3000 --view

# Bundle analyzer (přidej do package.json)
ANALYZE=true npm run build
```

---

## 🎨 Customization

```bash
# Edit main page
code app/page.tsx

# Edit 3D scene
code components/3d/SakuraScene.tsx

# Edit colors
code tailwind.config.ts

# Edit constants
code lib/constants.ts
```

---

## 📊 Stats & Info

```bash
# Count lines of code
find . -name '*.tsx' -o -name '*.ts' | xargs wc -l

# List all components
find components -name '*.tsx'

# Check bundle size
npm run build
# Output shows First Load JS sizes

# Check disk usage
du -sh node_modules .next
```

---

## 🐛 Debugging

```bash
# Clear all caches
rm -rf .next node_modules/.cache

# Check port usage
lsof -i :3000

# Kill process on port 3000
kill -9 $(lsof -t -i:3000)

# View Node version
node --version

# View npm version
npm --version
```

---

## 🔐 Environment

```bash
# Create .env.local
touch .env.local

# Edit environment variables
code .env.local

# Example content:
# NEXT_PUBLIC_SITE_URL=http://localhost:3000
# NEXT_PUBLIC_CONTACT_EMAIL=hello@wloom.studio
```

---

## 🌳 Git

```bash
# Initial commit
git init
git add .
git commit -m "Initial commit - Wloom Studio"

# Push to remote
git remote add origin [url]
git push -u origin main

# Create new branch
git checkout -b feature/new-feature

# Stash changes
git stash
git stash pop

# View status
git status
git log --oneline
```

---

## 📱 Testing Responsive

```bash
# Start dev server
npm run dev

# Then open in browsers:
# Desktop: http://localhost:3000
# Mobile (via network): http://192.168.x.x:3000
# (Replace with your local IP)

# Find your IP:
# macOS/Linux:
ifconfig | grep "inet "
# Windows:
ipconfig
```

---

## 🚀 Production Checklist Commands

```bash
# 1. Type check
npx tsc --noEmit

# 2. Lint
npm run lint

# 3. Build
npm run build

# 4. Test production build locally
npm start

# 5. Lighthouse audit
npx lighthouse http://localhost:3000 --view

# 6. Deploy
vercel --prod
```

---

## 🛠️ Maintenance

```bash
# Update Next.js
npm install next@latest

# Update React
npm install react@latest react-dom@latest

# Update all dependencies (minor versions)
npm update

# Update all dependencies (major versions - careful!)
npx npm-check-updates -u
npm install

# Security audit
npm audit
npm audit fix
```

---

## 📚 Documentation Generation

```bash
# View README in terminal
cat README.md

# Search in docs
grep -r "search term" *.md

# Count documentation words
wc -w *.md

# List all markdown files
ls -la *.md
```

---

## 💡 Useful One-Liners

```bash
# Start dev and open browser (macOS)
npm run dev & sleep 2 && open http://localhost:3000

# Start dev and open browser (Linux)
npm run dev & sleep 2 && xdg-open http://localhost:3000

# Watch file changes
npm run dev | grep --line-buffered "compiled"

# Install and start in one command
npm install && npm run dev

# Full clean setup
rm -rf node_modules package-lock.json .next && npm install && npm run dev
```

---

## 🎯 Most Used Commands (Top 5)

```bash
1. npm run dev          # Daily development
2. npm install          # First setup / after pull
3. npm run build        # Before deployment
4. npm run lint         # Code quality check
5. git add . && git commit -m "message" && git push
```

---

## 🔖 Shortcuts Setup (Optional)

Přidej do `package.json` → `scripts`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "clean": "rm -rf .next node_modules",
    "fresh": "npm run clean && npm install",
    "deploy": "vercel --prod",
    "type-check": "tsc --noEmit",
    "format": "prettier --write ."
  }
}
```

---

**Ulož si tuto stránku do záložek pro rychlý přístup k příkazům! ⚡**
