#!/bin/bash

# ================================
# Switch between Mock Mode and Database Mode
# ================================

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔄 HOPNIC Mode Switcher${NC}"
echo ""

# Check current mode
if grep -q "USE_MOCK_DATA=true" .env; then
    CURRENT_MODE="Mock Mode"
    NEW_MODE="Database Mode"
    NEW_VALUE="false"
else
    CURRENT_MODE="Database Mode"
    NEW_MODE="Mock Mode"
    NEW_VALUE="true"
fi

echo -e "Current Mode: ${YELLOW}${CURRENT_MODE}${NC}"
echo -e "Switch to:    ${GREEN}${NEW_MODE}${NC}"
echo ""

# Confirm
read -p "Do you want to switch? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 0
fi

# Switch mode
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s/USE_MOCK_DATA=.*/USE_MOCK_DATA=${NEW_VALUE}/" .env
else
    # Linux
    sed -i "s/USE_MOCK_DATA=.*/USE_MOCK_DATA=${NEW_VALUE}/" .env
fi

echo -e "${GREEN}✅ Switched to ${NEW_MODE}${NC}"
echo ""

# Show instructions
if [ "$NEW_VALUE" = "false" ]; then
    echo -e "${YELLOW}📝 Database Mode requires:${NC}"
    echo "  1. PostgreSQL running (docker-compose up -d db)"
    echo "  2. Migrations applied (npx prisma migrate deploy)"
    echo ""
    echo "Run these commands:"
    echo "  docker-compose up -d db"
    echo "  npx prisma migrate deploy"
    echo "  npm run dev"
else
    echo -e "${GREEN}📝 Mock Mode is ready!${NC}"
    echo "Just run: npm run dev"
fi

echo ""

