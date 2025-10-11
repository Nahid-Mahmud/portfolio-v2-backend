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
  checkAuth(),
  multerUpload.single("photo"),
  validateRequest(updateUserZodSchema),
  userController.updateProfile
);

export const userRoutes = router;
