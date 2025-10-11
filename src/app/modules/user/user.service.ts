import { User } from "@prisma/client";
import { prisma } from "../../../config/db";
import { deleteFileFormCloudinary } from "../../../config/cloudinary.config";

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

export const userService = {
  updateProfile,
};
