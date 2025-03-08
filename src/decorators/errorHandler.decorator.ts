import { NextFunction, Request, Response } from "express";
import HttpError from "../utils/httpError";

type ErrorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export function Catch(errorHandler?: ErrorHandler) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      ...args: [Request, Response, NextFunction]
    ) {
      const [req, res, next] = args;

      try {
        await originalMethod.apply(this, args);
      } catch (error) {
        if (errorHandler) {
          errorHandler(error, req, res, next);
        } else {
          if (error instanceof HttpError) {
            res.status(error.statusCode).json({ error: error.message });
          } else {
            handleUnknownError(res, error);
          }
        }
      }
    };

    return descriptor;
  };
}

export function CatchAll(errorHandler?: ErrorHandler) {
  return function (constructor: any) {
    const methods = Object.getOwnPropertyNames(constructor.prototype);

    methods.forEach((methodName) => {
      if (methodName !== "constructor") {
        const descriptor = Object.getOwnPropertyDescriptor(
          constructor.prototype,
          methodName
        );
        if (descriptor && typeof descriptor.value === "function") {
          const decorated = Catch(errorHandler)(
            constructor.prototype,
            methodName,
            descriptor
          );
          Object.defineProperty(constructor.prototype, methodName, decorated);
        }
      }
    });
  };
}

function handleUnknownError(res: Response, error: unknown) {
  console.error("Unknown error:", error);
  res.status(500).json({ error: "Internal server error" });
}
