#!/bin/bash

# ================================
# HOPNIC Deployment Script
# ================================

set -e  # Exit on error

echo "🚀 Starting HOPNIC Deployment..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ Error: .env file not found${NC}"
    echo "Please create .env file from .env.production.example"
    exit 1
fi

# Check USE_MOCK_DATA setting
if grep -q "USE_MOCK_DATA=true" .env; then
    echo -e "${YELLOW}⚠️  Warning: USE_MOCK_DATA is set to true${NC}"
    echo "This should be false for production deployment"
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Step 1: Install dependencies
echo -e "${GREEN}📦 Installing dependencies...${NC}"
npm install

# Step 2: Generate Prisma Client
echo -e "${GREEN}🔧 Generating Prisma Client...${NC}"
npx prisma generate

# Step 3: Check if database is running
echo -e "${GREEN}🐘 Checking database connection...${NC}"
if docker ps | grep -q hopnic-postgres; then
    echo "✅ Database container is running"
else
    echo -e "${YELLOW}⚠️  Database container not running${NC}"
    echo "Starting database..."
    docker-compose up -d db
    echo "Waiting for database to be ready..."
    sleep 10
fi

# Step 4: Run migrations
echo -e "${GREEN}🗄️  Running database migrations...${NC}"
npx prisma migrate deploy

# Step 5: Build application
echo -e "${GREEN}🏗️  Building application...${NC}"
npm run build

# Step 6: Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}⚠️  PM2 not found. Installing globally...${NC}"
    npm install -g pm2
fi

# Step 7: Start/Restart with PM2
echo -e "${GREEN}🔄 Restarting application with PM2...${NC}"
if pm2 list | grep -q hopnic-site; then
    pm2 restart hopnic-site
    echo "✅ Application restarted"
else
    pm2 start build/index.js --name hopnic-site
    pm2 save
    echo "✅ Application started"
fi

# Step 8: Show status
echo ""
echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo ""
echo "📊 Application Status:"
pm2 status hopnic-site

echo ""
echo "📝 Useful commands:"
echo "  View logs:    pm2 logs hopnic-site"
echo "  Restart app:  pm2 restart hopnic-site"
echo "  Stop app:     pm2 stop hopnic-site"
echo ""

