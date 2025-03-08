import { Router } from "express";
import "reflect-metadata";
import {
  RouteMetadata,
  ROUTE_METADATA_KEY,
} from "../decorators/routes.decorators";

export function registerControllers(router: Router, controllers: any[]) {
  controllers.forEach((ControllerClass) => {
    const controllerInstance = new ControllerClass();
    const prefix: string =
      Reflect.getMetadata("controller_prefix", ControllerClass) || "";

    const routes: RouteMetadata[] =
      Reflect.getMetadata(ROUTE_METADATA_KEY, ControllerClass) || [];

    routes.forEach((route) => {
      const fullPath = `${prefix}${route.path}`;

      const handler =
        controllerInstance[route.propertyKey].bind(controllerInstance);

      router[route.method](fullPath, ...route.middlewares, handler);
    });
  });
}
