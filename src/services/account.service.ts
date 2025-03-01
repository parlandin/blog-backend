import CryptoService from "../utils/crypto";
import userAccount from "../models/userAccount.model";
import HttpError from "../utils/httpError";

class AccountService {
  async getAccount(userName: string) {
    const account = await userAccount
      .findOne({ username: userName })
      .lean()
      .select("username -_id");
    if (!account) throw new HttpError("Conta não encontrada!", 404);

    return account;
  }

  async createAccount(userName: string, email: string) {
    const randomCode = Math.random().toString(36).substring(2, 8);
    const cryptEmail = CryptoService.encrypt(email);
    const avatar = `https://avatar.iran.liara.run/username?username=${userName}`;
    const codeExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const account = new userAccount({
      username: userName,
      email: cryptEmail,
      code: randomCode,
      codeExpiresAt,
      cover: avatar,
    });

    try {
      await account.save();
    } catch (error: any) {
      if (error.code === 11000) {
        throw new HttpError("Username já existe!", 409);
      }
      throw new HttpError("Erro ao criar conta!", 500);
    }

    return { username: account.username };
  }

  async login(userName: string, code: string) {
    const account = await userAccount
      .findOne({ username: userName })
      .lean()
      .select("username email code");

    if (!account) throw new HttpError("Conta não encontrada!", 404);

    if (account.code !== code) throw new HttpError("Código inválido!", 400);

    //const email = CryptoService.decrypt(account.email);

    return { username: account.username };
  }

  async validateCode(userName: string, code: string) {
    const account = await userAccount
      .findOne({ username: userName, code })
      .lean()
      .select("username code codeExpiresAt");

    if (!account) throw new HttpError("Código inválido!", 400);

    if (new Date() > new Date(account.codeExpiresAt)) {
      throw new HttpError("Código expirado!", 400);
    }

    return "valid-code";
  }

  async updateAccount() {}

  async deleteAccount() {}
}

export default new AccountService();
