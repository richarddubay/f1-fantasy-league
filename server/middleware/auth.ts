import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/auth";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (process.env.NODE_ENV === "test") {
    res.locals.user_id = 1;
    return next();
  }

  const authToken = req.headers.authorization?.split(" ")[1];

  if (authToken) {
    try {
      const token = await verifyAccessToken(authToken);
      if (token) {
        res.locals.user_id = token.sub;
        return next();
      }
    } catch (error) {
      return res.status(401).send("Missing auth token");
    }
  }

  return res.status(401).send("Missing auth token");
}
