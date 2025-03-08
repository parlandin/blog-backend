import { ZodTypeAny } from "zod";
import {
  validateRequestBody,
  validateRequestParams,
  validateRequestQuery,
} from "../middlewares/validation.middleware";

export function ValidateBody(schema: ZodTypeAny) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const middlewares =
      Reflect.getMetadata("middlewares", target, propertyKey) || [];
    middlewares.push(validateRequestBody(schema));
    Reflect.defineMetadata("middlewares", middlewares, target, propertyKey);
  };
}

export function ValidateParams(schema: ZodTypeAny) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const middlewares =
      Reflect.getMetadata("middlewares", target, propertyKey) || [];
    middlewares.push(validateRequestParams(schema));
    Reflect.defineMetadata("middlewares", middlewares, target, propertyKey);
  };
}

export function ValidateQuery(schema: ZodTypeAny) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const middlewares =
      Reflect.getMetadata("middlewares", target, propertyKey) || [];
    middlewares.push(validateRequestQuery(schema));
    Reflect.defineMetadata("middlewares", middlewares, target, propertyKey);
  };
}
