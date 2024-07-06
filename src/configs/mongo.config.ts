import logger from "./pinoLogger.config";
import mongoose from "mongoose";
import { envConfig } from "./env.config";

const { MONGO_URL } = envConfig;

const options: mongoose.ConnectOptions = {
  dbName: "visits-counter",
};

mongoose.connect(MONGO_URL, options);

const db = mongoose.connection;
db.on("error", (error) =>
  logger.error(`Error on connect to MongoDB: ${error}`)
);
db.once("open", () => {
  logger.info("connected to MongoDB");
});
