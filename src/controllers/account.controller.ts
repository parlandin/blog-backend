import { Request, Response } from "express";
import accountService from "../services/account.service";
import HttpError from "../utils/httpError";
import handleUnknownError from "../middlewares/handleUnknownError";

class AccountController {
  async createAccount(req: Request, res: Response) {
    try {
      const { username, password, code } = req.body;
      const account = await accountService.createAccount(
        username,
        code,
        password
      );

      return res.status(201).json(account);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return handleUnknownError(res, error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { userName, code } = req.body;
      const account = await accountService.login(userName, code);

      return res.json(account);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return handleUnknownError(res, error);
    }
  }
}

export default new AccountController();
