# 📦 แผน Deployment - HOPNIC CO., LTD. Website

## 🎯 ภาพรวม

เว็บไซต์นี้สร้างด้วย **SvelteKit 5** และสามารถ deploy ได้หลายวิธี ขึ้นอยู่กับความต้องการและงบประมาณ

---

## 🚀 ตัวเลือกการ Deploy

### ✅ แนะนำ: Vercel (ฟรี + ง่ายที่สุด)

**ข้อดี:**
- ✨ Deploy ฟรี
- 🚀 Auto-deploy จาก Git
- 🌐 CDN ทั่วโลก
- 📊 Analytics ฟรี
- 🔒 SSL/HTTPS อัตโนมัติ

**ขั้นตอน:**
```bash
# 1. ติดตั้ง Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Deploy Production
vercel --prod
```

**หรือ Deploy ผ่าน Web:**
1. ไปที่ https://vercel.com
2. เชื่อมต่อ GitHub/GitLab
3. เลือก repository
4. กด Deploy (ไม่ต้องตั้งค่าอะไร!)

---

### 🐳 Docker (สำหรับ Self-hosting)

#### ขั้นตอนที่ 1: สร้าง Dockerfile

สร้างไฟล์ `Dockerfile`:

```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy built app from builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Start the app
CMD ["node", "build"]
```

#### ขั้นตอนที่ 2: สร้าง .dockerignore

```
node_modules
.svelte-kit
build
.git
.env
.DS_Store
*.log
```

#### ขั้นตอนที่ 3: ติดตั้ง Node Adapter

```bash
npm install -D @sveltejs/adapter-node
```

#### ขั้นตอนที่ 4: แก้ไข svelte.config.js

```javascript
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter()
	}
};

export default config;
```

#### ขั้นตอนที่ 5: Build และ Run Docker

```bash
# Build image
docker build -t hopnic-website .

# Run container
docker run -p 3000:3000 hopnic-website

# หรือใช้ docker-compose
docker-compose -f docker-compose.prod.yml up -d
```

---

### ☁️ Netlify (ทางเลือกที่ 2)

**ข้อดี:**
- ฟรี
- Forms และ Functions ในตัว
- Deploy ง่าย

**ขั้นตอน:**
```bash
# 1. ติดตั้ง adapter
npm install -D @sveltejs/adapter-netlify

# 2. แก้ไข svelte.config.js
# เปลี่ยนจาก adapter-auto เป็น adapter-netlify

# 3. Deploy
npx netlify deploy --prod
```

---

### 🖥️ VPS/Server (Ubuntu/Debian)

**สำหรับ:** Self-hosting บน VPS

#### ขั้นตอนที่ 1: Setup Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

#### ขั้นตอนที่ 2: Deploy Application

```bash
# Clone repository
git clone <your-repo-url> /var/www/hopnic
cd /var/www/hopnic

# Install dependencies
npm ci

# Build
npm run build

# Start with PM2
pm2 start build/index.js --name hopnic-website
pm2 save
pm2 startup
```

#### ขั้นตอนที่ 3: Setup Nginx

สร้างไฟล์ `/etc/nginx/sites-available/hopnic`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

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
sudo ln -s /etc/nginx/sites-available/hopnic /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Setup SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 📋 Checklist ก่อน Deploy

### ✅ ต้องทำก่อน Deploy:

- [ ] ตรวจสอบว่า build ผ่าน: `npm run build`
- [ ] ทดสอบ production build: `npm run preview`
- [ ] เปลี่ยน adapter ตามแพลตฟอร์มที่เลือก
- [ ] ตั้งค่า environment variables (ถ้ามี)
- [ ] เพิ่ม domain name (ถ้ามี)
- [ ] ตั้งค่า analytics (optional)

### 🔧 Environment Variables

สร้างไฟล์ `.env.production`:

```bash
PUBLIC_SITE_URL=https://your-domain.com
NODE_ENV=production
```

---

## 🎨 Production Optimization

### 1. Image Optimization

ใช้ `@sveltejs/enhanced-img` สำหรับ optimize รูปภาพ:

```bash
npm install -D @sveltejs/enhanced-img
```

### 2. Prerendering

แก้ไข `src/routes/+page.ts`:

```typescript
export const prerender = true;
```

---

## 📊 Monitoring & Analytics

### Google Analytics

เพิ่มใน `src/app.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

---

## 🔄 CI/CD Pipeline (GitHub Actions)

สร้างไฟล์ `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - run: npm run deploy # ขึ้นอยู่กับแพลตฟอร์ม
```

---

## 💰 เปรียบเทียบราคา

| Platform | ราคา | Bandwidth | SSL | CDN |
|----------|------|-----------|-----|-----|
| **Vercel** | ฟรี | 100GB/เดือน | ✅ | ✅ |
| **Netlify** | ฟรี | 100GB/เดือน | ✅ | ✅ |
| **VPS (DigitalOcean)** | $6/เดือน | 1TB/เดือน | ✅ | ❌ |
| **Docker (Self-host)** | ขึ้นกับ server | ไม่จำกัด | ต้องตั้งเอง | ❌ |

---

## 🆘 Troubleshooting

### Build Error

```bash
# ลบ cache และ rebuild
rm -rf .svelte-kit node_modules
npm install
npm run build
```

### Port Already in Use

```bash
# หา process ที่ใช้ port
lsof -i :3000
# หรือ
netstat -ano | findstr :3000

# Kill process
kill -9 <PID>
```

---

## 📞 Support

หากมีปัญหาในการ deploy สามารถติดต่อได้ที่:
- Email: info@hopnic.com
- Tel: 02-123-4567

