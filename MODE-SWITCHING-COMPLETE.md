# ✅ Mode Switching System - COMPLETE

**Date:** 2026-01-19  
**Status:** ✅ **READY TO USE**

---

## 🎉 สิ่งที่ทำเสร็จแล้ว

### **1. Environment Configuration** ✅

#### **สร้างไฟล์:**
- ✅ `src/lib/server/env.ts` - Environment helper
- ✅ `.env` - Development config (Mock Mode)
- ✅ `.env.example` - Template with USE_MOCK_DATA
- ✅ `.env.production.example` - Production template

#### **Environment Variables:**
```bash
# Development (.env)
USE_MOCK_DATA=true          # ใช้ Mock Data
DATABASE_URL="postgresql://..."
ADMIN_PASSWORD="admin123"

# Production (.env.production)
USE_MOCK_DATA=false         # ใช้ Database จริง
DATABASE_URL="postgresql://..."
ADMIN_PASSWORD="strong-password"
```

---

### **2. Server Routes Updated** ✅

ปรับไฟล์ทั้ง 4 ไฟล์ให้ตรวจสอบ `USE_MOCK_DATA` อัตโนมัติ:

#### **`src/routes/(public)/portfolio/+page.server.ts`:**
```typescript
import { USE_MOCK_DATA } from '$lib/server/env';

const projects = USE_MOCK_DATA 
  ? getMockProjects() 
  : await getAllProjects();
```

#### **`src/routes/(public)/portfolio/[id]/+page.server.ts`:**
```typescript
import { USE_MOCK_DATA } from '$lib/server/env';

const project = USE_MOCK_DATA
  ? getMockProjectById(id)
  : await getProjectById(id);
```

#### **`src/routes/dashboard/+page.server.ts`:**
```typescript
import { USE_MOCK_DATA } from '$lib/server/env';

if (USE_MOCK_DATA) {
  return { stats: getMockStats() };
}

// Real database queries...
```

#### **`src/routes/dashboard/projects/+page.server.ts`:**
```typescript
import { USE_MOCK_DATA } from '$lib/server/env';

const projects = USE_MOCK_DATA
  ? getMockProjects()
  : await getAllProjects();

// Delete action
if (USE_MOCK_DATA) {
  return fail(400, { error: 'Cannot delete in Mock Mode' });
}
```

---

### **3. Deployment Scripts** ✅

#### **`scripts/deploy.sh`:**
- ✅ ตรวจสอบ .env file
- ✅ เตือนถ้า USE_MOCK_DATA=true
- ✅ Install dependencies
- ✅ Generate Prisma Client
- ✅ Start database
- ✅ Run migrations
- ✅ Build application
- ✅ Deploy with PM2

#### **`scripts/switch-mode.sh`:**
- ✅ แสดงโหมดปัจจุบัน
- ✅ สลับระหว่าง Mock ↔ Database
- ✅ แสดงคำแนะนำหลังสลับ

---

### **4. Documentation** ✅

#### **สร้างเอกสาร:**
- ✅ `DEPLOYMENT-GUIDE.md` - คู่มือ Deploy แบบละเอียด (150+ บรรทัด)
- ✅ `QUICK-START.md` - คู่มือเริ่มต้นใช้งานแบบสั้น
- ✅ `MODE-SWITCHING-COMPLETE.md` - เอกสารนี้

---

## 🔄 วิธีใช้งาน

### **Development (Mock Mode):**

```bash
# 1. ตรวจสอบ .env
cat .env | grep USE_MOCK_DATA
# ต้องเป็น: USE_MOCK_DATA=true

# 2. Start dev server
npm run dev

# 3. เปิดเบราว์เซอร์
# http://localhost:5173
```

**ไม่ต้อง setup อะไรเพิ่ม!** 🎉

---

### **Production (Database Mode):**

```bash
# 1. สลับเป็น Database Mode
./scripts/switch-mode.sh

# 2. Start database
docker-compose up -d db

# 3. Run migrations
npx prisma migrate deploy

# 4. Start dev server
npm run dev

# หรือ Deploy ขึ้น production
./scripts/deploy.sh
```

---

## 📊 การทำงานของระบบ

### **Mock Mode (USE_MOCK_DATA=true):**

```
User Request
    ↓
Server Route
    ↓
Check USE_MOCK_DATA
    ↓
[TRUE] → getMockProjects()
    ↓
Return Mock Data (4 projects)
    ↓
Render UI
```

**Features:**
- ✅ View Projects (4 samples)
- ✅ View Project Detail
- ✅ Filter by Tags
- ✅ Dashboard Statistics
- ❌ Create/Edit/Delete (disabled)

---

### **Database Mode (USE_MOCK_DATA=false):**

```
User Request
    ↓
Server Route
    ↓
Check USE_MOCK_DATA
    ↓
[FALSE] → getAllProjects()
    ↓
Query PostgreSQL via Prisma
    ↓
Return Real Data
    ↓
Render UI
```

**Features:**
- ✅ View Projects (from database)
- ✅ View Project Detail
- ✅ Filter by Tags
- ✅ Dashboard Statistics
- ✅ Create/Edit/Delete (full CRUD)
- ✅ Upload Images

