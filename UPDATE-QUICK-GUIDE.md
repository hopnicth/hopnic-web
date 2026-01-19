# 🚀 Quick Update Guide - Phase 1 → Phase 2

**สำหรับ:** DigitalOcean VPS (https://hopnic.co.th)  
**เวลาที่ใช้:** ~15-20 นาที

---

## 📦 สิ่งที่ต้องเตรียม

1. ✅ SSH Access ไปยัง server
2. ✅ Code ใหม่ (Phase 2) พร้อม push ไป Git
3. ✅ รหัสผ่านที่แข็งแรงสำหรับ:
   - Database (POSTGRES_PASSWORD)
   - Admin Dashboard (ADMIN_PASSWORD)

---

## ⚡ Quick Update (3 Commands)

### **วิธีที่ 1: ใช้ Script อัตโนมัติ (แนะนำ)**

```bash
# 1. SSH เข้า server
ssh root@hopnic.co.th

# 2. ไปที่ directory
cd /var/www/hopnic

# 3. Pull code ใหม่
git pull

# 4. Run update script
./scripts/update-production.sh
```

**เท่านี้เสร็จ!** 🎉

---

### **วิธีที่ 2: Manual Update**

```bash
# 1. SSH เข้า server
ssh root@hopnic.co.th
cd /var/www/hopnic

# 2. Backup
mkdir -p backups/$(date +%Y%m%d)
cp docker-compose.yml backups/$(date +%Y%m%d)/
cp .env backups/$(date +%Y%m%d)/

# 3. Pull code
git pull

# 4. สร้าง/แก้ไข .env
cp .env.production.example .env
nano .env
# แก้:
# - USE_MOCK_DATA=false
# - POSTGRES_PASSWORD=your-strong-password
# - ADMIN_PASSWORD=your-admin-password
# - DATABASE_URL=postgresql://hopnic:your-strong-password@localhost:5432/hopnic_db

# 5. Stop containers เดิม
docker-compose down

# 6. Install & Build
npm install
npx prisma generate
npm run build

# 7. Start database
docker-compose up -d db
sleep 15

# 8. Run migrations
npx prisma migrate deploy

# 9. Start all
docker-compose up -d --build

# 10. Restart Nginx
nginx -t
systemctl restart nginx

# 11. ตรวจสอบ
docker ps
curl http://localhost:3000
```

---

## ✅ ตรวจสอบว่าสำเร็จ

### **1. ตรวจสอบ Containers:**

```bash
docker ps
```

ควรเห็น:
- ✅ `hopnic-app` (running)
- ✅ `hopnic-postgres` (running)

### **2. ตรวจสอบ Logs:**

```bash
# App logs
docker logs hopnic-app

# Database logs
docker logs hopnic-postgres
```

ไม่ควรมี error สีแดง

### **3. ทดสอบเว็บไซต์:**

เปิดเบราว์เซอร์:
- ✅ https://hopnic.co.th (หน้าแรก)
- ✅ https://hopnic.co.th/portfolio (Portfolio)
- ✅ https://hopnic.co.th/login (Login)
- ✅ https://hopnic.co.th/dashboard (Dashboard - ต้อง login ก่อน)

---

## 🔧 ถ้ามีปัญหา

### **ปัญหา: Database connection error**

```bash
# ตรวจสอบ database
docker ps | grep postgres
docker logs hopnic-postgres

# Restart database
docker-compose restart db
sleep 10
npx prisma migrate deploy
docker-compose restart app
```

### **ปัญหา: 502 Bad Gateway**

```bash
# ตรวจสอบ app
docker logs hopnic-app

# Restart all
docker-compose restart
systemctl restart nginx
```

### **ปัญหา: Port conflict**

```bash
# ดูว่าอะไรใช้ port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Restart
docker-compose restart
```

---

## 📝 สิ่งที่เปลี่ยนแปลง

### **Phase 1 → Phase 2:**

| Feature | Phase 1 | Phase 2 |
|---------|---------|---------|
| Database | ❌ ไม่มี | ✅ PostgreSQL |
| Portfolio | ❌ Static | ✅ Dynamic (CRUD) |
| Admin | ❌ ไม่มี | ✅ Dashboard |
| Upload | ❌ ไม่มี | ✅ Image Upload |
| Auth | ❌ ไม่มี | ✅ Password Auth |

### **docker-compose.yml:**

```yaml
# Phase 1: มีแค่ app
services:
  app:
    ...

# Phase 2: มีทั้ง app + db
services:
  app:
    ...
    depends_on:
      - db
  
  db:  # ← NEW!
    image: postgres:16-alpine
    ...
```

---

## 🔄 การ Update ครั้งต่อไป

เมื่อมีการแก้ไขโค้ด:

```bash
# 1. SSH
ssh root@hopnic.co.th
cd /var/www/hopnic

# 2. Pull
git pull

# 3. Update
npm install
npx prisma migrate deploy  # ถ้ามี migration ใหม่
docker-compose up -d --build

# 4. ตรวจสอบ
docker logs hopnic-app
```

---

## 💾 Backup & Restore

### **Backup Database:**

```bash
# Backup
docker exec hopnic-postgres pg_dump -U hopnic hopnic_db > backup-$(date +%Y%m%d).sql

# Download to local
scp root@hopnic.co.th:/var/www/hopnic/backup-*.sql ./
```

### **Restore Database:**

```bash
# Upload backup
scp backup.sql root@hopnic.co.th:/var/www/hopnic/

# Restore
docker exec -i hopnic-postgres psql -U hopnic hopnic_db < backup.sql
```

---

## 📊 Monitoring

### **ดู Logs แบบ Real-time:**

```bash
# App logs
docker logs -f hopnic-app

# Database logs
docker logs -f hopnic-postgres

# Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### **ดู Resource Usage:**

```bash
# Docker stats
docker stats

# System resources
htop
```

---

## 🎯 Next Steps

หลังจาก Update สำเร็จ:

1. ✅ **Login ไปที่ Dashboard:**
   - https://hopnic.co.th/login
   - ใช้ ADMIN_PASSWORD ที่ตั้งไว้

2. ✅ **เพิ่ม Project แรก:**
   - ไปที่ Dashboard → Projects
   - คลิก "Create Project"
   - Upload รูปภาพ
   - Save

3. ✅ **ตรวจสอบ Portfolio:**
   - https://hopnic.co.th/portfolio
   - ควรเห็น project ที่เพิ่ม

4. ✅ **Setup Backup Schedule:**
   - ตั้ง cron job สำหรับ backup database
   - Backup ทุกวันเวลา 2:00 AM

---

## 📚 เอกสารเพิ่มเติม

- **[UPDATE-DEPLOYMENT.md](./UPDATE-DEPLOYMENT.md)** - คู่มือแบบละเอียด
- **[DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)** - คู่มือ Deploy ใหม่ทั้งหมด
- **[QUICK-START.md](./QUICK-START.md)** - คู่มือ Development

---

**Status:** ✅ **READY TO UPDATE**

ใช้เวลาแค่ 15-20 นาที! 🚀

