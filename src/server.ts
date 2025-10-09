/* eslint-disable no-restricted-syntax */
import type { Server } from "http";
import { app } from "./app";
import envVariables from "./config/env";
import { prisma } from "./config/db";
import { seedUser } from "./app/utils/SeedUser";
import logger from "./app/utils/chalk";

let server: Server;

async function connectToDb() {
  try {
    await prisma.$connect();
    logger.success("Database connected successfully");
  } catch (error) {
    logger.error(`Database connection error: ${error}`);
  }
}

async function startServer() {
  try {
    await connectToDb();
    server = await app.listen(envVariables.PORT, () => {
      logger.success(`Server is running on port ${envVariables.PORT}`);
    });
    await seedUser();
  } catch (error) {
    logger.error(error);
  }
}

startServer();

//  handle graceful shutdown SIGTERM
process.on("SIGTERM", () => {
  // eslint-disable-next-line no-console
  console.log("SIGTERM signal received: closing HTTP server");
  if (server) {
    server.close(() => {
      logger.error("HTTP server closed");
    });
  }
});

//  handle graceful shutdown SIGINT
process.on("SIGINT", () => {
  // eslint-disable-next-line no-console
  console.log("SIGINT signal received: closing HTTP server");
  if (server) {
    server.close(() => {
      // eslint-disable-next-line no-console
      console.log("HTTP server closed");
    });
  }
});

// handle unhandledRejection
process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

//  handle uncaughtException
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
