import type { Server } from "http";
import { app } from "./app";
import envVariables from "./config/env";
import { prisma } from "./config/db";

let server: Server;

async function connectToDb() {
  try {
    await prisma.$connect();
    // eslint-disable-next-line no-console
    console.log("Database connected successfully");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Database connection error:", error);
  }
}

async function main() {
  try {
    await connectToDb();
    server = app.listen(envVariables.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running on port ${envVariables.PORT}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

main();

//  handle graceful shutdown SIGTERM
process.on("SIGTERM", () => {
  // eslint-disable-next-line no-console
  console.log("SIGTERM signal received: closing HTTP server");
  if (server) {
    server.close(() => {
      // eslint-disable-next-line no-console
      console.log("HTTP server closed");
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
  // eslint-disable-next-line no-console
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
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
  // eslint-disable-next-line no-console
  console.log("Uncaught Exception:", error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
