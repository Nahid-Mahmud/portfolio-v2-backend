import express from "express";
import { blogCategoryController } from "./blog.category.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { createBlogCategoryZodSchema, updateBlogCategoryZodSchema } from "./blog.category.validation";

const router = express.Router();

// POST endpoint for creating new blog category
router.post("/", checkAuth(), validateRequest(createBlogCategoryZodSchema), blogCategoryController.createBlogCategory);

// GET endpoints
router.get("/", blogCategoryController.getAllBlogCategories);
router.get("/:id", blogCategoryController.getBlogCategoryById);

// PATCH endpoint for updating blog category
router.patch(
  "/:id",
  checkAuth(),
  validateRequest(updateBlogCategoryZodSchema),
  blogCategoryController.updateBlogCategory
);

// DELETE endpoint for removing blog category
router.delete("/:id", checkAuth(), blogCategoryController.deleteBlogCategory);

export const blogCategoryRoutes = router;
