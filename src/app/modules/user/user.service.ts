import { prisma } from "../../../config/db";

const updateProfile = async (payload: { bio: string }, id: string) => {
  const result = await prisma.user.update({
    where: { id },
    data: payload,
  });
  return result;
};

export const userService = {
  updateProfile,
};
