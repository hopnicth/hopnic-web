#!/bin/bash

# ================================
# HOPNIC Website - VPS Deployment Script
# ================================

set -e

echo "🚀 Starting HOPNIC Website Deployment to VPS..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
VPS_USER="root"  # เปลี่ยนเป็น username ของคุณ
VPS_HOST=""      # เปลี่ยนเป็น IP ของ VPS
VPS_PATH="/var/www/hopnic"

# Check if VPS_HOST is set
if [ -z "$VPS_HOST" ]; then
    echo -e "${RED}❌ Error: VPS_HOST is not set${NC}"
    echo -e "${YELLOW}Please edit this script and set VPS_HOST variable${NC}"
    exit 1
fi

echo -e "${BLUE}📦 Building application locally...${NC}"
npm run build

echo ""
echo -e "${BLUE}📤 Uploading files to VPS...${NC}"

# Create directory on VPS
ssh $VPS_USER@$VPS_HOST "mkdir -p $VPS_PATH"

# Upload files (excluding node_modules and .git)
rsync -avz --progress \
    --exclude 'node_modules' \
    --exclude '.git' \
    --exclude '.svelte-kit' \
    --exclude '.env' \
    ./ $VPS_USER@$VPS_HOST:$VPS_PATH/

echo ""
echo -e "${BLUE}🐳 Building and starting Docker container on VPS...${NC}"

ssh $VPS_USER@$VPS_HOST << 'ENDSSH'
cd /var/www/hopnic

# Stop existing container
docker-compose down || true

# Build new image
docker-compose build

# Start container
docker-compose up -d

# Show logs
echo ""
echo "📊 Container logs:"
docker logs --tail 50 hopnic-website

# Check if container is running
if [ "$(docker ps -q -f name=hopnic-website)" ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo "🌐 Website: https://hopnic.co.th"
else
    echo ""
    echo "❌ Deployment failed. Check logs:"
    echo "   docker logs hopnic-website"
    exit 1
fi
ENDSSH

echo ""
echo -e "${GREEN}✅ Deployment completed!${NC}"
echo ""
echo -e "${GREEN}🌐 Website is live at:${NC}"
echo -e "   ${BLUE}https://hopnic.co.th${NC}"
echo ""

