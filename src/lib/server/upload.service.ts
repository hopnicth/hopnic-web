// ================================
// File Upload Service
// Phase 2: Local Storage Strategy
// ================================

import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const UPLOAD_DIR = 'static/uploads';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

/**
 * Ensure upload directory exists
 */
async function ensureUploadDir() {
	if (!existsSync(UPLOAD_DIR)) {
		await mkdir(UPLOAD_DIR, { recursive: true });
	}
}

/**
 * Generate unique filename
 */
function generateFilename(originalName: string): string {
	const timestamp = Date.now();
	const random = Math.random().toString(36).substring(2, 8);
	const ext = path.extname(originalName);
	const nameWithoutExt = path.basename(originalName, ext);
	const safeName = nameWithoutExt.replace(/[^a-z0-9]/gi, '_').toLowerCase();
	return `${safeName}_${timestamp}_${random}${ext}`;
}

/**
 * Upload file
 */
export async function uploadFile(file: File): Promise<string> {
	// Validate file type
	if (!ALLOWED_TYPES.includes(file.type)) {
		throw new Error('Invalid file type. Only JPEG, PNG, and WebP are allowed.');
	}

	// Validate file size
	if (file.size > MAX_FILE_SIZE) {
		throw new Error('File size exceeds 5MB limit.');
	}

	// Ensure upload directory exists
	await ensureUploadDir();

	// Generate unique filename
	const filename = generateFilename(file.name);
	const filepath = path.join(UPLOAD_DIR, filename);

	// Write file
	const buffer = Buffer.from(await file.arrayBuffer());
	await writeFile(filepath, buffer);

	// Return public URL
	return `/uploads/${filename}`;
}

/**
 * Upload multiple files
 */
export async function uploadFiles(files: File[]): Promise<string[]> {
	const uploadPromises = files.map((file) => uploadFile(file));
	return Promise.all(uploadPromises);
}

