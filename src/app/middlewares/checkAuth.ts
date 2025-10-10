import type { NextFunction, Request, Response } from "express";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import { verifyJwtToken } from "../utils/jwt";
import envVariables from "../../config/env";

export const checkAuth = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization || req.cookies.accessToken;
    if (!accessToken) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Access token is required");
    }
    const verifiedToken = verifyJwtToken(accessToken, envVariables.JWT.ACCESS_TOKEN_JWT_SECRET);

    if (verifiedToken.email !== envVariables.USER_EMAIL) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized to access this resource");
    }

    req.user = verifiedToken;

    next();
  } catch (error) {
    next(error);
  }
};
