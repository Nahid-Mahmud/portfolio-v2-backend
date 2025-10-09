import express, { type Application, type Request, type Response } from "express";
import cors, { type CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import morgan from "morgan";
import notFound from "./app/middlewares/notFound.js";
import globalErrorHandler from "./app/middlewares/globalErrorHandler.js";

export const app: Application = express();

const corsOptions: CorsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(morgan("dev"));
app.set("trust proxy", 1);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "API is running...",
    status: "success",
  });
});

app.get("/api/v1", (req: Request, res: Response) => {
  res.json({
    message: "You have reached the API v1 endpoint",
    status: "success",
  });
});

app.use(globalErrorHandler);
app.use(notFound);
