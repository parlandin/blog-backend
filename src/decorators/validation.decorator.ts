import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodTypeAny, z } from "zod";
import "reflect-metadata";

type ValidationSource = "body" | "params" | "query";

function createValidationDecorator(source: ValidationSource) {
  return (schema: ZodTypeAny) => {
    return (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) => {
      const middleware: RequestHandler = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const validatedData = await schema.parseAsync(req[source]);
          req[source] = validatedData;
          next();
        } catch (err) {
          if (err instanceof z.ZodError) {
            res.status(400).json({
              message: `Invalid ${source}`,
              errors: err.errors,
            });
          } else {
            next(err);
          }
        }
      };

      const middlewares =
        Reflect.getMetadata("middlewares", target, propertyKey) || [];
      middlewares.push(middleware);
      Reflect.defineMetadata("middlewares", middlewares, target, propertyKey);
    };
  };
}

// Decorators específicos
export const ValidateBody = createValidationDecorator("body");
export const ValidateParams = createValidationDecorator("params");
export const ValidateQuery = createValidationDecorator("query");
