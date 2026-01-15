# 🚀 Quick Start Guide - HOPNIC Website

## 📋 สิ่งที่ต้องเตรียม

### ✅ สำหรับ Development
- Node.js 20+ ([ดาวน์โหลด](https://nodejs.org/))
- npm หรือ yarn
- Git

### ✅ สำหรับ Docker Deployment
- Docker ([ดาวน์โหลด](https://www.docker.com/))
- Docker Compose

---

## 🏃‍♂️ เริ่มต้นใช้งาน (Development)

```bash
# 1. Clone repository
git clone <your-repo-url>
cd "Hop Site"

# 2. ติดตั้ง dependencies
npm install

# 3. รัน development server
npm run dev

# 4. เปิดเบราว์เซอร์ที่
# http://localhost:5173
```

---

## 🐳 Deploy ด้วย Docker (แนะนำ)

### วิธีที่ 1: ใช้สคริปต์อัตโนมัติ

```bash
# รันสคริปต์ deploy
./scripts/deploy-docker.sh
```

### วิธีที่ 2: Manual

```bash
# 1. Build Docker image
docker build -t hopnic-website .

# 2. Run container
docker run -p 3000:3000 hopnic-website

# หรือใช้ docker-compose
docker-compose -f docker-compose.prod.yml up -d
```

**เปิดเบราว์เซอร์ที่:** http://localhost:3000

---

## ☁️ Deploy ไปยัง Vercel (ฟรี + ง่ายที่สุด)

### วิธีที่ 1: ใช้สคริปต์

```bash
./scripts/deploy-vercel.sh
```

### วิธีที่ 2: Manual

```bash
# 1. ติดตั้ง Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod
```

### วิธีที่ 3: ผ่าน Web (ง่ายที่สุด!)

1. ไปที่ https://vercel.com
2. เชื่อมต่อ GitHub repository
3. กด "Deploy" (ไม่ต้องตั้งค่าอะไร!)

---

## 🔧 คำสั่งที่ใช้บ่อย

```bash
# Development
npm run dev              # รัน dev server
npm run build            # Build production
npm run preview          # ดู production build
npm run check            # Type checking

# Docker
docker-compose up -d     # Start containers
docker-compose down      # Stop containers
docker logs -f hopnic-website  # ดู logs

# Vercel
vercel                   # Deploy preview
vercel --prod            # Deploy production
vercel ls                # ดู deployments
```

---

## 📁 โครงสร้างโปรเจค

```
Hop Site/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   └── business/      # Components หลัก
│   │   ├── data/              # ข้อมูล JSON
│   │   └── config/            # Configuration
│   ├── routes/
│   │   ├── (public)/          # Public pages
│   │   │   ├── +page.svelte   # Home
│   │   │   ├── about/         # About page
│   │   │   └── contact/       # Contact page
│   │   └── +layout.svelte
│   └── app.css                # Global styles
├── static/                    # Static assets
├── Dockerfile                 # Docker configuration
├── docker-compose.prod.yml    # Production compose
└── package.json
```

---

## 🎨 การแก้ไขเนื้อหา

### 1. แก้ไขข้อมูลบริษัท

แก้ไขไฟล์ `src/lib/data/about.json`:

```json
{
  "ourStory": {
    "title": "Our Story",
    "content": ["..."]
  }
}
```

### 2. แก้ไขข้อมูลติดต่อ

แก้ไขไฟล์ `src/lib/config/site.ts`:

```typescript
export const sampleOffices: Office[] = [
  {
    id: 'HQ',
    name: 'Headquarters',
    address: 'ที่อยู่ของคุณ',
    phone: 'เบอร์โทรของคุณ'
  }
];
```

### 3. เปลี่ยนสี

แก้ไขไฟล์ `tailwind.config.ts`:

```typescript
colors: {
  primary: '#0F172A',
  secondary: '#334155',
  // เพิ่มสีของคุณ
}
```

---

## 🔍 Troubleshooting

### ปัญหา: Port 3000 ถูกใช้งานอยู่

```bash
# หา process ที่ใช้ port
lsof -i :3000

# Kill process
kill -9 <PID>
```

### ปัญหา: Build error

```bash
# ลบ cache และ rebuild
rm -rf .svelte-kit node_modules
npm install
npm run build
```

### ปัญหา: Docker container ไม่ทำงาน

```bash
# ดู logs
docker logs hopnic-website

# Restart container
docker-compose -f docker-compose.prod.yml restart
```

---

## 📞 ต้องการความช่วยเหลือ?

- 📧 Email: info@hopnic.com
- 📱 Tel: 02-123-4567
- 📖 Documentation: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## ✅ Checklist ก่อน Deploy Production

- [ ] ทดสอบ build: `npm run build`
- [ ] ทดสอบ preview: `npm run preview`
- [ ] แก้ไขข้อมูลติดต่อให้ถูกต้อง
- [ ] ตั้งค่า environment variables
- [ ] เตรียม domain name (ถ้ามี)
- [ ] Backup ข้อมูลเดิม (ถ้ามี)

---

**🎉 พร้อม Deploy แล้ว! Good luck!**

