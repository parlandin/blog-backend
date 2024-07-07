import pinoHttp from "pino-http";
import logger from "./pinoLogger.config";

const loggerHTTP = pinoHttp({
  logger: logger,
  customLogLevel: (res, err) => {
    if (!res.statusCode) return "info";
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return "warn";
    }
    if (res.statusCode >= 500 || err) {
      return "error";
    }
    return "info";
  },
  genReqId: (req) => req.id,
  autoLogging: {
    ignore: (req) => {
      return req.url === "/favicon.ico";
    },
  },
  customSuccessMessage: (res) => {
    return `Request completed`;
  },
  customErrorMessage: (error, res) => {
    return `Request errored with status code ${res.statusCode} and message ${error.statusMessage}`;
  },

  serializers: {
    req: (req) => {
      return `${req.method} ${req.url}`;
    },
    res: (res) => {
      return `statusCode: ${res.statusCode}`;
    },
  },
});

export default loggerHTTP;
