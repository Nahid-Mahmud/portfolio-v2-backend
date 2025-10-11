import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { projectService } from "./service.project";
import sendResponse from "../../utils/sendResponse";
import { handleSingleFileUpload } from "../../utils/handleFileUpload";

const createProject = catchAsync(async (req: Request, res: Response) => {
  let photo;

  if (req.file) {
    photo = await handleSingleFileUpload(req.file, "project");
  }

  const payload = { ...req.body, photo };
  const result = await projectService.createProject(payload);

  sendResponse(res, {
    success: true,
    message: "Project created successfully",
    data: result,
    statusCode: 201,
  });
});

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const result = await projectService.getAllProjects();

  sendResponse(res, {
    success: true,
    message: "Projects retrieved successfully",
    data: result,
    statusCode: 200,
  });
});

const getProjectById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await projectService.getProjectById(id);

  sendResponse(res, {
    success: true,
    message: "Project retrieved successfully",
    data: result,
    statusCode: 200,
  });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  let photo;

  if (req.file) {
    photo = await handleSingleFileUpload(req.file, "project");
  }

  const payload = { ...req.body, photo };
  const result = await projectService.updateProject(id, payload);

  sendResponse(res, {
    success: true,
    message: "Project updated successfully",
    data: result,
    statusCode: 200,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await projectService.deleteProject(id);

  sendResponse(res, {
    success: true,
    message: "Project deleted successfully",
    data: null,
    statusCode: 200,
  });
});

export const projectController = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
