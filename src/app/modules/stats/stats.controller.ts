import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { statsService } from "./stats.service";
import sendResponse from "../../utils/sendResponse";

// * get stats
const getStats = catchAsync(async (req: Request, res: Response) => {
  const result = await statsService.getStats();

  sendResponse(res, {
    success: true,
    message: "Stats retrieved successfully",
    data: result,
    statusCode: 200,
  });
});

export const statsController = {
  getStats,
};
