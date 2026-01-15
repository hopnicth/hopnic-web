# 🌊 DigitalOcean Quick Deploy - HOPNIC Website

## 🎯 สิ่งที่คุณมีแล้ว:
- ✅ DigitalOcean Docker Droplet
- ✅ Domain: hopnic.co.th
- ✅ DNS ตั้งค่าแล้ว

---

## ⚡ Quick Deploy (5 นาทีเสร็จ!)

### Step 1: SSH เข้า Droplet

```bash
ssh root@your-droplet-ip
```

---

### Step 2: Clone โปรเจค

```bash
# สร้างโฟลเดอร์
mkdir -p /var/www/hopnic
cd /var/www/hopnic

# Clone (แทน <your-repo-url> ด้วย Git URL ของคุณ)
git clone <your-repo-url> .

# หรือถ้าไม่มี Git ให้ใช้ SCP upload จากเครื่องตัวเอง:
# scp -r ./* root@your-droplet-ip:/var/www/hopnic/
```

---

### Step 3: Build และ Run Docker

```bash
cd /var/www/hopnic

# Build image
docker-compose build

# Run container
docker-compose up -d

# ตรวจสอบ
docker ps
docker logs -f hopnic-website
```

**✅ เว็บไซต์ทำงานแล้วที่ Port 80!**

ทดสอบ: http://your-droplet-ip

---

### Step 4: ติดตั้ง Nginx (Reverse Proxy)

```bash
# ติดตั้ง Nginx
apt update
apt install nginx -y

# สร้าง config
nano /etc/nginx/sites-available/hopnic
```

วาง config นี้:

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
ln -s /etc/nginx/sites-available/hopnic /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default

# Test และ Restart
nginx -t
systemctl restart nginx
```

**✅ ทดสอบ:** http://hopnic.co.th

---

### Step 5: ติดตั้ง SSL (Let's Encrypt - ฟรี)

```bash
# ติดตั้ง Certbot
apt install certbot python3-certbot-nginx -y

# ขอ SSL certificate
certbot --nginx -d hopnic.co.th -d www.hopnic.co.th
```

**ตอบคำถาม:**
- Email: ใส่ email ของคุณ
- Terms: `A` (Agree)
- Redirect HTTP to HTTPS: `2` (Yes)

**✅ เสร็จแล้ว!** ทดสอบ: https://hopnic.co.th

---

### Step 6: อัพเดท ORIGIN ใน docker-compose.yml

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

### Step 7: ตั้งค่า Firewall (DigitalOcean)

```bash
# ติดตั้ง UFW
apt install ufw -y

# อนุญาต SSH, HTTP, HTTPS
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp

# เปิดใช้งาน
ufw enable

# ตรวจสอบ
ufw status
```

**หรือตั้งค่าผ่าน DigitalOcean Dashboard:**
1. ไปที่ Networking → Firewalls
2. Create Firewall
3. เพิ่ม Rules:
   - SSH (22)
   - HTTP (80)
   - HTTPS (443)

---

## 🎉 เสร็จแล้ว!

เว็บไซต์พร้อมใช้งานที่: **https://hopnic.co.th**

---

## 🔄 การอัพเดทเว็บไซต์

```bash
# 1. SSH เข้า Droplet
ssh root@your-droplet-ip

# 2. ไปที่โฟลเดอร์
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

# ดู Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Restart Nginx
systemctl restart nginx

# ตรวจสอบ SSL
certbot certificates

# Renew SSL (auto ทุก 60 วัน)
certbot renew --dry-run
```

---

## 🔍 Troubleshooting

### ปัญหา: Port 80 ถูกใช้งาน

```bash
# หา process
lsof -i :80

# ถ้าเป็น Apache ให้ stop
systemctl stop apache2
systemctl disable apache2
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

### ปัญหา: SSL ไม่ทำงาน

```bash
# ตรวจสอบ Nginx config
nginx -t

# ดู error log
tail -f /var/log/nginx/error.log

# Renew SSL
certbot renew --force-renewal
systemctl restart nginx
```

---

## 📊 Monitoring

### ตรวจสอบ Resource Usage

```bash
# CPU, Memory, Disk
htop

# Docker stats
docker stats hopnic-website

# Disk usage
df -h

# Memory usage
free -h
```

### ติดตั้ง Monitoring (Optional)

```bash
# ติดตั้ง DigitalOcean Agent
curl -sSL https://repos.insights.digitalocean.com/install.sh | sudo bash

# ดู metrics ที่ DigitalOcean Dashboard → Monitoring
```

---

## 💰 ค่าใช้จ่าย DigitalOcean

| Droplet Size | RAM | CPU | Storage | Bandwidth | ราคา/เดือน |
|--------------|-----|-----|---------|-----------|------------|
| Basic | 1GB | 1 vCPU | 25GB SSD | 1TB | $6 |
| Basic | 2GB | 1 vCPU | 50GB SSD | 2TB | $12 |
| Basic | 2GB | 2 vCPU | 60GB SSD | 3TB | $18 |

**แนะนำ:** Basic 1GB ($6/เดือน) เพียงพอสำหรับเว็บไซต์ขนาดเล็ก-กลาง

---

## 🔐 Security Best Practices

### 1. เปลี่ยน SSH Port (Optional)

```bash
nano /etc/ssh/sshd_config

# เปลี่ยน Port 22 เป็น 2222
Port 2222

# Restart SSH
systemctl restart sshd

# อย่าลืมเพิ่ม port ใน Firewall
ufw allow 2222/tcp
```

### 2. ปิด Root Login

```bash
# สร้าง user ใหม่
adduser hopnic
usermod -aG sudo hopnic
usermod -aG docker hopnic

# ปิด root login
nano /etc/ssh/sshd_config

# เปลี่ยนเป็น
PermitRootLogin no

# Restart SSH
systemctl restart sshd
```

### 3. ติดตั้ง Fail2Ban

```bash
apt install fail2ban -y
systemctl enable fail2ban
systemctl start fail2ban
```

---

## ✅ Checklist

- [ ] SSH เข้า Droplet ได้
- [ ] Clone โปรเจค
- [ ] Build และ Run Docker
- [ ] ติดตั้ง Nginx
- [ ] ติดตั้ง SSL certificate
- [ ] อัพเดท ORIGIN เป็น https://
- [ ] ตั้งค่า Firewall
- [ ] ทดสอบ https://hopnic.co.th
- [ ] ตั้งค่า auto-renewal SSL

---

## 📞 Support

- 📖 [VPS Setup Guide](./VPS-SETUP.md)
- 📖 [Deployment Guide](./DEPLOYMENT.md)
- 🌊 [DigitalOcean Docs](https://docs.digitalocean.com/)

---

**🎉 Happy Deploying!**

