import { Request, Response, NextFunction } from "express";

export interface StandardErrorResponse {
  success: false;
  status: number;
  data: null;
  error: {
    message: string;
    code: string;
    details?: any;
  };
  timestamp: string;
}

export interface StandardSuccessResponse<T = any> {
  success: true;
  status: number;
  data: T;
  error: null;
  timestamp: string;
}

export type StandardResponse<T = any> =
  | StandardSuccessResponse<T>
  | StandardErrorResponse;

export interface CustomError extends Error {
  statusCode?: number;
  code?: string;
  details?: any;
}

export type ErrorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => void;
