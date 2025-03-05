import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "secret";

interface Payload {
  username: string;
  role: "admin" | "user";
}

export const jwtSign = (payload: Payload) => {
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

export const jwtVerify = (token: string) => {
  return jwt.verify(token, secret) as Payload;
};

export const jwtDecode = (token: string) => {
  return jwt.decode(token) as Payload;
};
