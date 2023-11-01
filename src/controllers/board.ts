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
  const board = await prisma.board.findMany();
  res.status(200).json(board);
};

const updateBoard = async (req: Request, res: Response) => {
  const { id, newName } = req.body;
  console.log(id, newName);

  const board = await prisma.board.update({
    where: {
      id,
    },
    data: {
      name: newName,
    },
  });

  res.status(200).json(board);
};

const deleteBoard = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const board = await prisma.board.delete({
      where: {
        id,
      },
    });
    res.status(200).json(board);
  } catch (error) {}
};

export { createBoard, getBoard, updateBoard, deleteBoard };
