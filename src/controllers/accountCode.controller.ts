import handleUnknownError from "../middlewares/handleUnknownError";
import HttpError from "../utils/httpError";
import { Request, Response } from "express";
import accountCodeService from "../services/accountCode.service";
import { generateCodeHtml } from "../utils/codeHtml";

class AccountCodeController {
  async generateCode(req: Request, res: Response) {
    try {
      const { username } = req.body;

      const { param } = await accountCodeService.createAccountCode(username);

      return res.json({ message: "Código gerado!", param });
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return handleUnknownError(res, error);
    }
  }

  async getAccountCode(req: Request, res: Response) {
    try {
      const { param } = req.params;

      const code = await accountCodeService.getAccountCode(param);

      const html = generateCodeHtml(code);
      return res.send(html);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(404).send("This page not found");
      }
      return handleUnknownError(res, error);
    }
  }
}

export default new AccountCodeController();
