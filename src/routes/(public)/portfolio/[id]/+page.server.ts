// ================================
// Portfolio Detail Page - Server Load
// ================================

import { error } from "@sveltejs/kit";
import { USE_MOCK_DATA } from "$lib/server/env";
import { getMockProjectById } from "$lib/server/mock-data";
import { getProjectById } from "$lib/server/portfolio.service";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    throw error(404, "Project not found");
  }

  // Auto-switch between Mock Mode and Database Mode
  const project = USE_MOCK_DATA
    ? getMockProjectById(id)
    : await getProjectById(id);

  if (!project) {
    throw error(404, "Project not found");
  }

  return {
    project,
  };
};
