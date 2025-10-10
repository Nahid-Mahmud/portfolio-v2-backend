import { prisma } from "../../../config/db";
import bcrypt from "bcryptjs";
import AppError from "../../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import sendEmail from "../../utils/sendEmail";
import { generateJwtToken, verifyJwtToken } from "../../utils/jwt";
import envVariables from "../../../config/env";

// !login user

const login = async (email: string, password: string) => {
  if (!email || !password) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Email and password are required");
  }

  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
  }

  const isMatchPassword = await bcrypt.compare(password, user.password);
  if (!isMatchPassword) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: userPassword, ...rest } = user;

  return rest;
};

// ! forget password

const forgetPassword = async (email: string) => {
  if (!email || !email.trim()) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Email is required");
  }

  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }

  const jwtSecret = envVariables.JWT.FORGET_PASSWORD_TOKEN_JWT_SECRET;
  const expiresIn = envVariables.JWT.FORGET_PASSWORD_TOKEN_JWT_EXPIRATION;
  if (!jwtSecret || !expiresIn) {
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Server configuration error");
  }

  const resetToken = generateJwtToken({ email: user.email, id: user.id }, jwtSecret, expiresIn);

  const resetLink = `${envVariables.FRONTEND_URL}/reset-password?token=${resetToken}`;

  await sendEmail(
    email,
    "Password Reset Request",
    `You requested a password reset. Click the link to reset your password: ${resetLink}`,
    resetLink
  );

  return { message: "Password reset link sent to your email" };
};

const resetPassword = async (token: string, newPassword: string) => {
  const jwtSecret = envVariables.JWT.FORGET_PASSWORD_TOKEN_JWT_SECRET;

  let decoded: { email: string; id: string };
  try {
    decoded = verifyJwtToken(token, jwtSecret) as { email: string; id: string };
  } catch {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid or expired reset token");
  }

  if (!decoded.email || !decoded.id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid token payload");
  }

  const user = await prisma.user.findUnique({
    where: { email: decoded.email },
  });

  if (!user || user.id !== decoded.id) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found or token mismatch");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12); // Increased salt rounds for better security

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });

  return { message: "Password reset successful" };
};

export const authService = {
  login,
  forgetPassword,
  resetPassword,
};
