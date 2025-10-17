import { prisma } from "../../../config/db";

// * get stats
const getStats = async () => {
  const [blogCount, blogCategoryCount, projectCount] = await Promise.all([
    prisma.blog.count(),
    prisma.blogCategory.count(),
    prisma.projects.count(),
  ]);

  return {
    blogs: blogCount,
    blogCategories: blogCategoryCount,
    projects: projectCount,
  };
};

export const statsService = {
  getStats,
};
