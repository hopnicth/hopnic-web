// ================================
// Logout Route
// ================================

import { redirect } from '@sveltejs/kit';
import { destroyAuthSession } from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
	destroyAuthSession(cookies);
	throw redirect(303, '/login');
};

