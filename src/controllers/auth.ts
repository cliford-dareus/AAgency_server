import { Request, Response } from "express";
import { createUser, validateUser } from "../services/auth";

const registerUser = async (req: Request, res: Response) => {
  const { username, email, password, position } = req.body;

  if (!username || !email || !password) {
    return res.status(401).json({ msg: "Username and password are required." });
  }
  const user = await createUser({
    username,
    email,
    password,
    position,
    role: "USER",
  });

  res.status(200).json(user);
};

const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: `Username and password are required.` });
  }

  const user = await validateUser({ username, password });
  
  res.cookie("access_token", user?.token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    signed: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json(user);
};

export { registerUser, loginUser };
