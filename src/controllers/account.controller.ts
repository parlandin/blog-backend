import { Request, Response } from "express";
import accountService from "../services/account.service";
import { Controller, Post } from "../decorators/routes.decorators";
import { CatchAll } from "../decorators/errorHandler.decorator";
import { ValidateBody } from "../decorators/validation.decorator";
import {
  accountCreateSchema,
  accountLoginSchema,
} from "../schemas/accountSchema";
import { InjectService } from "../decorators/inject.decorator";
import { ResponseJson } from "../decorators/response.decorator";

@Controller("/account")
@InjectService(accountService)
@CatchAll()
class AccountController {
  private service!: accountService;

  @Post("/create")
  @ValidateBody(accountCreateSchema)
  @ResponseJson()
  async createAccount(req: Request, res: Response) {
    const { username, password, code } = req.body;

    const account = await this.service.createAccount(username, code, password);
    return account;
  }

  @Post("/login")
  @ValidateBody(accountLoginSchema)
  @ResponseJson()
  async login(req: Request, res: Response) {
    const { username, password } = req.body;

    const account = await this.service.login(username, password);
    return account;
  }
}

export default AccountController;
