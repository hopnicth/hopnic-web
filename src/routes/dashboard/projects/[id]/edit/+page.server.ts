// ================================
// Edit Project - Server Load & Actions
// ================================

import { error, fail, redirect } from '@sveltejs/kit';
import {
	getProjectById,
	updateProject,
	addProjectImage,
	deleteProjectImage,
	VALID_TAGS
} from '$lib/server/portfolio.service';
import { uploadFiles } from '$lib/server/upload.service';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const id = parseInt(params.id);

	if (isNaN(id)) {
		throw error(404, 'Project not found');
	}

	const project = await getProjectById(id);

	if (!project) {
		throw error(404, 'Project not found');
	}

	return {
		project,
		validTags: VALID_TAGS
	};
};

export const actions: Actions = {
	update: async ({ request, params }) => {
		const id = parseInt(params.id);
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
			// Update project
			await updateProject(id, {
				title,
				subHeader,
				bodyContent,
				tags
			});

			// Handle new file uploads
			const files = formData.getAll('newImages') as File[];
			const validFiles = files.filter((file) => file.size > 0);

			if (validFiles.length > 0) {
				const imageUrls = await uploadFiles(validFiles);

				// Get current max sequence order
				const project = await getProjectById(id);
				const maxOrder = Math.max(...project!.images.map((img) => img.sequenceOrder), -1);

				// Add new images
				for (let i = 0; i < imageUrls.length; i++) {
					await addProjectImage(id, imageUrls[i], maxOrder + i + 1, false);
				}
			}

			throw redirect(303, '/dashboard/projects');
		} catch (error) {
			if (error instanceof Response) throw error;

			console.error('Error updating project:', error);
			return fail(500, {
				error: error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการอัปเดตโปรเจค',
				title,
				subHeader,
				bodyContent,
				tags
			});
		}
	},

	deleteImage: async ({ request }) => {
		const formData = await request.formData();
		const imageId = formData.get('imageId');

		if (!imageId) {
			return fail(400, { error: 'Image ID is required' });
		}

		try {
			await deleteProjectImage(Number(imageId));
			return { success: true };
		} catch (error) {
			console.error('Error deleting image:', error);
			return fail(500, { error: 'Failed to delete image' });
		}
	}
};

