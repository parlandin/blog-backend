import { Request, Response, NextFunction } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import accountService from "../services/account.service";
import HttpError from "../utils/httpError";
import { jwtVerify } from "../utils/jwt";

interface AuthenticatedRequest extends Request {
  user: {
    username: string;
    role: "admin" | "user";
    cover?: string;
    level?: number;
  };
}

export const authenticationMiddleware = (only: "admin" | "user") => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.sendStatus(401);
    }

    try {
      const user = jwtVerify(token);

      if (only === "admin" && user.role !== "admin") {
        return res.sendStatus(403);
      }

      const isUser = await accountService.getAccountByUsername(user.username);

      req.user = {
        username: user.username,
        role: user.role,
        cover: isUser.user.cover,
        level: isUser.user.level,
      };
      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return res.status(401).json({ error: "Token expired" });
      }

      if (error instanceof HttpError) {
        return res.status(error.statusCode).json({ error: error.message });
      }

      return res.sendStatus(401);
    }
  };
};
