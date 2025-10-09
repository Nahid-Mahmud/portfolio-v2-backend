import dotenv from "dotenv";

dotenv.config();

interface EnvVariables {
  DATABASE_URL: string;
  PORT: string;
  NODE_ENV: string;
  ACCESS_TOKEN_JWT_SECRET: string;
  USER_EMAIL: string;
  USER_PASSWORD: string;
  USER_FIRST_NAME: string;
  USER_LAST_NAME: string;
  BCRYPT_SALT_ROUNDS: string;
}

const loadEnvVariable = (): EnvVariables => {
  const requiredEnvVariables = [
    "DATABASE_URL",
    "PORT",
    "NODE_ENV",
    "ACCESS_TOKEN_JWT_SECRET",
    "USER_EMAIL",
    "USER_PASSWORD",
    "USER_FIRST_NAME",
    "USER_LAST_NAME",
    "BCRYPT_SALT_ROUNDS",
  ];

  requiredEnvVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  });

  return {
    DATABASE_URL: process.env.DATABASE_URL as string,
    PORT: process.env.PORT as string,
    NODE_ENV: process.env.NODE_ENV as string,
    ACCESS_TOKEN_JWT_SECRET: process.env.ACCESS_TOKEN_JWT_SECRET as string,
    USER_EMAIL: process.env.USER_EMAIL as string,
    USER_PASSWORD: process.env.USER_PASSWORD as string,
    USER_FIRST_NAME: process.env.USER_FIRST_NAME as string,
    USER_LAST_NAME: process.env.USER_LAST_NAME as string,
    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS as string,
  };
};

const envVariables = loadEnvVariable();
export default envVariables;
