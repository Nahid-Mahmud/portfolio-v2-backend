import express from "express";
import { projectController } from "./controller.project";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { createProjectZodSchema, updateProjectZodSchema } from "./validation.project";
import { multerUpload } from "../../../config/multer.config";

const router = express.Router();

router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getProjectById);

router.post(
  "/",
  checkAuth(),
  multerUpload.single("photo"),
  validateRequest(createProjectZodSchema),
  projectController.createProject
);

router.patch(
  "/:id",
  checkAuth(),
  multerUpload.single("photo"),
  validateRequest(updateProjectZodSchema),
  projectController.updateProject
);

router.delete("/:id", checkAuth(), projectController.deleteProject);

export const projectRoutes = router;
