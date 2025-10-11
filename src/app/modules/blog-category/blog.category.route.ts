import express from "express";
import { blogCategoryController } from "./blog.category.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { createBlogCategoryZodSchema, updateBlogCategoryZodSchema } from "./blog.category.validation";

const router = express.Router();

router.get("/", blogCategoryController.getAllBlogCategories);
router.get("/:id", blogCategoryController.getBlogCategoryById);

router.post("/", checkAuth(), validateRequest(createBlogCategoryZodSchema), blogCategoryController.createBlogCategory);

router.patch(
  "/:id",
  checkAuth(),
  validateRequest(updateBlogCategoryZodSchema),
  blogCategoryController.updateBlogCategory
);

router.delete("/:id", checkAuth(), blogCategoryController.deleteBlogCategory);

export const blogCategoryRoutes = router;
