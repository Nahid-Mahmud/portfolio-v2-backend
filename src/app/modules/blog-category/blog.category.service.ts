import { BlogCategory, Prisma } from "@prisma/client";
import { prisma } from "../../../config/db";

// * create blog category
const createBlogCategory = async (payload: Prisma.BlogCategoryCreateInput): Promise<BlogCategory> => {
  const result = await prisma.blogCategory.create({
    data: payload,
  });
  return result;
};

// * get all blog categories
const getAllBlogCategories = async (): Promise<BlogCategory[]> => {
  const result = await prisma.blogCategory.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

// * get blog category by id
const getBlogCategoryById = async (id: string): Promise<BlogCategory | null> => {
  const result = await prisma.blogCategory.findUnique({
    where: {
      id,
    },
  });
  return result;
};

// * update blog category
const updateBlogCategory = async (id: string, payload: Prisma.BlogCategoryUpdateInput): Promise<BlogCategory> => {
  const result = await prisma.blogCategory.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

// * delete blog category
const deleteBlogCategory = async (id: string): Promise<void> => {
  await prisma.blogCategory.delete({
    where: {
      id,
    },
  });
};

export const blogCategoryService = {
  createBlogCategory,
  getAllBlogCategories,
  getBlogCategoryById,
  updateBlogCategory,
  deleteBlogCategory,
};
