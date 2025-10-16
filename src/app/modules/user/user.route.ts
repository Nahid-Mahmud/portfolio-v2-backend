import { Router } from "express";
import { userController } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { multerUpload } from "../../../config/multer.config";
import { validateRequest } from "../../middlewares/validateRequest";
import updateUserZodSchema from "./user.validation";

const router = Router();

// update user profile
router.put(
  "/profile",
  // Ensure multer processes the request before JSON parsing middleware
  checkAuth(),
  multerUpload.single("photo"), // Handles multipart/form-data
  // Re-enable validateRequest middleware and ensure proper handling of multipart/form-data
  validateRequest(updateUserZodSchema), // Validate req.body fields like bio
  userController.updateProfile
);

router.get("/me", checkAuth(), userController.getProfile);

export const userRoutes = router;
