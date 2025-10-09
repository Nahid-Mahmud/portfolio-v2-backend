/* eslint-disable no-restricted-syntax */
//  seed user

import bcrypt from "bcryptjs";
import envVariables from "../../config/env";
import { prisma } from "../../config/db";
import logger from "./chalk";

// Update the import path to match the actual location and filename of your User model

export const seedUser = async () => {
  const email = envVariables.USER_EMAIL;
  const password = envVariables.USER_PASSWORD;
  const firstName = envVariables.USER_FIRST_NAME;
  const lastName = envVariables.USER_LAST_NAME;
  // if user already exists, do not create
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    logger.warning("Seed User already Exist in DB ");
    return;
  }

  //   console.log();
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });
    logger.success("Seed User created successfully");
  } catch (error) {
    logger.error(`Error creating seed user: ${error}`);
  }
};
