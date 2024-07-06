import pino from "pino";
import pinoPretty from "pino-pretty";

const is_Dev = process.env.NODE_ENV === "development";

const logger = pino({
  timestamp: pino.stdTimeFunctions.isoTime,
  level: is_Dev ? "trace" : "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      colorizeObjects: true,
      translateTime: "SYS:dd-mm-yyyy-HH:MM",
      ignore: "pid,hostname",
      singleLine: false,
    },
  },
});

export default logger;