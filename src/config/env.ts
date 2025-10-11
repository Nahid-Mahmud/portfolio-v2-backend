import dotenv from "dotenv";

dotenv.config();

interface EnvVariables {
  DATABASE_URL: string;
  PORT: string;
  NODE_ENV: string;

  USER_EMAIL: string;
  USER_PASSWORD: string;
  USER_FIRST_NAME: string;
  USER_LAST_NAME: string;
  BCRYPT_SALT_ROUNDS: string;
  JWT: {
    ACCESS_TOKEN_JWT_SECRET: string;
    ACCESS_TOKEN_JWT_EXPIRATION: string;
    REFRESH_TOKEN_JWT_SECRET: string;
    REFRESH_TOKEN_JWT_EXPIRATION: string;
    FORGET_PASSWORD_TOKEN_JWT_SECRET: string;
    FORGET_PASSWORD_TOKEN_JWT_EXPIRATION: string;
  };
  FRONTEND_URL: string;
  SMTP: {
    USER: string;
    PASS: string;
    HOST: string;
    PORT: string;
    FROM: string;
  };
  CLOUDINARY: {
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
  };
  REDIS: {
    HOST: string;
    PORT: string;
    USERNAME: string;
    PASSWORD: string;
  };
}

const loadEnvVariable = (): EnvVariables => {
  const requiredEnvVariables = [
    "DATABASE_URL",
    "PORT",
    "NODE_ENV",
    "USER_EMAIL",
    "USER_PASSWORD",
    "USER_FIRST_NAME",
    "USER_LAST_NAME",
    "BCRYPT_SALT_ROUNDS",
    "ACCESS_TOKEN_JWT_SECRET",
    "ACCESS_TOKEN_JWT_EXPIRATION",
    "REFRESH_TOKEN_JWT_SECRET",
    "REFRESH_TOKEN_JWT_EXPIRATION",
    "FORGET_PASSWORD_TOKEN_JWT_SECRET",
    "FORGET_PASSWORD_TOKEN_JWT_EXPIRATION",
    "FRONTEND_URL",
    "SMTP_USER",
    "SMTP_PASS",
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_FROM",
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
    "REDIS_HOST",
    "REDIS_PORT",
    "REDIS_USERNAME",
    "REDIS_PASSWORD",
  ];

  requiredEnvVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  });

  return {
    // ! database and server
    DATABASE_URL: process.env.DATABASE_URL as string,
    PORT: process.env.PORT as string,
    // user default credentials
    NODE_ENV: process.env.NODE_ENV as string,
    USER_EMAIL: process.env.USER_EMAIL as string,
    USER_PASSWORD: process.env.USER_PASSWORD as string,
    USER_FIRST_NAME: process.env.USER_FIRST_NAME as string,
    USER_LAST_NAME: process.env.USER_LAST_NAME as string,

    // ! frontend url
    FRONTEND_URL: process.env.FRONTEND_URL as string,

    // ! security
    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS as string,

    // ! JWT related variables
    JWT: {
      ACCESS_TOKEN_JWT_SECRET: process.env.ACCESS_TOKEN_JWT_SECRET as string,
      ACCESS_TOKEN_JWT_EXPIRATION: process.env.ACCESS_TOKEN_JWT_EXPIRATION as string,
      REFRESH_TOKEN_JWT_SECRET: process.env.REFRESH_TOKEN_JWT_SECRET as string,
      REFRESH_TOKEN_JWT_EXPIRATION: process.env.REFRESH_TOKEN_JWT_EXPIRATION as string,
      FORGET_PASSWORD_TOKEN_JWT_SECRET: process.env.FORGET_PASSWORD_TOKEN_JWT_SECRET as string,
      FORGET_PASSWORD_TOKEN_JWT_EXPIRATION: process.env.FORGET_PASSWORD_TOKEN_JWT_EXPIRATION as string,
    },

    // ! SMTP (email) related variables
    SMTP: {
      USER: process.env.SMTP_USER as string,
      PASS: process.env.SMTP_PASS as string,
      HOST: process.env.SMTP_HOST as string,
      PORT: process.env.SMTP_PORT as string,
      FROM: process.env.SMTP_FROM as string,
    },

    // ! cloudinary related variables
    CLOUDINARY: {
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
    },

    // ! Redis related variables
    REDIS: {
      HOST: process.env.REDIS_HOST as string,
      PORT: process.env.REDIS_PORT as string,
      USERNAME: process.env.REDIS_USERNAME as string,
      PASSWORD: process.env.REDIS_PASSWORD as string,
    },
  };
};

const envVariables = loadEnvVariable();
export default envVariables;
