import z from "zod";

const createBlogZodSchema = z.object({
  title: z.string().min(1, "Title cannot be empty").max(500, "Title is too long"),
  content: z.string().min(1, "Content cannot be empty"),
  photo: z.string().min(1, "Photo is required").optional(),
  altText: z.string().min(1, "Alt text is required"),
  categoryId: z.string().min(1, "Category ID is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  description: z.string().max(500, "Description is too long").optional(),
});

const updateBlogZodSchema = z.object({
  title: z.string().min(1, "Title cannot be empty").max(500, "Title is too long").optional(),
  content: z.string().min(1, "Content cannot be empty").optional(),
  photo: z.string().optional(),
  altText: z.string().min(1, "Alt text is required").optional(),
  categoryId: z.string().min(1, "Category ID is required").optional(),
  tags: z.array(z.string()).min(1, "At least one tag is required").optional(),
  deletePhoto: z.string().optional(),
});

export { createBlogZodSchema, updateBlogZodSchema };
