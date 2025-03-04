import userAccount from "../models/userAccount.model";
import HttpError from "../utils/httpError";
import { hashPassword, comparePassword } from "../utils/bcrypt";
import accountCodeService from "./accountCode.service";

class AccountService {
  async createAccount(
    username: string,
    code: string,
    password: string,
    profilePic?: string
  ) {
    const hasAccount = await this.getAccount(username);

    if (hasAccount) throw new HttpError("Username já existe!", 409);

    const avatar = profilePic
      ? profilePic
      : `https://avatar.iran.liara.run/username?username=${username}`;

    const hashedPassword = await hashPassword(password);

    await accountCodeService.validateCode(username, code.toLowerCase());

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
      throw new HttpError("Erro ao criar conta!", 500);
    }
    await accountCodeService.deleteAccountCode(username);
    return { username: account.username };
  }

  async login(userName: string, password: string) {
    const account = await this.getAccount(userName);

    if (!account) throw new HttpError("Username ou senha incorreto!", 404);

    const isPasswordValid = await comparePassword(password, account.password);

    if (!isPasswordValid)
      throw new HttpError("Username ou senha incorreto!", 404);

    return { username: account.username };
  }

  private async getAccount(username: string) {
    const account = await userAccount
      .findOne({ username })
      .lean()
      .select("username cover");

    return account;
  }

  async updateAccount() {}

  async deleteAccount() {}
}

export default new AccountService();
