import express from "express";
import allRoutes from "./routes/allRoutes.route";
import cors from "./middlewares/cors";
import { envConfig } from "./configs/env.config";
import initMessage from "./utils/initMessage";
import loggerHTTP from "./configs/httpLogger.config";
import logger from "./configs/pinoLogger.config";
import useragent from "express-useragent";
import "./configs/mongo.config";

const app = express();
const PORT = envConfig.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);
app.use(useragent.express());
app.use(loggerHTTP);
app.use(allRoutes);

app.listen(PORT, () => {
  initMessage();
  logger.info(`Server is running on http://localhost:${PORT}`);
});
