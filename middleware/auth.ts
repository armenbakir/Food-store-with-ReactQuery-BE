import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";

export default function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["x-auth-token"] as string;
  if (!token) return res.status(401).send("No token provided");

  // verifiera token

  try {
    Jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch (error) {
    return res.status(400).send("Invalid token");
  }
}
