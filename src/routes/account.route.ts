import { Router } from "express";
import accountController from "../controllers/account.controller";
import accountCodeController from "../controllers/accountCode.controller";
import {
  validateRequestBody,
  validateRequestParams,
} from "../middlewares/validation.middleware";
import {
  accountCreateSchema,
  accountCodeSchema,
  accountLoginSchema,
  getAccountParamsSchema,
} from "../schemas/accountSchema";

const accountRouter = Router();

accountRouter.post(
  "/create",
  validateRequestBody(accountCreateSchema),
  accountController.createAccount
);
accountRouter.post(
  "/login",
  validateRequestBody(accountLoginSchema),
  accountController.login
);

accountRouter.post(
  "/code/generate-code",
  validateRequestBody(accountCodeSchema),
  accountCodeController.generateCode
);

accountRouter.get(
  "/code/:param",
  validateRequestParams(getAccountParamsSchema),
  accountCodeController.getAccountCode
);

export default accountRouter;
