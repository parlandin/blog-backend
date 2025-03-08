import { Request, Response } from "express";
import accountService from "../services/account.service";
import HttpError from "../utils/httpError";
import handleUnknownError from "../middlewares/handleUnknownError";
import { Controller, Post } from "../decorators/routes.decorators";
import { CatchAll } from "../decorators/errorHandler.decorator";

@Controller("/account")
@CatchAll()
class AccountController {
  @Post("/create")
  async createAccount(req: Request, res: Response) {
    const { username, password, code } = req.body;
    const account = await accountService.createAccount(
      username,
      code,
      password
    );

    return res.status(201).json(account);
  }

  @Post("/login")
  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const account = await accountService.login(username, password);

    return res.json(account);
  }
}

export default AccountController;
