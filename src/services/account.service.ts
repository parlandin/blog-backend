import userAccount from "../models/userAccount.model";
import HttpError from "../utils/httpError";
import { hashPassword } from "../utils/bcrypt";
import accountCodeService from "./accountCode.service";

class AccountService {
  async createAccount(
    username: string,
    code: string,
    password: string,
    profilePic?: string
  ) {
    const avatar = profilePic
      ? profilePic
      : `https://avatar.iran.liara.run/username?username=${username}`;

    const hashedPassword = await hashPassword(password);

    await accountCodeService.validateCode(username, code);

    const account = new userAccount({
      username: username,
      cover: avatar,
      password: hashedPassword,
    });

    try {
      await account.save();
    } catch (error: any) {
      if (error.code === 11000) {
        throw new HttpError("Username já existe!", 409);
      }

      if (error instanceof HttpError) {
        console.log("HttpError", error);
        throw error;
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

    /* if (account.code !== code) throw new HttpError("Código inválido!", 400);
     */
    //const email = CryptoService.decrypt(account.email);

    return { username: account.username };
  }

  async updateAccount() {}

  async deleteAccount() {}
}

export default new AccountService();
