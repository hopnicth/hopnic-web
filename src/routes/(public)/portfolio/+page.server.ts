// ================================
// Portfolio Page - Server Load
// ================================

import { USE_MOCK_DATA } from "$lib/server/env";
import { getMockProjects } from "$lib/server/mock-data";
import { getAllProjects } from "$lib/server/portfolio.service";
import type { PageServerLoad } from "./$types";

const VALID_TAGS = ["Design", "ME", "Automation", "PLC & Control"];

export const load: PageServerLoad = async () => {
  // Auto-switch between Mock Mode and Database Mode
  const projects = USE_MOCK_DATA ? getMockProjects() : await getAllProjects();

  return {
    projects,
    validTags: VALID_TAGS,
  };
};
