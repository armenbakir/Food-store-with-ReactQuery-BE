import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "./auth";

export default function admin(req: Request, res: Response, next: NextFunction) {
  const isAdmin = (req as AuthRequest).user.isAdmin;

  if (!isAdmin) return res.status(403).send("unauthorized");
  next();
}
