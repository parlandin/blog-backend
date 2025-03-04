import { Router } from "express";
import accountController from "../controllers/account.controller";
import accountCodeController from "../controllers/accountCode.controller";

const accountRouter = Router();

accountRouter.post("/create", accountController.createAccount);
accountRouter.post("/login", accountController.login);

accountRouter.post("/code/generate-code", accountCodeController.generateCode);
accountRouter.get("/code/:param", accountCodeController.getAccountCode);

export default accountRouter;
