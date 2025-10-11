import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { blogCategoryService } from "./blog.category.service";
import sendResponse from "../../utils/sendResponse";

// * create blog category
const createBlogCategory = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await blogCategoryService.createBlogCategory(payload);

  sendResponse(res, {
    success: true,
    message: "Blog category created successfully",
    data: result,
    statusCode: 201,
  });
});

// * get all blog categories
const getAllBlogCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await blogCategoryService.getAllBlogCategories();

  sendResponse(res, {
    success: true,
    message: "Blog categories retrieved successfully",
    data: result,
    statusCode: 200,
  });
});

// * get blog category by id
const getBlogCategoryById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await blogCategoryService.getBlogCategoryById(id);

  sendResponse(res, {
    success: true,
    message: "Blog category retrieved successfully",
    data: result,
    statusCode: 200,
  });
});

// * update blog category
const updateBlogCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await blogCategoryService.updateBlogCategory(id, payload);

  sendResponse(res, {
    success: true,
    message: "Blog category updated successfully",
    data: result,
    statusCode: 200,
  });
});

// * delete blog category
const deleteBlogCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await blogCategoryService.deleteBlogCategory(id);

  sendResponse(res, {
    success: true,
    message: "Blog category deleted successfully",
    data: null,
    statusCode: 200,
  });
});

export const blogCategoryController = {
  createBlogCategory,
  getAllBlogCategories,
  getBlogCategoryById,
  updateBlogCategory,
  deleteBlogCategory,
};
