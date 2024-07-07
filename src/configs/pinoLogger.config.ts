import pino, { DestinationStream } from "pino";
import pinoPretty from "pino-pretty";

const is_Dev = process.env.NODE_ENV === "development";

const stream = pinoPretty({
  colorize: true,
  translateTime: "SYS:dd-mm-yyyy-HH:MM",
  ignore: "pid,hostname",
  singleLine: false,
}) as unknown as DestinationStream;

const logger = pino(
  {
    timestamp: pino.stdTimeFunctions.isoTime,
    level: is_Dev ? "trace" : "info",
  },
  stream
);

export default logger;
