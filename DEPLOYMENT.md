# 🚀 Deployment Guide - WLOOM Studio

Kompletní průvodce pro deployment na různé platformy.

---

## 🎯 Vercel (Doporučeno) - 5 minut

### Proč Vercel?
- ✅ Zero-config pro Next.js
- ✅ Automatické HTTPS
- ✅ Global CDN
- ✅ Preview deployments
- ✅ Instant rollbacks
- ✅ Analytics zdarma

### Postup

#### 1. Připrav Git Repository

```bash
# Inicializuj git (pokud ještě není)
git init

# Přidej všechny soubory
git add .

# První commit
git commit -m "Initial commit - Wloom Studio"

# Vytvoř GitHub repository (na github.com)
# Pak připoj:
git remote add origin https://github.com/username/wloom-studio.git
git branch -M main
git push -u origin main
```

#### 2. Deploy na Vercel

**Metoda A - Web Interface:**

1. Jdi na [vercel.com](https://vercel.com)
2. Klikni "New Project"
3. Import GitHub repository
4. Vercel automaticky detekuje Next.js
5. Klikni "Deploy"
6. Hotovo! 🎉

**Metoda B - CLI:**

```bash
# Instaluj Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Production deploy
vercel --prod
```

#### 3. Nastavení (Volitelné)

V Vercel dashboard:

**Environment Variables:**
```
NEXT_PUBLIC_SITE_URL=https://wloom.studio
NEXT_PUBLIC_CONTACT_EMAIL=hello@wloom.studio
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Domains:**
- Add custom domain
- Vercel automaticky nakonfiguruje SSL

**Build Settings:**
```
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Node Version: 18.x
```

---

## 🌐 Netlify - Alternativa

### Postup

#### 1. Netlify CLI

```bash
# Instaluj
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Production
netlify deploy --prod
```

#### 2. Web Interface

1. [app.netlify.com](https://app.netlify.com)
2. "New site from Git"
3. Vyber GitHub repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Deploy

#### 3. netlify.toml Config

```toml
# netlify.toml v root projektu
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

## ☁️ Cloudflare Pages

### Postup

1. [dash.cloudflare.com/pages](https://dash.cloudflare.com/pages)
2. "Create a project"
3. Connect Git provider
4. Build settings:
   - Framework preset: Next.js
   - Build command: `npx @cloudflare/next-on-pages@1`
   - Build output: `.vercel/output/static`
5. Deploy

### Environment Variables

```
NODE_VERSION=18
NEXT_PUBLIC_SITE_URL=https://wloom.pages.dev
```

---

## 🏗️ Custom Server (VPS/Dedicated)

### Prerequisites

- Node.js 18+
- PM2 pro process management
- Nginx pro reverse proxy
- SSL certifikát (Let's Encrypt)

### 1. Příprava Serveru

```bash
# Update systému
sudo apt update && sudo apt upgrade -y

# Instaluj Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Instaluj PM2
sudo npm install -g pm2

# Instaluj Nginx
sudo apt install -y nginx

# Instaluj Certbot (Let's Encrypt)
sudo apt install -y certbot python3-certbot-nginx
```

### 2. Deploy Aplikace

```bash
# Clone repository
git clone https://github.com/username/wloom-studio.git
cd wloom-studio

# Instaluj dependencies
npm install

# Build
npm run build

# Start s PM2
pm2 start npm --name "wloom" -- start

# Auto-restart při reboot
pm2 startup
pm2 save
```

### 3. Nginx Konfigurace

```nginx
# /etc/nginx/sites-available/wloom
server {
    listen 80;
    server_name wloom.studio www.wloom.studio;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/wloom /etc/nginx/sites-enabled/

# Test konfigurace
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# SSL s Let's Encrypt
sudo certbot --nginx -d wloom.studio -d www.wloom.studio
```

### 4. Environment Variables

```bash
# .env.local na serveru
NEXT_PUBLIC_SITE_URL=https://wloom.studio
NEXT_PUBLIC_CONTACT_EMAIL=hello@wloom.studio

# Restart aplikace
pm2 restart wloom
```

---

## 🐳 Docker

### Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  wloom:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_SITE_URL=https://wloom.studio
      - NEXT_PUBLIC_CONTACT_EMAIL=hello@wloom.studio
    restart: unless-stopped
```

### Commands

```bash
# Build
docker build -t wloom-studio .

# Run
docker run -p 3000:3000 wloom-studio

# Nebo s Docker Compose
docker-compose up -d
```

---

## 🔧 CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install Dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 📊 Post-Deployment Checklist

### ✅ Testování

```bash
# Lighthouse audit
npx lighthouse https://wloom.studio --view

# Broken links
npx broken-link-checker https://wloom.studio

# Load testing
npx artillery quick --count 10 -n 20 https://wloom.studio
```

### ✅ Monitoring

**Vercel Analytics:**
- Automaticky enabled na Vercel
- Real User Monitoring (RUM)
- Web Vitals tracking

**Google Analytics:**
```typescript
// app/layout.tsx
import Script from 'next/script'

<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="afterInteractive"
/>
```

**Sentry Error Tracking:**
```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

### ✅ SEO

```bash
# Submitni sitemap
# Google: https://search.google.com/search-console
# Bing: https://www.bing.com/webmasters

# Ověř robots.txt
curl https://wloom.studio/robots.txt

# Ověř sitemap
curl https://wloom.studio/sitemap.xml
```

### ✅ Security Headers

```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}
```

---

## 🔄 Update Strategy

### Rolling Updates

```bash
# 1. Pull latest changes
git pull origin main

# 2. Install new dependencies
npm install

# 3. Build
npm run build

# 4. Restart (PM2)
pm2 restart wloom

# 5. Verify
pm2 logs wloom
```

### Zero-Downtime (Vercel)

- Vercel automaticky dělá zero-downtime deployments
- Preview URL pro testing
- Instant rollback pokud něco selže

---

## 🆘 Troubleshooting

### Build Errors

```bash
# Vyčisti cache
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### Port Already in Use

```bash
# Najdi proces
lsof -i :3000

# Kill proces
kill -9 <PID>
```

### Memory Issues

```bash
# Zvyš Node memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### SSL Certificate Renewal

```bash
# Let's Encrypt auto-renews
# Manuální renewal:
sudo certbot renew
sudo systemctl reload nginx
```

---

## 📈 Performance Optimization

### 1. CDN Pro Static Assets

- Vercel/Netlify: Automatické
- Custom: CloudFlare nebo AWS CloudFront

### 2. Image Optimization

```bash
# Next.js automaticky optimalizuje images
# Pro external images, přidej do next.config.js:

images: {
  domains: ['example.com'],
  formats: ['image/avif', 'image/webp'],
}
```

### 3. Caching Strategy

```typescript
// app/page.tsx
export const revalidate = 3600 // Revalidate každou hodinu

// nebo
export const dynamic = 'force-static' // Full static
```

---

## 🎉 Úspěšný Deploy Checklist

- [ ] ✅ Build bez errors
- [ ] ✅ All pages loadují správně
- [ ] ✅ 3D scéna funguje
- [ ] ✅ Responzivní na mobilu
- [ ] ✅ SSL certifikát aktivní
- [ ] ✅ Sitemap submitnutá
- [ ] ✅ Analytics tracking
- [ ] ✅ Error monitoring setup
- [ ] ✅ Performance > 90 (Lighthouse)
- [ ] ✅ Custom domain funguje

---

**Gratulujeme! Tvůj Wloom Studio web je živý! 🌸🚀**

```
https://wloom.studio
```

---

*Pro support nebo otázky, viz ostatní dokumentaci nebo community forums.*
