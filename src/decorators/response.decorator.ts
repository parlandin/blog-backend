import { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import { ResponseUtils } from "../utils/response.utils";

export function ResponseJson(): MethodDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction,
      ...args: any[]
    ) {
      try {
        const data = await originalMethod.apply(this, [
          req,
          res,
          next,
          ...args,
        ]);

        if (res.headersSent) return;

        if (data === undefined || data === null) return;

        ResponseUtils.sendSuccess(res, data, res.statusCode || 200);
      } catch (error) {
        ResponseUtils.sendError(res, error);
      }
    };

    return descriptor;
  };
}
