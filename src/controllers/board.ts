import { Request, Response } from "express";
import prisma from "../lib/prisma";

const createBoard = async (req: Request, res: Response) => {
  const { id, name } = req.body;

  const schedule = await prisma.board.create({
    data: {
      id,
      name,
    },
  });
  res.status(200).json(schedule);
};

const getBoard = async (req: Request, res: Response) => { 
    const board = await prisma.board.findMany()
    res.status(200).json(board);
};

export { createBoard, getBoard };
