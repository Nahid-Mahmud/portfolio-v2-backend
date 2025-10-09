import { Prisma } from "@prisma/client";
import type { TGenericErrorResponse, TErrorSources } from "../app/interfaces/error.types";

export const handleClientError = (error: Prisma.PrismaClientKnownRequestError): TGenericErrorResponse => {
  let errorSources: TErrorSources[] = [];
  let message = "Database operation failed";
  let statusCode = 400;

  if (error.code === "P2025") {
    message = "Record not found";
    statusCode = 404;
    errorSources = [
      {
        path: "",
        message: message,
      },
    ];
  } else if (error.code === "P2003") {
    if (error.meta && typeof error.meta === "object" && "field_name" in error.meta) {
      message = "Invalid ID";
      errorSources = [
        {
          path: error.meta.field_name as string,
          message: "Invalid ID",
        },
      ];
    }
  } else if (error.code === "P2002") {
    const duplicatedField = error.meta?.target as string[] | undefined;
    message = `Duplicate entry for ${duplicatedField?.join(", ") || "field"}`;
    statusCode = 409;
    errorSources = [
      {
        path: duplicatedField?.[0] || "",
        message: message,
      },
    ];
  }

  return {
    statusCode,
    message,
    errorSources,
  };
};
