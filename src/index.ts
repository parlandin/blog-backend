import express from "express";
import allRoutes from "./routes/allRoutes.route";
import cors from "./middlewares/cors.middleware";
import { envConfig } from "./configs/env.config";
import initMessage from "./utils/initMessage";
import loggerHTTP from "./configs/httpLogger.config";
import logger from "./configs/pinoLogger.config";
import useragent from "express-useragent";
import "./configs/mongo.config";
import { registerControllers } from "./utils/registerControllers";
import AccountController from "./controllers/account.controller";

const app = express();
const router = express.Router();

const PORT = envConfig.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);
app.use(useragent.express());
app.use(loggerHTTP);

registerControllers(allRoutes, [AccountController]);

app.use(allRoutes);

app.listen(PORT, () => {
  initMessage();
  logger.info(`Server is running on http://localhost:${PORT}`);
});
