// ================================
// Dashboard Home - Server Load
// ================================

import { USE_MOCK_DATA } from "$lib/server/env";
import { getMockStats } from "$lib/server/mock-data";
import { prisma } from "$lib/server/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  // Auto-switch between Mock Mode and Database Mode
  if (USE_MOCK_DATA) {
    return { stats: getMockStats() };
  }

  // Database Mode - Get real statistics
  const totalProjects = await prisma.project.count();
  const totalImages = await prisma.projectImage.count();

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const thisMonth = await prisma.project.count({
    where: {
      createdAt: {
        gte: startOfMonth,
      },
    },
  });

  return {
    stats: {
      totalProjects,
      totalImages,
      thisMonth,
    },
  };
};
