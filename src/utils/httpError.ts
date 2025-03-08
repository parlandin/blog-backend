export interface IHttpError extends Error {
  statusCode: number;
  details?: unknown;
}

class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default HttpError;
