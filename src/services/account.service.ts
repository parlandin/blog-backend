import CryptoService from "../utils/crypto";
import userAccount from "../models/userAccount.model";

class AccountService {
  async getAccount(userName: string) {
    const account = await userAccount
      .findOne({ username: userName })
      .lean()
      .select("username -_id");
    if (!account) throw new Error("Conta não encontrada!");

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

    await account.save();

    return account;
  }

  async login(userName: string, code: string) {
    const account = await userAccount
      .findOne({ username: userName, code })
      .lean()
      .select("username email code");

    if (!account) throw new Error("Conta não encontrada!");

    const email = CryptoService.decrypt(account.email);

    return { ...account, email };
  }

  async validateCode(userName: string, code: string) {
    const account = await userAccount
      .findOne({ username: userName, code })
      .lean()
      .select("username  code");

    if (!account) throw new Error("Código inválido!");

    if (new Date() > new Date(account.codeExpiresAt)) {
      throw new Error("Código expirado!");
    }

    return account;
  }

  async updateAccount() {}

  async deleteAccount() {}
}

export default new AccountService();
