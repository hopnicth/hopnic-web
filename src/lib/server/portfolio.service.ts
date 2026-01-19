// ================================
// Portfolio Service
// CRUD Operations for Projects
// ================================

import { prisma } from './prisma';
import type { Project, ProjectImage } from '@prisma/client';

export type ProjectWithImages = Project & {
	images: ProjectImage[];
};

export type CreateProjectInput = {
	title: string;
	subHeader: string;
	bodyContent: string;
	tags: string[];
	images?: {
		imageUrl: string;
		sequenceOrder: number;
		isCover: boolean;
	}[];
};

export type UpdateProjectInput = Partial<CreateProjectInput>;

// Valid tags
export const VALID_TAGS = ['Design', 'ME', 'Automation', 'PLC & Control'] as const;
export type ValidTag = (typeof VALID_TAGS)[number];

/**
 * Validate tags
 */
export function validateTags(tags: string[]): boolean {
	return tags.every((tag) => VALID_TAGS.includes(tag as ValidTag));
}

/**
 * Get all projects
 */
export async function getAllProjects(): Promise<ProjectWithImages[]> {
	return prisma.project.findMany({
		include: {
			images: {
				orderBy: {
					sequenceOrder: 'asc'
				}
			}
		},
		orderBy: {
			createdAt: 'desc'
		}
	});
}

/**
 * Get project by ID
 */
export async function getProjectById(id: number): Promise<ProjectWithImages | null> {
	return prisma.project.findUnique({
		where: { id },
		include: {
			images: {
				orderBy: {
					sequenceOrder: 'asc'
				}
			}
		}
	});
}

/**
 * Create new project
 */
export async function createProject(data: CreateProjectInput): Promise<ProjectWithImages> {
	// Validate tags
	if (!validateTags(data.tags)) {
		throw new Error('Invalid tags provided');
	}

	return prisma.project.create({
		data: {
			title: data.title,
			subHeader: data.subHeader,
			bodyContent: data.bodyContent,
			tags: data.tags,
			images: data.images
				? {
						create: data.images
					}
				: undefined
		},
		include: {
			images: true
		}
	});
}

/**
 * Update project
 */
export async function updateProject(
	id: number,
	data: UpdateProjectInput
): Promise<ProjectWithImages> {
	// Validate tags if provided
	if (data.tags && !validateTags(data.tags)) {
		throw new Error('Invalid tags provided');
	}

	return prisma.project.update({
		where: { id },
		data: {
			title: data.title,
			subHeader: data.subHeader,
			bodyContent: data.bodyContent,
			tags: data.tags,
			updatedAt: new Date()
		},
		include: {
			images: true
		}
	});
}

/**
 * Delete project
 */
export async function deleteProject(id: number): Promise<void> {
	await prisma.project.delete({
		where: { id }
	});
}

/**
 * Add image to project
 */
export async function addProjectImage(
	projectId: number,
	imageUrl: string,
	sequenceOrder: number = 0,
	isCover: boolean = false
): Promise<ProjectImage> {
	return prisma.projectImage.create({
		data: {
			projectId,
			imageUrl,
			sequenceOrder,
			isCover
		}
	});
}

/**
 * Delete project image
 */
export async function deleteProjectImage(imageId: number): Promise<void> {
	await prisma.projectImage.delete({
		where: { id: imageId }
	});
}

