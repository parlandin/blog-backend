import accountCodeModel from "../models/accountCode.model";
import { nanoId } from "../utils/nanoId";
import HttpError from "../utils/httpError";
import userAccountModel from "../models/userAccount.model";
import { generateCodeImage } from "@/utils/generateCodeImage";

class AccountCodeService {
  async createAccountCode(username: string) {
    const account = await userAccountModel
      .findOne({ username })
      .lean()
      .select("username");

    const isAccountCode = await accountCodeModel
      .findOne({ username })
      .lean()
      .select("username code codeExpires codeExpiresAt");

    if (account) throw new HttpError("Esse usuário já existe!", 404);

    if (isAccountCode) {
      if (new Date() < new Date(isAccountCode.codeExpiresAt)) {
        throw new HttpError("Código já foi gerado!", 400);
      }

      await accountCodeModel.deleteOne({ username });
    }

    const randomCode = await nanoId(6);
    const codeExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const param = await nanoId(10);

    const accountCode = new accountCodeModel({
      code: randomCode,
      param,
      username,
      codeExpiresAt,
    });

    try {
      await accountCode.save();
    } catch (error: any) {
      if (error.code === 11000) {
        throw new HttpError("Username já existe!", 409);
      }

      throw new HttpError("Erro ao gerar código!", 500);
    }

    return { param: `account/code/${param}` };
  }

  async validateCode(username: string, code: string) {
    const accountCode = await accountCodeModel
      .findOne({ username, code })
      .lean()
      .select("userName code codeExpiresAt");

    console.log({ accountCode });

    if (!accountCode) throw new HttpError("Código inválido!", 400);

    if (new Date() > new Date(accountCode.codeExpiresAt)) {
      throw new HttpError("Código expirado!", 400);
    }

    return { username: accountCode.username };
  }

  async deleteAccountCode(userName: string) {
    await accountCodeModel.deleteOne({
      userName,
    });

    return { message: "Código deletado com sucesso!" };
  }

  async getAccountCode(param: string) {
    const accountCode = await accountCodeModel
      .findOne({ param })
      .lean()
      .select("userName code codeExpiresAt");

    if (!accountCode) throw new HttpError("Código não encontrado!", 404);

    const image = generateCodeImage(accountCode.code);

    return image;
  }
}

export default new AccountCodeService();
