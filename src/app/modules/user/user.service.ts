import { User } from "@prisma/client";
import { prisma } from "../../../config/db";

const updateProfile = async (payload: Partial<User>, id: string) => {
  const result = await prisma.user.update({
    where: { id },
    data: payload,
  });
  return result;
};

export const userService = {
  updateProfile,
};
