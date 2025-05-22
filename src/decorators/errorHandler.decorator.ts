import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../@types/responses.types";
import { ResponseUtils } from "../utils/response.utils";
import HttpError from "../utils/httpError";

export function Catch(errorHandler?: ErrorHandler): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      ...args: [Request, Response, NextFunction, ...any[]]
    ) {
      const [req, res, next] = args;

      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        if (errorHandler) {
          errorHandler(error, req, res, next);
        } else {
          handleDefaultError(res, error);
        }
      }
    };

    return descriptor;
  };
}

export function CatchAll(errorHandler?: ErrorHandler): ClassDecorator {
  return function (constructor: any) {
    const methods = Object.getOwnPropertyNames(constructor.prototype);

    methods.forEach((methodName) => {
      if (methodName !== "constructor") {
        const descriptor = Object.getOwnPropertyDescriptor(
          constructor.prototype,
          methodName
        );

        if (descriptor && typeof descriptor.value === "function") {
          const decoratedDescriptor = Catch(errorHandler)(
            constructor.prototype,
            methodName,
            descriptor
          );

          if (decoratedDescriptor) {
            Object.defineProperty(
              constructor.prototype,
              methodName,
              decoratedDescriptor
            );
          }
        }
      }
    });
  };
}

function handleDefaultError(res: Response, error: unknown): void {
  console.error("Error caught by decorator:", error);

  if (error instanceof HttpError) {
    ResponseUtils.sendError(res, error, error.statusCode);
  } else {
    ResponseUtils.sendError(res, error, 500);
  }
}
