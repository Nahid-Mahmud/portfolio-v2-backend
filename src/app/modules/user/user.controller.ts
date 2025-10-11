import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateProfile = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const payload = req.body;
  const { id } = req.user;
  const result = await userService.updateProfile(payload, id);
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
