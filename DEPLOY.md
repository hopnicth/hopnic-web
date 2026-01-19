# 🚀 HOPNIC - Docker Deployment Guide

**Platform:** DigitalOcean VPS  
**Method:** Docker-Based (ไม่ต้องลง Node.js/npm)  
**Database:** PostgreSQL 16 (Container)  
**Domain:** https://hopnic.co.th

---

## 📋 Prerequisites

- ✅ Ubuntu 22.04+ VPS
- ✅ Docker & Docker Compose
- ✅ Domain → VPS IP
- ✅ Git installed

---

## 🚀 Quick Deploy (10 Steps)

### **1. SSH to Server**

```bash
ssh root@your-server-ip
```

### **2. Install Docker**

```bash
apt update && apt upgrade -y
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
apt install docker-compose -y
```

### **3. Clone Code**

```bash
mkdir -p /var/www && cd /var/www
git clone YOUR_REPO_URL hopnic
cd hopnic
```

### **4. Create .env**

```bash
nano .env
```

Copy this:

```env
USE_MOCK_DATA=false
POSTGRES_USER=hopnic
POSTGRES_PASSWORD=CHANGE_ME_STRONG_PASSWORD
POSTGRES_DB=hopnic_db
ADMIN_PASSWORD=CHANGE_ME_ADMIN_PASSWORD
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
ORIGIN=https://hopnic.co.th
PUBLIC_SITE_URL=https://hopnic.co.th
PUBLIC_SITE_NAME=HOPNIC CO., LTD.
```

**Save:** Ctrl+O, Enter, Ctrl+X

### **5. Build & Start**

```bash
docker-compose build
docker-compose up -d
docker ps
```

### **6. Run Migrations**

```bash
docker-compose exec app npx prisma migrate deploy
```

### **7. Test**

```bash
curl http://localhost:3000
```

### **8. Install Nginx**

```bash
apt install nginx -y
nano /etc/nginx/sites-available/hopnic
```

Copy this:

```nginx
server {
    listen 80;
    server_name hopnic.co.th www.hopnic.co.th;

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
}
```

**Save and enable:**

```bash
ln -s /etc/nginx/sites-available/hopnic /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx
```

### **9. Install SSL**

```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d hopnic.co.th -d www.hopnic.co.th
```

### **10. Update ORIGIN**

```bash
nano .env
# Change: ORIGIN=https://hopnic.co.th
docker-compose restart
```

---

## ✅ Done!

Visit: https://hopnic.co.th

Login: https://hopnic.co.th/login (use ADMIN_PASSWORD)

---

## 🔄 Update

```bash
cd /var/www/hopnic
git pull
docker-compose down
docker-compose build --no-cache
docker-compose up -d
docker-compose exec app npx prisma migrate deploy
```

---

## 🔧 Commands

```bash
# Logs
docker logs -f hopnic-website
docker logs -f hopnic-db

# Restart
docker-compose restart

# Stop
docker-compose down

# Backup DB
docker exec hopnic-db pg_dump -U hopnic hopnic_db > backup.sql
```

---

**Time:** ~20 minutes  
**Status:** ✅ READY

