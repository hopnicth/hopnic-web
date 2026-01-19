// ================================
// Environment Configuration Helper
// ================================

import { env } from "$env/dynamic/private";

/**
 * Check if application should use mock data
 * Set USE_MOCK_DATA=true in .env for development
 * Set USE_MOCK_DATA=false in .env.production for production
 */
export const USE_MOCK_DATA = env.USE_MOCK_DATA === "true";

/**
 * Get current mode name for display
 */
export const MODE_NAME = USE_MOCK_DATA ? "Mock Mode" : "Database Mode";

/**
 * Check if running in production
 */
export const IS_PRODUCTION = env.NODE_ENV === "production";

