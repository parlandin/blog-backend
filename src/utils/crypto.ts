import crypto from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY as string;

class CryptoService {
  private static readonly KEY = Buffer.from(ENCRYPTION_KEY, "hex");

  private static readonly ALGORITHM = "aes-256-cbc";
  private static readonly IV_LENGTH = 16;

  static encrypt(data: string): string {
    const iv = crypto.randomBytes(this.IV_LENGTH);
    const cipher = crypto.createCipheriv(this.ALGORITHM, this.KEY, iv);

    let encrypted = cipher.update(data, "utf8", "hex");
    encrypted += cipher.final("hex");

    return `${iv.toString("hex")}:${encrypted}`;
  }

  static decrypt(encryptedData: string): string {
    const [ivHex, encryptedText] = encryptedData.split(":");
    if (!ivHex || !encryptedText) throw new Error("Formato inválido!");

    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv(this.ALGORITHM, this.KEY, iv);

    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  }
}

export default CryptoService;
