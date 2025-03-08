import { Request, Response, NextFunction } from "express";
import "reflect-metadata";

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
      ...args: any[]
    ) {
      try {
        const data = await originalMethod.apply(this, [req, res, ...args]);

        if (res.headersSent) return;

        res.json({
          success: true,
          status: res.statusCode,
          data,
          error: null,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        const err = error as {
          statusCode?: number;
          message?: string;
          code?: string;
          details?: any;
        };
        const status = err.statusCode || 500;
        const message = err.message || "Internal server error";

        res.status(status).json({
          success: false,
          status,
          data: null,
          error: {
            message,
            code: (error as any).code || "UNKNOWN_ERROR",
            details: (error as any).details || undefined,
          },
          timestamp: new Date().toISOString(),
        });
      }
    };

    return descriptor;
  };
}