---

## 🚀 Deployment Workflow

### **Local Development:**
```bash
# Always use Mock Mode
USE_MOCK_DATA=true
npm run dev
```

### **Local Testing with Database:**
```bash
# Switch to Database Mode
./scripts/switch-mode.sh

# Start database
docker-compose up -d db
npx prisma migrate deploy

# Test
npm run dev
```

### **Deploy to DigitalOcean:**
```bash
# On server
cd /var/www/hopnic

# Create .env from template
cp .env.production.example .env

# Edit .env
nano .env
# Set: USE_MOCK_DATA=false
# Set: Strong passwords
# Set: Your domain

# Deploy
./scripts/deploy.sh

# Done! 🎉
```

---

## 📁 File Structure

```
.
├── .env                          # Development (Mock Mode)
├── .env.example                  # Template
├── .env.production.example       # Production template
├── src/
│   ├── lib/
│   │   └── server/
│   │       ├── env.ts           # ✅ NEW: Environment helper
│   │       ├── mock-data.ts     # Mock data
│   │       ├── prisma.ts        # Prisma client
│   │       └── portfolio.service.ts
│   └── routes/
│       ├── (public)/
│       │   └── portfolio/
│       │       ├── +page.server.ts      # ✅ UPDATED
│       │       └── [id]/+page.server.ts # ✅ UPDATED
│       └── dashboard/
│           ├── +page.server.ts          # ✅ UPDATED
│           └── projects/+page.server.ts # ✅ UPDATED
├── scripts/
│   ├── deploy.sh                # ✅ NEW: Deployment script
│   └── switch-mode.sh           # ✅ NEW: Mode switcher
├── DEPLOYMENT-GUIDE.md          # ✅ NEW: Full guide
├── QUICK-START.md               # ✅ NEW: Quick reference
└── MODE-SWITCHING-COMPLETE.md   # ✅ NEW: This file
```

---

## ✅ Checklist

### **Development:**
- [x] Mock Mode ทำงานได้
- [x] ไม่ต้อง setup database
- [x] UI/UX ทดสอบได้ทันที
- [x] Hot reload ทำงาน

### **Production:**
- [x] Database Mode ทำงานได้
- [x] CRUD operations ครบ
- [x] Deployment script พร้อม
- [x] Documentation ครบถ้วน

### **Scripts:**
- [x] `deploy.sh` - Deploy to production
- [x] `switch-mode.sh` - Switch modes
- [x] Both scripts executable

### **Documentation:**
- [x] DEPLOYMENT-GUIDE.md (detailed)
- [x] QUICK-START.md (quick reference)
- [x] MODE-SWITCHING-COMPLETE.md (summary)

---

## 🎯 Next Steps

### **ตอนนี้ (Development):**
```bash
# ใช้ Mock Mode ต่อไป
npm run dev
```

### **เมื่อพร้อม Deploy:**
```bash
# 1. Push code to repository
git add .
git commit -m "Add mode switching system"
git push

# 2. On DigitalOcean server
ssh root@your-server
cd /var/www/hopnic
git pull
cp .env.production.example .env
nano .env  # Edit settings
./scripts/deploy.sh

# 3. Done! 🚀
```

---

## 📝 Important Notes

### **Environment Variables:**
- ✅ `.env` - Git ignored (contains secrets)
- ✅ `.env.example` - Git tracked (template)
- ✅ `.env.production.example` - Git tracked (template)

### **Mode Switching:**
- ✅ Automatic based on `USE_MOCK_DATA`
- ✅ No code changes needed
- ✅ Just change environment variable

### **Safety:**
- ✅ Mock Mode prevents accidental database operations
- ✅ Deployment script warns if Mock Mode enabled
- ✅ Delete action blocked in Mock Mode

---

## 🔧 Troubleshooting

### **Problem: Server ไม่ reload หลังแก้ .env**
```bash
# Restart dev server
# Ctrl+C
npm run dev
```

### **Problem: Database connection error**
```bash
# Check if database is running
docker ps | grep hopnic-postgres

# Start database
docker-compose up -d db

# Check USE_MOCK_DATA
cat .env | grep USE_MOCK_DATA
```

### **Problem: Prisma error**
```bash
# Regenerate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy
```

---

## 📚 Quick Reference

### **Check Current Mode:**
```bash
cat .env | grep USE_MOCK_DATA
```

### **Switch Mode:**
```bash
./scripts/switch-mode.sh
```

### **Deploy:**
```bash
./scripts/deploy.sh
```

### **View Logs:**
```bash
pm2 logs hopnic-site
```

---

**Status:** ✅ **COMPLETE AND READY TO USE**

ระบบสลับโหมดทำงานสมบูรณ์แล้ว! 🎉

**ตอนนี้:**
- ✅ Development ใช้ Mock Mode (ไม่ต้อง database)
- ✅ Production ใช้ Database Mode (PostgreSQL)
- ✅ สลับได้ง่ายด้วย environment variable
- ✅ Deploy ได้ด้วย script เดียว

**เริ่มใช้งานได้เลย!** 🚀

