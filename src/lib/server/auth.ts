// ================================
// Authentication Utilities
// Simple Password Strategy
// ================================

import { env } from '$env/dynamic/private';
import type { Cookies } from '@sveltejs/kit';

const AUTH_COOKIE_NAME = 'auth_session';
const COOKIE_MAX_AGE = 60 * 60 * 24; // 1 day in seconds

/**
 * Verify admin password
 */
export function verifyPassword(password: string): boolean {
	const adminPassword = env.ADMIN_PASSWORD || 'admin123';
	return password === adminPassword;
}

/**
 * Create auth session cookie
 */
export function createAuthSession(cookies: Cookies): void {
	cookies.set(AUTH_COOKIE_NAME, 'true', {
		path: '/',
		httpOnly: true,
		secure: env.NODE_ENV === 'production',
		sameSite: 'lax',
		maxAge: COOKIE_MAX_AGE
	});
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(cookies: Cookies): boolean {
	return cookies.get(AUTH_COOKIE_NAME) === 'true';
}

/**
 * Destroy auth session
 */
export function destroyAuthSession(cookies: Cookies): void {
	cookies.delete(AUTH_COOKIE_NAME, { path: '/' });
}

