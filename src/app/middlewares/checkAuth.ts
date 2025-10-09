import type { NextFunction, Request, Response } from "express";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import { verifyJwtToken } from "../utils/jwt";
import envVariables from "../../config/env";

export const checkAuth =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    (...authRoles: any) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const accessToken = req.headers.authorization || req.cookies.accessToken;
        if (!accessToken) {
          throw new AppError(StatusCodes.UNAUTHORIZED, "Access token is required");
        }
        const verifiedToken = verifyJwtToken(accessToken, envVariables.ACCESS_TOKEN_JWT_SECRET);

        //   const isUserExist = await User.findOne({ email: verifiedToken.email });

        //   if (!isUserExist) {
        //     throw new AppError(StatusCodes.BAD_REQUEST, "User does not exist");
        //   }
        //   if (isUserExist.isActive === IsActive.DISABLED) {
        //     throw new AppError(StatusCodes.BAD_REQUEST, `User account is disabled`);
        //   }
        //   if (isUserExist.isDeleted) {
        //     throw new AppError(StatusCodes.BAD_REQUEST, "User account is deleted");
        //   }

        //   if (!isUserExist.isVerified) {
        //     throw new AppError(StatusCodes.BAD_REQUEST, "User account is not verified");
        //   }

        //   if (!authRoles.includes(verifiedToken.role)) {
        //     throw new AppError(StatusCodes.FORBIDDEN, "You do not have permission to access this resource");
        //   }

        req.user = verifiedToken;

        next();
      } catch (error) {
        next(error);
      }
    };
