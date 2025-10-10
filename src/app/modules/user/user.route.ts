import { Router } from "express";
import { userController } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

// update user profile
router.put("/profile", checkAuth(), userController.updateProfile);

export const userRoutes = router;
