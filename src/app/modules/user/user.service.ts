import { User } from "@prisma/client";
import { prisma } from "../../../config/db";
import { deleteFileFormCloudinary } from "../../../config/cloudinary.config";
import AppError from "../../../errors/AppError";
import { StatusCodes } from "http-status-codes";

const updateProfile = async (payload: Partial<User> & { deletePhoto?: string }, id: string) => {
  const { deletePhoto, ...rest } = payload;
  const result = await prisma.user.update({
    where: { id },
    data: rest,
  });

  if (deletePhoto) {
    await deleteFileFormCloudinary(deletePhoto);
  }

  return result;
};

const getProfile = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }

  return user;
};

export const userService = {
  updateProfile,
  getProfile,
};
