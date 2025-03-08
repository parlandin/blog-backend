/* import { NextFunction, Request, RequestHandler } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import accountService from "../services/account.service";
import HttpError from "../utils/httpError";
import { jwtVerify } from "../utils/jwt";

type Role = "admin" | "user";

export function Authenticated(role?: Role): MethodDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;
    const middleware = createAuthMiddleware(role);

    const middlewares =
      Reflect.getMetadata("middlewares", target, propertyKey) || [];
    middlewares.push(middleware);
    Reflect.defineMetadata("middlewares", middlewares, target, propertyKey);
  };
}

export function Admin(): MethodDecorator {
  return Authenticated("admin");
}

export function User(): MethodDecorator {
  return Authenticated("user");
}

function createAuthMiddleware(requiredRole?: Role): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");

      if (!token) {
        throw new HttpError("Unauthorized", 401);
      }

      const decoded = jwtVerify(token);

      if (requiredRole && decoded.role !== requiredRole) {
        throw new HttpError("Forbidden", 403);
      }

      const account = await accountService.getAccountByUsername(
        decoded.username
      );

      req.user = {
        username: decoded.username,
        role: decoded.role,
        cover: account.user.cover,
        level: account.user.level,
      };

      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return res.status(401).json({ error: "Token expired" });
      }

      const status = error instanceof HttpError ? error.statusCode : 401;
      const message = error instanceof Error ? error.message : "Unauthorized";

      res.status(status).json({ error: message });
    }
  };
}
 */
