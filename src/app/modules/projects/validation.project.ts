import z from "zod";

const createProjectZodSchema = z.object({
  title: z.string().min(1, "Title cannot be empty").max(500, "Title is too long"),
  shortDescription: z.string().min(1, "Short description cannot be empty"),
  projectDetails: z.string().min(1, "Project details cannot be empty"),
  liveLink: z.string().url("Invalid live link URL"),
  frontendLink: z.string().url("Invalid frontend link URL"),
  backendLink: z.string().url("Invalid backend link URL").optional(),
  photo: z.string().min(1, "Photo is required"),
  altText: z.string().min(1, "Alt text is required"),
  video: z.string().url("Invalid video URL").optional(),
  category: z.enum(["FullStack", "Frontend"]),
  technologies: z.array(z.string()).min(1, "At least one technology is required"),
});

const updateProjectZodSchema = z.object({
  title: z.string().min(1, "Title cannot be empty").max(500, "Title is too long").optional(),
  shortDescription: z.string().min(1, "Short description cannot be empty").optional(),
  projectDetails: z.string().min(1, "Project details cannot be empty").optional(),
  liveLink: z.string().url("Invalid live link URL").optional(),
  frontendLink: z.string().url("Invalid frontend link URL").optional(),
  backendLink: z.string().url("Invalid backend link URL").optional(),
  photo: z.string().optional(),
  altText: z.string().min(1, "Alt text is required").optional(),
  video: z.string().url("Invalid video URL").optional(),
  category: z.enum(["FullStack", "Frontend"]).optional(),
  technologies: z.array(z.string()).min(1, "At least one technology is required").optional(),
  deletePhoto: z.string().optional(),
});

export { createProjectZodSchema, updateProjectZodSchema };
