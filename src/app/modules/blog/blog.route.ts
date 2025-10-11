import express from "express";
import { blogController } from "./blog.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { createBlogZodSchema, updateBlogZodSchema } from "./blog.validation";
import { multerUpload } from "../../../config/multer.config";

const router = express.Router();

router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);

router.post(
  "/",
  checkAuth(),
  multerUpload.single("photo"),
  validateRequest(createBlogZodSchema),
  blogController.createBlog
);

router.patch(
  "/:id",
  checkAuth(),
  multerUpload.single("photo"),
  validateRequest(updateBlogZodSchema),
  blogController.updateBlog
);

router.delete("/:id", checkAuth(), blogController.deleteBlog);

export const blogRoutes = router;
