# ✅ พร้อม Deploy แล้ว! - HOPNIC Website

## 🎯 สถานะปัจจุบัน

- ✅ **Docker Setup**: ถูกต้องแล้ว
- ✅ **Adapter**: เปลี่ยนเป็น `adapter-node` แล้ว
- ✅ **Build**: ผ่านแล้ว
- ✅ **Domain**: hopnic.co.th (DNS ตั้งค่าแล้ว)
- ✅ **DigitalOcean**: Docker Droplet พร้อมแล้ว (Docker ติดตั้งมาให้แล้ว!)

---

## 🚀 ขั้นตอนการ Deploy (เลือก 1 วิธี)

### 🎯 วิธีที่ 1: Deploy บน DigitalOcean (แนะนำ - ง่ายที่สุด!)

#### A. Setup ครั้งแรก (5 นาทีเสร็จ!)

อ่านคู่มือละเอียดใน **[DIGITALOCEAN-DEPLOY.md](./DIGITALOCEAN-DEPLOY.md)**

**Quick Deploy (Copy & Paste):**

```bash
# 1. SSH เข้า Droplet
ssh root@your-droplet-ip

# 2. Clone โปรเจค
mkdir -p /var/www/hopnic && cd /var/www/hopnic
git clone <your-repo-url> .

# 3. Build และ Run (Docker ติดตั้งมาให้แล้ว!)
docker-compose build
docker-compose up -d

# 4. ติดตั้ง Nginx
apt update && apt install nginx -y
# (ดูรายละเอียดใน DIGITALOCEAN-DEPLOY.md)

# 5. ติดตั้ง SSL (Let's Encrypt - ฟรี)
apt install certbot python3-certbot-nginx -y
certbot --nginx -d hopnic.co.th -d www.hopnic.co.th

# 6. อัพเดท ORIGIN
sed -i 's|http://hopnic.co.th|https://hopnic.co.th|g' docker-compose.yml
docker-compose down && docker-compose up -d
```

**✅ เสร็จแล้ว!** https://hopnic.co.th

#### B. Deploy/Update ครั้งต่อไป

```bash
# วิธีที่ 1: ใช้สคริปต์ (แก้ไข VPS_HOST ก่อน)
./scripts/deploy-vps.sh

# วิธีที่ 2: Manual
ssh root@your-vps-ip
cd /var/www/hopnic
git pull
docker-compose down
docker-compose build
docker-compose up -d
```

---

### 🐳 วิธีที่ 2: ทดสอบ Docker ในเครื่อง

```bash
# Build และ Run
docker-compose build
docker-compose up -d

# ดู logs
docker logs -f hopnic-website

# ทดสอบที่
http://localhost:80
```

---

## 📋 ไฟล์สำคัญที่แก้ไขแล้ว

### 1. `svelte.config.js`

```javascript
// เปลี่ยนจาก adapter-auto เป็น adapter-node
import adapter from "@sveltejs/adapter-node";
```

### 2. `docker-compose.yml`

```yaml
services:
  app:
    build: . # ✅ ใช้ Dockerfile
    restart: always # ✅ Auto restart
    ports:
      - "80:3000" # ✅ Port 80 → 3000
    environment:
      - NODE_ENV=production # ✅ Production mode
      - ORIGIN=https://hopnic.co.th # ✅ Domain
```

### 3. `Dockerfile`

```dockerfile
# Multi-stage build
FROM node:20-alpine AS builder
# ... build stage ...

FROM node:20-alpine
# ... production stage ...
CMD ["node", "build"]  # ✅ Run Node.js server
```

---

## 🔧 Environment Variables

สร้างไฟล์ `.env` บน VPS:

```bash
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
ORIGIN=https://hopnic.co.th
```

---

## 🌐 DNS Configuration

ตรวจสอบว่า DNS ตั้งค่าถูกต้อง:

```
Type: A
Name: @
Value: <VPS-IP>
TTL: 3600

Type: A
Name: www
Value: <VPS-IP>
TTL: 3600
```

ทดสอบ DNS:

```bash
nslookup hopnic.co.th
dig hopnic.co.th
```

---

## 🔒 SSL Certificate (Let's Encrypt)

```bash
# ติดตั้ง Certbot
sudo apt install certbot python3-certbot-nginx -y

# ขอ SSL certificate
sudo certbot --nginx -d hopnic.co.th -d www.hopnic.co.th

# Auto-renewal (ทุก 60 วัน)
sudo certbot renew --dry-run
```

---

## 🛠️ คำสั่งที่ใช้บ่อย

### บน VPS:

```bash
# ดู container
docker ps

# ดู logs
docker logs -f hopnic-website

# Restart
docker-compose restart

# Stop
docker-compose down

# Start
docker-compose up -d

# Rebuild
docker-compose build --no-cache
docker-compose up -d

# ดู Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### บนเครื่องตัวเอง:

```bash
# Build
npm run build

# Test locally
npm run preview

# Deploy to VPS
./scripts/deploy-vps.sh
```

---

## 📊 Monitoring

### ตรวจสอบสถานะ:

```bash
# Container status
docker ps

# Resource usage
docker stats hopnic-website

# Logs
docker logs --tail 100 -f hopnic-website

# Nginx status
sudo systemctl status nginx
```

---

## 🔍 Troubleshooting

### ปัญหา: Build ไม่ผ่าน

```bash
# ลบ cache
rm -rf .svelte-kit node_modules
npm install
npm run build
```

### ปัญหา: Container ไม่ทำงาน

```bash
# ดู logs
docker logs hopnic-website

# ดู error
docker-compose logs

# Restart
docker-compose restart
```

### ปัญหา: Website ไม่แสดง

```bash
# ตรวจสอบ Nginx
sudo nginx -t
sudo systemctl status nginx

# ตรวจสอบ Firewall
sudo ufw status

# ตรวจสอบ Port
sudo lsof -i :80
sudo lsof -i :443
```

### ปัญหา: SSL ไม่ทำงาน

```bash
# ตรวจสอบ certificate
sudo certbot certificates

# Renew
sudo certbot renew --force-renewal

# Restart Nginx
sudo systemctl restart nginx
```

---

## ✅ Checklist ก่อน Deploy

- [ ] Build ผ่าน: `npm run build`
- [ ] Docker build ผ่าน: `docker-compose build`
- [ ] DNS ตั้งค่าแล้ว (A Record → VPS IP)
- [ ] VPS พร้อมแล้ว (Docker + Docker Compose ติดตั้งแล้ว)
- [ ] `.env` ตั้งค่าแล้วบน VPS
- [ ] Nginx ติดตั้งและตั้งค่าแล้ว
- [ ] SSL certificate ติดตั้งแล้ว
- [ ] Firewall ตั้งค่าแล้ว (port 80, 443)
- [ ] ทดสอบ https://hopnic.co.th

---

## 🎉 เสร็จแล้ว!

หลังจาก deploy สำเร็จ เว็บไซต์จะพร้อมใช้งานที่:

**🌐 https://hopnic.co.th**

---

## 📞 ต้องการความช่วยเหลือ?

- 📖 [VPS Setup Guide](./VPS-SETUP.md) - คู่มือ setup VPS แบบละเอียด
- 📖 [Deployment Guide](./DEPLOYMENT.md) - คู่มือ deploy ทุกวิธี
- 📖 [Quick Start](./QUICKSTART.md) - เริ่มต้นใช้งานอย่างรวดเร็ว

---

**Good luck! 🚀**
