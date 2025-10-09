import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import ApiError from "../../errors/ApiError";
import { handleClientError } from "../../errors/handleClientError";
import { handleValidationError } from "../../errors/handleValidationError";
import { handleZodError } from "../../errors/handleZodError";
import type { TErrorSources } from "../../app/interfaces/error.types";
import envVariables from "../../config/env";

// Re-export ApiError for convenience
export { default as ApiError } from "../../errors/ApiError";

const globalErrorHandler = (
  error: Error & { statusCode?: number; name?: string },
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  let statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = error.message || "Something went wrong!";
  let errorSources: TErrorSources[] = [];

  // Handle Prisma Client Validation Errors
  if (error instanceof Prisma.PrismaClientValidationError) {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  // Handle Zod Validation Errors
  else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  // Handle Prisma Client Known Request Errors
  else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const simplifiedError = handleClientError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  // Handle Custom ApiError
  else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorSources = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }

  // Handle Prisma Client Initialization Error
  else if (error instanceof Prisma.PrismaClientInitializationError) {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    message = "Failed to initialize Prisma Client. Check your database connection or Prisma configuration.";
    errorSources = [
      {
        path: "",
        message: "Failed to initialize Prisma Client.",
      },
    ];
  }

  // Handle Prisma Client Rust Panic Error
  else if (error instanceof Prisma.PrismaClientRustPanicError) {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    message = "A critical error occurred in the Prisma engine. Please try again later.";
    errorSources = [
      {
        path: "",
        message: "Prisma Client Rust Panic Error",
      },
    ];
  }

  // Handle Prisma Client Unknown Request Error
  else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    message = "An unknown error occurred while processing the request.";
    errorSources = [
      {
        path: "",
        message: "Prisma Client Unknown Request Error",
      },
    ];
  }

  // Handle JWT Errors
  else if (error.name === "JsonWebTokenError") {
    statusCode = StatusCodes.UNAUTHORIZED;
    message = "Invalid token. Please log in again!";
    errorSources = [
      {
        path: "",
        message: "Invalid token",
      },
    ];
  } else if (error.name === "TokenExpiredError") {
    statusCode = StatusCodes.UNAUTHORIZED;
    message = "Your token has expired! Please log in again.";
    errorSources = [
      {
        path: "",
        message: "Token expired",
      },
    ];
  }

  // Handle Generic JavaScript Errors
  else if (error instanceof SyntaxError) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = "Syntax error in the request. Please verify your input.";
    errorSources = [
      {
        path: "",
        message: "Syntax Error",
      },
    ];
  } else if (error instanceof TypeError) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = "Type error in the application. Please verify your input.";
    errorSources = [
      {
        path: "",
        message: "Type Error",
      },
    ];
  } else if (error instanceof ReferenceError) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = "Reference error in the application. Please verify your input.";
    errorSources = [
      {
        path: "",
        message: "Reference Error",
      },
    ];
  }

  // Handle General Errors
  else if (error instanceof Error) {
    message = error?.message;
    errorSources = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }

  // Catch any other error type
  else {
    message = "An unexpected error occurred!";
    errorSources = [
      {
        path: "",
        message: "An unexpected error occurred!",
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    ...(envVariables.NODE_ENV !== "production" && {
      error: error,
      stack: error?.stack,
    }),
  });
};

export default globalErrorHandler;
