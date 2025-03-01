import { Request, Response } from "express";
import accountService from "../services/account.service";

class AccountController {
  async getAccount(req: Request, res: Response) {
    try {
      const { userName } = req.params;
      const account = await accountService.getAccount(userName);

      return res.json(account);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(400).json({ error: "Unknown error" });
    }
  }

  async createAccount(req: Request, res: Response) {
    try {
      const { userName, email } = req.body;
      const account = await accountService.createAccount(userName, email);

      return res.status(201).json(account);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(400).json({ error: "Unknown error" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { userName, code } = req.body;
      const account = await accountService.login(userName, code);

      return res.json(account);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(400).json({ error: "Unknown error" });
    }
  }

  async validateCode(req: Request, res: Response) {
    try {
      const { userName, code } = req.body;
      const account = await accountService.validateCode(userName, code);

      return res.json(account);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(400).json({ error: "Unknown error" });
    }
  }
}

export default new AccountController();
