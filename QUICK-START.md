# 🚀 Quick Start Guide - HOPNIC Portfolio System

---

## 📋 สองโหมดการทำงาน

### 1. **Mock Mode** (Development - ไม่ต้องการ Database)
- ✅ ใช้ข้อมูลตัวอย่าง
- ✅ ทดสอบ UI/UX ได้ทันที
- ✅ ไม่ต้อง setup Docker/PostgreSQL
- ❌ ไม่สามารถ Create/Edit/Delete ได้

### 2. **Database Mode** (Production - ใช้ PostgreSQL จริง)
- ✅ ใช้ข้อมูลจริงจาก Database
- ✅ CRUD ทำงานเต็มรูปแบบ
- ✅ Upload รูปภาพได้
- ⚠️ ต้อง setup Docker + PostgreSQL

---

## 🏃 Quick Start

### **Development (Mock Mode):**

```bash
# 1. Install dependencies
npm install

# 2. Make sure USE_MOCK_DATA=true in .env
# (Already set by default)

# 3. Start dev server
npm run dev

# 4. Open browser
# http://localhost:5173
```

**เท่านี้ก็พร้อมใช้งาน!** 🎉

---

## 🔄 สลับโหมด

### **วิธีที่ 1: ใช้ Script (แนะนำ)**

```bash
# สลับระหว่าง Mock Mode ↔ Database Mode
./scripts/switch-mode.sh
```

### **วิธีที่ 2: แก้ไข .env เอง**

```bash
# Mock Mode (Development)
USE_MOCK_DATA=true

# Database Mode (Production)
USE_MOCK_DATA=false
```

---

## 🐘 เปิดใช้งาน Database Mode

### **Step 1: Start PostgreSQL**

```bash
# Start Docker container
docker-compose up -d db

# Wait for database to be ready
sleep 10
```

### **Step 2: Run Migrations**

```bash
# Apply database schema
npx prisma migrate deploy
```

### **Step 3: Switch to Database Mode**

```bash
# Option 1: Use script
./scripts/switch-mode.sh

# Option 2: Edit .env manually
# Change: USE_MOCK_DATA=false
```

### **Step 4: Start Application**

```bash
# Development
npm run dev

# Production
npm run build
node build
```

---

## 🚀 Deploy to Production

### **Quick Deploy:**

```bash
# 1. Copy .env.production.example to .env
cp .env.production.example .env

# 2. Edit .env and set:
#    - USE_MOCK_DATA=false
#    - Strong passwords
#    - Your domain

# 3. Run deployment script
./scripts/deploy.sh
```

### **Manual Deploy:**

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma Client
npx prisma generate

# 3. Start database
docker-compose up -d db

# 4. Run migrations
npx prisma migrate deploy

# 5. Build application
npm run build

# 6. Start with PM2
pm2 start build/index.js --name hopnic-site
pm2 save
```

---

## 📊 ตรวจสอบสถานะ

### **Check Current Mode:**

```bash
# View .env file
cat .env | grep USE_MOCK_DATA

# Mock Mode: USE_MOCK_DATA=true
# Database Mode: USE_MOCK_DATA=false
```

### **Check Services:**

```bash
# Check database
docker ps | grep hopnic-postgres

# Check application (production)
pm2 status hopnic-site

# Check logs
pm2 logs hopnic-site
```

---

## 🔧 Useful Commands

### **Development:**

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### **Database:**

```bash
# Start database
docker-compose up -d db

# Stop database
docker-compose stop db

# View database logs
docker logs hopnic-postgres

# Backup database
docker exec hopnic-postgres pg_dump -U hopnic hopnic_db > backup.sql

# Restore database
docker exec -i hopnic-postgres psql -U hopnic hopnic_db < backup.sql
```

### **Prisma:**

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Open Prisma Studio (Database GUI)
npx prisma studio
```

### **Production (PM2):**

```bash
# Start application
pm2 start build/index.js --name hopnic-site

# Restart application
pm2 restart hopnic-site

# Stop application
pm2 stop hopnic-site

# View logs
pm2 logs hopnic-site

# Monitor
pm2 monit
```

---

## 📁 Important Files

```
.env                    # Development environment (Mock Mode)
.env.production.example # Production template (Database Mode)
docker-compose.yml      # Docker configuration
prisma/schema.prisma    # Database schema
scripts/deploy.sh       # Deployment script
scripts/switch-mode.sh  # Mode switcher script
```

---

## 🎯 Common Scenarios

### **Scenario 1: ทดสอบ UI ในเครื่อง**
```bash
# Use Mock Mode (default)
npm run dev
```

### **Scenario 2: ทดสอบ Database ในเครื่อง**
```bash
# Switch to Database Mode
./scripts/switch-mode.sh

# Start database
docker-compose up -d db
npx prisma migrate deploy

# Start dev server
npm run dev
```

### **Scenario 3: Deploy ขึ้น Production**
```bash
# On server
cp .env.production.example .env
# Edit .env (set USE_MOCK_DATA=false)
./scripts/deploy.sh
```

### **Scenario 4: Update Production**
```bash
# Pull latest code
git pull

# Deploy
./scripts/deploy.sh
```

---

## 📚 Documentation

- **[DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)** - คู่มือ Deploy แบบละเอียด
- **[MOCK-MODE-GUIDE.md](./MOCK-MODE-GUIDE.md)** - คู่มือ Mock Mode
- **[DASHBOARD-STYLE-UPDATE.md](./DASHBOARD-STYLE-UPDATE.md)** - การปรับปรุง Dashboard

---

## ❓ Troubleshooting

### **ปัญหา: ไม่เห็น Style**
```bash
# ตรวจสอบว่า app.css ถูก import
# File: src/routes/+layout.svelte
# ต้องมี: import '../app.css';
```

### **ปัญหา: Database connection error**
```bash
# ตรวจสอบว่า database รันอยู่
docker ps | grep hopnic-postgres

# ถ้าไม่รัน ให้ start
docker-compose up -d db
```

### **ปัญหา: Prisma error**
```bash
# Generate Prisma Client ใหม่
npx prisma generate

# Run migrations
npx prisma migrate deploy
```

---

**Status:** ✅ **READY TO USE**

เริ่มต้นด้วย Mock Mode ได้เลย! 🚀

