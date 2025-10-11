import z from "zod";

// Validation schema for updating user profile
// Only `bio` is accepted/updated by the service at the moment.
export const updateUserZodSchema = z.object({
  bio: z.string().min(1, "Bio cannot be empty").max(2000, "Bio is too long").optional(),
  photo: z.string().optional(),
  altText: z.string().optional(),
  deletePhoto: z.string().optional(),
});

export default updateUserZodSchema;
