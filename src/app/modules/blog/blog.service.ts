import { Blog, Prisma } from "@prisma/client";
import { deleteFileFormCloudinary } from "../../../config/cloudinary.config";
import { prisma } from "../../../config/db";
import { createSlug } from "../../utils/createSlug";

// * create blog
const createBlog = async (payload: Prisma.BlogCreateInput): Promise<Blog> => {
  const slug = createSlug(payload.title);
  // console.log(payload);
  const result = await prisma.blog.create({
    data: { ...payload, slug },
    include: {
      author: true,
      category: true,
    },
  });
  return result;
};

// * get all blogs
const getAllBlogs = async (): Promise<Partial<Blog>[]> => {
  const result = await prisma.blog.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      photo: true,
      altText: true,
      slug: true,
      categoryId: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

// * get blog by id
const getBlogById = async (id: string): Promise<Blog | null> => {
  const result = await prisma.blog.findUnique({
    where: {
      id,
    },
    include: {
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          photo: true,
          altText: true,
        },
      },
      category: true,
    },
  });
  return result;
};

// * update blog
const updateBlog = async (
  id: string,
  payload: Partial<Prisma.BlogUpdateInput> & { deletePhoto?: string }
): Promise<Blog> => {
  const { deletePhoto, ...rest } = payload;
  let updateData = { ...rest };

  if (payload.title) {
    const slug = createSlug(payload.title as string);
    updateData = { ...rest, slug };
  }

  const result = await prisma.blog.update({
    where: {
      id,
    },
    data: updateData,
    include: {
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          photo: true,
          altText: true,
        },
      },
      category: true,
    },
  });

  // logger.error(deletePhoto);
  if (deletePhoto) {
    await deleteFileFormCloudinary(deletePhoto);
  }

  return result;
};

// * delete blog
const deleteBlog = async (id: string): Promise<void> => {
  const result = await prisma.blog.delete({
    where: {
      id,
    },
  });

  await deleteFileFormCloudinary(result.photo);
};

export const blogService = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
