import "reflect-metadata";

export type RouteMetadata = {
  method: "get" | "post" | "put" | "delete" | "patch";
  path: string;
  middlewares: any[];
  propertyKey: string;
};

export const ROUTE_METADATA_KEY = Symbol("route_metadata");

export function Controller(prefix: string = "") {
  return (constructor: any) => {
    Reflect.defineMetadata("controller_prefix", prefix, constructor);
  };
}

function createMethodDecorator(method: RouteMetadata["method"]) {
  return (path: string = "", ...methodMiddlewares: any[]) => {
    return (target: any, propertyKey: string) => {
      const classMiddlewares =
        Reflect.getMetadata("middlewares", target, propertyKey) || [];
      const metadata: RouteMetadata[] =
        Reflect.getMetadata(ROUTE_METADATA_KEY, target.constructor) || [];

      metadata.push({
        method,
        path,
        middlewares: [...classMiddlewares, ...methodMiddlewares],
        propertyKey,
      });

      Reflect.defineMetadata(ROUTE_METADATA_KEY, metadata, target.constructor);
    };
  };
}

export const Get = createMethodDecorator("get");
export const Post = createMethodDecorator("post");
export const Put = createMethodDecorator("put");
export const Delete = createMethodDecorator("delete");
export const Patch = createMethodDecorator("patch");
