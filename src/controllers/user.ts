import { Request, Response } from "express";
import prisma from "../lib/prisma";

const getAllUsers = async (req: Request, res: Response) => {
  const allUser = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      position: true,
      name: true,
      role: true,
    },
  });
  res.status(200).json(allUser);
};

export { getAllUsers };
