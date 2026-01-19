#!/bin/bash

# ================================
# HOPNIC Production Update Script
# For updating from Phase 1 to Phase 2
# ================================

set -e  # Exit on error

echo "🔄 HOPNIC Production Update Script"
echo "=================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if running on server
if [ ! -f "/etc/nginx/nginx.conf" ]; then
    echo -e "${RED}❌ Error: This script should run on the production server${NC}"
    echo "Please SSH to your server first"
    exit 1
fi

# Confirm
echo -e "${YELLOW}⚠️  This will update your production site${NC}"
echo "Current site: https://hopnic.co.th"
echo ""
read -p "Continue? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 0
fi

# Step 1: Backup
echo ""
echo -e "${BLUE}Step 1: Creating backups...${NC}"
BACKUP_DIR="backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

if [ -f "docker-compose.yml" ]; then
    cp docker-compose.yml "$BACKUP_DIR/"
    echo "✅ Backed up docker-compose.yml"
fi

if [ -f ".env" ]; then
    cp .env "$BACKUP_DIR/"
    echo "✅ Backed up .env"
fi

if [ -d "static" ]; then
    tar -czf "$BACKUP_DIR/static.tar.gz" static/
    echo "✅ Backed up static files"
fi

echo -e "${GREEN}✅ Backups created in $BACKUP_DIR${NC}"

# Step 2: Check .env
echo ""
echo -e "${BLUE}Step 2: Checking .env configuration...${NC}"
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env file not found${NC}"
    echo "Creating from .env.production.example..."
    
    if [ -f ".env.production.example" ]; then
        cp .env.production.example .env
        echo -e "${YELLOW}⚠️  Please edit .env and set your passwords:${NC}"
        echo "  - POSTGRES_PASSWORD"
        echo "  - ADMIN_PASSWORD"
        echo "  - DATABASE_URL"
        echo ""
        read -p "Press Enter after editing .env..."
    else
        echo -e "${RED}❌ Error: .env.production.example not found${NC}"
        exit 1
    fi
fi

# Check USE_MOCK_DATA
if grep -q "USE_MOCK_DATA=true" .env; then
    echo -e "${RED}❌ Error: USE_MOCK_DATA is set to true${NC}"
    echo "For production, it must be false"
    echo "Please edit .env and set: USE_MOCK_DATA=false"
    exit 1
fi

echo -e "${GREEN}✅ .env configuration OK${NC}"

# Step 3: Stop containers
echo ""
echo -e "${BLUE}Step 3: Stopping old containers...${NC}"
docker-compose down || true
echo -e "${GREEN}✅ Containers stopped${NC}"

# Step 4: Install dependencies
echo ""
echo -e "${BLUE}Step 4: Installing dependencies...${NC}"
npm install
echo -e "${GREEN}✅ Dependencies installed${NC}"

# Step 5: Generate Prisma Client
echo ""
echo -e "${BLUE}Step 5: Generating Prisma Client...${NC}"
npx prisma generate
echo -e "${GREEN}✅ Prisma Client generated${NC}"

# Step 6: Start database
echo ""
echo -e "${BLUE}Step 6: Starting database...${NC}"
docker-compose up -d db
echo "Waiting for database to be ready..."
sleep 15

# Check if database is running
if docker ps | grep -q hopnic-postgres; then
    echo -e "${GREEN}✅ Database is running${NC}"
else
    echo -e "${RED}❌ Error: Database failed to start${NC}"
    docker logs hopnic-postgres
    exit 1
fi

# Step 7: Run migrations
echo ""
echo -e "${BLUE}Step 7: Running database migrations...${NC}"
npx prisma migrate deploy
echo -e "${GREEN}✅ Migrations completed${NC}"

# Step 8: Build application
echo ""
echo -e "${BLUE}Step 8: Building application...${NC}"
npm run build
echo -e "${GREEN}✅ Application built${NC}"

# Step 9: Start all containers
echo ""
echo -e "${BLUE}Step 9: Starting all containers...${NC}"
docker-compose up -d --build
echo "Waiting for application to start..."
sleep 10

# Check if containers are running
if docker ps | grep -q hopnic-app && docker ps | grep -q hopnic-postgres; then
    echo -e "${GREEN}✅ All containers are running${NC}"
else
    echo -e "${RED}❌ Error: Some containers failed to start${NC}"
    docker ps
    exit 1
fi

# Step 10: Test application
echo ""
echo -e "${BLUE}Step 10: Testing application...${NC}"
if curl -s http://localhost:3000 > /dev/null; then
    echo -e "${GREEN}✅ Application is responding${NC}"
else
    echo -e "${YELLOW}⚠️  Application not responding yet, check logs${NC}"
fi

# Step 11: Restart Nginx
echo ""
echo -e "${BLUE}Step 11: Restarting Nginx...${NC}"
nginx -t
systemctl restart nginx
echo -e "${GREEN}✅ Nginx restarted${NC}"

# Done!
echo ""
echo -e "${GREEN}=================================="
echo "✅ Update completed successfully!"
echo "==================================${NC}"
echo ""
echo "📊 Status:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
echo ""
echo "🌐 Your site should be live at:"
echo "   https://hopnic.co.th"
echo ""
echo "📝 Useful commands:"
echo "   View logs:        docker logs hopnic-app"
echo "   View DB logs:     docker logs hopnic-postgres"
echo "   Restart:          docker-compose restart"
echo "   Stop:             docker-compose down"
echo ""
echo "💾 Backup location: $BACKUP_DIR"
echo ""

