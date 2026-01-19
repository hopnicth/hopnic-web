// ================================
// Create Project - Server Actions
// ================================

import { fail, redirect } from '@sveltejs/kit';
import { createProject, VALID_TAGS } from '$lib/server/portfolio.service';
import { uploadFiles } from '$lib/server/upload.service';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		validTags: VALID_TAGS
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		// Get form fields
		const title = formData.get('title')?.toString() || '';
		const subHeader = formData.get('subHeader')?.toString() || '';
		const bodyContent = formData.get('bodyContent')?.toString() || '';
		const tags = formData.getAll('tags').map((tag) => tag.toString());

		// Validate required fields
		if (!title || !subHeader || !bodyContent) {
			return fail(400, {
				error: 'กรุณากรอกข้อมูลให้ครบถ้วน',
				title,
				subHeader,
				bodyContent,
				tags
			});
		}

		// Validate tags
		if (tags.length === 0) {
			return fail(400, {
				error: 'กรุณาเลือกอย่างน้อย 1 tag',
				title,
				subHeader,
				bodyContent,
				tags
			});
		}

		try {
			// Handle file uploads
			const files = formData.getAll('images') as File[];
			const validFiles = files.filter((file) => file.size > 0);

			let imageUrls: string[] = [];
			if (validFiles.length > 0) {
				imageUrls = await uploadFiles(validFiles);
			}

			// Create project with images
			const images = imageUrls.map((url, index) => ({
				imageUrl: url,
				sequenceOrder: index,
				isCover: index === 0 // First image is cover
			}));

			await createProject({
				title,
				subHeader,
				bodyContent,
				tags,
				images
			});

			throw redirect(303, '/dashboard/projects');
		} catch (error) {
			if (error instanceof Response) throw error;

			console.error('Error creating project:', error);
			return fail(500, {
				error: error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการสร้างโปรเจค',
				title,
				subHeader,
				bodyContent,
				tags
			});
		}
	}
};

