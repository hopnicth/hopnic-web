// ================================
// Projects List - Server Load & Actions
// ================================

import { fail } from "@sveltejs/kit";
import { USE_MOCK_DATA } from "$lib/server/env";
import { getMockProjects } from "$lib/server/mock-data";
import { getAllProjects, deleteProject } from "$lib/server/portfolio.service";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  // Auto-switch between Mock Mode and Database Mode
  const projects = USE_MOCK_DATA ? getMockProjects() : await getAllProjects();

  return {
    projects,
  };
};

export const actions: Actions = {
  delete: async ({ request }) => {
    // Prevent deletion in Mock Mode
    if (USE_MOCK_DATA) {
      return fail(400, { error: "Cannot delete in Mock Mode" });
    }

    const formData = await request.formData();
    const id = formData.get("id");

    if (!id) {
      return fail(400, { error: "Project ID is required" });
    }

    try {
      await deleteProject(Number(id));
      return { success: true };
    } catch (error) {
      console.error("Error deleting project:", error);
      return fail(500, { error: "Failed to delete project" });
    }
  },
};
