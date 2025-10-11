import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import { handleSingleFileUpload } from "../../utils/handleFileUpload";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateProfile = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.user;
  const payload = req.body;
  let photo = "";

  if (req.file) {
    photo = await handleSingleFileUpload(req.file, "profile");
  }

  const result = await userService.updateProfile({ ...payload, photo }, id);
  sendResponse(res, {
    success: true,
    message: "User profile updated successfully",
    data: result,
    statusCode: 200,
  });
});

export const userController = {
  updateProfile,
};
