import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { TokenPayLoadInterface } from "./interfaces";

export const comparePassword = async (plainPass: string, hashPass: string) => {
  return bcrypt.compare(plainPass, hashPass);
};

export const createHash = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const createAccessToken = async (payload: TokenPayLoadInterface) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1d" });
  return token;
};

export const createRefreshToken = async (payload: TokenPayLoadInterface) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "5d" });
  return token;
};

export const verifyToken = async (payload: string): Promise<JwtPayload> => {
  const token = <JwtPayload>jwt.verify(payload, process.env.JWT_SECRET!);
  return token;
};
