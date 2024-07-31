import { Request, Response, NextFunction } from "express";
import parseJwt from "../utils/decodeJWT";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization?.split(" ")[1];

  if (!authToken) {
    return res.status(401).send("Missing auth token");
  }

  const parsedData = parseJwt(authToken);
  if (parsedData) {
    console.log(`ID: ${parsedData.id}, Name: ${parsedData.name}`);
  } else {
    console.log("Failed to parse JWT");
  }

  res.locals.user_id = parsedData?.id;
  res.locals.name = parsedData?.name;

  return next();
}
