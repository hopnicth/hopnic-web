#!/bin/bash

# ================================
# HOPNIC Website - Docker Deployment Script
# ================================

set -e

echo "🚀 Starting HOPNIC Website Deployment..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

echo -e "${BLUE}📦 Building Docker image...${NC}"
docker build -t hopnic-website:latest .

echo ""
echo -e "${BLUE}🛑 Stopping existing containers...${NC}"
docker-compose -f docker-compose.prod.yml down

echo ""
echo -e "${BLUE}🚀 Starting new containers...${NC}"
docker-compose -f docker-compose.prod.yml up -d

echo ""
echo -e "${BLUE}⏳ Waiting for application to start...${NC}"
sleep 5

# Check if container is running
if [ "$(docker ps -q -f name=hopnic-website)" ]; then
    echo ""
    echo -e "${GREEN}✅ Deployment successful!${NC}"
    echo ""
    echo -e "${GREEN}🌐 Application is running at:${NC}"
    echo -e "   ${BLUE}http://localhost:3000${NC}"
    echo ""
    echo -e "${GREEN}📊 View logs:${NC}"
    echo -e "   ${BLUE}docker logs -f hopnic-website${NC}"
    echo ""
    echo -e "${GREEN}🛑 Stop application:${NC}"
    echo -e "   ${BLUE}docker-compose -f docker-compose.prod.yml down${NC}"
    echo ""
else
    echo ""
    echo -e "${RED}❌ Deployment failed. Check logs:${NC}"
    echo -e "   ${BLUE}docker logs hopnic-website${NC}"
    exit 1
fi

