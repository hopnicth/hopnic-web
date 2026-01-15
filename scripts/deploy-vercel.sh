#!/bin/bash

# ================================
# HOPNIC Website - Vercel Deployment Script
# ================================

set -e

echo "🚀 Starting HOPNIC Website Deployment to Vercel..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️  Vercel CLI is not installed.${NC}"
    echo -e "${BLUE}📦 Installing Vercel CLI...${NC}"
    npm install -g vercel
fi

# Check if user is logged in
echo -e "${BLUE}🔐 Checking Vercel authentication...${NC}"
if ! vercel whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not logged in to Vercel.${NC}"
    echo -e "${BLUE}🔑 Please login to Vercel:${NC}"
    vercel login
fi

echo ""
echo -e "${BLUE}🏗️  Building and deploying to Vercel...${NC}"
echo ""

# Ask for deployment type
echo -e "${YELLOW}Select deployment type:${NC}"
echo "1) Preview (development)"
echo "2) Production"
read -p "Enter choice [1-2]: " choice

case $choice in
    1)
        echo ""
        echo -e "${BLUE}🚀 Deploying to Preview...${NC}"
        vercel
        ;;
    2)
        echo ""
        echo -e "${BLUE}🚀 Deploying to Production...${NC}"
        vercel --prod
        ;;
    *)
        echo -e "${RED}❌ Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}✅ Deployment completed!${NC}"
echo ""
echo -e "${GREEN}📊 View deployment:${NC}"
echo -e "   ${BLUE}vercel ls${NC}"
echo ""
echo -e "${GREEN}🌐 Open in browser:${NC}"
echo -e "   ${BLUE}vercel open${NC}"
echo ""

