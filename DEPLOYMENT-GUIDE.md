# 🚀 Deployment Guide - HOPNIC Portfolio System

**Date:** 2026-01-19  
**Target:** DigitalOcean Droplet with Docker

---

## 📋 Overview

### Development (Local):
- ✅ Mock Mode - ไม่ต้องการ Database
- ✅ ทดสอบ UI/UX ได้ทันที
- ✅ ใช้ข้อมูลตัวอย่าง 4 projects

### Production (DigitalOcean):
- ✅ Database Mode - ใช้ PostgreSQL จริง
- ✅ Docker Container สำหรับ Database
- ✅ Upload รูปภาพจริง
- ✅ CRUD ทำงานเต็มรูปแบบ

---

## 🔄 สลับระหว่าง Mock Mode และ Database Mode

### **Environment Variable:**

สร้างไฟล์ `.env` (local) และ `.env.production` (server):

```bash
# .env (Development - Mock Mode)
USE_MOCK_DATA=true
DATABASE_URL="postgresql://hopnic:hopnic123@localhost:5432/hopnic_db"
ADMIN_PASSWORD="your-admin-password"
```

```bash
# .env.production (Production - Database Mode)
USE_MOCK_DATA=false
DATABASE_URL="postgresql://hopnic:hopnic123@localhost:5432/hopnic_db"
ADMIN_PASSWORD="your-strong-admin-password"
```

---

## 📁 Step 1: ปรับโค้ดให้รองรับทั้ง 2 Mode

### **1.1 สร้าง Environment Helper**

สร้างไฟล์ `src/lib/server/env.ts`:

```typescript
import { env } from '$env/dynamic/private';

export const USE_MOCK_DATA = env.USE_MOCK_DATA === 'true';
```

### **1.2 ปรับ Server Routes**

ปรับไฟล์ทั้ง 4 ไฟล์ให้ตรวจสอบ `USE_MOCK_DATA`:

**`src/routes/(public)/portfolio/+page.server.ts`:**
```typescript
import { USE_MOCK_DATA } from '$lib/server/env';
import { getMockProjects } from '$lib/server/mock-data';
import { getAllProjects } from '$lib/server/portfolio.service';

export const load: PageServerLoad = async () => {
  const projects = USE_MOCK_DATA 
    ? getMockProjects() 
    : await getAllProjects();

  return { projects, validTags: VALID_TAGS };
};
```

**`src/routes/(public)/portfolio/[id]/+page.server.ts`:**
```typescript
import { USE_MOCK_DATA } from '$lib/server/env';
import { getMockProjectById } from '$lib/server/mock-data';
import { getProjectById } from '$lib/server/portfolio.service';

export const load: PageServerLoad = async ({ params }) => {
  const id = parseInt(params.id);
  
  const project = USE_MOCK_DATA
    ? getMockProjectById(id)
    : await getProjectById(id);

  if (!project) throw error(404, 'Project not found');
  return { project };
};
```

**`src/routes/dashboard/+page.server.ts`:**
```typescript
import { USE_MOCK_DATA } from '$lib/server/env';
import { getMockStats } from '$lib/server/mock-data';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
  if (USE_MOCK_DATA) {
    return { stats: getMockStats() };
  }

  const totalProjects = await prisma.project.count();
  const totalImages = await prisma.projectImage.count();
  
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);
  
  const thisMonth = await prisma.project.count({
    where: { createdAt: { gte: startOfMonth } }
  });

  return {
    stats: { totalProjects, totalImages, thisMonth }
  };
};
```

**`src/routes/dashboard/projects/+page.server.ts`:**
```typescript
import { USE_MOCK_DATA } from '$lib/server/env';
import { getMockProjects } from '$lib/server/mock-data';
import { getAllProjects, deleteProject } from '$lib/server/portfolio.service';

export const load: PageServerLoad = async () => {
  const projects = USE_MOCK_DATA
    ? getMockProjects()
    : await getAllProjects();

  return { projects };
};

export const actions: Actions = {
  delete: async ({ request }) => {
    if (USE_MOCK_DATA) {
      return fail(400, { error: 'Cannot delete in Mock Mode' });
    }

    const formData = await request.formData();
    const id = formData.get('id');
    
    if (!id) return fail(400, { error: 'Project ID is required' });

    try {
      await deleteProject(Number(id));
      return { success: true };
    } catch (error) {
      return fail(500, { error: 'Failed to delete project' });
    }
  }
};
```

---

## 🐳 Step 2: Prepare Docker Setup

### **2.1 ตรวจสอบ `docker-compose.yml`:**

