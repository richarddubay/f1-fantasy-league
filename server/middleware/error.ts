import { NextFunction, Request, Response } from "express";

export function error(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err) {
    return res.status(err.status || 500).json({
      message: `You totally made it to the very bottom of the app and there was an error: ${err.message}`,
      stack: err.stack,
    });
  }
}
