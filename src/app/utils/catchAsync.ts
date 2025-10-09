import type { Request, Response, NextFunction } from "express";

// Utility function to catch async errors and pass them to the global error handler
const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