```yaml
version: '3.8'

services:
  db:
    image: postgres:16-alpine
    container_name: hopnic-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: hopnic
      POSTGRES_PASSWORD: hopnic123
      POSTGRES_DB: hopnic_db
    ports:
      - "5432:5432"
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
    name: hopnic-db-data
  uploads-data:
    name: hopnic-uploads-data
```

### **2.2 ตรวจสอบ Prisma Schema:**

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Project {
  id          Int            @id @default(autoincrement())
  title       String
  subHeader   String
  bodyContent String         @db.Text
  tags        String[]
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt
  images      ProjectImage[]
  @@map("projects")
}

model ProjectImage {
  id            Int      @id @default(autoincrement())
  imageUrl      String
  sequenceOrder Int      @default(0)
  isCover       Boolean  @default(false)
  projectId     Int
  project       Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  @@map("project_images")
  @@index([projectId])
}
```

---

## 📦 Step 3: Build for Production

### **3.1 Build Application:**

```bash
# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Build application
npm run build
```

### **3.2 Test Production Build Locally:**

```bash
# Set production environment
export USE_MOCK_DATA=false
export DATABASE_URL="postgresql://hopnic:hopnic123@localhost:5432/hopnic_db"
export ADMIN_PASSWORD="your-password"

# Start Docker database
docker-compose up -d db

# Run migrations
npx prisma migrate deploy

# Start production server
node build
```

---

## 🌐 Step 4: Deploy to DigitalOcean

### **4.1 Connect to Droplet:**

```bash
ssh root@your-droplet-ip
```

### **4.2 Install Dependencies:**

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
apt install -y docker-compose
```

### **4.3 Clone Repository:**

```bash
# Create app directory
mkdir -p /var/www/hopnic
cd /var/www/hopnic

# Clone your repository
git clone <your-repo-url> .

# Or upload files via SCP/SFTP
```

### **4.4 Setup Environment:**

```bash
# Create .env file
cat > .env << EOF
USE_MOCK_DATA=false
DATABASE_URL="postgresql://hopnic:hopnic123@localhost:5432/hopnic_db"
ADMIN_PASSWORD="your-strong-password"
NODE_ENV=production
EOF
```

### **4.5 Start Database:**

```bash
# Start PostgreSQL container
docker-compose up -d db

# Wait for database to be ready
sleep 10

# Run migrations
npx prisma migrate deploy
```

### **4.6 Build and Start Application:**

```bash
# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Build application
npm run build

# Start with PM2 (recommended)
npm install -g pm2
pm2 start build/index.js --name hopnic-site
pm2 save
pm2 startup
```

---

## 🔧 Step 5: Setup Nginx (Optional but Recommended)

### **5.1 Install Nginx:**

```bash
apt install -y nginx
```

### **5.2 Configure Nginx:**

```bash
cat > /etc/nginx/sites-available/hopnic << 'EOF'
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
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static {
        alias /var/www/hopnic/static;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/hopnic /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

---

## 🔐 Step 6: Setup SSL (Optional but Recommended)

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d your-domain.com

# Auto-renewal is setup automatically
```

---

## 📊 Step 7: Verify Deployment

### **7.1 Check Services:**

```bash
# Check PM2
pm2 status

# Check Docker
docker ps

# Check Nginx
systemctl status nginx

# Check logs
pm2 logs hopnic-site
docker logs hopnic-postgres
```

### **7.2 Test Application:**

```bash
# Test locally
curl http://localhost:3000

# Test via domain
curl http://your-domain.com
```

---

## 🔄 Step 8: Update Deployment

### **8.1 Pull Latest Changes:**

```bash
cd /var/www/hopnic
git pull origin main
```

### **8.2 Rebuild and Restart:**

```bash
# Install new dependencies (if any)
npm install

# Run new migrations (if any)
npx prisma migrate deploy

# Rebuild
npm run build

# Restart PM2
pm2 restart hopnic-site
```

---

## 📝 Quick Reference

### **Local Development (Mock Mode):**
```bash
# .env
USE_MOCK_DATA=true

# Start
npm run dev
```

### **Production (Database Mode):**
```bash
# .env.production
USE_MOCK_DATA=false

# Deploy
npm run build
pm2 restart hopnic-site
```

### **Useful Commands:**
```bash
# View logs
pm2 logs hopnic-site

# Restart app
pm2 restart hopnic-site

# Restart database
docker-compose restart db

# Backup database
docker exec hopnic-postgres pg_dump -U hopnic hopnic_db > backup.sql

# Restore database
docker exec -i hopnic-postgres psql -U hopnic hopnic_db < backup.sql
```

---

**Status:** ✅ **READY FOR DEPLOYMENT**

