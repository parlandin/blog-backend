import userAccount, { IUserAccount } from "../models/userAccount.model";
import HttpError from "../utils/httpError";
import { hashPassword, comparePassword } from "../utils/bcrypt";
import accountCodeService from "./accountCode.service";
import { jwtSign } from "../utils/jwt";

class AccountService {
  async createAccount(
    username: string,
    code: string,
    password: string,
    profilePic?: string
  ) {
    const hasAccount = await this.getAccount(username);

    if (hasAccount) {
      throw new HttpError("Username já existe!", 409);
    }

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

    const response = this.formatResponse(account);

    return response;
  }

  async login(userName: string, password: string) {
    const account = await this.getAccount(userName);

    if (!account) throw new HttpError("Username ou senha incorreto!", 404);

    const isPasswordValid = await comparePassword(password, account.password);

    if (!isPasswordValid)
      throw new HttpError("Username ou senha incorreto!", 404);

    const response = this.formatResponse(account);
    return response;
  }

  private async getAccount(username: string) {
    const account = await userAccount
      .findOne({ username: { $eq: username } })
      .lean()
      .select("username cover password role level xp  -_id");

    return account;
  }

  async getAccountByUsername(username: string) {
    const account = await this.getAccount(username);

    if (!account) throw new HttpError("Conta não encontrada!", 404);

    return this.formatResponse(account);
  }

  private formatResponse(account: IUserAccount) {
    const token = jwtSign({
      username: account.username,
      role:
        account.role === "admin" || account.role === "user"
          ? account.role
          : "user",
    });
    const user = {
      username: account.username,
      cover: account.cover,
      role: account.role,
      level: account.level,
    };

    return { user, token };
  }

  async updateAccount() {}

  async deleteAccount() {}
}

export default new AccountService();
