import { randomUUID } from "crypto";
import prisma from "../lib/prisma";
import {
  comparePassword,
  createAccessToken,
  createHash,
  createRefreshToken,
} from "../utils/JWT";
import { LoginInterface, RegisterInterface } from "../utils/interfaces";
import { $Enums } from "@prisma/client";

export const createUser = async (credentials: RegisterInterface) => {
  const isUser = await prisma.user.findUnique({
    where: {
      email: credentials.email,
    },
  });

  const users = await prisma.user.findMany();
  const role =
    users.length === 0
      ? ("SUPER_ADMIN" as $Enums.user_role)
      : ("USER" as $Enums.user_role);

  if (isUser) {
    throw new Error("User  already exists");
  }

  const hashPassword = await createHash(credentials.password);

  const newUser = {
    id: `use_${randomUUID()}`,
    email: credentials.email,
    name: credentials.username,
    hashPassword,
    role,
    position: credentials.position,
  };

  const user = await prisma.user.create({
    data: {
      ...newUser,
    },
  });

  return user ? user : null;
};

// Validate user in the database
export const validateUser = async ({ username, password }: LoginInterface) => {
  const isUser = await prisma.user.findUnique({
    where: {
      name: username,
    },
  });

  if (!isUser) {
    throw new Error("User not found");
  }

  const isPasswordCorrect = await comparePassword(
    password,
    isUser.hashPassword
  );

  if (!isPasswordCorrect) {
    throw new Error("Invalid credentials");
  }

  const payload = {
    user: isUser.name,
    email: isUser.email,
    id: isUser.id,
  };

  const accessToken = await createAccessToken(payload);
  const refreshToken = await createRefreshToken(payload);

  const user = {
    id: isUser.id,
    name: isUser.name,
    email: isUser.email,
    role: isUser.role,
    token: accessToken,
    refreshToken,
  };

  return isPasswordCorrect ? user : null;
};
