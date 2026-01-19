# 🔄 Update Deployment - Phase 1 → Phase 2

**Target:** DigitalOcean VPS (https://hopnic.co.th)  
**Current:** Phase 1 (Static site with Docker + Nginx + SSL)  
**Update to:** Phase 2 (Portfolio System with Database)

---

## 📋 สิ่งที่มีอยู่แล้ว (Phase 1)

- ✅ Docker + Docker Compose
- ✅ Nginx (Port 80/443)
- ✅ SSL Certificate (Certbot)
- ✅ Domain: https://hopnic.co.th
- ✅ Firewall configured

---

## 🎯 สิ่งที่จะเพิ่มใน Phase 2

- ✅ PostgreSQL Database (Docker Container)
- ✅ Prisma ORM
- ✅ Portfolio Management System
- ✅ Admin Dashboard
- ✅ File Upload System

---

## 🚀 ขั้นตอนการ Update

### **Step 1: SSH เข้า Server**

```bash
ssh root@your-server-ip
# หรือ
ssh root@hopnic.co.th
```

---

### **Step 2: Backup ข้อมูลเดิม (สำคัญ!)**

```bash
# Backup docker-compose.yml เดิม
cd /var/www/hopnic  # หรือ path ที่คุณใช้
cp docker-compose.yml docker-compose.yml.backup

# Backup .env เดิม (ถ้ามี)
cp .env .env.backup

# Backup static files (ถ้ามี)
tar -czf backup-static-$(date +%Y%m%d).tar.gz static/
```

---

### **Step 3: Pull Code ใหม่**

```bash
# ถ้าใช้ Git
cd /var/www/hopnic
git pull origin main

# หรือ Upload files ใหม่ผ่าน SCP/SFTP
# จากเครื่อง local:
# scp -r . root@hopnic.co.th:/var/www/hopnic/
```

---

### **Step 4: สร้าง .env สำหรับ Production**

```bash
# สร้างไฟล์ .env
cat > .env << 'EOF'
# ================================
# Production Environment
# ================================

# Application Mode (ใช้ Database จริง)
USE_MOCK_DATA=false

# Database Configuration
DATABASE_URL="postgresql://hopnic:STRONG_PASSWORD_HERE@localhost:5432/hopnic_db"

# Admin Authentication
ADMIN_PASSWORD="YOUR_STRONG_ADMIN_PASSWORD"

# Application
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
ORIGIN=https://hopnic.co.th

# PostgreSQL (for docker-compose)
POSTGRES_USER=hopnic
POSTGRES_PASSWORD=STRONG_PASSWORD_HERE
POSTGRES_DB=hopnic_db

# Site Configuration
PUBLIC_SITE_URL=https://hopnic.co.th
PUBLIC_SITE_NAME=HOPNIC CO., LTD.
PUBLIC_CONTACT_EMAIL=info@hopnic.com
PUBLIC_CONTACT_PHONE=02-123-4567
EOF

# แก้ไข passwords
nano .env
```

**⚠️ สำคัญ:** เปลี่ยน `STRONG_PASSWORD_HERE` และ `YOUR_STRONG_ADMIN_PASSWORD` เป็นรหัสผ่านที่แข็งแรง!

---

### **Step 5: อัพเดท docker-compose.yml**

ไฟล์ `docker-compose.yml` ใหม่ควรมีทั้ง **app** และ **db**:

```yaml
version: '3.8'

services:
  # Application Service
  app:
    build: .
    container_name: hopnic-app
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env
    volumes:
      - ./static/uploads:/app/static/uploads
      - uploads-data:/app/uploads
    depends_on:
      - db
    networks:
      - hopnic-network

  # Database Service (NEW!)
  db:
    image: postgres:16-alpine
    container_name: hopnic-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    ports:
      - "5432:5432"
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - hopnic-network

volumes:
  db-data:
    name: hopnic-db-data
  uploads-data:
    name: hopnic-uploads-data

networks:
  hopnic-network:
    driver: bridge
```

---

### **Step 6: Stop Container เดิม**

```bash
# Stop และ remove containers เดิม
docker-compose down

# ตรวจสอบว่า stop หมดแล้ว
docker ps
```

---

### **Step 7: Install Dependencies**

```bash
# Install Node.js dependencies
npm install

# Install Prisma packages (ถ้ายังไม่มี)
npm install @prisma/client @prisma/adapter-pg pg

# Generate Prisma Client
npx prisma generate
```

---

### **Step 8: Start Database Container**

```bash
# Start เฉพาะ database ก่อน
docker-compose up -d db

# รอให้ database พร้อม
sleep 10

# ตรวจสอบว่า database รันอยู่
docker ps | grep hopnic-postgres
docker logs hopnic-postgres
```

---

### **Step 9: Run Database Migrations**

```bash
# Apply database schema
npx prisma migrate deploy

# ตรวจสอบว่า migrate สำเร็จ
# ควรเห็น: "All migrations have been successfully applied"
```

---

### **Step 10: Build Application**

```bash
# Build SvelteKit application
npm run build

# ตรวจสอบว่า build สำเร็จ
ls -la build/
```

---

### **Step 11: Start Application Container**

```bash
# Start ทั้ง app และ db
docker-compose up -d --build

# ตรวจสอบว่าทั้ง 2 containers รันอยู่
docker ps

# ดู logs
docker logs hopnic-app
docker logs hopnic-postgres
```

---

### **Step 12: ตรวจสอบว่า Application ทำงาน**

```bash
# Test locally
curl http://localhost:3000

# ควรได้ HTML response
```

---

### **Step 13: อัพเดท Nginx Configuration (ถ้าจำเป็น)**

ตรวจสอบว่า Nginx config ยังถูกต้องอยู่:

```bash
# ดู config ปัจจุบัน
cat /etc/nginx/sites-available/hopnic

# ควรมี proxy_pass ไปที่ http://localhost:3000
```

ถ้าต้องการแก้ไข:

```bash
nano /etc/nginx/sites-available/hopnic
```

Config ที่ถูกต้อง:

```nginx
server {
    listen 80;
    server_name hopnic.co.th www.hopnic.co.th;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name hopnic.co.th www.hopnic.co.th;

    # SSL Configuration (Certbot จัดการให้)
    ssl_certificate /etc/letsencrypt/live/hopnic.co.th/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/hopnic.co.th/privkey.pem;

    # Proxy to Node.js app
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

    # Static files
    location /static {
        alias /var/www/hopnic/static;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Uploaded files
    location /uploads {
        alias /var/www/hopnic/static/uploads;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Restart Nginx:

```bash
nginx -t
systemctl restart nginx
```

---

### **Step 14: ทดสอบเว็บไซต์**

```bash
# Test HTTPS
curl https://hopnic.co.th

# เปิดเบราว์เซอร์
# https://hopnic.co.th
# https://hopnic.co.th/portfolio
# https://hopnic.co.th/login
# https://hopnic.co.th/dashboard
```

---

## ✅ Checklist

- [ ] Backup ข้อมูลเดิม
- [ ] Pull code ใหม่
- [ ] สร้าง .env (USE_MOCK_DATA=false)
- [ ] อัพเดท docker-compose.yml (เพิ่ม db service)
- [ ] Stop containers เดิม
- [ ] Install dependencies
- [ ] Start database
- [ ] Run migrations
- [ ] Build application
- [ ] Start containers
- [ ] Test application
- [ ] ตรวจสอบ Nginx config
- [ ] Test HTTPS

---

## 🔧 Troubleshooting

### **ปัญหา: Database connection error**

```bash
# ตรวจสอบว่า database รันอยู่
docker ps | grep postgres

# ดู logs
docker logs hopnic-postgres

# ตรวจสอบ DATABASE_URL ใน .env
cat .env | grep DATABASE_URL
# ต้องเป็น: postgresql://hopnic:password@localhost:5432/hopnic_db
```

### **ปัญหา: Port 3000 ถูกใช้งานอยู่**

```bash
# ดูว่าอะไรใช้ port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### **ปัญหา: Nginx 502 Bad Gateway**

```bash
# ตรวจสอบว่า app container รันอยู่
docker ps | grep hopnic-app

# ดู logs
docker logs hopnic-app

# Restart containers
docker-compose restart
```

### **ปัญหา: SSL Certificate หมดอายุ**

```bash
# Renew certificate
certbot renew

# Restart Nginx
systemctl restart nginx
```

---

## 🔄 การ Update ครั้งต่อไป

เมื่อมีการแก้ไขโค้ด:

```bash
# 1. SSH เข้า server
ssh root@hopnic.co.th

# 2. Pull code ใหม่
cd /var/www/hopnic
git pull

# 3. Install dependencies (ถ้ามี)
npm install

# 4. Run migrations (ถ้ามี)
npx prisma migrate deploy

# 5. Rebuild และ restart
docker-compose up -d --build

# 6. ตรวจสอบ logs
docker logs hopnic-app
```

---

## 📊 Useful Commands

```bash
# ดู containers ที่รันอยู่
docker ps

# ดู logs
docker logs hopnic-app
docker logs hopnic-postgres

# Restart containers
docker-compose restart

# Stop containers
docker-compose down

# Start containers
docker-compose up -d

# Rebuild และ start
docker-compose up -d --build

# เข้า database shell
docker exec -it hopnic-postgres psql -U hopnic -d hopnic_db

# Backup database
docker exec hopnic-postgres pg_dump -U hopnic hopnic_db > backup.sql

# Restore database
docker exec -i hopnic-postgres psql -U hopnic hopnic_db < backup.sql
```

---

**Status:** ✅ **READY TO UPDATE**

ทำตามขั้นตอนทีละขั้นตอน ระวังอย่าข้ามขั้นตอนใดๆ! 🚀

