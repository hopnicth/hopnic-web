// ================================
// Login Page - Server Actions
// ================================

import { fail, redirect } from '@sveltejs/kit';
import { verifyPassword, createAuthSession } from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Page load logic (if needed)
	return {};
};

export const actions: Actions = {
	default: async ({ request, cookies, url }) => {
		const formData = await request.formData();
		const password = formData.get('password')?.toString() || '';

		// Validate password
		if (!password) {
			return fail(400, {
				error: 'กรุณากรอกรหัสผ่าน',
				password: ''
			});
		}

		// Verify password
		if (!verifyPassword(password)) {
			return fail(401, {
				error: 'รหัสผ่านไม่ถูกต้อง',
				password: ''
			});
		}

		// Create auth session
		createAuthSession(cookies);

		// Redirect to dashboard or original destination
		const redirectTo = url.searchParams.get('redirect') || '/dashboard';
		throw redirect(303, redirectTo);
	}
};

