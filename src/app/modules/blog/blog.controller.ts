import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { blogService } from "./blog.service";
import sendResponse from "../../utils/sendResponse";
import { handleSingleFileUpload } from "../../utils/handleFileUpload";
import AppError from "../../../errors/AppError";

// * create blog
const createBlog = catchAsync(async (req: Request, res: Response) => {
  let photo;

  // file is required for creating a blog
  if (!req.file) {
    throw new AppError(400, "Photo is required");
  }

  if (req.file) {
    photo = await handleSingleFileUpload(req.file, "blog");
  }

  const user = req.user;

  const payload = { ...req.body, photo, authorId: user.id };
  const result = await blogService.createBlog(payload);

  sendResponse(res, {
    success: true,
    message: "Blog created successfully",
    data: result,
    statusCode: 201,
  });
});

// * get all blogs
const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await blogService.getAllBlogs();

  sendResponse(res, {
    success: true,
    message: "Blogs retrieved successfully",
    data: result,
    statusCode: 200,
  });
});

// * get blog by id
const getBlogById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await blogService.getBlogById(id);

  sendResponse(res, {
    success: true,
    message: "Blog retrieved successfully",
    data: result,
    statusCode: 200,
  });
});

// * update blog
const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  let photo;

  if (req.file) {
    photo = await handleSingleFileUpload(req.file, "blog");
  }

  const payload = { ...req.body, photo };
  const result = await blogService.updateBlog(id, payload);

  sendResponse(res, {
    success: true,
    message: "Blog updated successfully",
    data: result,
    statusCode: 200,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await blogService.deleteBlog(id);

  sendResponse(res, {
    success: true,
    message: "Blog deleted successfully",
    data: null,
    statusCode: 200,
  });
});

export const blogController = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
