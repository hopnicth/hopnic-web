# 🚀 VPS Setup Guide - HOPNIC Website (DigitalOcean Docker)

## ข้อมูลที่คุณมีแล้ว:

- ✅ Domain: hopnic.co.th
- ✅ DNS ตั้งค่าแล้ว (A Record → VPS IP)
- ✅ **DigitalOcean Docker Droplet** (Docker ติดตั้งมาให้แล้ว!)

---

## 📋 ขั้นตอนการ Deploy บน DigitalOcean

### Step 1: เชื่อมต่อ Droplet

```bash
# ใช้ IP ที่ได้จาก DigitalOcean
ssh root@your-droplet-ip

# ตัวอย่าง:
# ssh root@159.223.45.123
```

---

### Step 2: ตรวจสอบ Docker (ติดตั้งมาให้แล้ว!)

```bash
# ตรวจสอบ Docker version
docker --version
docker-compose --version

# ถ้ายังไม่มี docker-compose ให้ติดตั้ง
sudo apt update
sudo apt install docker-compose -y

# ตรวจสอบว่า Docker ทำงาน
docker ps
```

**✅ ข้ามขั้นตอนติดตั้ง Docker ได้เลย!**

---

### Step 3: Clone โปรเจค

```bash
# สร้างโฟลเดอร์
sudo mkdir -p /var/www/hopnic
sudo chown -R $USER:$USER /var/www/hopnic

# Clone repository
cd /var/www/hopnic
git clone <your-repo-url> .

# หรือถ้าไม่มี Git ให้ใช้ SCP/SFTP upload ไฟล์ขึ้นไป
```

---

### Step 4: ตั้งค่า Environment Variables

```bash
# สร้างไฟล์ .env
nano .env
```

เพิ่มเนื้อหา:

```bash
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
ORIGIN=https://hopnic.co.th
```

กด `Ctrl+X` → `Y` → `Enter` เพื่อบันทึก

---

### Step 5: Build และ Run Docker

```bash
# Build image
docker-compose build

# Run container
docker-compose up -d

# ตรวจสอบว่า container ทำงาน
docker ps

# ดู logs
docker logs -f hopnic-website
```

---

### Step 6: ติดตั้ง Nginx (Reverse Proxy)

```bash
# ติดตั้ง Nginx
sudo apt install nginx -y

# สร้าง config file
sudo nano /etc/nginx/sites-available/hopnic
```

เพิ่มเนื้อหา:

```nginx
server {
    listen 80;
    server_name hopnic.co.th www.hopnic.co.th;

    # Redirect to HTTPS (จะเปิดใช้หลังติดตั้ง SSL)
    # return 301 https://$server_name$request_uri;

    # ใช้ชั่วคราวก่อนมี SSL
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

กด `Ctrl+X` → `Y` → `Enter`

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/hopnic /etc/nginx/sites-enabled/

# ลบ default site
sudo rm /etc/nginx/sites-enabled/default

# ทดสอบ config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

---

### Step 7: ติดตั้ง SSL Certificate (Let's Encrypt - ฟรี)

```bash
# ติดตั้ง Certbot
sudo apt install certbot python3-certbot-nginx -y

# ขอ SSL certificate
sudo certbot --nginx -d hopnic.co.th -d www.hopnic.co.th

# ตอบคำถาม:
# - Email: ใส่ email ของคุณ
# - Terms: A (Agree)
# - Redirect HTTP to HTTPS: 2 (Yes)
```

Certbot จะ:

- ติดตั้ง SSL certificate อัตโนมัติ
- แก้ไข Nginx config ให้
- ตั้ง auto-renewal

---

### Step 8: อัพเดท ORIGIN ใน docker-compose.yml

```bash
cd /var/www/hopnic
nano docker-compose.yml
```

เปลี่ยน:

```yaml
- ORIGIN=http://hopnic.co.th
```

เป็น:

```yaml
- ORIGIN=https://hopnic.co.th
```

```bash
# Restart container
docker-compose down
docker-compose up -d
```

---

### Step 9: ตั้งค่า Firewall

```bash
# ติดตั้ง UFW
sudo apt install ufw -y

# อนุญาต SSH, HTTP, HTTPS
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# เปิดใช้งาน
sudo ufw enable

# ตรวจสอบ
sudo ufw status
```

---

### Step 10: ทดสอบ

เปิดเบราว์เซอร์:

- http://hopnic.co.th (จะ redirect ไป https://)
- https://hopnic.co.th ✅

---

## 🔄 การอัพเดทเว็บไซต์

```bash
# 1. SSH เข้า VPS
ssh your-username@your-vps-ip

# 2. ไปที่โฟลเดอร์โปรเจค
cd /var/www/hopnic

# 3. Pull code ใหม่
git pull origin main

# 4. Rebuild และ Restart
docker-compose down
docker-compose build
docker-compose up -d

# 5. ตรวจสอบ
docker logs -f hopnic-website
```

---

## 🛠️ คำสั่งที่ใช้บ่อย

```bash
# ดู container ที่ทำงาน
docker ps

# ดู logs
docker logs -f hopnic-website

# Restart container
docker-compose restart

# Stop container
docker-compose down

# Start container
docker-compose up -d

# Rebuild image
docker-compose build --no-cache

# ดู Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Restart Nginx
sudo systemctl restart nginx

# ตรวจสอบ SSL certificate
sudo certbot certificates

# Renew SSL (auto ทุก 60 วัน)
sudo certbot renew --dry-run
```

---

## 🔍 Troubleshooting

### ปัญหา: Container ไม่ทำงาน

```bash
# ดู logs
docker logs hopnic-website

# ดู error
docker-compose logs
```

### ปัญหา: Port 80/443 ถูกใช้งาน

```bash
# หา process ที่ใช้ port
sudo lsof -i :80
sudo lsof -i :443

# Stop Apache (ถ้ามี)
sudo systemctl stop apache2
sudo systemctl disable apache2
```

### ปัญหา: SSL ไม่ทำงาน

```bash
# ตรวจสอบ Nginx config
sudo nginx -t

# ดู Nginx error log
sudo tail -f /var/log/nginx/error.log

# Renew SSL
sudo certbot renew --force-renewal
```

### ปัญหา: Website ช้า

```bash
# เพิ่ม Gzip compression ใน Nginx
sudo nano /etc/nginx/nginx.conf

# เพิ่มใน http block:
gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_types text/plain text/css text/xml text/javascript
           application/json application/javascript application/xml+rss;

# Restart Nginx
sudo systemctl restart nginx
```

---

## 📊 Monitoring

### ติดตั้ง PM2 (Optional - สำหรับ monitoring)

```bash
# ติดตั้ง Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# ติดตั้ง PM2
sudo npm install -g pm2

# Monitor Docker container
pm2 start "docker logs -f hopnic-website" --name hopnic-logs
pm2 save
pm2 startup
```

---

## ✅ Checklist

- [ ] SSH เข้า VPS ได้
- [ ] ติดตั้ง Docker & Docker Compose
- [ ] Clone โปรเจค
- [ ] Build และ Run Docker container
- [ ] ติดตั้ง Nginx
- [ ] ติดตั้ง SSL certificate
- [ ] อัพเดท ORIGIN เป็น https://
- [ ] ตั้งค่า Firewall
- [ ] ทดสอบเว็บไซต์ที่ https://hopnic.co.th
- [ ] ตั้งค่า auto-renewal SSL

---

## 🎉 เสร็จแล้ว!

เว็บไซต์ของคุณพร้อมใช้งานแล้วที่: **https://hopnic.co.th**
