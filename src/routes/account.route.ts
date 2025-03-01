import { Router } from "express";
import accountController from "../controllers/account.controller";

const accountRouter = Router();

accountRouter.get("/:userName", accountController.getAccount);
accountRouter.post("/create", accountController.createAccount);
accountRouter.post("/login", accountController.login);
accountRouter.post("/validate-code", accountController.validateCode);

export default accountRouter;
