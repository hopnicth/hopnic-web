// ================================
// Server Hooks
// Auth Guard for Dashboard Routes
// ================================

import { redirect, type Handle } from '@sveltejs/kit';
import { isAuthenticated } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	const { url, cookies } = event;

	// Protected routes that require authentication
	const protectedRoutes = ['/dashboard'];

	// Check if current path starts with any protected route
	const isProtectedRoute = protectedRoutes.some((route) => url.pathname.startsWith(route));

	// If accessing protected route and not authenticated, redirect to login
	if (isProtectedRoute && !isAuthenticated(cookies)) {
		throw redirect(303, `/login?redirect=${encodeURIComponent(url.pathname)}`);
	}

	// If accessing login page and already authenticated, redirect to dashboard
	if (url.pathname === '/login' && isAuthenticated(cookies)) {
		throw redirect(303, '/dashboard');
	}

	return resolve(event);
};

