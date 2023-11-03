import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { randomUUID } from "crypto";

const createBoard = async (req: Request, res: Response) => {
  const { name } = req.body;

  const board = await prisma.board.findUnique({
    where: {
      name,
    },
  });

  if (board) {
    throw new Error(`Board ${board.name} already exists`);
  }

  const newBoard = await prisma.board.create({
    data: {
      id: `boa_${randomUUID()}`,
      name,
    },
  });
  res.status(200).json(newBoard);
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
  } catch (error) {
    res.status(500).json(error);
  }
};

export { createBoard, getBoard, updateBoard, deleteBoard };
