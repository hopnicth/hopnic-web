# ⚡ DigitalOcean Quick Reference - HOPNIC

## 🚀 Deploy ครั้งแรก (Copy & Paste)

```bash
# 1. SSH เข้า Droplet
ssh root@your-droplet-ip

# 2. Clone โปรเจค
mkdir -p /var/www/hopnic && cd /var/www/hopnic
git clone <your-repo-url> .

# 3. Build และ Run
docker-compose build
docker-compose up -d

# 4. ติดตั้ง Nginx
apt update && apt install nginx -y

# 5. สร้าง Nginx config
cat > /etc/nginx/sites-available/hopnic << 'EOF'
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
EOF

# 6. Enable site
ln -s /etc/nginx/sites-available/hopnic /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx

# 7. ติดตั้ง SSL
apt install certbot python3-certbot-nginx -y
certbot --nginx -d hopnic.co.th -d www.hopnic.co.th

# 8. อัพเดท ORIGIN
sed -i 's|http://hopnic.co.th|https://hopnic.co.th|g' /var/www/hopnic/docker-compose.yml
docker-compose down && docker-compose up -d

# 9. ตั้งค่า Firewall
apt install ufw -y
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# ✅ เสร็จแล้ว!
echo "🎉 Website is live at https://hopnic.co.th"
```

---

## 🔄 Update เว็บไซต์

```bash
ssh root@your-droplet-ip
cd /var/www/hopnic
git pull
docker-compose down
docker-compose build
docker-compose up -d
docker logs -f hopnic-website
```

---

## 🛠️ คำสั่งที่ใช้บ่อย

### Docker

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

# ดู resource usage
docker stats hopnic-website
```

### Nginx

```bash
# Test config
nginx -t

# Restart
systemctl restart nginx

# ดู logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# ดู status
systemctl status nginx
```

### SSL

```bash
# ดู certificates
certbot certificates

# Renew (auto ทุก 60 วัน)
certbot renew

# Force renew
certbot renew --force-renewal

# Test auto-renewal
certbot renew --dry-run
```

### System

```bash
# ดู resource usage
htop

# ดู disk usage
df -h

# ดู memory
free -h

# ดู processes
ps aux | grep node

# Reboot
reboot
```

---

## 🔍 Troubleshooting

### Website ไม่แสดง

```bash
# 1. ตรวจสอบ container
docker ps
docker logs hopnic-website

# 2. ตรวจสอบ Nginx
systemctl status nginx
nginx -t

# 3. ตรวจสอบ port
netstat -tulpn | grep :80
netstat -tulpn | grep :3000

# 4. ตรวจสอบ firewall
ufw status
```

### SSL Error

```bash
# 1. ตรวจสอบ certificate
certbot certificates

# 2. Renew
certbot renew --force-renewal

# 3. Restart Nginx
systemctl restart nginx

# 4. ตรวจสอบ DNS
nslookup hopnic.co.th
```

### Container ไม่ทำงาน

```bash
# 1. ดู logs
docker logs hopnic-website

# 2. ดู error
docker-compose logs

# 3. Restart
docker-compose restart

# 4. Rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

---

## 📊 Monitoring

### ติดตั้ง DigitalOcean Agent

```bash
curl -sSL https://repos.insights.digitalocean.com/install.sh | sudo bash
```

ดู metrics ที่: DigitalOcean Dashboard → Droplet → Monitoring

---

## 🔐 Security

### เปลี่ยน SSH Port

```bash
# แก้ไข SSH config
nano /etc/ssh/sshd_config

# เปลี่ยน Port 22 เป็น 2222
Port 2222

# Restart SSH
systemctl restart sshd

# เพิ่ม port ใน Firewall
ufw allow 2222/tcp
```

### ติดตั้ง Fail2Ban

```bash
apt install fail2ban -y
systemctl enable fail2ban
systemctl start fail2ban
```

---

## 💾 Backup

### Backup ด้วย DigitalOcean Snapshots

1. ไปที่ DigitalOcean Dashboard
2. เลือก Droplet
3. กด "Snapshots"
4. กด "Take Snapshot"

**ราคา:** $0.05/GB/เดือน

### Backup แบบ Manual

```bash
# Backup database (ถ้ามี)
# mysqldump -u root -p database_name > backup.sql

# Backup files
tar -czf hopnic-backup-$(date +%Y%m%d).tar.gz /var/www/hopnic

# Download ไปเครื่องตัวเอง
# scp root@your-droplet-ip:/root/hopnic-backup-*.tar.gz ./
```

---

## 📞 Support

- 📖 [DigitalOcean Deploy Guide](./DIGITALOCEAN-DEPLOY.md)
- 📖 [VPS Setup Guide](./VPS-SETUP.md)
- 🌊 [DigitalOcean Docs](https://docs.digitalocean.com/)
- 💬 [DigitalOcean Community](https://www.digitalocean.com/community)

---

## 💰 ค่าใช้จ่าย

| Item | ราคา/เดือน |
|------|------------|
| Droplet (1GB) | $6 |
| Bandwidth (1TB) | ฟรี |
| SSL Certificate | ฟรี (Let's Encrypt) |
| Domain | ~$10-15/ปี |
| **รวม** | **~$6/เดือน** |

---

**🎉 Happy Deploying!**

