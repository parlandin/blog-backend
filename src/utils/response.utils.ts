import { Response } from "express";
import {
  StandardErrorResponse,
  StandardSuccessResponse,
} from "../@types/responses.types";
import HttpError, { IHttpError } from "./httpError";

export class ResponseUtils {
  static sendSuccess<T>(
    res: Response,
    data: T,
    statusCode: number = 200
  ): void {
    if (res.headersSent) return;

    const response: StandardSuccessResponse<T> = {
      success: true,
      status: statusCode,
      data,
      error: null,
      timestamp: new Date().toISOString(),
    };

    res.status(statusCode).json(response);
  }

  static sendError(
    res: Response,
    error: unknown,
    defaultStatus: number = 500
  ): void {
    if (res.headersSent) return;

    let status = defaultStatus;
    let message = "Internal server error";
    let code = "UNKNOWN_ERROR";
    let details: any = undefined;

    if (error instanceof HttpError) {
      status = error.statusCode;
      message = error.message;
      code = error.name || "HTTP_ERROR";
      details = (error as any).details;
    } else if (error instanceof Error) {
      message = error.message;
      code = error.name || "ERROR";

      const customError = error as IHttpError;
      if (customError.statusCode) {
        status = customError.statusCode;
        details = customError.details;
      }
    }

    const response: StandardErrorResponse = {
      success: false,
      status,
      data: null,
      error: {
        message,
        code,
        details,
      },
      timestamp: new Date().toISOString(),
    };

    res.status(status).json(response);
  }
}
